import { CharacteristicEvaluation, ConsolidatedDiagnostics, FactorSummary } from '../types';
import { CESU_FACTORS } from '../data/cesuData';

export function calculateDiagnostics(
  evaluations: Record<number, CharacteristicEvaluation>
): ConsolidatedDiagnostics {
  let totalWeightedScoreSum = 0;
  let totalWeightSum = 0;
  let totalCharacteristics = 0;
  let totalEvaluated = 0;
  let evidenceChecklistTotal = 0;
  let evidenceChecklistCompleted = 0;

  const factorSummaries: FactorSummary[] = CESU_FACTORS.map((factor) => {
    let factorWeightedSum = 0;
    let factorWeightSum = 0;
    let charEvaluatedCount = 0;

    factor.characteristics.forEach((char) => {
      totalCharacteristics++;
      const evalData = evaluations[char.id];
      if (evalData) {
        const rating = evalData.rating || 0;
        const weight = evalData.weight || 1;

        factorWeightedSum += rating * weight;
        factorWeightSum += weight;

        if (rating > 0) {
          charEvaluatedCount++;
          totalEvaluated++;
        }

        // Evidences
        if (evalData.evidences) {
          evalData.evidences.forEach((ev) => {
            evidenceChecklistTotal++;
            if (ev.checked) evidenceChecklistCompleted++;
          });
        }
      }
    });

    totalWeightedScoreSum += factorWeightedSum;
    totalWeightSum += factorWeightSum;

    const averageRating = factorWeightSum > 0 ? factorWeightedSum / factorWeightSum : 0;
    const compliancePercentage = (averageRating / 5.0) * 100;

    let statusLevel: 'Deficiente' | 'Aceptable' | 'Alto' | 'Pleno' = 'Deficiente';
    let colorClass = 'bg-red-500 text-white';

    if (averageRating >= 4.5) {
      statusLevel = 'Pleno';
      colorClass = 'bg-emerald-600 text-white';
    } else if (averageRating >= 4.0) {
      statusLevel = 'Alto';
      colorClass = 'bg-teal-600 text-white';
    } else if (averageRating >= 3.0) {
      statusLevel = 'Aceptable';
      colorClass = 'bg-amber-500 text-white';
    } else {
      statusLevel = 'Deficiente';
      colorClass = 'bg-rose-600 text-white';
    }

    return {
      factorId: factor.id,
      factorName: factor.name,
      factorCode: factor.code,
      characteristicsCount: factor.characteristics.length,
      evaluatedCount: charEvaluatedCount,
      averageRating: Number(averageRating.toFixed(2)),
      totalWeight: factorWeightSum,
      weightedScore: Number(factorWeightedSum.toFixed(2)),
      compliancePercentage: Number(compliancePercentage.toFixed(1)),
      statusLevel,
      colorClass
    };
  });

  const overallScore = totalWeightSum > 0 ? totalWeightedScoreSum / totalWeightSum : 0;
  const overallCompliancePercentage = (overallScore / 5.0) * 100;

  let overallStatus: 'Deficiente' | 'Aceptable' | 'Alto' | 'Pleno' = 'Deficiente';
  if (overallScore >= 4.5) overallStatus = 'Pleno';
  else if (overallScore >= 4.0) overallStatus = 'Alto';
  else if (overallScore >= 3.0) overallStatus = 'Aceptable';
  else overallStatus = 'Deficiente';

  // Find strongest and weakest factors
  const sortedFactors = [...factorSummaries].sort((a, b) => b.averageRating - a.averageRating);
  const strongestFactor = sortedFactors[0];
  const weakestFactor = sortedFactors[sortedFactors.length - 1];

  return {
    overallScore: Number(overallScore.toFixed(2)),
    overallCompliancePercentage: Number(overallCompliancePercentage.toFixed(1)),
    statusLevel: overallStatus,
    totalFactors: CESU_FACTORS.length,
    totalCharacteristics,
    totalEvaluated,
    factorSummaries,
    strongestFactor,
    weakestFactor,
    evidenceChecklistTotal,
    evidenceChecklistCompleted
  };
}

export function getStatusBadgeInfo(rating: number) {
  if (rating >= 4.5) {
    return { label: 'Cumplimiento Pleno (Excelente)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', hex: '#059669' };
  } else if (rating >= 4.0) {
    return { label: 'Cumplimiento Alto (Bueno)', color: 'bg-teal-100 text-teal-800 border-teal-300', hex: '#0d9488' };
  } else if (rating >= 3.0) {
    return { label: 'Cumplimiento Aceptable', color: 'bg-amber-100 text-amber-800 border-amber-300', hex: '#d97706' };
  } else {
    return { label: 'Insuficiente / Deficiente', color: 'bg-rose-100 text-rose-800 border-rose-300', hex: '#e11d48' };
  }
}
