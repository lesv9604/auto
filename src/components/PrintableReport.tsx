import React, { useRef } from 'react';
import { CharacteristicEvaluation, ConsolidatedDiagnostics, ProgramInfo, SurveySummary } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { INSTITUCION } from '../data/institution';
import { ESCALA_CNA } from '../data/cesuAspects';
import { Printer } from 'lucide-react';
import logo from '../assets/logo-unipaz.png';
import { printReport } from '../utils/printReport';

interface PrintableReportProps {
  programInfo: ProgramInfo;
  diagnostics: ConsolidatedDiagnostics;
  evaluations: Record<number, CharacteristicEvaluation>;
}

const { azul, verde } = INSTITUCION.colores;
type ActorRes = SurveySummary['byActor'][string];
const porActor = (s: SurveySummary) => Object.entries(s.byActor) as [string, ActorRes][];

const NIVEL_COLOR: Record<string, string> = {
  Pleno: '#00963F', Alto: '#2E8B57', Aceptable: '#B7791F', Deficiente: '#B42318', 'Sin evaluar': '#6B7280',
};
const nivelDe = (r: number) =>
  r === 0 ? 'Sin evaluar' : r >= 4.5 ? 'Pleno' : r >= 4.0 ? 'Alto' : r >= 3.0 ? 'Aceptable' : 'Deficiente';

const Nivel: React.FC<{ nivel: string }> = ({ nivel }) => (
  <span className="rpt-chip" style={{ borderColor: NIVEL_COLOR[nivel], color: NIVEL_COLOR[nivel] }}>{nivel}</span>
);

