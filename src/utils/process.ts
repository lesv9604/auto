import { CharacteristicEvaluation, ProgramInfo } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { hallazgosDe, planesDe, estadoEfectivo } from './plan';

export interface EnlaceInforme { codigo: string; tipo: 'Documento soporte' | 'Evidencia'; label: string; url: string }

/** Todos los enlaces registrados (documentos soporte y URLs de evidencias). */
export function enlacesDe(ev?: CharacteristicEvaluation, codigo = ''): EnlaceInforme[] {
  if (!ev) return [];
  return [
    ...(ev.adjuntos ?? []).map((d) => ({ codigo, tipo: 'Documento soporte' as const, label: d.label, url: d.url })),
    ...ev.evidences.filter((e) => e.url).map((e) => ({ codigo, tipo: 'Evidencia' as const, label: e.label, url: e.url! })),
  ];
}

export interface Etapa { etapa: string; estado: 'Completa' | 'Parcial' | 'Pendiente'; detalle: string }
export interface FilaSeguimiento {
  factor: string; codigo: string; titulo: string; peso: string; valoracion: string; cna: string;
  hallazgos: boolean; evidencias: string; enlaces: number; acciones: number;
}

const est = (hecho: number, total: number): Etapa['estado'] => (hecho === 0 ? 'Pendiente' : hecho >= total ? 'Completa' : 'Parcial');

/** Resumen de trazabilidad de todo el proceso de autoevaluación. */
export function trazabilidad(programInfo: ProgramInfo, evaluations: Record<number, CharacteristicEvaluation>) {
  const chars = CESU_FACTORS.flatMap((f) => f.characteristics.map((c) => ({ f, c, ev: evaluations[c.id] })));
  const total = chars.length;
  const conEncuesta = chars.filter((x) => x.ev?.survey);
  const evaluadas = chars.filter((x) => (x.ev?.rating ?? 0) > 0).length;
  const cna = chars.filter((x) => x.ev?.cnaLevel);
  const dist = ['NC', 'CI', 'CA', 'CP'].map((k) => `${k} ${cna.filter((x) => x.ev!.cnaLevel === k).length}`).join(' · ');
  const hall = chars.filter((x) => hallazgosDe(x.ev)).length;
  const evTot = chars.reduce((s, x) => s + (x.ev?.evidences.length ?? 0), 0);
  const evOk = chars.reduce((s, x) => s + (x.ev?.evidences.filter((e) => e.checked).length ?? 0), 0);
  const enlaces = chars.reduce((s, x) => s + enlacesDe(x.ev).length, 0);
  const acciones = chars.flatMap((x) => planesDe(x.ev));
  const conAccion = chars.filter((x) => planesDe(x.ev).length).length;
  const cumplidas = acciones.filter((a) => estadoEfectivo(a) === 'Cumplida').length;

  const encuestados: Record<string, number> = {};
  let periodo: string | undefined; let cargado: string | undefined;
  conEncuesta.forEach(({ ev }) => {
    periodo ??= ev!.survey!.periodo; cargado ??= ev!.survey!.fetchedAt;
    Object.entries(ev!.survey!.byActor).forEach(([a, d]) => { encuestados[a] = Math.max(encuestados[a] ?? 0, (d as { n: number }).n); });
  });
  const totalEnc = Object.values(encuestados).reduce((s, n) => s + n, 0);
  const fCarga = cargado ? new Date(cargado).toLocaleDateString('es-CO') : '';

  const etapas: Etapa[] = [
    { etapa: '1. Configuración del proceso', estado: programInfo.evaluatorName.trim() ? 'Completa' : 'Parcial',
      detalle: `${programInfo.programName} · ${programInfo.faculty} · periodo ${programInfo.period} · responsable: ${programInfo.evaluatorName || 'sin registrar'}` },
    { etapa: '2. Recolección de percepción (encuestas)', estado: conEncuesta.length ? 'Completa' : 'Pendiente',
      detalle: conEncuesta.length
        ? `Respuestas del ${periodo ?? 'periodo registrado'}${fCarga ? `, cargadas el ${fCarga}` : ''}. ${totalEnc} encuestados: ${Object.entries(encuestados).map(([a, n]) => `${a} ${n}`).join(', ')}.`
        : 'No se han cargado resultados de encuestas.' },
    { etapa: '3. Valoración de características', estado: est(evaluadas, total), detalle: `${evaluadas} de ${total} características con valoración.` },
    { etapa: '4. Apreciación del Comité (escala CNA)', estado: est(cna.length, total), detalle: `${cna.length} de ${total} calificadas (${dist}).` },
    { etapa: '5. Apreciaciones y hallazgos', estado: est(hall, total), detalle: `${hall} de ${total} características con hallazgos registrados.` },
    { etapa: '6. Evidencias y documentos soporte', estado: est(evOk, evTot || 1), detalle: `${evOk} de ${evTot} evidencias verificadas · ${enlaces} enlace(s) registrados.` },
    { etapa: '7. Plan de mejoramiento', estado: acciones.length ? (conAccion >= total ? 'Completa' : 'Parcial') : 'Pendiente',
      detalle: `${acciones.length} acción(es) en ${conAccion} característica(s) · ${cumplidas} cumplida(s).` },
    { etapa: '8. Emisión del informe', estado: 'Completa', detalle: `Informe generado el ${new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}.` },
  ];

  const filas: FilaSeguimiento[] = chars.map(({ f, c, ev }) => ({
    factor: f.code, codigo: c.code, titulo: c.title,
    peso: `${(100 / f.characteristics.length).toFixed(1)} %`,
    valoracion: ev && ev.rating > 0 ? ev.rating.toFixed(2) : '—',
    cna: ev?.cnaLevel ?? '—',
    hallazgos: !!hallazgosDe(ev),
    evidencias: `${ev?.evidences.filter((e) => e.checked).length ?? 0}/${ev?.evidences.length ?? 0}`,
    enlaces: enlacesDe(ev).length,
    acciones: planesDe(ev).length,
  }));
  return { etapas, filas };
}
