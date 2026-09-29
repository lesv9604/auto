import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, ListTodo } from 'lucide-react';
import { CharacteristicEvaluation } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { ESTADO_EVAL_STYLE, resumenEstados, statusDe } from '../utils/status';

type Nav = (factorId: number, charId: number) => void;

const Leyenda = () => (
  <div className="flex flex-wrap gap-3 text-[11px] text-slate-600">
    {(['Evaluada', 'En progreso', 'Pendiente'] as const).map((e) => (
      <span key={e} className="flex items-center gap-1"><span className={`w-2.5 h-2.5 rounded-full ${ESTADO_EVAL_STYLE[e].dot}`} />{e}</span>
    ))}
    <span className="text-slate-400">· Evaluada = valoración + calificación CNA + hallazgos</span>
  </div>
);

/** Panel de resultados: mapa de las 51 características con su estado de evaluación. */
export const EvaluationStatusGrid: React.FC<{ evaluations: Record<number, CharacteristicEvaluation>; onSelect: Nav }> = ({ evaluations, onSelect }) => {
  const r = resumenEstados(evaluations);
  const pct = Math.round((r.evaluadas / r.total) * 100);
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <ListTodo className="w-4 h-4 text-emerald-700" /> Estado de evaluación por característica
          </h3>
          <p className="text-[11px] text-slate-500">Haga clic en una característica para ir a su formulario.</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span><b className="text-emerald-700">{r.evaluadas}</b> evaluadas</span>
          <span><b className="text-amber-600">{r.enProgreso}</b> en progreso</span>
          <span><b className="text-slate-500">{r.pendientes}</b> pendientes</span>
          <span className="font-bold text-slate-800">{pct}%</span>
        </div>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
        <div className="bg-emerald-500" style={{ width: `${(r.evaluadas / r.total) * 100}%` }} />
        <div className="bg-amber-400" style={{ width: `${(r.enProgreso / r.total) * 100}%` }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {CESU_FACTORS.map((f) => {
          const done = f.characteristics.filter((c) => statusDe(evaluations[c.id]).estado === 'Evaluada').length;
          return (
            <div key={f.id} className="border border-slate-200 rounded-lg p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-800 truncate"><span className="font-mono text-emerald-700">{f.code}</span> {f.name}</span>
                <span className="text-[10px] font-bold text-slate-500 shrink-0 ml-2">{done}/{f.characteristics.length}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {f.characteristics.map((c) => {
                  const st = statusDe(evaluations[c.id]);
                  return (
                    <button key={c.id} type="button" onClick={() => onSelect(f.id, c.id)}
                      title={`${c.code} ${c.title}\n${st.estado}${st.faltantes.length ? ` — falta: ${st.faltantes.join(', ')}` : ''}`}
                      className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded border hover:ring-1 hover:ring-emerald-500 ${ESTADO_EVAL_STYLE[st.estado].chip}`}>
                      {c.code}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Leyenda />
    </div>
  );
};

/** Recordatorio en el formulario: qué falta en la característica actual y cuáles quedan pendientes. */
export const EvaluationReminder: React.FC<{
  evaluations: Record<number, CharacteristicEvaluation>; currentId: number; onSelect: Nav;
}> = ({ evaluations, currentId, onSelect }) => {
  const [open, setOpen] = useState(false);
  const r = resumenEstados(evaluations);
  const faltan = r.items.filter((i) => i.st.estado !== 'Evaluada');
  const actual = statusDe(evaluations[currentId]);
  const idx = r.items.findIndex((i) => i.char.id === currentId);
  const siguiente = [...r.items.slice(idx + 1), ...r.items.slice(0, idx)].find((i) => i.st.estado !== 'Evaluada');

  if (!faltan.length) {
    return (
      <div className="mb-4 p-3 rounded-xl border border-emerald-300 bg-emerald-50 text-xs text-emerald-800 flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4" /> Las {r.total} características están evaluadas. Puede generar el informe.
      </div>
    );
  }
  return (
    <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 text-xs">
      <div className="p-3 flex flex-col md:flex-row md:items-center gap-2 justify-between">
        <div className="flex items-start gap-2 text-amber-900">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <b>{faltan.length} de {r.total} características sin completar</b> ({r.evaluadas} evaluadas · {r.enProgreso} en progreso · {r.pendientes} pendientes).
            {actual.faltantes.length > 0 && (
              <span className="block text-amber-800">En esta característica falta: {actual.faltantes.join(', ')}.</span>
            )}
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button type="button" onClick={() => setOpen((o) => !o)}
            className="px-2.5 py-1 rounded bg-white border border-amber-300 text-amber-800 font-semibold flex items-center gap-1 hover:bg-amber-100">
            Ver pendientes {open ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          {siguiente && (
            <button type="button" onClick={() => onSelect(siguiente.factor.id, siguiente.char.id)}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center gap-1">
              Siguiente pendiente ({siguiente.char.code}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      {open && (
        <div className="px-3 pb-3 flex flex-wrap gap-1 border-t border-amber-200 pt-2">
          {faltan.map((i) => (
            <button key={i.char.id} type="button" onClick={() => onSelect(i.factor.id, i.char.id)}
              title={`${i.char.title} — falta: ${i.st.faltantes.join(', ')}`}
              className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded border ${ESTADO_EVAL_STYLE[i.st.estado].chip} ${i.char.id === currentId ? 'ring-2 ring-emerald-500' : ''}`}>
              {i.char.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
