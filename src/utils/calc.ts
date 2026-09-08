import { CharacteristicEvaluation, ConsolidatedDiagnostics, FactorSummary } from '../types';
import { CESU_FACTORS } from '../data/cesuData';

/**
 * Calcula el diagnóstico completo.
 * La ponderación de cada característica es automática:
 *   peso_efectivo = 1 / total_características_del_factor
 * Así todos los factores y todas las características dentro de cada factor
 * contribuyen equitativamente al puntaje global.
 */
export function calculateDiagnostics(
  evaluations: Record<number, CharacteristicEvaluation>
): ConsolidatedDiagnostics {
  let totalWeightedScoreSum = 0;
  let totalWeightSum = 0;
  let totalCharacteristics = 0;
  let totalEvaluated = 0;
  let totalPending = 0;
  let evidenceChecklistTotal = 0;
  let evidenceChecklistCompleted = 0;

  const factorSummaries: FactorSummary[] = CESU_FACTORS.map((factor) => {
    const n = factor.characteristics.length;
    // Peso automático: igual para todas las características del factor
    const autoWeight = n > 0 ? 1 / n : 1;

    let factorWeightedSum = 0;
    let factorWeightSum = 0;
    let charEvaluatedCount = 0;
    let charPendingCount = 0;

    factor.characteristics.forEach((char) => {
      totalCharacteristics++;
      const evalData = evaluations[char.id];

      if (evalData) {
        const rating = evalData.rating ?? 0;

        if (rating > 0) {
          factorWeightedSum += rating * autoWeight;
          factorWeightSum  += autoWeight;
          charEvaluatedCount++;
          totalEvaluated++;
        } else {
          charPendingCount++;
          totalPending++;
        }

        // Evidencias
        if (evalData.evidences) {
          evalData.evidences.forEach((ev) => {
            evidenceChecklistTotal++;
            if (ev.checked) evidenceChecklistCompleted++;
          });
        }
      } else {
        charPendingCount++;
        totalPending++;
      }
    });

    totalWeightedScoreSum += factorWeightedSum;
    totalWeightSum        += factorWeightSum;

    const averageRating = factorWeightSum > 0 ? factorWeightedSum / factorWeightSum : 0;
    const compliancePercentage = (averageRating / 5.0) * 100;

    let statusLevel: FactorSummary['statusLevel'] = 'Sin evaluar';
    let colorClass = 'bg-slate-200 text-slate-600';

    if (charEvaluatedCount === 0) {
      statusLevel = 'Sin evaluar';
      colorClass  = 'bg-slate-200 text-slate-600';
    } else if (averageRating >= 4.5) {
      statusLevel = 'Pleno';
      colorClass  = 'bg-emerald-600 text-white';
    } else if (averageRating >= 4.0) {
      statusLevel = 'Alto';
      colorClass  = 'bg-teal-600 text-white';
    } else if (averageRating >= 3.0) {
      statusLevel = 'Aceptable';
      colorClass  = 'bg-amber-500 text-white';
    } else {
      statusLevel = 'Deficiente';
      colorClass  = 'bg-rose-600 text-white';
    }

    return {
      factorId: factor.id,
      factorName: factor.name,
      factorCode: factor.code,
      characteristicsCount: n,
      evaluatedCount: charEvaluatedCount,
      pendingCount: charPendingCount,
      averageRating: Number(averageRating.toFixed(2)),
      totalWeight: factorWeightSum,
      weightedScore: Number(factorWeightedSum.toFixed(2)),
      compliancePercentage: Number(compliancePercentage.toFixed(1)),
      statusLevel,
      colorClass,
    };
  });

  const overallScore = totalWeightSum > 0 ? totalWeightedScoreSum / totalWeightSum : 0;
  const overallCompliancePercentage = (overallScore / 5.0) * 100;

  let overallStatus: ConsolidatedDiagnostics['statusLevel'] = 'Sin evaluar';
  if (totalEvaluated === 0)       overallStatus = 'Sin evaluar';
  else if (overallScore >= 4.5)   overallStatus = 'Pleno';
  else if (overallScore >= 4.0)   overallStatus = 'Alto';
  else if (overallScore >= 3.0)   overallStatus = 'Aceptable';
  else                            overallStatus = 'Deficiente';

  const sortedByRating = [...factorSummaries]
    .filter((f) => f.evaluatedCount > 0)
    .sort((a, b) => b.averageRating - a.averageRating);

  return {
    overallScore: Number(overallScore.toFixed(2)),
    overallCompliancePercentage: Number(overallCompliancePercentage.toFixed(1)),
    statusLevel: overallStatus,
    totalFactors: CESU_FACTORS.length,
    totalCharacteristics,
    totalEvaluated,
    totalPending,
    factorSummaries,
    strongestFactor: sortedByRating[0],
    weakestFactor:   sortedByRating[sortedByRating.length - 1],
    evidenceChecklistTotal,
    evidenceChecklistCompleted,
  };
}

export function getStatusBadgeInfo(rating: number) {
  if (rating === 0)    return { label: 'Sin evaluar',               color: 'bg-slate-100 text-slate-500 border-slate-300',   hex: '#94a3b8' };
  if (rating >= 4.5)   return { label: 'Cumplimiento Pleno',        color: 'bg-emerald-100 text-emerald-800 border-emerald-300', hex: '#059669' };
  if (rating >= 4.0)   return { label: 'Cumplimiento Alto',         color: 'bg-teal-100 text-teal-800 border-teal-300',         hex: '#0d9488' };
  if (rating >= 3.0)   return { label: 'Cumplimiento Aceptable',    color: 'bg-amber-100 text-amber-800 border-amber-300',       hex: '#d97706' };
  return               { label: 'Insuficiente / Deficiente',         color: 'bg-rose-100 text-rose-800 border-rose-300',         hex: '#e11d48' };
}

/** Peso efectivo que se muestra al usuario: porcentaje dentro del factor */
export function getAutoWeightLabel(totalInFactor: number): string {
  if (totalInFactor === 0) return '—';
  return `${(100 / totalInFactor).toFixed(1)}%`;
}
