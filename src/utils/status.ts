import { CharacteristicEvaluation } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { hallazgosDe } from './plan';

/**
 * Una característica está EVALUADA cuando tiene los tres componentes del análisis:
 * valoración (encuestas), calificación del Comité (escala CNA) y apreciaciones y hallazgos.
 */
export type EstadoEval = 'Evaluada' | 'En progreso' | 'Pendiente';

export interface StatusCaracteristica {
  estado: EstadoEval;
  faltantes: string[];
  hechos: number; // 0–3
}

export function statusDe(ev?: CharacteristicEvaluation): StatusCaracteristica {
  const checks: [boolean, string][] = [
    [(ev?.rating ?? 0) > 0, 'valoración de encuestas'],
    [!!ev?.cnaLevel, 'calificación del Comité (CNA)'],
    [!!hallazgosDe(ev), 'apreciaciones y hallazgos'],
  ];
  const hechos = checks.filter(([ok]) => ok).length;
  return {
    estado: hechos === 3 ? 'Evaluada' : hechos === 0 ? 'Pendiente' : 'En progreso',
    faltantes: checks.filter(([ok]) => !ok).map(([, l]) => l),
    hechos,
  };
}

export const ESTADO_EVAL_STYLE: Record<EstadoEval, { chip: string; dot: string }> = {
  Evaluada:      { chip: 'bg-emerald-50 border-emerald-300 text-emerald-800', dot: 'bg-emerald-500' },
  'En progreso': { chip: 'bg-amber-50 border-amber-300 text-amber-800',       dot: 'bg-amber-500' },
  Pendiente:     { chip: 'bg-slate-50 border-slate-300 text-slate-500',        dot: 'bg-slate-300' },
};

/** Lista plana en orden, con su estado. */
export function resumenEstados(evaluations: Record<number, CharacteristicEvaluation>) {
  const items = CESU_FACTORS.flatMap((f) => f.characteristics.map((c) => ({ factor: f, char: c, st: statusDe(evaluations[c.id]) })));
  const count = (e: EstadoEval) => items.filter((i) => i.st.estado === e).length;
  return { items, evaluadas: count('Evaluada'), enProgreso: count('En progreso'), pendientes: count('Pendiente'), total: items.length };
}
