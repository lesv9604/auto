export interface EvidenceItem {
  id: string;
  label: string;
  checked: boolean;
  notes?: string;
}

export interface CharacteristicEvaluation {
  characteristicId: number;
  factorId: number;
  rating: number; // Scale 1.0 to 5.0
  weight: number; // Scale 1 to 10
  qualitativeJustification: string;
  actionPlan: string;
  evidences: EvidenceItem[];
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
  evaluatedCount: number;
  averageRating: number;
  totalWeight: number;
  weightedScore: number;
  compliancePercentage: number;
  statusLevel: 'Deficiente' | 'Aceptable' | 'Alto' | 'Pleno';
  colorClass: string;
}

export interface ConsolidatedDiagnostics {
  overallScore: number;
  overallCompliancePercentage: number;
  statusLevel: 'Deficiente' | 'Aceptable' | 'Alto' | 'Pleno';
  totalFactors: number;
  totalCharacteristics: number;
  totalEvaluated: number;
  factorSummaries: FactorSummary[];
  strongestFactor?: FactorSummary;
  weakestFactor?: FactorSummary;
  evidenceChecklistTotal: number;
  evidenceChecklistCompleted: number;
}

// ─── Gestión de sesiones por programa ───────────────────────────────────────

export type ProgramLevel = 'pregrado' | 'posgrado';

export interface DiagnosticSession {
  id: string;           // Clave única, p.ej. "ingagroindustrial_1720000000000"
  school: string;
  program: string;
  level: ProgramLevel;
  startDate: string;    // ISO date
  lastModified: string; // ISO date
}
