import { CharacteristicEvaluation, SurveySummary } from '../types';
import { CESU_FACTORS } from '../data/cesuData';

/** Conteos por opción de la escala (formato devuelto por el endpoint). */
export interface ScaleCounts { mf: number; f: number; d: number; md: number; na: number }

export interface SurveyPayload {
  generadoEn: string;
  escuela: string;
  programa: string;
  desde?: string;
  hasta?: string;
  actores: Record<string, { n: number; items: Record<string, ScaleCounts> }>;
  advertencias: string[];
  error?: string;
}

/** Respondentes mínimos por actor para considerar el dato confiable (definir con el comité). */
export const MIN_RESPUESTAS = 5;

/** Likert 1–4 → escala de la app 1–5 (lineal). 4→5, 3→3.67, 2→2.33, 1→1. */
export const likertToRating = (x: number) => 1 + ((x - 1) * 4) / 3;

const round2 = (x: number) => Math.round(x * 100) / 100;

/** Promedio Likert de un conjunto de conteos, excluyendo "No aplica". */
function likertAverage(c: ScaleCounts): { avg: number; valid: number } {
  const valid = c.mf + c.f + c.d + c.md;
  if (valid === 0) return { avg: 0, valid: 0 };
  return { avg: (4 * c.mf + 3 * c.f + 2 * c.d + 1 * c.md) / valid, valid };
}

/**
 * Calcula la valoración de cada característica.
 * Regla: se promedia por actor y luego se promedian los actores con datos
 * (cada estamento pesa igual, sin importar cuántas personas respondieron).
 */
export function applySurveyToEvaluations(
  payload: SurveyPayload,
  evaluations: Record<number, CharacteristicEvaluation>
): Record<number, CharacteristicEvaluation> {
  const next = { ...evaluations };

  CESU_FACTORS.forEach((factor) =>
    factor.characteristics.forEach((char) => {
      const byActor: SurveySummary['byActor'] = {};
      Object.entries(payload.actores).forEach(([actor, data]) => {
        const counts = data.items[char.code];
        if (!counts) return;
        const { avg, valid } = likertAverage(counts);
        if (valid === 0) return;
        byActor[actor] = { likert: round2(avg), respuestas: valid, n: data.n, counts };
      });

      const actorAvgs = Object.values(byActor).map((a) => a.likert);
      const likert = actorAvgs.length ? actorAvgs.reduce((s, v) => s + v, 0) / actorAvgs.length : 0;
      const prev = next[char.id];
      if (!prev) return;

      next[char.id] = {
        ...prev,
        rating: likert > 0 ? round2(likertToRating(likert)) : 0,
        survey: {
          likert: round2(likert),
          byActor,
          fetchedAt: payload.generadoEn,
          periodo: payload.desde && payload.hasta ? `${payload.desde} a ${payload.hasta}` : undefined,
          lowSample: Object.values(byActor).some((a) => a.n < MIN_RESPUESTAS),
        },
      };
    })
  );
  return next;
}

// ─── Lectura del CSV exportado desde la hoja (menú "Autoevaluación") ─────────

const CSV_HEADERS = ['Escuela', 'Programa', 'Desde', 'Hasta', 'Generado', 'Actor', 'Codigo',
  'Encuestados', 'MuyFavorable', 'Favorable', 'Desfavorable', 'MuyDesfavorable', 'NoAplica'];

/** Parser CSV mínimo (comillas dobles, comas y saltos de línea dentro de comillas). */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = '', q = false;
  const t = text.replace(/^﻿/, '');
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (q) {
      if (ch === '"' && t[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') q = false;
      else cell += ch;
    } else if (ch === '"') q = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && t[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  row.push(cell);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

const normTxt = (s = '') =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * Convierte el CSV de resultados en SurveyPayload.
 * Valida encabezados y que corresponda a la escuela/programa de la sesión.
 */
export function parseResultsCsv(text: string, escuela: string, programa: string): SurveyPayload {
  const rows = parseCsv(text);
  if (rows.length < 2) throw new Error('El archivo no tiene datos.');
  const head = rows[0].map((h) => h.trim());
  const idx = Object.fromEntries(CSV_HEADERS.map((h) => [h, head.indexOf(h)]));
  const faltan = CSV_HEADERS.filter((h) => idx[h] < 0);
  if (faltan.length) throw new Error(`Formato no reconocido. Faltan columnas: ${faltan.join(', ')}`);

  const first = rows[1];
  if (normTxt(first[idx.Escuela]) !== normTxt(escuela) || normTxt(first[idx.Programa]) !== normTxt(programa)) {
    throw new Error(`El archivo es de "${first[idx.Programa]}" y la sesión es de "${programa}".`);
  }

  const actores: SurveyPayload['actores'] = {};
  const num = (v: string) => {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 0) throw new Error(`Valor numérico inválido: "${v}"`);
    return n;
  };
  for (const r of rows.slice(1)) {
    const code = r[idx.Codigo].trim().toUpperCase();
    if (!/^C\d{2}$/.test(code)) continue;
    const actor = r[idx.Actor].trim();
    const a = (actores[actor] ??= { n: num(r[idx.Encuestados]), items: {} });
    a.items[code] = {
      mf: num(r[idx.MuyFavorable]), f: num(r[idx.Favorable]), d: num(r[idx.Desfavorable]),
      md: num(r[idx.MuyDesfavorable]), na: num(r[idx.NoAplica]),
    };
  }
  if (!Object.keys(actores).length) throw new Error('El archivo no contiene resultados por característica.');

  return {
    generadoEn: first[idx.Generado],
    escuela: first[idx.Escuela],
    programa: first[idx.Programa],
    desde: first[idx.Desde],
    hasta: first[idx.Hasta],
    actores,
    advertencias: [],
  };
}
