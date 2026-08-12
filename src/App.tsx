import React, { useState, useEffect } from 'react';
import { ActiveTab, CharacteristicEvaluation, ProgramInfo } from './types';
import { CESU_FACTORS } from './data/cesuData';
import {
  DEFAULT_PROGRAM_INFO,
  createBlankEvaluationData,
  createDemoEvaluationData
} from './data/unipazPrograms';
import { calculateDiagnostics } from './utils/calc';
import { Header } from './components/Header';
import { FactorNav } from './components/FactorNav';
import { CharacteristicForm } from './components/CharacteristicForm';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PrintableReport } from './components/PrintableReport';
import { ImportExportModal } from './components/ImportExportModal';

const LOCAL_STORAGE_KEY_EVAL = 'unipaz_cesu01_evaluations_v1';
const LOCAL_STORAGE_KEY_INFO = 'unipaz_cesu01_program_info_v1';

export default function App() {
  // 1. Program Info State
  const [programInfo, setProgramInfo] = useState<ProgramInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_INFO);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROGRAM_INFO;
  });

  // 2. Evaluations State (Default to Demo Data for immediate rich experience)
  const [evaluations, setEvaluations] = useState<Record<number, CharacteristicEvaluation>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_EVAL);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return createDemoEvaluationData();
  });

  // 3. Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('evaluator');
  const [activeFactorId, setActiveFactorId] = useState<number>(1);
  const [activeCharacteristicId, setActiveCharacteristicId] = useState<number>(1);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Save to LocalStorage whenever evaluations or info change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_EVAL, JSON.stringify(evaluations));
    } catch (e) {
      console.error(e);
    }
  }, [evaluations]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_INFO, JSON.stringify(programInfo));
    } catch (e) {
      console.error(e);
    }
  }, [programInfo]);

  // Real-time calculations engine
  const diagnostics = calculateDiagnostics(evaluations);

  // Find active factor and characteristic definitions
  const activeFactor = CESU_FACTORS.find((f) => f.id === activeFactorId) || CESU_FACTORS[0];
  const activeCharacteristic =
    activeFactor.characteristics.find((c) => c.id === activeCharacteristicId) ||
    activeFactor.characteristics[0];

  // Flatten all characteristics for linear Next/Previous stepping
  const allCharacteristics = CESU_FACTORS.flatMap((f) => f.characteristics);
  const currentFlatIndex = allCharacteristics.findIndex((c) => c.id === activeCharacteristic.id);

  // Handlers
  const handleSelectCharacteristic = (factorId: number, charId: number) => {
    setActiveFactorId(factorId);
    setActiveCharacteristicId(charId);
  };

  const handleUpdateCharacteristicEvaluation = (updated: CharacteristicEvaluation) => {
    setEvaluations((prev) => ({
      ...prev,
      [updated.characteristicId]: updated
    }));
  };

  const handlePreviousCharacteristic = () => {
    if (currentFlatIndex > 0) {
      const prevChar = allCharacteristics[currentFlatIndex - 1];
      setActiveFactorId(prevChar.factorId);
      setActiveCharacteristicId(prevChar.id);
    }
  };

  const handleNextCharacteristic = () => {
    if (currentFlatIndex < allCharacteristics.length - 1) {
      const nextChar = allCharacteristics[currentFlatIndex + 1];
      setActiveFactorId(nextChar.factorId);
      setActiveCharacteristicId(nextChar.id);
    }
  };

  const handleLoadDemo = () => {
    if (
      window.confirm(
        '¿Desea cargar la autoevaluación demostrativa preconfigurada para UNIPAZ? Se sobrescribirán los datos actuales.'
      )
    ) {
      setEvaluations(createDemoEvaluationData());
      setProgramInfo(DEFAULT_PROGRAM_INFO);
    }
  };

  const handleResetBlank = () => {
    if (
      window.confirm(
        '¿Está seguro de reiniciar la evaluación en blanco? Se restablecerán todas las notas y ponderaciones.'
      )
    ) {
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-emerald-600 selection:text-white">
      {/* Header */}
      <Header
        programInfo={programInfo}
        onUpdateProgramInfo={(updated) => setProgramInfo((prev) => ({ ...prev, ...updated }))}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLoadDemo={handleLoadDemo}
        onReset={handleResetBlank}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        overallScore={diagnostics.overallScore}
        statusLevel={diagnostics.statusLevel}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 lg:p-8">
        {/* TAB 1: FORMULARIO DE EVALUACION POR CARACTERISTICAS */}
        {activeTab === 'evaluator' && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Navigation */}
            <FactorNav
              activeFactorId={activeFactorId}
              activeCharacteristicId={activeCharacteristicId}
              onSelectCharacteristic={handleSelectCharacteristic}
              factorSummaries={diagnostics.factorSummaries}
            />

            {/* Active Characteristic Form */}
            <div className="flex-1 min-w-0">
              <CharacteristicForm
                factor={activeFactor}
                characteristic={activeCharacteristic}
                evaluation={
                  evaluations[activeCharacteristic.id] || {
                    characteristicId: activeCharacteristic.id,
                    factorId: activeFactor.id,
                    rating: 3.5,
                    weight: activeCharacteristic.defaultWeight,
                    qualitativeJustification: '',
                    actionPlan: '',
                    evidences: []
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

        {/* TAB 2: PANEL DE RESULTADOS Y RADAR */}
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

        {/* TAB 3: INFORME EJECUTIVO IMPRIMIBLE */}
        {activeTab === 'report' && (
          <PrintableReport
            programInfo={programInfo}
            diagnostics={diagnostics}
            evaluations={evaluations}
          />
        )}
      </main>

      {/* Modal for Export / Import JSON & CSV */}
      <ImportExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        programInfo={programInfo}
        evaluations={evaluations}
        onImportData={handleImportData}
      />

      {/* Institutional Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-4 px-6 text-center print:hidden mt-auto">
        <p className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            <strong>UNIPAZ - Instituto Universitario de la Paz</strong> • Sistema Interno de
            Aseguramiento de la Calidad (SIAC)
          </span>
          <span className="text-[11px] text-slate-500">
            Basado en el Acuerdo 01 de 2020 del CESU • Prototipo Local 100% Funcional
          </span>
        </p>
      </footer>
    </div>
  );
}
