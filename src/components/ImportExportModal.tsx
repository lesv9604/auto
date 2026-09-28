import React, { useRef, useState } from 'react';
import { CharacteristicEvaluation, ProgramInfo } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { Download, Upload, FileSpreadsheet, FileCode, X, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  programInfo: ProgramInfo;
  evaluations: Record<number, CharacteristicEvaluation>;
  onImportData: (importedInfo: ProgramInfo, importedEvals: Record<number, CharacteristicEvaluation>) => void;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  programInfo,
  evaluations,
  onImportData
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  if (!isOpen) return null;

  // Export JSON
  const handleExportJSON = () => {
    const dataToExport = {
      programInfo,
      evaluations,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedProgram = programInfo.programName.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `Diagnostico_CESU01_${sanitizedProgram}_${programInfo.period}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export CSV
  const handleExportCSV = () => {
    let csvContent = 'Factor_Codigo,Factor_Nombre,Caracteristica_Codigo,Caracteristica_Titulo,Valoracion_0a5,Peso_en_Factor_pct,Aporte_al_Factor,Evidencias_Cumplidas,Evidencias_Totales,Justificacion_Cualitativa,Plan_de_Accion\n';

    CESU_FACTORS.forEach((factor) => {
      factor.characteristics.forEach((char) => {
        const ev = evaluations[char.id];
        if (ev) {
          const factorCode = `"${factor.code}"`;
          const factorName = `"${factor.name.replace(/"/g, '""')}"`;
          const charCode = `"${char.code}"`;
          const charTitle = `"${char.title.replace(/"/g, '""')}"`;
          const rating = ev.rating.toFixed(1);
          const weight = (100 / factor.characteristics.length).toFixed(1);
          const weightedScore = (ev.rating / factor.characteristics.length).toFixed(2);
          const totalEv = ev.evidences.length;
          const checkedEv = ev.evidences.filter((e) => e.checked).length;
          const justification = `"${(ev.qualitativeJustification || '').replace(/"/g, '""')}"`;
          const action = `"${(ev.actionPlan || '').replace(/"/g, '""')}"`;

          csvContent += `${factorCode},${factorName},${charCode},${charTitle},${rating},${weight},${weightedScore},${checkedEv},${totalEv},${justification},${action}\n`;
        }
      });
    });

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedProgram = programInfo.programName.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `Diagnostico_CESU01_${sanitizedProgram}_${programInfo.period}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Import JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.evaluations) {
          onImportData(parsed.programInfo || programInfo, parsed.evaluations);
          setImportStatus('Diagnóstico cargado exitosamente.');
          setIsError(false);
          setTimeout(() => {
            setImportStatus(null);
            onClose();
          }, 1200);
        } else {
          setImportStatus('El archivo no contiene el formato válido de evaluaciones CESU.');
          setIsError(true);
        }
      } catch (err) {
        setImportStatus('Error al leer el archivo JSON. Verifique la estructura.');
        setIsError(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-xl border-t-4 border-t-emerald-600 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
            <Download className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Exportar e Importar Diagnóstico
            </h2>
            <p className="text-xs text-slate-500">
              Guarde sus avances locales para no perder las pruebas ejecutadas en UNIPAZ.
            </p>
          </div>
        </div>

        {/* Status Toast */}
        {importStatus && (
          <div
            className={`p-3 rounded text-xs flex items-center gap-2 ${
              isError
                ? 'bg-rose-50 text-rose-800 border border-rose-300'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-300'
            }`}
          >
            {isError ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            {importStatus}
          </div>
        )}

        {/* Export Options */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Opciones de Exportación Rápida
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleExportCSV}
              className="p-3 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-lg text-left transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                <span className="text-[10px] bg-emerald-100 text-emerald-900 font-mono font-bold px-1.5 py-0.5 rounded">
                  .CSV
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Descargar CSV</div>
                <p className="text-[10px] text-slate-500">
                  Ideal para abrir en Excel o Google Sheets.
                </p>
              </div>
            </button>

            <button
              onClick={handleExportJSON}
              className="p-3 bg-slate-50 hover:bg-sky-50/60 border border-slate-200 hover:border-sky-300 rounded-lg text-left transition-colors cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <FileCode className="w-5 h-5 text-sky-700" />
                <span className="text-[10px] bg-sky-100 text-sky-900 font-mono font-bold px-1.5 py-0.5 rounded">
                  .JSON
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  Copia de Seguridad JSON
                </div>
                <p className="text-[10px] text-slate-500">
                  Respaldo completo reimportable.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Import Section */}
        <div className="pt-3 border-t border-slate-200">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Cargar Diagnóstico Guardado
          </h3>

          <input
            type="file"
            ref={fileInputRef}
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-4 border-2 border-dashed border-slate-300 hover:border-emerald-600 rounded-lg bg-slate-50 text-center transition-colors cursor-pointer group"
          >
            <Upload className="w-6 h-6 mx-auto text-slate-400 group-hover:text-emerald-700 mb-1" />
            <span className="text-xs font-bold text-slate-800 block">
              Haga clic para seleccionar archivo JSON (.json)
            </span>
            <span className="text-[10px] text-slate-500">
              Restaure las calificaciones y justificaciones previamente guardadas.
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