const fmtFecha = (iso: string) => {
  const d = new Date(`${iso}T12:00:00`);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const PrintableReport: React.FC<PrintableReportProps> = ({ programInfo, diagnostics, evaluations }) => {
  const chars = CESU_FACTORS.flatMap((f) => f.characteristics.map((c) => ({ ...c, factor: f, ev: evaluations[c.id] })));
  const evaluadas = chars.filter((c) => c.ev && c.ev.rating > 0).sort((a, b) => b.ev.rating - a.ev.rating);
  const fortalezas = evaluadas.slice(0, 5);
  const oportunidades = [...evaluadas].reverse().slice(0, 5);

  // Encuestados por actor y periodo de las respuestas (tomado de las encuestas cargadas)
  const encuestados: Record<string, number> = {};
  let periodo: string | undefined;
  chars.forEach(({ ev }) => {
    if (!ev?.survey) return;
    periodo ??= ev.survey.periodo;
    porActor(ev.survey).forEach(([a, d]) => { encuestados[a] = Math.max(encuestados[a] ?? 0, d.n); });
  });
  const totalEncuestados = Object.values(encuestados).reduce((s, n) => s + n, 0);
  const reportRef = useRef<HTMLDivElement>(null);
  const handlePrint = () => {
    if (!reportRef.current) return;
    const nombre = `Informe_Autoevaluacion_${programInfo.programName}_${programInfo.period}`.replace(/[^\p{L}\p{N}]+/gu, '_');
    printReport(reportRef.current, nombre);
  };
  const hoy = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="rpt-wrap">
      {/* Barra de acciones (solo pantalla) */}
      <div className="flex justify-between items-center mb-4 print:hidden max-w-[210mm] mx-auto">
        <p className="text-xs text-slate-500">
          Vista previa del informe. Use <b>Imprimir / Guardar como PDF</b> y elija tamaño <b>Carta</b>, márgenes <b>Predeterminados</b> y active <b>Gráficos de fondo</b>.
        </p>
        <button id="btn-imprimir-informe" onClick={handlePrint}
          className="px-4 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shrink-0 ml-4"
          style={{ background: azul }}>
          <Printer className="w-4 h-4" /> Imprimir / Guardar como PDF
        </button>
      </div>

      <div ref={reportRef} id="informe-rpt" className="rpt" style={{ fontFamily: INSTITUCION.fuente }}>
        {/* Membrete (se repite en cada página al imprimir) */}
        <header className="rpt-header">
          <img src={logo} alt={`${INSTITUCION.sigla} ${INSTITUCION.nombre}`} className="rpt-logo" />
          <div className="rpt-header-txt">
            <div className="rpt-h-sistema" style={{ color: azul }}>{INSTITUCION.sistema}</div>
            <div className="rpt-h-doc">Informe de autoevaluación de programa académico · Acuerdo CESU 01 de 2025</div>
          </div>
          <div className="rpt-h-meta">
            <div>Periodo <b>{programInfo.period}</b></div>
            <div>{programInfo.programName}</div>
          </div>
          <div className="rpt-rule"><span style={{ background: azul }} /><span style={{ background: verde }} /></div>
        </header>

        <footer className="rpt-footer">
          <div className="rpt-rule"><span style={{ background: verde }} /><span style={{ background: azul }} /></div>
          <div className="rpt-f-txt">
            <span><b style={{ color: azul }}>{INSTITUCION.sigla}</b> · {INSTITUCION.nombre} · {INSTITUCION.ciudad} · {INSTITUCION.web}</span>
            <span>Generado el {hoy}</span>
          </div>
          <div className="rpt-f-legal">{INSTITUCION.pie}</div>
        </footer>

        {/* Tabla contenedora: thead/tfoot reservan el espacio del membrete en cada página */}
        <table className="rpt-page">
          <thead><tr><td><div className="rpt-space-top" /></td></tr></thead>
          <tfoot><tr><td><div className="rpt-space-bottom" /></td></tr></tfoot>
          <tbody><tr><td>

            {/* ── Portada ─────────────────────────────────────────── */}
            <section className="rpt-cover">
              <p className="rpt-kicker" style={{ color: verde }}>Informe de autoevaluación</p>
              <h1 style={{ color: azul }}>{programInfo.programName}</h1>
              <p className="rpt-sub">{programInfo.faculty}</p>
              <table className="rpt-kv">
                <tbody>
                  <tr><th>Periodo académico</th><td>{programInfo.period}</td></tr>
                  <tr><th>Fecha de emisión</th><td>{fmtFecha(programInfo.evaluationDate)}</td></tr>
                  <tr><th>Responsable</th><td>{programInfo.evaluatorName || '—'} · {programInfo.evaluatorRole}</td></tr>
                  <tr><th>Sede</th><td>{programInfo.campus}</td></tr>
                  <tr><th>Referente</th><td>Acuerdo 01 de 2025 del CESU — 12 factores y 51 características</td></tr>
                  {periodo && <tr><th>Respuestas de encuestas</th><td>{periodo} · {totalEncuestados} encuestados</td></tr>}
                </tbody>
              </table>
            </section>

            {/* ── 1. Resultado global ─────────────────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>1. Resultado global</h2>
              <div className="rpt-kpis">
                <div className="rpt-kpi" style={{ borderColor: azul }}>
                  <span>Valoración global</span>
                  <b style={{ color: azul }}>{diagnostics.overallScore.toFixed(2)}<small> / 5.00</small></b>
                </div>
                <div className="rpt-kpi" style={{ borderColor: azul }}>
                  <span>Nivel de cumplimiento</span>
                  <b style={{ color: NIVEL_COLOR[diagnostics.statusLevel] }}>{diagnostics.statusLevel}</b>
                </div>
                <div className="rpt-kpi" style={{ borderColor: azul }}>
                  <span>Grado de logro</span>
                  <b style={{ color: azul }}>{diagnostics.overallCompliancePercentage}%</b>
                </div>
                <div className="rpt-kpi" style={{ borderColor: azul }}>
                  <span>Características evaluadas</span>
                  <b style={{ color: azul }}>{diagnostics.totalEvaluated}<small> / {diagnostics.totalCharacteristics}</small></b>
                </div>
              </div>
              {totalEncuestados > 0 && (
                <p className="rpt-note">
                  Participación: {Object.entries(encuestados).map(([a, n]) => `${a} ${n}`).join(' · ')}.
                </p>
              )}
            </section>

            {/* ── 2. Consolidado por factor ───────────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>2. Consolidado por factor</h2>
              <table className="rpt-table">
                <thead>
                  <tr style={{ background: azul }}>
                    <th>Factor</th><th>Nombre</th><th className="c">Caract.</th>
                    <th className="r">Valoración</th><th className="r">Logro</th><th className="c">Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {diagnostics.factorSummaries.map((f) => (
                    <tr key={f.factorId}>
                      <td className="mono b">{f.factorCode}</td>
                      <td>{f.factorName}</td>
                      <td className="c">{f.evaluatedCount}/{f.characteristicsCount}</td>
                      <td className="r b">{f.averageRating > 0 ? f.averageRating.toFixed(2) : '—'}</td>
                      <td className="r">
                        <div className="rpt-bar"><i style={{ width: `${f.compliancePercentage}%`, background: verde }} /></div>
                        {f.compliancePercentage}%
                      </td>
                      <td className="c"><Nivel nivel={f.statusLevel} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* ── 3. Fortalezas y oportunidades ───────────────────── */}
            {evaluadas.length > 0 && (
              <section className="rpt-sec rpt-avoid">
                <h2 style={{ color: azul, borderColor: verde }}>3. Fortalezas y oportunidades de mejora</h2>
                <div className="rpt-two">
                  {[['Características mejor valoradas', fortalezas, verde], ['Características con menor valoración', oportunidades, '#B42318']].map(
                    ([titulo, lista, color]) => (
                      <div key={titulo as string}>
                        <h3 style={{ color: color as string }}>{titulo as string}</h3>
                        <ol>
                          {(lista as typeof evaluadas).map((c) => (
                            <li key={c.id}><b className="mono">{c.code}</b> {c.title} — <b>{c.ev.rating.toFixed(2)}</b></li>
                          ))}
                        </ol>
                      </div>
                    )
                  )}
                </div>
              </section>
            )}

            {/* ── 4. Detalle por característica ───────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>4. Detalle por característica</h2>
              {CESU_FACTORS.map((factor) => (
                <div key={factor.id} className="rpt-factor">
                  <h3 className="rpt-factor-t" style={{ background: azul }}>{factor.code}. {factor.name}</h3>
                  {factor.characteristics.map((char) => {
                    const ev = evaluations[char.id];
                    if (!ev) return null;
                    const actores = ev.survey ? porActor(ev.survey) : [];
                    const evid = ev.evidences.filter((e) => e.checked).length;
                    return (
                      <div key={char.id} className="rpt-char">
                        <div className="rpt-char-h">
                          <span><b className="mono" style={{ color: verde }}>{char.code}</b> {char.title}</span>
                          <span className="rpt-char-score">
                            {ev.rating > 0 ? ev.rating.toFixed(2) : '—'} <Nivel nivel={nivelDe(ev.rating)} />
                          </span>
                        </div>
                        {actores.length > 0 && (
                          <p className="rpt-actors">
                            Percepción (Likert 1–4): {actores.map(([a, d]) => `${a} ${d.likert.toFixed(2)} (n=${d.n})`).join(' · ')}
                          </p>
                        )}
                        {ev.cnaLevel && (() => {
                          const n = ESCALA_CNA.find((x) => x.code === ev.cnaLevel)!;
                          return <p><b>Apreciación del Comité (escala CNA):</b> <span style={{ color: n.color, fontWeight: 700 }}>{n.code} · {n.label}</span></p>;
                        })()}
                        {ev.qualitativeJustification && <p><b>Análisis:</b> {ev.qualitativeJustification}</p>}
                        {ev.hallazgos && <p style={{ whiteSpace: 'pre-line' }}><b>Apreciaciones y hallazgos:</b> {ev.hallazgos}</p>}
                        {ev.actionPlan && <p><b>Plan de mejoramiento:</b> {ev.actionPlan}</p>}
                        {ev.evidences.length > 0 && <p className="rpt-muted">Evidencias verificadas: {evid} de {ev.evidences.length}</p>}
                        {ev.adjuntos && ev.adjuntos.length > 0 && (
                          <p className="rpt-muted">Documentos soporte: {ev.adjuntos.map((d, i) => (
                            <span key={d.id}>{i > 0 && ' · '}<a href={d.url}>{d.label}</a></span>
                          ))}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </section>

            {/* ── 5. Nota metodológica ────────────────────────────── */}
            <section className="rpt-sec rpt-avoid">
              <h2 style={{ color: azul, borderColor: verde }}>5. Nota metodológica</h2>
              <p>
                Las valoraciones provienen de encuestas de percepción aplicadas a los actores del programa con escala:
                Muy favorable (4), Favorable (3), Desfavorable (2) y Muy desfavorable (1); «No aplica» se excluye del cálculo.
                Para cada característica se promedia por actor, luego se promedian los actores (cada actor pesa igual) y el
                resultado se convierte a la escala 1–5 mediante <i>v = 1 + (x − 1) × 4/3</i>. La valoración de cada factor es el
                promedio de sus características (igual peso) y la global el promedio de todas las características evaluadas.
                Niveles: Pleno ≥ 4,5 · Alto ≥ 4,0 · Aceptable ≥ 3,0 · Deficiente &lt; 3,0. La apreciación del Comité (NC, CI, CA, CP) es un juicio cualitativo basado en evidencias sobre los aspectos por evaluar derivados del Acuerdo 01/2025 y no modifica la valoración numérica.
              </p>
            </section>

            {/* ── Firmas ──────────────────────────────────────────── */}
            <section className="rpt-sign rpt-avoid">
              <div>
                <div className="rpt-line" />
                <b>{programInfo.evaluatorName || 'Nombre del responsable'}</b>
                <span>{programInfo.evaluatorRole}</span>
              </div>
              <div>
                <div className="rpt-line" />
                <b>Dirección / Comité de Aseguramiento de la Calidad</b>
                <span>{INSTITUCION.sigla} · {INSTITUCION.ciudad}</span>
              </div>
            </section>

          </td></tr></tbody>
        </table>
      </div>
    </div>
  );
};
