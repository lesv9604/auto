import React, { useState } from 'react';
import { CharacteristicDef, CharacteristicEvaluation, FactorDef } from '../types';
import { getStatusBadgeInfo } from '../utils/calc';
import {
  CheckSquare,
  Square,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Award,
  Scale,
  FileText,
  Lightbulb,
  CheckCircle2,
  ListChecks,
  HelpCircle
} from 'lucide-react';

interface CharacteristicFormProps {
  factor: FactorDef;
  characteristic: CharacteristicDef;
  evaluation: CharacteristicEvaluation;
  onUpdateEvaluation: (updated: CharacteristicEvaluation) => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCharacteristics: number;
}

export const CharacteristicForm: React.FC<CharacteristicFormProps> = ({
  factor,
  characteristic,
  evaluation,
  onUpdateEvaluation,
  onPrevious,
  onNext,
  currentIndex,
  totalCharacteristics
}) => {
  const [newEvidenceText, setNewEvidenceText] = useState('');

  const statusBadge = getStatusBadgeInfo(evaluation.rating);
  const weightedScore = (evaluation.rating * evaluation.weight).toFixed(1);
  const maxPossibleScore = (5.0 * evaluation.weight).toFixed(1);

  // Evidence stats
  const totalEvidences = evaluation.evidences.length;
  const checkedEvidences = evaluation.evidences.filter((e) => e.checked).length;
  const evidencePercentage = totalEvidences > 0 ? Math.round((checkedEvidences / totalEvidences) * 100) : 0;

  const handleRatingChange = (val: number) => {
    onUpdateEvaluation({
      ...evaluation,
      rating: Number(val.toFixed(1))
    });
  };

  const handleWeightChange = (val: number) => {
    onUpdateEvaluation({
      ...evaluation,
      weight: val
    });
  };

  const handleToggleEvidence = (id: string) => {
    const updatedEvidences = evaluation.evidences.map((e) =>
      e.id === id ? { ...e, checked: !e.checked } : e
    );
    onUpdateEvaluation({
      ...evaluation,
      evidences: updatedEvidences
    });
  };

  const handleAddCustomEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidenceText.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      label: newEvidenceText.trim(),
      checked: true
    };

    onUpdateEvaluation({
      ...evaluation,
      evidences: [...evaluation.evidences, newItem]
    });
    setNewEvidenceText('');
  };

  const handleDeleteEvidence = (id: string) => {
    onUpdateEvaluation({
      ...evaluation,
      evidences: evaluation.evidences.filter((e) => e.id !== id)
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
      {/* Characteristic Header Banner */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white border-b border-slate-800 border-l-4 border-l-emerald-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded border border-emerald-800">
              {factor.code} - {factor.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {characteristic.code}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-xs text-slate-400">
            <span>
              Característica <strong className="text-white">{currentIndex + 1}</strong> de{' '}
              <strong className="text-white">{totalCharacteristics}</strong>
            </span>
          </div>
        </div>

        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
          {characteristic.title}
        </h2>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-800/80 p-3 rounded border border-slate-700">
          {characteristic.description}
        </p>
      </div>

      {/* Main Evaluation Inputs */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* Rating & Weight Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Rating Control (1.0 to 5.0) */}
          <div className="md:col-span-6 bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                Valoración del Cumplimiento (1.0 - 5.0)
              </label>

              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded border ${statusBadge.color}`}
              >
                {statusBadge.label}
              </span>
            </div>

            {/* Rating Value Display */}
            <div className="flex items-baseline space-x-2 my-3">
              <span className="text-3xl font-extrabold text-slate-900">
                {evaluation.rating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500">/ 5.0 puntos</span>
            </div>

            {/* Range Slider */}
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.1"
              value={evaluation.rating}
              onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-emerald-600 mb-3"
            />

            {/* Quick Rating Selector Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[1.0, 2.0, 3.0, 3.5, 4.0, 4.5, 5.0].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => handleRatingChange(score)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    evaluation.rating === score
                      ? 'bg-emerald-700 text-white shadow-2xs font-bold'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {score.toFixed(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Weight Control & Calculation */}
          <div className="md:col-span-6 bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-sky-600 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-sky-700" />
                  Ponderación Asignada (1 - 10)
                </label>

                <button
                  type="button"
                  onClick={() => handleWeightChange(characteristic.defaultWeight)}
                  className="text-[10px] font-semibold text-slate-500 hover:text-emerald-700 underline cursor-pointer"
                >
                  Restablecer ({characteristic.defaultWeight})
                </button>
              </div>

              <div className="flex items-baseline space-x-2 my-2">
                <span className="text-2xl font-bold text-slate-900">
                  {evaluation.weight}
                </span>
                <span className="text-xs text-slate-500">peso relativo</span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={evaluation.weight}
                onChange={(e) => handleWeightChange(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded appearance-none cursor-pointer accent-sky-600"
              />
            </div>

            {/* Real-time Calculation Card */}
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                  Cumplimiento Ponderado
                </span>
                <span className="text-xs text-slate-600">
                  (Valoración {evaluation.rating.toFixed(1)} × Peso {evaluation.weight})
                </span>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-emerald-700">
                  {weightedScore}
                </span>
                <span className="text-[10px] text-slate-500 block font-medium">máx. {maxPossibleScore}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Qualitative Justification & Action Plan */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-700" />
              Justificación Cualitativa y Estado Actual en UNIPAZ
            </label>
            <textarea
              rows={3}
              value={evaluation.qualitativeJustification}
              onChange={(e) =>
                onUpdateEvaluation({ ...evaluation, qualitativeJustification: e.target.value })
              }
              placeholder="Describa los hallazgos, fortalezas, evidencias documentales y estado actual del cumplimiento de esta característica en el programa de UNIPAZ..."
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Oportunidades de Mejora / Plan de Acción Recomendado
            </label>
            <textarea
              rows={2}
              value={evaluation.actionPlan}
              onChange={(e) => onUpdateEvaluation({ ...evaluation, actionPlan: e.target.value })}
              placeholder="Acciones concretas propuestas para mantener o elevar la calificación de esta característica..."
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-amber-600 focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Evidence Checklist Section */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-emerald-700" />
                Checklist de Evidencias y Aspectos Mínimos a Cumplir
              </h3>
              <p className="text-[11px] text-slate-500">
                Verifique los aspectos documentales e indicadores mínimos que respaldan el diagnóstico.
              </p>
            </div>

            {/* Evidence Progress */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-800">
                {checkedEvidences} / {totalEvidences} ({evidencePercentage}%)
              </span>
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${evidencePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Evidence List */}
          <div className="space-y-2 mb-3">
            {evaluation.evidences.map((ev) => (
              <div
                key={ev.id}
                className={`p-2.5 rounded border transition-colors flex items-start justify-between gap-3 ${
                  ev.checked
                    ? 'bg-emerald-50/60 border-emerald-300 text-slate-900'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <label className="flex items-start space-x-2.5 cursor-pointer text-xs flex-1 leading-relaxed">
                  <input
                    type="checkbox"
                    checked={ev.checked}
                    onChange={() => handleToggleEvidence(ev.id)}
                    className="mt-0.5 w-4 h-4 rounded text-emerald-700 focus:ring-emerald-600 accent-emerald-700 cursor-pointer"
                  />
                  <span className={ev.checked ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                    {ev.label}
                  </span>
                </label>

                {ev.id.startsWith('custom-') && (
                  <button
                    onClick={() => handleDeleteEvidence(ev.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    title="Eliminar evidencia personalizada"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Custom Evidence Form */}
          <form onSubmit={handleAddCustomEvidence} className="flex gap-2">
            <input
              type="text"
              value={newEvidenceText}
              onChange={(e) => setNewEvidenceText(e.target.value)}
              placeholder="Agregar otra evidencia o documento soporte específico de UNIPAZ..."
              className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Agregar
            </button>
          </form>
        </div>
      </div>

      {/* Footer Navigation Bar */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer ${
            currentIndex === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-2xs'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior Característica
        </button>

        <span className="text-xs text-slate-600 font-bold">
          {currentIndex + 1} / {totalCharacteristics}
        </span>

        <button
          onClick={onNext}
          disabled={currentIndex === totalCharacteristics - 1}
          className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer ${
            currentIndex === totalCharacteristics - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
          }`}
        >
          Siguiente Característica
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
