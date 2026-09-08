import React, { useState } from 'react';
import { FactorSummary, CharacteristicEvaluation } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { Search, ChevronRight, Layers, AlertCircle, CheckCircle2 } from 'lucide-react';

interface FactorNavProps {
  activeFactorId: number;
  activeCharacteristicId: number;
  onSelectCharacteristic: (factorId: number, charId: number) => void;
  factorSummaries: FactorSummary[];
  evaluations: Record<number, CharacteristicEvaluation>;
}

export const FactorNav: React.FC<FactorNavProps> = ({
  activeFactorId,
  activeCharacteristicId,
  onSelectCharacteristic,
  factorSummaries,
  evaluations,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Totales globales de pendientes
  const totalPending = factorSummaries.reduce((s, f) => s + f.pendingCount, 0);
  const totalChars   = factorSummaries.reduce((s, f) => s + f.characteristicsCount, 0);

  const filteredFactors = CESU_FACTORS.filter((factor) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      factor.name.toLowerCase().includes(term) ||
      factor.code.toLowerCase().includes(term) ||
      factor.characteristics.some(
        (c) => c.title.toLowerCase().includes(term) || c.code.toLowerCase().includes(term)
      )
    );
  });

  return (
    <aside className="w-full lg:w-80 bg-white border border-slate-200 flex flex-col h-full rounded-xl shadow-xs overflow-hidden">

      {/* Encabezado */}
      <div className="p-3.5 bg-slate-50 border-b border-slate-200 border-l-4 border-l-emerald-600">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              12 Factores CESU 01
            </h2>
          </div>
          <span className="text-[10px] font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded border border-emerald-300">
            {totalChars} Característ.
          </span>
        </div>

        {/* Barra de progreso global */}
        {totalPending > 0 && (
          <div className="mb-2 flex items-center gap-2 bg-amber-50 border border-amber-200 rounded px-2.5 py-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="text-[11px] text-amber-800 font-medium">
              <strong>{totalPending}</strong> característica{totalPending !== 1 ? 's' : ''} pendiente{totalPending !== 1 ? 's' : ''} por evaluar
            </span>
          </div>
        )}
        {totalPending === 0 && (
          <div className="mb-2 flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded px-2.5 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="text-[11px] text-emerald-800 font-medium">
              ¡Todas las características evaluadas!
            </span>
          </div>
        )}

        {/* Buscador */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar factor o característica..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* Lista de factores */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2 max-h-[calc(100vh-240px)]">
        {filteredFactors.map((factor) => {
          const summary      = factorSummaries.find((s) => s.factorId === factor.id);
          const isFactorActive = factor.id === activeFactorId;
          const pending      = summary?.pendingCount ?? factor.characteristics.length;
          const hasPending   = pending > 0;

          return (
            <div
              key={factor.id}
              className={`rounded-lg border transition-all ${
                isFactorActive
                  ? 'border-l-4 border-l-emerald-600 border-emerald-300 bg-emerald-50/50 shadow-sm'
                  : hasPending
                  ? 'border-l-4 border-l-amber-400 border-slate-200 bg-white hover:bg-slate-50'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40'
              }`}
            >
              {/* Cabecera del factor */}
              <button
                onClick={() => {
                  if (factor.characteristics.length > 0) {
                    onSelectCharacteristic(factor.id, factor.characteristics[0].id);
                  }
                }}
                className="w-full text-left p-2.5 flex items-start justify-between gap-2 group cursor-pointer"
              >
                <div className="flex items-start space-x-2.5 min-w-0">
                  <span className={`shrink-0 text-xs font-bold px-1.5 py-0.5 rounded ${
                    isFactorActive ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {factor.code}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-slate-900 truncate group-hover:text-emerald-700">
                      {factor.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <p className="text-[10px] text-slate-500">
                        {factor.characteristics.length} característica{factor.characteristics.length !== 1 ? 's' : ''}
                      </p>
                      {hasPending && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-1.5 py-0 rounded-full">
                          {pending} pendiente{pending !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Puntaje del factor */}
                {summary && (
                  <span className={`shrink-0 text-[11px] font-bold px-2 py-0.5 rounded ${summary.colorClass}`}>
                    {summary.evaluatedCount === 0 ? '—' : summary.averageRating.toFixed(1)}
                  </span>
                )}
              </button>

              {/* Lista de características */}
              <div className="px-2 pb-2 space-y-1">
                {factor.characteristics.map((char) => {
                  const isCharActive = char.id === activeCharacteristicId;
                  const evalData     = evaluations[char.id];
                  const isPending    = !evalData || (evalData.rating ?? 0) === 0;

                  return (
                    <button
                      key={char.id}
                      onClick={() => onSelectCharacteristic(factor.id, char.id)}
                      className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isCharActive
                          ? 'bg-emerald-700 text-white font-medium shadow-sm'
                          : isPending
                          ? 'text-amber-800 bg-amber-50 hover:bg-amber-100'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className={`text-[10px] font-mono shrink-0 ${
                          isCharActive ? 'text-emerald-100' : isPending ? 'text-amber-500' : 'text-slate-400'
                        }`}>
                          {char.code}
                        </span>
                        <span className="truncate">{char.title}</span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {isPending && !isCharActive && (
                          <AlertCircle className="w-3 h-3 text-amber-500" />
                        )}
                        {!isPending && !isCharActive && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        )}
                        <ChevronRight className={`w-3.5 h-3.5 ${
                          isCharActive ? 'text-white' : 'text-slate-400'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
