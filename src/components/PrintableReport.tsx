import React from 'react';
import { CharacteristicEvaluation, ConsolidatedDiagnostics, ProgramInfo } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { getStatusBadgeInfo } from '../utils/calc';
import { GraduationCap, Printer, Calendar, User, FileText, CheckCircle } from 'lucide-react';

interface PrintableReportProps {
  programInfo: ProgramInfo;
  diagnostics: ConsolidatedDiagnostics;
  evaluations: Record<number, CharacteristicEvaluation>;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  programInfo,
  diagnostics,
  evaluations
}) => {
  const statusBadge = getStatusBadgeInfo(diagnostics.overallScore);

  return (
    <div className="bg-white text-slate-900 p-6 sm:p-10 rounded-xl border border-slate-200 shadow-sm space-y-8 max-w-5xl mx-auto print:border-none print:shadow-none print:p-0 print:max-w-none">
      {/* Print Trigger Button */}
      <div className="flex justify-between items-center pb-4 border-b border-slate-200 print:hidden">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Informe Ejecutativo de Diagnóstico Académico
          </h2>
          <p className="text-xs text-slate-500">
            Formato oficial para el Comité de Autoevaluación Curricular de UNIPAZ.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Printer className="w-4 h-4" />
          Imprimir / Guardar como PDF
        </button>
      </div>

      {/* Official Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">
              Instituto Universitario de la Paz (UNIPAZ)
            </h1>
            <p className="text-xs font-semibold text-slate-600">
              Sistema Interno de Aseguramiento de la Calidad (SIAC)
            </p>
            <p className="text-[10px] text-slate-500">
              Evaluación Diagnóstica según Modelo de Acreditación CESU (Acuerdo 01 de 2025)
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-block bg-slate-100 text-slate-800 text-xs font-mono font-bold px-3 py-1 rounded border border-slate-300">
            PERIODO: {programInfo.period}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Fecha de emisión: {programInfo.evaluationDate}
          </div>
        </div>
      </div>

      {/* Program Metadata Box */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Programa Académico
          </span>
          <span className="font-bold text-slate-900">{programInfo.programName}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Escuela / Facultad
          </span>
          <span className="font-semibold text-slate-800">{programInfo.faculty}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Evaluador / Comité
          </span>
          <span className="font-semibold text-slate-800">{programInfo.evaluatorName}</span>
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-500 block">
            Sede / Campus
          </span>
          <span className="font-semibold text-slate-800">{programInfo.campus}</span>
        </div>
      </div>

      {/* Score Summary Box */}
      <div className="p-5 bg-slate-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Resultado Global del Diagnóstico
          </span>
          <h3 className="text-2xl font-extrabold text-white mt-1">
            {diagnostics.overallScore.toFixed(2)} / 5.00 Puntos
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Nivel de cumplimiento: <strong>{diagnostics.statusLevel}</strong> (
            {diagnostics.overallCompliancePercentage}% de logro)
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-300 block">Aspectos Mínimos Cumplidos</span>
          <span className="text-xl font-bold text-emerald-400">
            {diagnostics.evidenceChecklistCompleted} / {diagnostics.evidenceChecklistTotal}
          </span>
        </div>
      </div>

      {/* Consolidated Table by Factor */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-200">
          1. Consolidado por Factores CESU 01
        </h3>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-800 uppercase text-[10px] font-bold border-b border-slate-300">
              <th className="p-2">Código</th>
              <th className="p-2">Factor</th>
              <th className="p-2 text-center">Característ.</th>
              <th className="p-2 text-right">Promedio</th>
              <th className="p-2 text-center">% Cumplimiento</th>
              <th className="p-2 text-center">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {diagnostics.factorSummaries.map((f) => (
              <tr key={f.factorId}>
                <td className="p-2 font-mono font-bold text-slate-900">{f.factorCode}</td>
                <td className="p-2 font-medium text-slate-900">{f.factorName}</td>
                <td className="p-2 text-center font-mono">{f.characteristicsCount}</td>
                <td className="p-2 text-right font-bold text-slate-900">{f.averageRating.toFixed(2)}</td>
                <td className="p-2 text-center">{f.compliancePercentage}%</td>
                <td className="p-2 text-center">
                  <span className="font-semibold text-slate-800">{f.statusLevel}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detailed Characteristics Breakdown */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 pb-1 border-b border-slate-200">
          2. Detalle Cualitativo y Justificaciones por Característica
        </h3>

        <div className="space-y-4">
          {CESU_FACTORS.map((factor) => (
            <div key={factor.id} className="space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide bg-emerald-50 p-2 rounded border border-emerald-200">
                {factor.code}: {factor.name}
              </h4>

              {factor.characteristics.map((char) => {
                const evalData = evaluations[char.id];
                if (!evalData) return null;

                return (
                  <div key={char.id} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs space-y-1.5">
                    <div className="flex items-start justify-between gap-2 font-bold text-slate-900">
                      <span>
                        {char.code} - {char.title}
                      </span>
                      <span className="font-mono text-emerald-700 shrink-0">
                        Valoración: {evalData.rating.toFixed(1)} / 5.0 (Peso: {evalData.weight})
                      </span>
                    </div>

                    {evalData.qualitativeJustification && (
                      <p className="text-slate-700 italic leading-relaxed">
                        <strong>Justificación:</strong> {evalData.qualitativeJustification}
                      </p>
                    )}

                    {evalData.actionPlan && (
                      <p className="text-slate-700 leading-relaxed">
                        <strong>Plan de Acción:</strong> {evalData.actionPlan}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Signature Section */}
      <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-12 text-center text-xs">
        <div>
          <div className="h-12 border-b border-slate-400 mb-2"></div>
          <span className="font-bold text-slate-900 block">{programInfo.evaluatorName}</span>
          <span className="text-slate-500 block">{programInfo.evaluatorRole}</span>
          <span className="text-[10px] text-slate-400">UNIPAZ</span>
        </div>

        <div>
          <div className="h-12 border-b border-slate-400 mb-2"></div>
          <span className="font-bold text-slate-900 block">Dirección de Calidad Institucional</span>
          <span className="text-slate-500 block">Comité SIAC UNIPAZ</span>
          <span className="text-[10px] text-slate-400">Barrancabermeja, Santander</span>
        </div>
      </div>
    </div>
  );
};
