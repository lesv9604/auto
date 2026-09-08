import React, { useState } from 'react';
import { DiagnosticSession, ProgramLevel } from '../types';
import { getSchoolsByLevel } from '../data/unipazPrograms';

interface ProgramSelectorProps {
  existingSessions: DiagnosticSession[];
  onStartNew: (school: string, program: string, level: ProgramLevel) => void;
  onResumeSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function ProgramSelector({
  existingSessions,
  onStartNew,
  onResumeSession,
  onDeleteSession,
}: ProgramSelectorProps) {
  const [level, setLevel] = useState<ProgramLevel>('pregrado');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const schools = getSchoolsByLevel(level);
  const programs =
    selectedSchool
      ? (schools.find((s) => s.name === selectedSchool)?.programs ?? [])
      : [];

  const canStart = selectedSchool !== '' && selectedProgram !== '';

  const handleLevelChange = (l: ProgramLevel) => {
    setLevel(l);
    setSelectedSchool('');
    setSelectedProgram('');
  };

  const handleSchoolChange = (school: string) => {
    setSelectedSchool(school);
    setSelectedProgram('');
  };

  const handleDelete = (id: string) => {
    if (confirmDelete === id) {
      onDeleteSession(id);
      setConfirmDelete(null);
    } else {
      setConfirmDelete(id);
    }
  };

  const levelLabel: Record<ProgramLevel, string> = {
    pregrado: 'Pregrado',
    posgrado: 'Posgrado',
  };

  const levelColor: Record<ProgramLevel, string> = {
    pregrado: 'bg-blue-100 text-blue-700',
    posgrado: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-5">

        {/* ── Encabezado institucional ── */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-3xl font-extrabold leading-none">U</span>
            </div>
            <div className="text-left">
              <p className="text-white text-lg font-bold leading-tight">UNIPAZ</p>
              <p className="text-emerald-400 text-sm leading-tight">Instituto Universitario de la Paz</p>
            </div>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">Sistema de Autoevaluación</h1>
          <p className="text-slate-400 text-sm">Acuerdo CESU 01 de 2025 · Diagnóstico de Programas Académicos</p>
        </div>

        {/* ── Tarjeta: nuevo diagnóstico ── */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* cabecera verde */}
          <div className="bg-emerald-600 px-6 py-4">
            <h2 className="text-white font-semibold text-base">Iniciar nuevo diagnóstico</h2>
            <p className="text-emerald-100 text-sm">Selecciona el nivel, la escuela y el programa académico</p>
          </div>

          <div className="p-6 space-y-4">
            {/* Selector Pregrado / Posgrado */}
            <div className="flex rounded-lg overflow-hidden border border-slate-200">
              {(['pregrado', 'posgrado'] as ProgramLevel[]).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLevelChange(l)}
                  className={`flex-1 py-2.5 text-sm font-medium transition-colors capitalize ${
                    level === l
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {levelLabel[l]}
                </button>
              ))}
            </div>

            {/* Selector de Escuela */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Escuela / Facultad
              </label>
              <select
                value={selectedSchool}
                onChange={(e) => handleSchoolChange(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
              >
                <option value="">— Selecciona una escuela —</option>
                {schools.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector de Programa */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Programa académico
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                disabled={!selectedSchool}
                className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
              >
                <option value="">— Selecciona un programa —</option>
                {programs.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón iniciar */}
            <button
              onClick={() => canStart && onStartNew(selectedSchool, selectedProgram, level)}
              disabled={!canStart}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors text-sm"
            >
              Iniciar diagnóstico
            </button>
          </div>
        </div>

        {/* ── Diagnósticos en progreso ── */}
        {existingSessions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-slate-700 px-6 py-4">
              <h2 className="text-white font-semibold text-base">Diagnósticos en progreso</h2>
              <p className="text-slate-300 text-sm">Continúa donde lo dejaste</p>
            </div>

            <div className="divide-y divide-slate-100">
              {existingSessions.map((session) => (
                <div key={session.id} className="flex items-center gap-3 px-5 py-4 hover:bg-slate-50 transition-colors">
                  {/* Info */}
                  <button
                    onClick={() => onResumeSession(session.id)}
                    className="flex-1 text-left min-w-0"
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide ${levelColor[session.level]}`}
                      >
                        {levelLabel[session.level]}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 truncate">{session.program}</p>
                    <p className="text-xs text-slate-500 truncate">{session.school}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Modificado: {new Date(session.lastModified).toLocaleDateString('es-CO', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </p>
                  </button>

                  {/* Acciones */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onResumeSession(session.id)}
                      className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      Continuar
                    </button>
                    <button
                      onClick={() => handleDelete(session.id)}
                      title={confirmDelete === session.id ? 'Confirmar eliminación' : 'Eliminar'}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors border ${
                        confirmDelete === session.id
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-slate-500 border-slate-300 hover:border-red-400 hover:text-red-500'
                      }`}
                    >
                      {confirmDelete === session.id ? '¿Eliminar?' : '✕'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-slate-500 text-xs pb-2">
          SIAC UNIPAZ · Basado en el Acuerdo 01 de 2025 del CESU
        </p>
      </div>
    </div>
  );
}
