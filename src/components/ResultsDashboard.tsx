import React, { useState } from 'react';
import { ConsolidatedDiagnostics, FactorSummary, ProgramInfo } from '../types';
import { getStatusBadgeInfo } from '../utils/calc';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import {
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  BarChart2,
  PieChart,
  Sliders,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ResultsDashboardProps {
  diagnostics: ConsolidatedDiagnostics;
  programInfo: ProgramInfo;
  onSelectFactor: (factorId: number) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  diagnostics,
  programInfo,
  onSelectFactor
}) => {
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');

  const statusBadge = getStatusBadgeInfo(diagnostics.overallScore);

  // Prepare chart data for Recharts
  const chartData = diagnostics.factorSummaries.map((f) => ({
    factorCode: f.factorCode,
    factorName: f.factorName,
    fullName: `${f.factorCode}: ${f.factorName}`,
    score: f.averageRating,
    maxScore: 5.0,
    compliance: f.compliancePercentage
  }));

  const evidencePct =
    diagnostics.evidenceChecklistTotal > 0
      ? Math.round((diagnostics.evidenceChecklistCompleted / diagnostics.evidenceChecklistTotal) * 100)
      : 0;

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Score Consolidado */}
        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 border-l-4 border-l-emerald-500 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Puntuación Global CESU
            </span>
            <Award className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="my-3">
            <div className="text-3xl font-extrabold text-emerald-400">
              {diagnostics.overallScore.toFixed(2)}{' '}
              <span className="text-sm text-slate-400 font-normal">/ 5.0</span>
            </div>
            <div className="mt-1">
              <span className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded ${statusBadge.color}`}>
                {diagnostics.statusLevel} ({diagnostics.overallCompliancePercentage}%)
              </span>
            </div>
          </div>
          <p className="text-[10px] text-slate-400">
            Promedio ponderado de 12 factores y 51 características evaluadas.
          </p>
        </div>

        {/* Card 2: Fortaleza Principal */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-emerald-600 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Factor de Mayor Fortaleza
            </span>
            <TrendingUp className="w-5 h-5 text-emerald-700" />
          </div>
          <div className="my-2">
            {diagnostics.strongestFactor ? (
              <>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                  {diagnostics.strongestFactor.factorCode}: {diagnostics.strongestFactor.factorName}
                </div>
                <div className="text-2xl font-bold text-emerald-700 mt-1">
                  {diagnostics.strongestFactor.averageRating.toFixed(2)}{' '}
                  <span className="text-xs text-slate-500 font-normal">pts</span>
                </div>
              </>
            ) : (
              <span className="text-xs text-slate-400">Sin datos suficiente</span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">
            Factor con mayor desempeño en la autoevaluación.
          </span>
        </div>

        {/* Card 3: Factor Crítico / Oportunidad */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-amber-500 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Oportunidad Prioritaria
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-600" />
          </div>
          <div className="my-2">
            {diagnostics.weakestFactor ? (
              <>
                <div className="text-xs font-bold text-slate-900 line-clamp-1">
                  {diagnostics.weakestFactor.factorCode}: {diagnostics.weakestFactor.factorName}
                </div>
                <div className="text-2xl font-bold text-amber-600 mt-1">
                  {diagnostics.weakestFactor.averageRating.toFixed(2)}{' '}
                  <span className="text-xs text-slate-500 font-normal">pts</span>
                </div>
              </>
            ) : (
              <span className="text-xs text-slate-400">Sin datos</span>
            )}
          </div>
          <span className="text-[10px] text-slate-500">
            Requiere priorización en el Plan de Mejoramiento UNIPAZ.
          </span>
        </div>

        {/* Card 4: Cobertura de Evidencias */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-sky-600 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Evidencias Verificadas
            </span>
            <ListChecks className="w-5 h-5 text-sky-700" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold text-slate-900">
              {diagnostics.evidenceChecklistCompleted}{' '}
              <span className="text-xs text-slate-500 font-normal">
                / {diagnostics.evidenceChecklistTotal} ({evidencePct}%)
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-sky-600 transition-all duration-300"
                style={{ width: `${evidencePct}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500">
            Porcentaje de aspectos mínimos soportados en el checklist.
          </span>
        </div>
      </div>

      {/* Main Visualizer: Radar Spider Chart & Bar Chart */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
        <div className="p-5 bg-slate-50 border-b border-slate-200 border-l-4 border-l-emerald-600 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-700" />
              Diagrama Spider / Radar de Desempeño por Factores CESU 01
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualización gráfica del estado actual de los 12 factores frente a la meta plena de 5.0.
            </p>
          </div>

          <div className="flex items-center bg-white p-1 rounded border border-slate-300">
            <button
              onClick={() => setChartType('radar')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                chartType === 'radar'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              Gráfico Radar
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer flex items-center gap-1.5 ${
                chartType === 'bar'
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Gráfico Barras
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="p-5 h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'radar' ? (
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
                <PolarAngleAxis
                  dataKey="factorCode"
                  tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Radar
                  name="Calificación Obtenida"
                  dataKey="score"
                  stroke="#047857"
                  fill="#10b981"
                  fillOpacity={0.4}
                />
                <Radar
                  name="Meta de Acreditación (5.0)"
                  dataKey="maxScore"
                  stroke="#94a3b8"
                  fill="transparent"
                  strokeDasharray="4 4"
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded border border-slate-700 text-xs shadow-md">
                          <div className="font-bold text-emerald-400">{data.fullName}</div>
                          <div className="mt-1">
                            Puntuación: <strong>{data.score.toFixed(2)} / 5.0</strong>
                          </div>
                          <div>
                            Cumplimiento: <strong>{data.compliance.toFixed(1)}%</strong>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </RadarChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
                <XAxis dataKey="factorCode" tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }} />
                <YAxis domain={[0, 5]} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded border border-slate-700 text-xs shadow-md">
                          <div className="font-bold text-emerald-400">{data.fullName}</div>
                          <div className="mt-1">
                            Puntuación: <strong>{data.score.toFixed(2)} / 5.0</strong>
                          </div>
                          <div>
                            Cumplimiento: <strong>{data.compliance.toFixed(1)}%</strong>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="score" name="Puntuación del Factor" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => {
                    let color = '#e11d48';
                    if (entry.score >= 4.5) color = '#047857';
                    else if (entry.score >= 4.0) color = '#0d9488';
                    else if (entry.score >= 3.0) color = '#d97706';
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Factor Summary Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 bg-slate-50 border-b border-slate-200 border-l-4 border-l-slate-700 flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
            Consolidado Detallado por Factor CESU 01
          </h3>
          <span className="text-[11px] text-slate-500">
            Haga clic en una fila para navegar al formulario de ese factor.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-800 uppercase text-[10px] font-bold tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Factor Evaluado</th>
                <th className="p-3 text-center">Característ.</th>
                <th className="p-3 text-right">Promedio (1-5)</th>
                <th className="p-3 text-center">% Cumplimiento</th>
                <th className="p-3 text-center">Nivel de Estado</th>
                <th className="p-3 text-center">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {diagnostics.factorSummaries.map((f) => (
                <tr
                  key={f.factorId}
                  onClick={() => onSelectFactor(f.factorId)}
                  className="hover:bg-emerald-50/40 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-slate-900">
                    {f.factorCode}
                  </td>
                  <td className="p-3 font-semibold text-slate-900">
                    {f.factorName}
                  </td>
                  <td className="p-3 text-center font-mono">{f.characteristicsCount}</td>
                  <td className="p-3 text-right font-extrabold text-slate-900">
                    {f.averageRating.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className={`h-full ${f.colorClass}`}
                          style={{ width: `${f.compliancePercentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 w-10 text-right">
                        {f.compliancePercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${f.colorClass}`}>
                      {f.statusLevel}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectFactor(f.factorId);
                      }}
                      className="text-emerald-700 hover:text-emerald-800 font-bold text-[11px] inline-flex items-center gap-1 cursor-pointer"
                    >
                      Evaluar
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
