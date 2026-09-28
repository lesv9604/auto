import React, { useState } from 'react';
import { CharacteristicDef, CharacteristicEvaluation, FactorDef } from '../types';
import { getStatusBadgeInfo, getAutoWeightLabel } from '../utils/calc';
import {
  CheckSquare, Square, Plus, Trash2, ArrowLeft, ArrowRight,
  Award, Scale, FileText, Lightbulb, ListChecks, Link, ExternalLink, X
} from 'lucide-react';

// Habilita la valoración manual solo en entornos de prueba (Preview/local).
const VALORACION_MANUAL = import.meta.env.VITE_VALORACION_MANUAL === 'true';

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
  factor, characteristic, evaluation, onUpdateEvaluation,
  onPrevious, onNext, currentIndex, totalCharacteristics
}) => {
  const [newEvidenceText, setNewEvidenceText] = useState('');
  const [newEvidenceUrl, setNewEvidenceUrl]   = useState('');
  const [urlInputOpen, setUrlInputOpen]       = useState<string | null>(null);
  const [urlDraft, setUrlDraft]               = useState('');

  const statusBadge  = getStatusBadgeInfo(evaluation.rating);
  const autoWeight   = getAutoWeightLabel(factor.characteristics.length);
  const totalEvidences   = evaluation.evidences.length;
  const checkedEvidences = evaluation.evidences.filter((e) => e.checked).length;
  const evidencePercentage = totalEvidences > 0
    ? Math.round((checkedEvidences / totalEvidences) * 100) : 0;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleRatingChange = (val: number) => {
    const clamped = Math.min(5.0, Math.max(0, Number(val.toFixed(1))));
    onUpdateEvaluation({ ...evaluation, rating: clamped });
  };


  const handleToggleEvidence = (id: string) => {
    onUpdateEvaluation({
      ...evaluation,
      evidences: evaluation.evidences.map((e) =>
        e.id === id ? { ...e, checked: !e.checked } : e
      ),
    });
  };

  const handleSaveUrl = (id: string) => {
    onUpdateEvaluation({
      ...evaluation,
      evidences: evaluation.evidences.map((e) =>
        e.id === id ? { ...e, url: urlDraft.trim() || undefined } : e
      ),
    });
    setUrlInputOpen(null);
    setUrlDraft('');
  };

  const handleOpenUrlInput = (id: string, current?: string) => {
    setUrlDraft(current ?? '');
    setUrlInputOpen(id);
  };

  const handleDeleteEvidence = (id: string) => {
    onUpdateEvaluation({
      ...evaluation,
      evidences: evaluation.evidences.filter((e) => e.id !== id),
    });
  };

  const handleAddCustomEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvidenceText.trim()) return;
    onUpdateEvaluation({
      ...evaluation,
      evidences: [
        ...evaluation.evidences,
        {
          id: `custom-${Date.now()}`,
          label: newEvidenceText.trim(),
          checked: true,
          url: newEvidenceUrl.trim() || undefined,
        },
      ],
    });
    setNewEvidenceText('');
    setNewEvidenceUrl('');
  };

  // ── Quick-select values ────────────────────────────────────────────────────
  const quickValues = [0, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">

      {/* ── Encabezado ─────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 bg-slate-900 text-white border-b border-slate-800 border-l-4 border-l-emerald-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded border border-emerald-800">
              {factor.code} — {factor.name}
            </span>
            <span className="text-xs text-slate-400 font-mono">{characteristic.code}</span>
          </div>
          <span className="text-xs text-slate-400">
            Característica <strong className="text-white">{currentIndex + 1}</strong> de{' '}
            <strong className="text-white">{totalCharacteristics}</strong>
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1">
          {characteristic.title}
        </h2>
        <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-800/80 p-3 rounded border border-slate-700">
          {characteristic.description}
        </p>
      </div>

      {/* ── Cuerpo ─────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 space-y-6">

        {/* Grid: Valoración + Ponderación */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Valoración del cumplimiento */}
          <div className="md:col-span-7 bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-emerald-600">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-700" />
                Valoración del cumplimiento (0.0 – 5.0)
              </label>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded border ${statusBadge.color}`}>
                {statusBadge.label}
              </span>
            </div>

            {/* Valoración: solo lectura (se calcula desde las encuestas) */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-4xl font-extrabold text-slate-900">
                {evaluation.rating > 0 ? evaluation.rating.toFixed(2) : '—'}
              </span>
              <span className="text-sm text-slate-500">/ 5.0 puntos</span>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Calculado a partir de las encuestas. No editable.
            </p>

            {/* Modo prueba: solo si VITE_VALORACION_MANUAL=true */}
            {VALORACION_MANUAL && (
              <div className="mt-3 pt-3 border-t border-dashed border-amber-300">
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1.5">
                  Modo prueba · valoración manual
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickValues.map((score) => (
                    <button
                      key={score}
                      type="button"
                      onClick={() => handleRatingChange(score)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded border transition-colors ${
                        evaluation.rating === score
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {score === 0 ? 'Sin eval.' : score.toFixed(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Ponderación automática */}
          <div className="md:col-span-5 bg-sky-50 p-4 rounded-xl border border-sky-200 border-l-4 border-l-sky-600 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Scale className="w-4 h-4 text-sky-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Ponderación automática
                </span>
              </div>
              <p className="text-3xl font-extrabold text-sky-700">{autoWeight}</p>
              <p className="text-xs text-slate-500 mt-1">
                del factor · calculado sobre {factor.characteristics.length}{' '}
                característica{factor.characteristics.length !== 1 ? 's' : ''}
              </p>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                Cada característica del factor tiene igual peso.
              </p>
            </div>

            {/* Puntaje ponderado */}
            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider block">
                  Aporte al factor
                </span>
                <span className="text-[10px] text-slate-500">
                  {evaluation.rating.toFixed(1)} × {autoWeight}
                </span>
              </div>
              <span className="text-lg font-extrabold text-emerald-700">
                {evaluation.rating === 0
                  ? '—'
                  : ((evaluation.rating / factor.characteristics.length)).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Justificación y plan de acción */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-purple-700" />
              Justificación cualitativa y estado actual
            </label>
            <textarea
              rows={3}
              value={evaluation.qualitativeJustification}
              onChange={(e) => onUpdateEvaluation({ ...evaluation, qualitativeJustification: e.target.value })}
              placeholder="Describa hallazgos, fortalezas, evidencias documentales y estado actual del cumplimiento..."
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-1.5 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              Oportunidades de mejora / Plan de acción
            </label>
            <textarea
              rows={2}
              value={evaluation.actionPlan}
              onChange={(e) => onUpdateEvaluation({ ...evaluation, actionPlan: e.target.value })}
              placeholder="Acciones concretas para mantener o elevar la calificación..."
              className="w-full p-3 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-amber-600 focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Checklist de evidencias */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <ListChecks className="w-4 h-4 text-emerald-700" />
                Checklist de evidencias y aspectos mínimos
              </h3>
              <p className="text-[11px] text-slate-500">
                Marque los aspectos verificados y anexe la URL del documento de soporte.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-800">
                {checkedEvidences}/{totalEvidences} ({evidencePercentage}%)
              </span>
              <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${evidencePercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Lista de evidencias */}
          <div className="space-y-2 mb-3">
            {evaluation.evidences.map((ev) => (
              <div
                key={ev.id}
                className={`rounded border transition-colors ${
                  ev.checked
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-white border-slate-200'
                }`}
              >
                {/* Fila principal: checkbox + label + botones */}
                <div className="flex items-start justify-between gap-2 p-2.5">
                  <label className="flex items-start space-x-2.5 cursor-pointer text-xs flex-1 leading-relaxed">
                    <input
                      type="checkbox"
                      checked={ev.checked}
                      onChange={() => handleToggleEvidence(ev.id)}
                      className="mt-0.5 w-4 h-4 rounded text-emerald-700 accent-emerald-700 cursor-pointer"
                    />
                    <span className={ev.checked ? 'font-semibold text-slate-900' : 'text-slate-600'}>
                      {ev.label}
                    </span>
                  </label>

                  <div className="flex items-center gap-1 shrink-0">
                    {/* Enlace si ya tiene URL */}
                    {ev.url && (
                      <a
                        href={ev.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Abrir documento"
                        className="text-sky-600 hover:text-sky-800 p-1"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    {/* Botón agregar/editar URL */}
                    <button
                      onClick={() => handleOpenUrlInput(ev.id, ev.url)}
                      title={ev.url ? 'Editar URL del documento' : 'Agregar URL del documento'}
                      className={`p-1 rounded transition-colors ${
                        ev.url
                          ? 'text-sky-600 hover:text-sky-800'
                          : 'text-slate-400 hover:text-sky-600'
                      }`}
                    >
                      <Link className="w-3.5 h-3.5" />
                    </button>

                    {/* Eliminar (solo custom) */}
                    {ev.id.startsWith('custom-') && (
                      <button
                        onClick={() => handleDeleteEvidence(ev.id)}
                        title="Eliminar evidencia"
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Input de URL (se abre al hacer clic en el ícono de link) */}
                {urlInputOpen === ev.id && (
                  <div className="px-3 pb-3 flex items-center gap-2 border-t border-slate-200 pt-2">
                    <input
                      type="url"
                      value={urlDraft}
                      onChange={(e) => setUrlDraft(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      autoFocus
                      className="flex-1 text-xs px-2 py-1.5 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                    <button
                      onClick={() => handleSaveUrl(ev.id)}
                      className="text-xs bg-sky-600 hover:bg-sky-700 text-white px-2.5 py-1.5 rounded font-medium"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => { setUrlInputOpen(null); setUrlDraft(''); }}
                      className="text-slate-400 hover:text-slate-600 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Agregar nueva evidencia */}
          <form onSubmit={handleAddCustomEvidence} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newEvidenceText}
                onChange={(e) => setNewEvidenceText(e.target.value)}
                placeholder="Descripción de la evidencia o documento soporte..."
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white rounded flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Agregar
              </button>
            </div>
            <input
              type="url"
              value={newEvidenceUrl}
              onChange={(e) => setNewEvidenceUrl(e.target.value)}
              placeholder="URL del documento (opcional) — https://..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-sky-500 focus:outline-none"
            />
          </form>
        </div>
      </div>

      {/* ── Navegación ─────────────────────────────────────────────────────── */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-colors ${
            currentIndex === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-sm'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </button>

        <span className="text-xs text-slate-500 font-medium">
          {currentIndex + 1} / {totalCharacteristics}
        </span>

        <button
          onClick={onNext}
          disabled={currentIndex === totalCharacteristics - 1}
          className={`px-4 py-2 text-xs font-semibold rounded flex items-center gap-2 transition-colors ${
            currentIndex === totalCharacteristics - 1
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
          }`}
        >
          Siguiente
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
