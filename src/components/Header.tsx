import React from 'react';
import { ProgramInfo, ActiveTab } from '../types';
import { UNIPAZ_PROGRAMS } from '../data/unipazPrograms';
import {
  GraduationCap,
  FileSpreadsheet,
  Download,
  Printer,
  RotateCcw,
  BarChart3,
  ClipboardList,
  Building2,
  Calendar,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  programInfo: ProgramInfo;
  onUpdateProgramInfo: (updated: Partial<ProgramInfo>) => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onReset: () => void;
  onOpenExportModal: () => void;
  overallScore: number;
  statusLevel: string;
}

export const Header: React.FC<HeaderProps> = ({
  programInfo,
  onUpdateProgramInfo,
  activeTab,
  onSelectTab,
  onReset,
  onOpenExportModal,
  overallScore,
  statusLevel
}) => {
  return (
    <header className="bg-white text-slate-900 border-b border-slate-200 shadow-xs sticky top-0 z-40 print:hidden">
      {/* Top Bar: Brand, Title, and Action Buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-emerald-700 text-white font-bold rounded-lg flex items-center justify-center text-lg shadow-sm shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold tracking-widest text-emerald-800 uppercase bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  UNIPAZ
                </span>
                <span className="text-[11px] text-slate-500 font-medium">
                  Instituto Universitario de la Paz
                </span>
              </div>
              <h1 className="text-sm font-bold text-slate-800 uppercase tracking-wider mt-0.5">
                Diagnóstico CESU 01 (2025) — Autoevaluación de Calidad
              </h1>
            </div>
          </div>

          {/* Quick Action Controls & Score Pill */}
          <div className="flex flex-wrap items-center gap-2">

            <button
              onClick={onOpenExportModal}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              Exportar / Importar
            </button>

            <button
              onClick={() => { onSelectTab('report'); setTimeout(() => window.print(), 300); }}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-sky-600" />
              Imprimir
            </button>

            <button
              onClick={onReset}
              className="px-2.5 py-1.5 text-xs font-semibold bg-white border border-slate-300 text-slate-500 hover:text-rose-700 hover:bg-rose-50 hover:border-rose-300 rounded transition-colors flex items-center gap-1 cursor-pointer"
              title="Reiniciar a valores en blanco"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Limpiar
            </button>

            {/* Overall Score Geometric Pill */}
            <div className="ml-1 pl-3 border-l border-slate-200 flex items-center space-x-2">
              <div className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg text-right">
                <div className="text-[9px] uppercase tracking-wider text-emerald-800 font-bold">
                  Puntaje Global
                </div>
                <div className="text-sm font-extrabold text-emerald-700 leading-none">
                  {overallScore.toFixed(2)}{' '}
                  <span className="text-[10px] text-slate-500 font-normal">/ 5.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Context Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Program Input */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-emerald-400" />
              Programa Académico
            </label>
            <input
              type="text"
              list="unipaz-programs-list"
              value={programInfo.programName}
              onChange={(e) => {
                const val = e.target.value;
                const found = UNIPAZ_PROGRAMS.find((p) => p.name.toLowerCase() === val.toLowerCase());
                if (found) {
                  onUpdateProgramInfo({
                    programName: found.name,
                    faculty: found.faculty,
                    campus: found.campus
                  });
                } else {
                  onUpdateProgramInfo({ programName: val });
                }
              }}
              placeholder="Escriba el nombre completo del programa"
              className="w-full bg-slate-800 text-white border border-slate-700 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
            <datalist id="unipaz-programs-list">
              {UNIPAZ_PROGRAMS.map((prog) => (
                <option key={prog.name} value={prog.name} />
              ))}
            </datalist>
          </div>

          {/* Faculty / Campus */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Building2 className="w-3 h-3 text-sky-400" />
              Escuela / Facultad
            </label>
            <input
              type="text"
              value={programInfo.faculty}
              onChange={(e) => onUpdateProgramInfo({ faculty: e.target.value })}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Evaluator Name */}
          <div>
            <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-amber-400" />
              Evaluador / Comité
            </label>
            <input
              type="text"
              value={programInfo.evaluatorName}
              onChange={(e) => onUpdateProgramInfo({ evaluatorName: e.target.value })}
              className="w-full bg-slate-800 text-white border border-slate-700 rounded px-2.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              placeholder="Escriba el nombre del evaluador o comité"
            />
          </div>

          {/* Period & Date */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" />
                Periodo
              </label>
              <input
                type="text"
                value={programInfo.period}
                onChange={(e) => onUpdateProgramInfo({ period: e.target.value })}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                Fecha
              </label>
              <input
                type="date"
                value={programInfo.evaluationDate}
                onChange={(e) => onUpdateProgramInfo({ evaluationDate: e.target.value })}
                className="w-full bg-slate-800 text-white border border-slate-700 rounded px-1.5 py-1 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-slate-50 border-t border-b border-slate-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex space-x-2 sm:space-x-4 overflow-x-auto">
          <button
            onClick={() => onSelectTab('evaluator')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'evaluator'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-emerald-600" />
            1. Formulario por Características
          </button>

          <button
            onClick={() => onSelectTab('dashboard')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-sky-600" />
            2. Panel de Resultados y Gráfico Radar
          </button>

          <button
            onClick={() => onSelectTab('report')}
            className={`py-2.5 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'report'
                ? 'border-emerald-600 text-emerald-800 font-bold bg-white shadow-2xs'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-600" />
            3. Informe Ejecutivo Imprimible / PDF
          </button>
        </div>
      </div>
    </header>
  );
};

