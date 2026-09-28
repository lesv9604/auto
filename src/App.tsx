import React, { useState, useEffect } from 'react';
import { ActiveTab, CharacteristicEvaluation, ProgramInfo, DiagnosticSession, ProgramLevel } from './types';
import { CESU_FACTORS } from './data/cesuData';
import {
  buildProgramInfo,
  createBlankEvaluationData,
} from './data/unipazPrograms';
import { calculateDiagnostics } from './utils/calc';
import { Header } from './components/Header';
import { FactorNav } from './components/FactorNav';
import { CharacteristicForm } from './components/CharacteristicForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PrintableReport } from './components/PrintableReport';
import { ImportExportModal } from './components/ImportExportModal';
import { ProgramSelector } from './components/ProgramSelector';

// ─── Claves de localStorage ───────────────────────────────────────────────────
const REGISTRY_KEY = 'unipaz_sessions_registry_v1';
const evalKey  = (id: string) => `unipaz_eval_${id}_v1`;
const infoKey  = (id: string) => `unipaz_info_${id}_v1`;

// ─── Helpers de sesión ────────────────────────────────────────────────────────
function loadRegistry(): DiagnosticSession[] {
  try {
    const raw = localStorage.getItem(REGISTRY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRegistry(sessions: DiagnosticSession[]) {
  try { localStorage.setItem(REGISTRY_KEY, JSON.stringify(sessions)); } catch { /* noop */ }
}

function loadSessionEval(id: string): Record<number, CharacteristicEvaluation> | null {
  try {
    const raw = localStorage.getItem(evalKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function loadSessionInfo(id: string): ProgramInfo | null {
  try {
    const raw = localStorage.getItem(infoKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSessionEval(id: string, data: Record<number, CharacteristicEvaluation>) {
  try { localStorage.setItem(evalKey(id), JSON.stringify(data)); } catch { /* noop */ }
}

function saveSessionInfo(id: string, info: ProgramInfo) {
  try { localStorage.setItem(infoKey(id), JSON.stringify(info)); } catch { /* noop */ }
}

function deleteSessionData(id: string) {
  try {
    localStorage.removeItem(evalKey(id));
    localStorage.removeItem(infoKey(id));
  } catch { /* noop */ }
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');
}

// ─── Componente principal ─────────────────────────────────────────────────────
export default function App() {
  // Registro de sesiones
  const [sessions, setSessions] = useState<DiagnosticSession[]>(loadRegistry);

  // Sesión activa (null = mostrar selector)
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Datos de la sesión activa
  const [programInfo, setProgramInfo] = useState<ProgramInfo | null>(null);
  const [evaluations, setEvaluations] = useState<Record<number, CharacteristicEvaluation> | null>(null);

  // Navegación dentro de la evaluación
  const [activeTab, setActiveTab] = useState<ActiveTab>('evaluator');
  const [activeFactorId, setActiveFactorId] = useState<number>(1);
  const [activeCharacteristicId, setActiveCharacteristicId] = useState<number>(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // ── Persistir cambios en evaluaciones ──
  useEffect(() => {
    if (activeSessionId && evaluations) {
      saveSessionEval(activeSessionId, evaluations);
      // Actualizar lastModified en el registro
      setSessions((prev) => {
        const updated = prev.map((s) =>
          s.id === activeSessionId ? { ...s, lastModified: new Date().toISOString() } : s
        );
        saveRegistry(updated);
        return updated;
      });
    }
  }, [evaluations]);

  // ── Persistir cambios en info de programa ──
  useEffect(() => {
    if (activeSessionId && programInfo) {
      saveSessionInfo(activeSessionId, programInfo);
    }
  }, [programInfo]);

  // ── Iniciar nueva sesión ──
  const handleStartNew = (school: string, program: string, level: ProgramLevel) => {
    const id = `${slugify(program)}_${Date.now()}`;
    const now = new Date().toISOString();

    const newSession: DiagnosticSession = {
      id,
      school,
      program,
      level,
      startDate: now,
      lastModified: now,
    };

    const info = buildProgramInfo(school, program);
    const evals = createBlankEvaluationData();

    saveSessionInfo(id, info);
    saveSessionEval(id, evals);

    const updated = [newSession, ...sessions];
    saveRegistry(updated);
    setSessions(updated);

    setProgramInfo(info);
    setEvaluations(evals);
    setActiveSessionId(id);
    setActiveTab('evaluator');
    setActiveFactorId(1);
    setActiveCharacteristicId(1);
  };

  // ── Retomar sesión existente ──
  const handleResumeSession = (id: string) => {
    const info  = loadSessionInfo(id) ?? buildProgramInfo('', '');
    const evals = loadSessionEval(id) ?? createBlankEvaluationData();

    setProgramInfo(info);
    setEvaluations(evals);
    setActiveSessionId(id);
    setActiveTab('evaluator');
    setActiveFactorId(1);
    setActiveCharacteristicId(1);
  };

  // ── Eliminar sesión ──
  const handleDeleteSession = (id: string) => {
    deleteSessionData(id);
    const updated = sessions.filter((s) => s.id !== id);
    saveRegistry(updated);
    setSessions(updated);
    if (activeSessionId === id) {
      setActiveSessionId(null);
      setProgramInfo(null);
      setEvaluations(null);
    }
  };

  // ── Volver al selector ──
  const handleBackToSelector = () => {
    setActiveSessionId(null);
    setProgramInfo(null);
    setEvaluations(null);
  };

  // ── Mostrar selector si no hay sesión activa ──
  if (!activeSessionId || !programInfo || !evaluations) {
    return (
      <ProgramSelector
        existingSessions={sessions}
        onStartNew={handleStartNew}
        onResumeSession={handleResumeSession}
        onDeleteSession={handleDeleteSession}
      />
    );
  }

  // ─── Lógica de evaluación ────────────────────────────────────────────────
  const diagnostics = calculateDiagnostics(evaluations);

  const activeFactor =
    CESU_FACTORS.find((f) => f.id === activeFactorId) || CESU_FACTORS[0];
  const activeCharacteristic =
    activeFactor.characteristics.find((c) => c.id === activeCharacteristicId) ||
    activeFactor.characteristics[0];

  const allCharacteristics = CESU_FACTORS.flatMap((f) => f.characteristics);
  const currentFlatIndex = allCharacteristics.findIndex(
    (c) => c.id === activeCharacteristic.id
  );

  const handleSelectCharacteristic = (factorId: number, charId: number) => {
    setActiveFactorId(factorId);
    setActiveCharacteristicId(charId);
  };

  const handleUpdateCharacteristicEvaluation = (updated: CharacteristicEvaluation) => {
    setEvaluations((prev) => ({ ...prev!, [updated.characteristicId]: updated }));
  };

  const handlePreviousCharacteristic = () => {
    if (currentFlatIndex > 0) {
      const prev = allCharacteristics[currentFlatIndex - 1];
      setActiveFactorId(prev.factorId);
      setActiveCharacteristicId(prev.id);
    }
  };

  const handleNextCharacteristic = () => {
    if (currentFlatIndex < allCharacteristics.length - 1) {
      const next = allCharacteristics[currentFlatIndex + 1];
      setActiveFactorId(next.factorId);
      setActiveCharacteristicId(next.id);
    }
  };

  const handleResetBlank = () => {
    if (window.confirm('¿Reiniciar la evaluación en blanco? Se perderán todos los datos ingresados.')) {
      setEvaluations(createBlankEvaluationData());
    }
  };

  const handleImportData = (
    importedInfo: ProgramInfo,
    importedEvals: Record<number, CharacteristicEvaluation>
  ) => {
    setProgramInfo(importedInfo);
    setEvaluations(importedEvals);
  };

  // ─── Render de la herramienta de evaluación ──────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Header */}
      <Header
        programInfo={programInfo}
        onUpdateProgramInfo={(updated) => setProgramInfo((prev) => ({ ...prev!, ...updated }))}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onReset={handleResetBlank}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        overallScore={diagnostics.overallScore}
        statusLevel={diagnostics.statusLevel}
      />

      {/* Barra de contexto: programa activo + botón volver */}
      <div className="bg-emerald-700 text-white px-4 py-2 flex items-center justify-between text-sm print:hidden">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-emerald-300 shrink-0">📋</span>
          <span className="font-medium truncate">{programInfo.programName}</span>
          <span className="text-emerald-300 hidden sm:inline">·</span>
          <span className="text-emerald-200 text-xs hidden sm:inline truncate">{programInfo.faculty}</span>
        </div>
        <button
          onClick={handleBackToSelector}
          className="shrink-0 ml-4 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
        >
          ← Cambiar programa
        </button>
      </div>

      {/* Main */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        {activeTab === 'evaluator' && (
          <div className="flex flex-col lg:flex-row gap-6">
            <FactorNav
              activeFactorId={activeFactorId}
              activeCharacteristicId={activeCharacteristicId}
              onSelectCharacteristic={handleSelectCharacteristic}
              factorSummaries={diagnostics.factorSummaries}
              evaluations={evaluations}
            />
            <div className="flex-1 min-w-0">
              <CharacteristicForm
                factor={activeFactor}
                characteristic={activeCharacteristic}
                evaluation={
                  evaluations[activeCharacteristic.id] || {
                    characteristicId: activeCharacteristic.id,
                    factorId: activeFactor.id,
                    rating: 0,
                    weight: activeCharacteristic.defaultWeight,
                    qualitativeJustification: '',
                    actionPlan: '',
                    evidences: [],
                  }
                }
                onUpdateEvaluation={handleUpdateCharacteristicEvaluation}
                onPrevious={handlePreviousCharacteristic}
                onNext={handleNextCharacteristic}
                currentIndex={currentFlatIndex}
                totalCharacteristics={allCharacteristics.length}
              />
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <ResultsDashboard
            diagnostics={diagnostics}
            programInfo={programInfo}
            onSelectFactor={(factorId) => {
              setActiveFactorId(factorId);
              const factor = CESU_FACTORS.find((f) => f.id === factorId);
              if (factor && factor.characteristics.length > 0) {
                setActiveCharacteristicId(factor.characteristics[0].id);
              }
              setActiveTab('evaluator');
            }}
          />
        )}

        {activeTab === 'report' && (
          <PrintableReport
            programInfo={programInfo}
            diagnostics={diagnostics}
            evaluations={evaluations}
          />
        )}
      </main>

      <ImportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        programInfo={programInfo}
        evaluations={evaluations}
        onImportData={handleImportData}
      />

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-4 px-6 text-center print:hidden mt-auto">
        <p className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>UNIPAZ - Instituto Universitario de la Paz</strong> · Sistema Interno de
            Aseguramiento de la Calidad (SIAC)
          </span>
          <span className="text-[11px] text-slate-500">
            Basado en el Acuerdo 01 de 2025 del CESU
          </span>
        </p>
      </footer>
    </div>
  );
}
