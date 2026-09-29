/**
 * Lectura del libro de respuestas (.xlsx descargado de Google Sheets).
 * Todo se procesa en el navegador: el archivo no se sube a ningún servidor
 * y solo se conservan conteos agregados (se descartan nombres y observaciones).
 */
import type { ScaleCounts, SurveyPayload } from './surveys';

export interface RawSheet { sheet: string; data: unknown[][] }

interface ParsedRow { fecha: Date | null; escuela: string; programa: string; valores: [string, keyof ScaleCounts][] }
export interface ParsedWorkbook { actores: Record<string, ParsedRow[]>; advertencias: string[] }

export interface ProgramOption {
  key: string; escuela: string; programa: string; respuestas: number; similitud: number;
}

const RE_CODIGO = /^\s*\[C(\d{2})\]/;
const ESCALA: Record<string, keyof ScaleCounts> = {
  'muy favorable': 'mf', 'favorable': 'f', 'desfavorable': 'd', 'muy desfavorable': 'md', 'no aplica': 'na',
};

export const norm = (s: unknown = '') =>
  String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

/** Pestaña → actor (tolerante a variaciones de nombre). */
function actorDePestana(nombre: string): string | null {
  const n = norm(nombre);
  if (n.includes('estudiante')) return 'Estudiantes';
  if (n.includes('profesor') || n.includes('docente')) return 'Profesores';
  if (n.includes('empleador')) return 'Empleadores';
  if (n.includes('directivo')) return 'Directivos';
  if (n.includes('egresado')) return 'Egresados';
  if (n.includes('administrativ')) return 'Administrativos';
  return null;
}

// Las fechas del .xlsx llegan como "hora de pared" en UTC: se comparan por día (AAAA-MM-DD) en UTC.
const dia = (d: Date) => d.toISOString().slice(0, 10);

function toDate(v: unknown): Date | null {
  if (v instanceof Date && !isNaN(v.getTime())) return v;
  if (typeof v === 'string') {
    // formato Google Sheets es-CO: d/m/aaaa h:mm:ss
    const m = v.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return new Date(Date.UTC(+m[3], +m[2] - 1, +m[1]));
  }
  return null;
}

export function parseWorkbook(sheets: RawSheet[]): ParsedWorkbook {
  const actores: ParsedWorkbook['actores'] = {};
  const advertencias: string[] = [];

  for (const { sheet, data } of sheets) {
    const actor = actorDePestana(sheet);
    if (!actor) { advertencias.push(`Pestaña "${sheet}" ignorada (no corresponde a un actor).`); continue; }
    if (!data.length) continue;

    const head = data[0].map(norm);
    const iFecha = head.findIndex((h) => h === 'marca temporal' || h === 'timestamp');
    const iEsc = head.indexOf('escuela');
    const iProg = head.indexOf('programa academico');
    if (iEsc < 0 || iProg < 0) {
      advertencias.push(`"${sheet}": faltan las columnas Escuela o Programa académico.`);
      continue;
    }
    const cols = data[0]
      .map((t, i) => ({ i, m: String(t ?? '').match(RE_CODIGO) }))
      .filter((c) => c.m)
      .map((c) => ({ i: c.i, code: `C${c.m![1]}` }));

    let desconocidos = 0;
    const rows: ParsedRow[] = [];
    for (const r of data.slice(1)) {
      if (!r || r.every((c) => c === null || c === '')) continue;
      const valores: ParsedRow['valores'] = [];
      for (const c of cols) {
        const v = norm(r[c.i]);
        if (!v) continue;
        const k = ESCALA[v];
        if (k) valores.push([c.code, k]); else desconocidos++;
      }
      rows.push({
        fecha: iFecha >= 0 ? toDate(r[iFecha]) : null,
        escuela: String(r[iEsc] ?? '').trim(),
        programa: String(r[iProg] ?? '').trim(),
        valores,
      });
    }
    if (desconocidos) advertencias.push(`"${sheet}": ${desconocidos} respuesta(s) con valor no reconocido se ignoraron.`);
    actores[actor] = (actores[actor] ?? []).concat(rows);
  }
  return { actores, advertencias };
}

// ─── Coincidencia de programa (los valores pueden venir escritos a mano) ─────

function similitud(a: string, b: string): number {
  a = norm(a); b = norm(b);
  if (!a || !b) return 0;
  if (a === b) return 1;
  const d: number[] = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = d[0]; d[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = d[j];
      d[j] = Math.min(d[j] + 1, d[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return 1 - d[b.length] / Math.max(a.length, b.length);
}

/** Combinaciones escuela/programa presentes en el libro, ordenadas por parecido al programa de la sesión. */
export function programOptions(wb: ParsedWorkbook, programaSesion: string): ProgramOption[] {
  const map = new Map<string, ProgramOption>();
  Object.values(wb.actores).flat().forEach((r) => {
    const key = `${norm(r.escuela)}|${norm(r.programa)}`;
    const o = map.get(key) ?? { key, escuela: r.escuela, programa: r.programa, respuestas: 0,
      similitud: similitud(r.programa, programaSesion) };
    o.respuestas++;
    map.set(key, o);
  });
  return [...map.values()].sort((a, b) => b.similitud - a.similitud || b.respuestas - a.respuestas);
}

export function dateBounds(wb: ParsedWorkbook): { min: string; max: string } | null {
  const ds = Object.values(wb.actores).flat().map((r) => r.fecha).filter((d): d is Date => !!d);
  if (!ds.length) return null;
  return { min: dia(new Date(Math.min(...ds.map(Number)))), max: dia(new Date(Math.max(...ds.map(Number)))) };
}

/** Agrega las filas seleccionadas (programas elegidos + rango de fechas inclusivo). */
export function aggregateWorkbook(
  wb: ParsedWorkbook, keys: Set<string>, desde: string, hasta: string,
  escuela: string, programa: string
): SurveyPayload {
  const actores: SurveyPayload['actores'] = {};
  let sinFecha = 0;

  Object.entries(wb.actores).forEach(([actor, rows]) => {
    const a = { n: 0, items: {} as Record<string, ScaleCounts> };
    rows.forEach((r) => {
      if (!keys.has(`${norm(r.escuela)}|${norm(r.programa)}`)) return;
      if (!r.fecha) { sinFecha++; return; }
      const d = dia(r.fecha);
      if (d < desde || d > hasta) return;
      a.n++;
      r.valores.forEach(([code, k]) => {
        (a.items[code] ??= { mf: 0, f: 0, d: 0, md: 0, na: 0 })[k]++;
      });
    });
    if (a.n) actores[actor] = a;
  });

  return {
    generadoEn: new Date().toISOString(), escuela, programa, desde, hasta, actores,
    advertencias: sinFecha ? [...wb.advertencias, `${sinFecha} respuesta(s) sin Marca temporal se excluyeron.`] : wb.advertencias,
  };
}
