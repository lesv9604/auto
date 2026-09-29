export interface EvidenceItem {
  id: string;
  label: string;
  checked: boolean;
  url?: string;   // URL del documento de soporte
  notes?: string;
}

export interface CharacteristicEvaluation {
  characteristicId: number;
  factorId: number;
  rating: number; // Escala 0.0 a 5.0  (0 = sin evaluar)
  weight: number; // Reservado; la ponderación efectiva se calcula automáticamente
  qualitativeJustification: string;
  actionPlan: string;
  evidences: EvidenceItem[];
  survey?: SurveySummary; // Resultado de encuestas (solo lectura)
}

export interface SurveySummary {
  likert: number; // Promedio 1–4 (media de actores)
  byActor: Record<string, {
    likert: number;
    respuestas: number; // respuestas válidas (sin "No aplica")
    n: number;          // encuestados del actor en el programa
    counts: { mf: number; f: number; d: number; md: number; na: number };
  }>;
  fetchedAt: string;
  periodo?: string; // rango de fechas de las respuestas
  lowSample: boolean;
}

export interface CharacteristicDef {
  id: number;
  factorId: number;
  code: string;
  title: string;
  description: string;
  defaultWeight: number;
  defaultEvidences: string[];
}

export interface FactorDef {
  id: number;
  code: string;
  name: string;
  description: string;
  characteristics: CharacteristicDef[];
}

export interface ProgramInfo {
  programName: string;
  faculty: string;
  campus: string;
  evaluatorName: string;
  evaluatorRole: string;
  period: string;
  evaluationDate: string;
  notes?: string;
}

export type ActiveTab = 'evaluator' | 'dashboard' | 'report';

export interface FactorSummary {
  factorId: number;
  factorName: string;
  factorCode: string;
  characteristicsCount: number;
  evaluatedCount: number;   // Características con rating > 0
  pendingCount: number;     // Características con rating === 0
  averageRating: number;
  totalWeight: number;
  weightedScore: number;
  compliancePercentage: number;
  statusLevel: 'Sin evaluar' | 'Deficiente' | 'Aceptable' | 'Alto' | 'Pleno';
  colorClass: string;
}

export interface ConsolidatedDiagnostics {
  overallScore: number;
  overallCompliancePercentage: number;
  statusLevel: 'Sin evaluar' | 'Deficiente' | 'Aceptable' | 'Alto' | 'Pleno';
  totalFactors: number;
  totalCharacteristics: number;
  totalEvaluated: number;
  totalPending: number;
  factorSummaries: FactorSummary[];
  strongestFactor?: FactorSummary;
  weakestFactor?: FactorSummary;
  evidenceChecklistTotal: number;
  evidenceChecklistCompleted: number;
}

// ─── Sesiones por programa ────────────────────────────────────────────────────
export type ProgramLevel = 'pregrado' | 'posgrado';

export interface DiagnosticSession {
  id: string;
  school: string;
  program: string;
  level: ProgramLevel;
  startDate: string;
  lastModified: string;
}
