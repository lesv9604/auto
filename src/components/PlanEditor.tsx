import React from 'react';
import { Plus, Trash2, ClipboardCheck } from 'lucide-react';
import { CharacteristicEvaluation, PlanAccion } from '../types';
import { ESTADOS_PLAN, ESTADO_COLOR, estadoEfectivo, esPrioritaria, nuevaAccion, planesDe, plazoMeses } from '../utils/plan';

interface Props {
  evaluation: CharacteristicEvaluation;
  onUpdate: (e: CharacteristicEvaluation) => void;
}

const input = 'w-full px-2 py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:ring-1 focus:ring-emerald-600 focus:outline-none';

const Campo: React.FC<{ label: string; hint?: string; className?: string; children: React.ReactNode }> = ({ label, hint, className, children }) => (
  <label className={`block ${className ?? ''}`}>
    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">{label}</span>
    {children}
    {hint && <span className="block text-[10px] text-slate-400 mt-0.5">{hint}</span>}
  </label>
);

export const PlanEditor: React.FC<Props> = ({ evaluation, onUpdate }) => {
  const planes = planesDe(evaluation);
  const save = (next: PlanAccion[]) => onUpdate({ ...evaluation, planes: next, actionPlan: '' });
  const set = (id: string, patch: Partial<PlanAccion>) => save(planes.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  const prioritaria = esPrioritaria(evaluation);

  return (
    <section className="bg-slate-50 p-4 rounded-xl border border-slate-200 border-l-4 border-l-amber-500 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <ClipboardCheck className="w-4 h-4 text-amber-600" /> Plan de mejoramiento
        </h3>
        <button type="button" onClick={() => save([...planes, nuevaAccion()])}
          className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1">
          <Plus className="w-3.5 h-3.5" /> Agregar acción
        </button>
      </div>

      <p className="text-[11px] text-slate-600">
        <b>Ruta por brecha:</b> línea base → indicador → meta → responsable → plazo, y monitoree el cierre desde el SIAC.
      </p>

      {planes.length === 0 && (
        <p className={`text-[11px] p-2 rounded border ${prioritaria ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-500'}`}>
          {prioritaria
            ? 'Característica prioritaria (valoración < 4,0 o calificación NC/CI): se recomienda registrar al menos una acción de mejora.'
            : 'Sin acciones registradas. Si la característica se mantiene, puede registrar acciones de sostenimiento.'}
        </p>
      )}

      {planes.map((p, i) => {
        const plazo = plazoMeses(p.fechaInicio, p.fechaLimite);
        const estado = estadoEfectivo(p);
        return (
          <div key={p.id} className="rounded border border-slate-200 bg-white p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Acción {i + 1}</span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border" style={{ color: ESTADO_COLOR[estado], borderColor: ESTADO_COLOR[estado] }}>{estado}</span>
                <button type="button" onClick={() => save(planes.filter((x) => x.id !== p.id))}
                  className="text-slate-400 hover:text-rose-600" aria-label="Eliminar acción"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <Campo label="Causa raíz" className="col-span-2 md:col-span-4" hint="¿Por qué ocurre la situación identificada en los hallazgos?">
                <textarea rows={2} className={`${input} leading-relaxed`} value={p.causaRaiz} onChange={(e) => set(p.id, { causaRaiz: e.target.value })} />
              </Campo>
              <Campo label="Línea base — valor"><input className={input} value={p.lineaBaseValor} placeholder="Ej.: 3,2 / 5,0 · 45 %" onChange={(e) => set(p.id, { lineaBaseValor: e.target.value })} /></Campo>
              <Campo label="Línea base — fecha"><input type="date" className={input} value={p.lineaBaseFecha} onChange={(e) => set(p.id, { lineaBaseFecha: e.target.value })} /></Campo>
              <Campo label="Indicador de mejora"><input className={input} value={p.indicador} placeholder="Ej.: % de estudiantes que valoran favorablemente…" onChange={(e) => set(p.id, { indicador: e.target.value })} /></Campo>
              <Campo label="Meta"><input className={input} value={p.meta} placeholder="Ej.: ≥ 4,0 / 5,0 · 80 %" onChange={(e) => set(p.id, { meta: e.target.value })} /></Campo>
              <Campo label="Acción de mejora" className="col-span-2 md:col-span-4">
                <textarea rows={2} className={`${input} leading-relaxed`} value={p.accion} onChange={(e) => set(p.id, { accion: e.target.value })} />
              </Campo>
              <Campo label="Responsable" className="col-span-2 md:col-span-4" hint="Instancia o equipo responsable (no una persona).">
                <input className={input} value={p.responsable} onChange={(e) => set(p.id, { responsable: e.target.value })} />
              </Campo>
              <Campo label="Fecha de inicio"><input type="date" className={input} value={p.fechaInicio} onChange={(e) => set(p.id, { fechaInicio: e.target.value })} /></Campo>
              <Campo label="Fecha límite" hint={plazo !== null ? `Plazo: ${plazo} meses` : 'El plazo se calcula con las fechas.'}>
                <input type="date" className={input} value={p.fechaLimite} onChange={(e) => set(p.id, { fechaLimite: e.target.value })} />
              </Campo>
              <Campo label={`Avance: ${p.avance} %`}>
                <input type="range" min={0} max={100} step={5} value={p.avance} className="w-full accent-emerald-600"
                  onChange={(e) => set(p.id, { avance: Number(e.target.value) })} />
              </Campo>
              <Campo label="Estado" hint={estado === 'Vencida' ? 'La fecha límite ya pasó: en el informe aparece como Vencida.' : undefined}>
                <select className={input} value={p.estado} onChange={(e) => set(p.id, { estado: e.target.value as PlanAccion['estado'] })}>
                  {ESTADOS_PLAN.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Campo>
              <Campo label="Evidencia de cierre" className="col-span-2 md:col-span-4">
                <input className={input} value={p.evidenciaCierre} placeholder="Documento o enlace que demuestra el cumplimiento" onChange={(e) => set(p.id, { evidenciaCierre: e.target.value })} />
              </Campo>
              <Campo label="Observaciones" className="col-span-2 md:col-span-4">
                <textarea rows={2} className={`${input} leading-relaxed`} value={p.observaciones} onChange={(e) => set(p.id, { observaciones: e.target.value })} />
              </Campo>
            </div>
          </div>
        );
      })}
    </section>
  );
};
