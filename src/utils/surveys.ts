import { CharacteristicEvaluation, SurveySummary } from '../types';
import { CESU_FACTORS } from '../data/cesuData';

/** Conteos por opción de la escala (formato devuelto por el endpoint). */
export interface ScaleCounts { mf: number; f: number; d: number; md: number; na: number }

export interface SurveyPayload {
  generadoEn: string;
  escuela: string;
  programa: string;
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
          lowSample: Object.values(byActor).some((a) => a.n < MIN_RESPUESTAS),
        },
      };
    })
  );
  return next;
}
