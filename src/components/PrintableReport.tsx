import React, { useRef, useState } from 'react';
import { CharacteristicEvaluation, ConsolidatedDiagnostics, ProgramInfo, SurveySummary } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { INSTITUCION } from '../data/institution';
import { ESCALA_CNA, CESU_ASPECTS } from '../data/cesuAspects';
import { trazabilidad, enlacesDe } from '../utils/process';
import { RUTA_PLAN, planCsv, filasPlan, analisisPlan, hallazgosDe, planesDe, fmtFechaCorta, ESTADO_COLOR } from '../utils/plan';
import { Printer, FileText, FileSpreadsheet } from 'lucide-react';
import logo from '../assets/logo-unipaz.png';
import { printReport } from '../utils/printReport';

interface PrintableReportProps {
  programInfo: ProgramInfo;
  diagnostics: ConsolidatedDiagnostics;
  evaluations: Record<number, CharacteristicEvaluation>;
  onUpdateProgramInfo: (u: Partial<ProgramInfo>) => void;
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

export const PrintableReport: React.FC<PrintableReportProps> = ({ programInfo, diagnostics, evaluations, onUpdateProgramInfo }) => {
  const faltaResponsable = !programInfo.evaluatorName.trim();
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
  const [generando, setGenerando] = useState(false);
  const nombreArchivo = `Informe_Autoevaluacion_${programInfo.programName}_${programInfo.period}`.replace(/[^\p{L}\p{N}]+/gu, '_');
  const handleExcel = () => {
    const blob = new Blob([planCsv(filasPlan(evaluations))], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `Plan_Mejoramiento_${programInfo.programName}_${programInfo.period}`.replace(/[^\p{L}\p{N}]+/gu, '_') + '.csv';
    document.body.appendChild(a); a.click();
    setTimeout(() => { a.remove(); URL.revokeObjectURL(a.href); }, 2000);
  };
  const handleDocx = async () => {
    if (faltaResponsable) return;
    setGenerando(true);
    try {
      const { generarInformeDocx } = await import('../utils/reportDocx');
      const blob = await generarInformeDocx(programInfo, diagnostics, evaluations, logo);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${nombreArchivo}.docx`;
      document.body.appendChild(a); a.click();
      setTimeout(() => { a.remove(); URL.revokeObjectURL(a.href); }, 2000);
    } catch (e) {
      alert('No se pudo generar el documento Word: ' + (e as Error).message);
    } finally {
      setGenerando(false);
    }
  };
  const handlePrint = () => {
    if (!reportRef.current || faltaResponsable) return;
    const nombre = `Informe_Autoevaluacion_${programInfo.programName}_${programInfo.period}`.replace(/[^\p{L}\p{N}]+/gu, '_');
    printReport(reportRef.current, nombre, [
      `${INSTITUCION.sigla} · ${INSTITUCION.nombre} · ${INSTITUCION.ciudad} · ${INSTITUCION.web}`,
      `${INSTITUCION.pie} · Generado el ${new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}`,
    ]);
  };
  const filas = filasPlan(evaluations);
  const traza = trazabilidad(programInfo, evaluations);
  const todosEnlaces = CESU_FACTORS.flatMap((f) => f.characteristics.flatMap((c) => enlacesDe(evaluations[c.id], c.code)));
  const analisis = analisisPlan(evaluations, filas);
  const hoy = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="rpt-wrap">
      {faltaResponsable && (
        <div className="max-w-[210mm] mx-auto mb-4 p-4 rounded-xl border border-rose-300 bg-rose-50 print:hidden">
          <label className="block text-xs font-bold uppercase tracking-wider text-rose-800 mb-1.5">
            Evaluador / Comité responsable del informe <span aria-hidden>*</span>
          </label>
          <input
            autoFocus
            value={programInfo.evaluatorName}
            onChange={(e) => onUpdateProgramInfo({ evaluatorName: e.target.value })}
            placeholder="Ej.: Comité de Autoevaluación del Programa de Ingeniería Informática"
            className="w-full p-2 text-sm bg-white border border-rose-300 rounded focus:ring-1 focus:ring-rose-500 focus:outline-none"
          />
          <p className="text-[11px] text-rose-700 mt-1">Campo obligatorio: sin él no se puede imprimir ni descargar el informe.</p>
        </div>
      )}

      {/* Barra de acciones (solo pantalla) */}
      <div className="flex justify-between items-center mb-4 print:hidden max-w-[210mm] mx-auto">
        <p className="text-xs text-slate-500">
          Vista previa del informe. Use <b>Imprimir / Guardar como PDF</b> y elija tamaño <b>Carta</b>, márgenes <b>Predeterminados</b> y active <b>Gráficos de fondo</b>.
        </p>
        <div className="flex gap-2 shrink-0 ml-4">
        <button onClick={handleExcel}
          className="px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 border-2 bg-white"
          style={{ borderColor: verde, color: verde }} title="Matriz del plan de mejoramiento en formato CSV para Excel">
          <FileSpreadsheet className="w-4 h-4" /> Plan a Excel
        </button>
        <button onClick={handleDocx} disabled={generando || faltaResponsable}
          className="px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 border-2 bg-white disabled:opacity-60"
          style={{ borderColor: azul, color: azul }}>
          <FileText className="w-4 h-4" /> {generando ? 'Generando…' : 'Descargar Word (.docx)'}
        </button>
        <button id="btn-imprimir-informe" onClick={handlePrint} disabled={faltaResponsable}
          className="px-4 py-2 text-white text-xs font-semibold rounded-lg flex items-center gap-2 disabled:opacity-50"
          style={{ background: azul }}>
          <Printer className="w-4 h-4" /> Imprimir / Guardar como PDF
        </button>
        </div>
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

            {/* ── 2. Trazabilidad del proceso ─────────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>2. Trazabilidad del proceso de autoevaluación</h2>
              <table className="rpt-table rpt-table-sm">
                <thead><tr style={{ background: azul }}><th>Etapa</th><th className="c">Estado</th><th>Detalle</th></tr></thead>
                <tbody>
                  {traza.etapas.map((e) => (
                    <tr key={e.etapa}>
                      <td className="b">{e.etapa}</td>
                      <td className="c"><span className="rpt-chip" style={{ color: e.estado === 'Completa' ? verde : e.estado === 'Parcial' ? '#B7791F' : '#B42318', borderColor: 'currentColor' }}>{e.estado}</span></td>
                      <td>{e.detalle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 style={{ color: azul, marginTop: '4mm' }}>Seguimiento por característica</h3>
              <table className="rpt-table rpt-table-xs">
                <thead><tr style={{ background: azul }}>
                  <th>Car.</th><th>Característica</th><th className="r">Peso</th><th className="r">Valor.</th><th className="c">CNA</th>
                  <th className="c">Hallazgos</th><th className="c">Evid.</th><th className="c">Enlaces</th><th className="c">Acciones</th>
                </tr></thead>
                <tbody>
                  {traza.filas.map((r) => (
                    <tr key={r.codigo}>
                      <td className="mono b">{r.codigo}</td><td>{r.titulo}</td><td className="r">{r.peso}</td><td className="r b">{r.valoracion}</td>
                      <td className="c">{r.cna}</td><td className="c">{r.hallazgos ? '✓' : '—'}</td><td className="c">{r.evidencias}</td>
                      <td className="c">{r.enlaces || '—'}</td><td className="c">{r.acciones || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* ── 2. Consolidado por factor ───────────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>3. Consolidado por factor</h2>
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
                <h2 style={{ color: azul, borderColor: verde }}>4. Fortalezas y oportunidades de mejora</h2>
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
              <h2 style={{ color: azul, borderColor: verde }}>5. Detalle por característica</h2>
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
                        <p className="rpt-muted">
                          Ponderación: {(100 / factor.characteristics.length).toFixed(1)} % del factor {factor.code} · Aporte al factor: {ev.rating > 0 ? (ev.rating / factor.characteristics.length).toFixed(2) : '—'}
                        </p>
                        {CESU_ASPECTS[char.code] && (
                          <div className="rpt-aspects">
                            <p><b>Qué se evalúa:</b> {CESU_ASPECTS[char.code].descripcion}</p>
                            <ul>
                              {CESU_ASPECTS[char.code].aspectos.map((a) => <li key={a.n}><b>A{a.n}.</b> {a.texto}</li>)}
                            </ul>
                          </div>
                        )}
                        {ev.cnaLevel && (() => {
                          const n = ESCALA_CNA.find((x) => x.code === ev.cnaLevel)!;
                          return <p><b>Apreciación del Comité (escala CNA):</b> <span style={{ color: n.color, fontWeight: 700 }}>{n.code} · {n.label}</span></p>;
                        })()}
                        {hallazgosDe(ev) && <p style={{ whiteSpace: 'pre-line' }}><b>Apreciaciones y hallazgos:</b> {hallazgosDe(ev)}</p>}
                        {planesDe(ev).length > 0 && <p className="rpt-muted">Acciones de mejora: {planesDe(ev).length} (ver sección 6).</p>}
                        {ev.evidences.length > 0 && <p className="rpt-muted">Evidencias verificadas: {evid} de {ev.evidences.length}</p>}
                        {enlacesDe(ev).length > 0 && (
                          <div className="rpt-links">
                            <b>Enlaces:</b>
                            <ul>
                              {enlacesDe(ev).map((l, k) => (
                                <li key={k}>{l.tipo}: <a href={l.url} target="_blank" rel="noopener noreferrer">{l.label}</a> <span className="rpt-url">{l.url}</span></li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </section>

            {/* ── 5. Plan de mejoramiento ─────────────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>6. Plan de mejoramiento</h2>
              <div className="rpt-ruta">
                <p className="rpt-ruta-t" style={{ color: azul }}>Ruta metodológica para cada brecha</p>
                <div className="rpt-ruta-steps">
                  <span className="rpt-step rpt-step-0">Brecha</span>
                  {RUTA_PLAN.map((r) => <span key={r} className="rpt-step">{r}</span>)}
                  <span className="rpt-step rpt-step-end" style={{ background: verde }}>Monitoreo y cierre (SIAC)</span>
                </div>
                <p><b>Para cada brecha en el plan de mejoramiento defina:</b> línea base → indicador → meta → responsable → plazo, y monitoree el cierre desde el SIAC. Exporte la matriz a Excel para cruzarla con el repositorio de evidencias.</p>
              </div>
              {analisis.map((t, i) => <p key={i}>{t}</p>)}

              {filas.length > 0 && (
                <>
                  <h3 style={{ color: azul, marginTop: '4mm' }}>6.1 Matriz resumen</h3>
                  <table className="rpt-table rpt-table-sm">
                    <thead>
                      <tr style={{ background: azul }}>
                        <th>Factor</th><th>Característica</th><th>Nivel</th><th>Acción de mejora</th>
                        <th>Responsable</th><th className="c">Límite</th><th className="r">Avance</th><th className="c">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filas.map((r) => (
                        <tr key={r.p.id}>
                          <td className="mono b">{r.factor}</td>
                          <td><b className="mono">{r.codigo}</b> {r.caracteristica}</td>
                          <td>{r.nivel}</td>
                          <td>{r.p.accion || '—'}</td>
                          <td>{r.p.responsable || '—'}</td>
                          <td className="c">{fmtFechaCorta(r.p.fechaLimite)}</td>
                          <td className="r">{r.p.avance} %</td>
                          <td className="c"><span className="rpt-chip" style={{ color: ESTADO_COLOR[r.estado], borderColor: ESTADO_COLOR[r.estado] }}>{r.estado}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <h3 style={{ color: azul, marginTop: '5mm' }}>6.2 Fichas de las acciones de mejora</h3>
                  {filas.map((r, i) => (
                    <table key={r.p.id} className="rpt-ficha">
                      <tbody>
                        <tr><th colSpan={4} style={{ background: azul }}>Acción {i + 1} · {r.factor} · {r.codigo} {r.caracteristica}</th></tr>
                        <tr><th>Factor</th><td colSpan={3}>{r.factor}. {r.factorNombre}</td></tr>
                        <tr><th>Nivel</th><td colSpan={3}>Valoración {r.valoracion} · Apreciación del Comité: {r.cna}</td></tr>
                        <tr><th>Apreciaciones y hallazgos</th><td colSpan={3} style={{ whiteSpace: 'pre-line' }}>{r.hallazgos || '—'}</td></tr>
                        <tr><th>Causa raíz</th><td colSpan={3}>{r.p.causaRaiz || '—'}</td></tr>
                        <tr><th>Línea base</th><td>{r.p.lineaBaseValor || '—'}</td><th>Fecha línea base</th><td>{fmtFechaCorta(r.p.lineaBaseFecha)}</td></tr>
                        <tr><th>Indicador de mejora</th><td>{r.p.indicador || '—'}</td><th>Meta</th><td>{r.p.meta || '—'}</td></tr>
                        <tr><th>Acción de mejora</th><td colSpan={3}>{r.p.accion || '—'}</td></tr>
                        <tr><th>Responsable</th><td colSpan={3}>{r.p.responsable || '—'}</td></tr>
                        <tr><th>Fecha de inicio</th><td>{fmtFechaCorta(r.p.fechaInicio)}</td><th>Fecha límite</th><td>{fmtFechaCorta(r.p.fechaLimite)}</td></tr>
                        <tr><th>Plazo (meses)</th><td>{r.plazo}</td><th>Avance</th><td>{r.p.avance} %</td></tr>
                        <tr><th>Estado</th><td colSpan={3}>{r.estado}</td></tr>
                        <tr><th>Evidencia de cierre</th><td colSpan={3}>{r.p.evidenciaCierre || '—'}</td></tr>
                        <tr><th>Observaciones</th><td colSpan={3}>{r.p.observaciones || '—'}</td></tr>
                      </tbody>
                    </table>
                  ))}
                </>
              )}
            </section>

            {/* ── 7. Enlaces y documentos soporte ────────────────── */}
            <section className="rpt-sec">
              <h2 style={{ color: azul, borderColor: verde }}>7. Enlaces y documentos soporte</h2>
              {todosEnlaces.length ? (
                <table className="rpt-table rpt-table-sm">
                  <thead><tr style={{ background: azul }}><th>Car.</th><th>Tipo</th><th>Documento</th><th>Enlace</th></tr></thead>
                  <tbody>
                    {todosEnlaces.map((l, k) => (
                      <tr key={k}><td className="mono b">{l.codigo}</td><td>{l.tipo}</td><td>{l.label}</td>
                        <td className="rpt-url-cell"><a href={l.url} target="_blank" rel="noopener noreferrer">{l.url}</a></td></tr>
                    ))}
                  </tbody>
                </table>
              ) : <p className="rpt-muted">No se registraron enlaces a documentos soporte.</p>}
            </section>

            {/* ── 6. Nota metodológica ────────────────────────────── */}
            <section className="rpt-sec rpt-avoid">
              <h2 style={{ color: azul, borderColor: verde }}>8. Nota metodológica</h2>
              <p>
                Las valoraciones provienen de encuestas de percepción aplicadas a los actores del programa con escala:
                Muy favorable (4), Favorable (3), Desfavorable (2) y Muy desfavorable (1); «No aplica» se excluye del cálculo.
                Para cada característica se promedia por actor, luego se promedian los actores (cada actor pesa igual) y el
                resultado se convierte a la escala 1–5 mediante <i>v = 1 + (x − 1) × 4/3</i>. La valoración de cada factor es el
                promedio de sus características (igual peso) y la global el promedio de todas las características evaluadas.
                Niveles: Pleno ≥ 4,5 · Alto ≥ 4,0 · Aceptable ≥ 3,0 · Deficiente &lt; 3,0. La apreciación del Comité (NC, CI, CA, CP) es un juicio cualitativo basado en evidencias sobre los aspectos por evaluar de los Lineamientos del CESU (diciembre de 2025) y no modifica la valoración numérica.
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
