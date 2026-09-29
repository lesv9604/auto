import React, { useMemo, useRef, useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ProgramInfo } from '../types';
import { SurveyPayload, parseResultsCsv, MIN_RESPUESTAS } from '../utils/surveys';
import {
  ParsedWorkbook, RawSheet, parseWorkbook, programOptions, dateBounds, aggregateWorkbook,
} from '../utils/workbook';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  programInfo: ProgramInfo;
  onApply: (payload: SurveyPayload) => void;
}

const UMBRAL_SIMILITUD = 0.8;
type ActorData = SurveyPayload['actores'][string];
const actoresDe = (p: SurveyPayload) => Object.entries(p.actores) as [string, ActorData][];

export const SurveyImportModal: React.FC<Props> = ({ isOpen, onClose, programInfo, onApply }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [wb, setWb] = useState<ParsedWorkbook | null>(null);
  const [fileName, setFileName] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const options = useMemo(() => (wb ? programOptions(wb, programInfo.programName) : []), [wb, programInfo.programName]);
  const preview = useMemo(
    () => (wb && desde && hasta && selected.size
      ? aggregateWorkbook(wb, selected, desde, hasta, programInfo.faculty, programInfo.programName)
      : null),
    [wb, selected, desde, hasta, programInfo]
  );

  if (!isOpen) return null;

  const reset = () => { setWb(null); setFileName(''); setSelected(new Set()); setError(null); };
  const close = () => { reset(); onClose(); };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setError(null); setLoading(true);
    try {
      if (/\.csv$/i.test(file.name)) {
        // Plantilla de conteos agregados (diligenciada a mano)
        onApply(parseResultsCsv(await file.text(), programInfo.faculty, programInfo.programName));
        close();
        return;
      }
      const { default: readXlsxFile } = await import('read-excel-file/browser');
      const parsed = parseWorkbook((await readXlsxFile(file)) as RawSheet[]);
      if (!Object.keys(parsed.actores).length) throw new Error('El archivo no tiene pestañas de actores reconocibles.');
      const opts = programOptions(parsed, programInfo.programName);
      const b = dateBounds(parsed);
      setWb(parsed);
      setFileName(file.name);
      setSelected(new Set(opts.filter((o) => o.similitud >= UMBRAL_SIMILITUD).map((o) => o.key)));
      setDesde(b?.min ?? ''); setHasta(b?.max ?? '');
    } catch (err) {
      setError((err as Error).message || 'No se pudo leer el archivo.');
    } finally {
      setLoading(false);
    }
  };

  const toggle = (key: string) =>
    setSelected((prev) => { const n = new Set(prev); n.has(key) ? n.delete(key) : n.add(key); return n; });

  const total = preview ? actoresDe(preview).reduce((s, [, a]) => s + a.n, 0) : 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl border-t-4 border-t-emerald-600 space-y-5 relative">
        <button onClick={close} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Cargar resultados de encuestas</h2>
          <p className="text-xs text-slate-500">
            {programInfo.programName} · {programInfo.faculty}. El archivo se procesa en este navegador; solo se guardan conteos agregados.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded text-xs flex items-center gap-2 bg-rose-50 text-rose-800 border border-rose-300">
            <AlertTriangle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        <input ref={inputRef} type="file" accept=".xlsx,.csv" onChange={handleFile} className="hidden" />
        {!wb ? (
          <button onClick={() => inputRef.current?.click()} disabled={loading}
            className="w-full p-6 border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-lg bg-slate-50 text-center group">
            <Upload className="w-7 h-7 mx-auto text-slate-400 group-hover:text-emerald-700 mb-2" />
            <span className="text-sm font-bold text-slate-800 block">{loading ? 'Leyendo…' : 'Seleccionar archivo'}</span>
            <span className="text-[11px] text-slate-500 block mt-1">
              <b>.xlsx</b>: libro de respuestas descargado de Google Sheets (Archivo → Descargar → Microsoft Excel).<br />
              <b>.csv</b>: plantilla de conteos diligenciada.
            </span>
          </button>
        ) : (
          <>
            <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5">
              <span className="flex items-center gap-2 text-slate-700"><FileSpreadsheet className="w-4 h-4 text-emerald-700" />{fileName}</span>
              <button onClick={reset} className="text-emerald-700 font-semibold hover:underline">Cambiar archivo</button>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">1. Respuestas del programa</h3>
              <p className="text-[11px] text-slate-500 mb-2">
                Marque los valores de Escuela/Programa que corresponden a este programa (pueden venir escritos de formas distintas).
              </p>
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100 max-h-56 overflow-y-auto">
                {options.map((o) => (
                  <label key={o.key} className="flex items-center gap-3 px-3 py-2 text-xs cursor-pointer hover:bg-slate-50">
                    <input type="checkbox" checked={selected.has(o.key)} onChange={() => toggle(o.key)} />
                    <span className="flex-1">
                      <span className="font-semibold text-slate-800">{o.programa || '(vacío)'}</span>
                      <span className="text-slate-400"> · {o.escuela || '(sin escuela)'}</span>
                    </span>
                    <span className="text-slate-500">{o.respuestas} resp.</span>
                    {o.similitud >= UMBRAL_SIMILITUD && <span className="text-[10px] text-emerald-700 font-bold">coincide</span>}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">2. Periodo del ciclo</h3>
              <p className="text-[11px] text-slate-500 mb-2">Solo se cuentan respuestas enviadas en este rango (Marca temporal).</p>
              <div className="flex gap-3">
                <label className="flex-1 text-xs">Desde<input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} className="mt-1 w-full border border-slate-300 rounded px-2 py-1.5" /></label>
                <label className="flex-1 text-xs">Hasta<input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} className="mt-1 w-full border border-slate-300 rounded px-2 py-1.5" /></label>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">3. Vista previa</h3>
              {preview && total > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {actoresDe(preview).map(([actor, a]) => (
                    <div key={actor} className={`p-2 rounded border text-xs ${a.n < MIN_RESPUESTAS ? 'border-amber-300 bg-amber-50' : 'border-slate-200'}`}>
                      <div className="font-semibold text-slate-800">{actor}</div>
                      <div className="text-slate-500">{a.n} encuestados · {Object.keys(a.items).length} caract.</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No hay respuestas con la selección actual.</p>
              )}
              {preview?.advertencias.map((w, i) => (
                <p key={i} className="text-[11px] text-amber-700 mt-1">⚠ {w}</p>
              ))}
            </div>

            <button disabled={!preview || total === 0}
              onClick={() => { onApply(preview!); close(); }}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm font-semibold rounded-lg flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Aplicar resultados ({total} encuestados)
            </button>
          </>
        )}
      </div>
    </div>
  );
};
