import React, { useState } from 'react';
import { Link2, Trash2, ExternalLink, BookOpen, MessageSquareQuote, Award, NotebookPen, Paperclip } from 'lucide-react';
import { CharacteristicEvaluation } from '../types';
import { CESU_ASPECTS, ESCALA_CNA, FUENTE_ASPECTOS } from '../data/cesuAspects';

interface Props {
  code: string;
  evaluation: CharacteristicEvaluation;
  onUpdate: (e: CharacteristicEvaluation) => void;
}

const esUrlValida = (u: string) => /^https?:\/\/\S+$/i.test(u.trim());
const titulo = 'text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5';
const campo = 'w-full p-2 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none';

/** Aspectos por evaluar + apreciación del Comité (escala CNA), con el estilo de la herramienta. */
export const CnaAppraisal: React.FC<Props> = ({ code, evaluation, onUpdate }) => {
  const info = CESU_ASPECTS[code];
  const [label, setLabel] = useState('');
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  if (!info) return null;

  const adjuntos = evaluation.adjuntos ?? [];
  const sel = ESCALA_CNA.find((n) => n.code === evaluation.cnaLevel);
  const addLink = () => {
    if (!esUrlValida(url)) return;
    onUpdate({ ...evaluation, adjuntos: [...adjuntos, { id: `adj-${Date.now()}`, label: label.trim() || url.trim(), url: url.trim() }] });
    setLabel(''); setUrl(''); setOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Aspectos por evaluar + perspectiva */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-emerald-600 space-y-3">
        <h3 className={titulo}><BookOpen className="w-4 h-4 text-emerald-700" />Aspectos por evaluar</h3>
        <ol className="space-y-1.5 text-xs text-slate-700 leading-relaxed">
          {info.aspectos.map((a) => (
            <li key={a.n} className="flex gap-2">
              <span className="font-mono font-bold text-emerald-700 shrink-0">A{a.n}</span>
              <span>{a.texto}</span>
            </li>
          ))}
        </ol>
        <div className="pt-2 border-t border-slate-200 flex gap-2 text-xs text-slate-700">
          <MessageSquareQuote className="w-4 h-4 text-slate-400 shrink-0" />
          <span><b className="text-slate-800">Perspectiva del programa:</b> {info.pregunta}</span>
        </div>
        <p className="text-[10px] text-slate-400">{FUENTE_ASPECTOS}</p>
      </div>

      {/* Calificación del Comité (escala CNA) */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={titulo}><Award className="w-4 h-4 text-emerald-700" />Calificación del Comité (CNA)</span>
          <div className="flex gap-1" role="radiogroup" aria-label="Calificación escala CNA">
            {ESCALA_CNA.map((n) => {
              const on = evaluation.cnaLevel === n.code;
              return (
                <button key={n.code} type="button" role="radio" aria-checked={on} title={`${n.label}: ${n.desc}`}
                  onClick={() => onUpdate({ ...evaluation, cnaLevel: on ? undefined : n.code })}
                  className={`px-2.5 py-1 text-xs font-bold rounded transition-colors ${on ? 'text-white shadow' : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-100'}`}
                  style={on ? { background: n.color } : undefined}>
                  {n.code}
                </button>
              );
            })}
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          {sel ? <><b style={{ color: sel.color }}>{sel.label}.</b> {sel.desc}</> : 'NC No se cumple · CI Insuficiente · CA Aceptable · CP Plenamente. No modifica la valoración de las encuestas.'}
        </p>
      </div>

      {/* Apreciaciones y hallazgos */}
      <div>
        <label className={`${titulo} mb-1.5`}><NotebookPen className="w-4 h-4 text-purple-700" />Apreciaciones y hallazgos</label>
        <textarea rows={4}
          value={evaluation.hallazgos ?? evaluation.qualitativeJustification ?? ''}
          onChange={(e) => onUpdate({ ...evaluation, hallazgos: e.target.value, qualitativeJustification: '' })}
          placeholder="Estado actual, fortalezas con evidencia, oportunidades de mejora, acciones en curso y referentes consultados…"
          className={`${campo} p-3 leading-relaxed`} />
      </div>

      {/* Documentos soporte (enlaces) */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className={titulo}><Paperclip className="w-4 h-4 text-slate-600" />Documentos soporte</span>
          {!open && (
            <button type="button" onClick={() => setOpen(true)}
              className="px-2.5 py-1 text-xs font-semibold rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center gap-1">
              <Link2 className="w-3.5 h-3.5 text-emerald-700" /> Agregar enlace
            </button>
          )}
        </div>
        {adjuntos.length > 0 && (
          <ul className="space-y-1 mb-2">
            {adjuntos.map((d) => (
              <li key={d.id} className="flex items-center gap-2 text-xs bg-white border border-slate-200 rounded px-2 py-1.5">
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-0 flex items-center gap-1.5 text-emerald-800 hover:underline truncate">
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" /><span className="truncate">{d.label}</span>
                </a>
                <button type="button" onClick={() => onUpdate({ ...evaluation, adjuntos: adjuntos.filter((x) => x.id !== d.id) })}
                  className="text-slate-400 hover:text-rose-600" aria-label="Eliminar enlace"><Trash2 className="w-3.5 h-3.5" /></button>
              </li>
            ))}
          </ul>
        )}
        {open && (
          <div className="flex flex-col sm:flex-row gap-1.5">
            <input value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Nombre del documento" className={`${campo} sm:w-1/3`} />
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://drive.google.com/…" className={campo} />
            <button type="button" onClick={addLink} disabled={!esUrlValida(url)}
              className="px-3 py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50">Agregar</button>
            <button type="button" onClick={() => setOpen(false)} className="px-2 py-1.5 text-xs text-slate-500">Cancelar</button>
          </div>
        )}
        {adjuntos.length === 0 && !open && <p className="text-[11px] text-slate-400">Vincule documentos por enlace (Drive institucional). La herramienta no almacena archivos.</p>}
      </div>
    </div>
  );
};
