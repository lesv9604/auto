import React, { useState } from 'react';
import { Link2, Trash2, ExternalLink, Info } from 'lucide-react';
import { CharacteristicEvaluation } from '../types';
import { CESU_ASPECTS, ESCALA_CNA, FUENTE_ASPECTOS } from '../data/cesuAspects';

interface Props {
  code: string;
  evaluation: CharacteristicEvaluation;
  onUpdate: (e: CharacteristicEvaluation) => void;
}

const AZUL = '#273475';
const esUrlValida = (u: string) => /^https?:\/\/\S+$/i.test(u.trim());

/** Aspectos por evaluar + apreciación del Comité con escala CNA (NC/CI/CA/CP). */
export const CnaAppraisal: React.FC<Props> = ({ code, evaluation, onUpdate }) => {
  const info = CESU_ASPECTS[code];
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  if (!info) return null;

  const adjuntos = evaluation.adjuntos ?? [];
  const addLink = () => {
    if (!esUrlValida(url)) return;
    onUpdate({
      ...evaluation,
      adjuntos: [...adjuntos, { id: `adj-${Date.now()}`, label: label.trim() || url.trim(), url: url.trim() }],
    });
    setLabel(''); setUrl(''); setOpen(false);
  };

  return (
    <section className="space-y-5 pt-2 border-t border-slate-200">
      {/* Aspectos por evaluar */}
      <div className="rounded-xl p-5 border-l-4" style={{ background: '#EEF0F8', borderColor: AZUL }}>
        <h3 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: AZUL }}>
          Aspectos por evaluar — Acuerdo CESU 01/2025
        </h3>
        <ol className="space-y-2 text-sm text-slate-700">
          {info.aspectos.map((a) => (
            <li key={a.n}><b className="text-slate-900">A{a.n}.</b> {a.texto}</li>
          ))}
        </ol>
        <p className="mt-3 text-[11px] text-slate-500 flex gap-1.5"><Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />{FUENTE_ASPECTOS}</p>
      </div>

      {/* Perspectiva */}
      <div className="rounded-xl p-5 bg-white border border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Perspectiva del programa</h3>
        <p className="text-base text-slate-900">{info.pregunta}</p>
      </div>

      {/* Calificación escala CNA */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Calificación del Comité — escala CNA
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ESCALA_CNA.map((n) => {
            const sel = evaluation.cnaLevel === n.code;
            return (
              <button key={n.code} type="button"
                onClick={() => onUpdate({ ...evaluation, cnaLevel: sel ? undefined : n.code })}
                aria-pressed={sel}
                className="text-left p-4 rounded-xl border-2 bg-white transition-colors hover:bg-slate-50"
                style={{ borderColor: sel ? n.color : '#E2E8F0', boxShadow: sel ? `inset 0 0 0 1px ${n.color}` : undefined }}>
                <span className="text-xs font-bold" style={{ color: n.color }}>{n.code}</span>
                <span className="block font-bold text-slate-900">{n.label}</span>
                <span className="block text-xs text-slate-500 mt-0.5">{n.desc}</span>
              </button>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Apreciación cualitativa del Comité basada en evidencias. No modifica la valoración calculada desde las encuestas.
        </p>
      </div>

      {/* Apreciaciones y hallazgos */}
      <div>
        <label className="text-sm font-bold text-slate-700 block mb-1.5">Apreciaciones y hallazgos</label>
        <textarea
          rows={6}
          value={evaluation.hallazgos ?? evaluation.qualitativeJustification ?? ''}
          onChange={(e) => onUpdate({ ...evaluation, hallazgos: e.target.value, qualitativeJustification: '' })}
          placeholder={'Registre el análisis y los hallazgos del proceso de autoevaluación:\n· Estado actual de la característica\n· Fortalezas identificadas con evidencia\n· Oportunidades de mejora detectadas\n· Acciones en curso o planificadas\n· Referentes comparativos consultados'}
          className="w-full text-sm p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#273475]"
        />
      </div>

      {/* Documentos adjuntos (enlaces) */}
      <div className="pt-3 border-t border-dashed border-slate-300">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Documentos adjuntos</h3>
        {adjuntos.length > 0 && (
          <ul className="mb-3 space-y-1.5">
            {adjuntos.map((d) => (
              <li key={d.id} className="flex items-center gap-2 text-sm">
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline" style={{ color: AZUL }}>
                  <ExternalLink className="w-3.5 h-3.5" />{d.label}
                </a>
                <button type="button" onClick={() => onUpdate({ ...evaluation, adjuntos: adjuntos.filter((x) => x.id !== d.id) })}
                  className="text-slate-400 hover:text-rose-600" aria-label="Eliminar enlace"><Trash2 className="w-3.5 h-3.5" /></button>
              </li>
            ))}
          </ul>
        )}
        {open ? (
          <div className="flex flex-col sm:flex-row gap-2">
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Nombre del documento"
              className="flex-1 text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://drive.google.com/…"
              className="flex-[2] text-sm px-3 py-2 border border-slate-300 rounded-lg" />
            <button type="button" onClick={addLink} disabled={!esUrlValida(url)}
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg disabled:opacity-50" style={{ background: AZUL }}>Agregar</button>
            <button type="button" onClick={() => setOpen(false)} className="px-3 py-2 text-sm text-slate-500">Cancelar</button>
          </div>
        ) : (
          <button type="button" onClick={() => setOpen(true)}
            className="px-4 py-2 text-sm font-bold rounded-lg border-2 flex items-center gap-2" style={{ borderColor: AZUL, color: AZUL }}>
            <Link2 className="w-4 h-4" /> Agregar enlace
          </button>
        )}
        <p className="text-[11px] text-slate-500 mt-2">
          Los documentos se vinculan por enlace (Drive institucional con permisos de la institución). La herramienta no almacena archivos.
        </p>
      </div>
    </section>
  );
};
