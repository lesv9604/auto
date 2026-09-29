/**
 * Genera el informe de autoevaluación en Word (.docx) editable.
 * Sección 1 (carta vertical): informe. Sección 2 (oficio horizontal): matriz
 * completa del plan de mejoramiento, pensada para diligenciarse en Word.
 */
import {
  AlignmentType, BorderStyle, Document, Footer, Header, ImageRun, Packer, PageNumber, PageOrientation,
  Paragraph, ShadingType, Table, TableCell, TableRow, TextRun, WidthType, VerticalAlign, HeadingLevel, ExternalHyperlink,
} from 'docx';
import { CharacteristicEvaluation, ConsolidatedDiagnostics, ProgramInfo } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { INSTITUCION } from '../data/institution';
import { ESCALA_CNA, CESU_ASPECTS } from '../data/cesuAspects';
import { trazabilidad, enlacesDe } from './process';
import { analisisPlan, filasPlan, fmtFechaCorta, hallazgosDe, planesDe } from './plan';

const AZUL = '273475', VERDE = '00963F', GRIS = '4B5563', FONDO = 'EEF0F8';
const FUENTE = 'Palatino Linotype';

const t = (text: string, o: { bold?: boolean; color?: string; size?: number; italics?: boolean } = {}) =>
  new TextRun({ text, bold: o.bold, color: o.color, size: o.size, italics: o.italics, font: FUENTE });
const p = (children: TextRun[] | string, o: { align?: (typeof AlignmentType)[keyof typeof AlignmentType]; after?: number; before?: number } = {}) =>
  new Paragraph({ children: typeof children === 'string' ? [t(children)] : children, alignment: o.align, spacing: { after: o.after ?? 120, before: o.before ?? 0 } });
const h = (text: string, level: 1 | 2 = 1) =>
  new Paragraph({
    heading: level === 1 ? HeadingLevel.HEADING_1 : HeadingLevel.HEADING_2,
    children: [t(text, { bold: true, color: AZUL, size: level === 1 ? 26 : 22 })],
    spacing: { before: level === 1 ? 280 : 200, after: 120 },
    border: level === 1 ? { bottom: { style: BorderStyle.SINGLE, size: 8, color: VERDE, space: 2 } } : undefined,
  });

const enlace = (texto: string, url: string, size = 16) =>
  new ExternalHyperlink({ link: url, children: [new TextRun({ text: texto, style: 'Hyperlink', color: '1D4ED8', underline: {}, size, font: FUENTE })] });

const borde = { style: BorderStyle.SINGLE, size: 4, color: 'CBD5E1' };
const bordes = { top: borde, bottom: borde, left: borde, right: borde };

function celda(text: string, o: { head?: boolean; w?: number; size?: number; bold?: boolean; fill?: string; span?: number } = {}) {
  const lines = (text || '—').split('\n');
  return new TableCell({
    children: lines.map((l) => new Paragraph({ children: [t(l, { bold: o.head || o.bold, color: o.head ? 'FFFFFF' : undefined, size: o.size ?? 18 })], spacing: { after: 40 } })),
    shading: o.head ? { type: ShadingType.CLEAR, fill: AZUL, color: 'auto' } : o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: 'auto' } : undefined,
    width: o.w ? { size: o.w, type: WidthType.DXA } : undefined,
    columnSpan: o.span,
    verticalAlign: VerticalAlign.TOP,
    borders: bordes,
    margins: { top: 50, bottom: 50, left: 80, right: 80 },
  });
}

function tabla(encabezados: string[], filas: string[][], anchos: number[], size = 18) {
  return new Table({
    width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: anchos,
    rows: [
      new TableRow({ tableHeader: true, children: encabezados.map((e, i) => celda(e, { head: true, w: anchos[i], size })) }),
      ...filas.map((f) => new TableRow({ cantSplit: true, children: f.map((v, i) => celda(v, { w: anchos[i], size })) })),
    ],
  });
}

async function logoRun(logoUrl: string, alto = 60) {
  try {
    const buf = await (await fetch(logoUrl)).arrayBuffer();
    return new ImageRun({ type: 'png', data: buf, transformation: { width: alto, height: alto } });
  } catch { return null; }
}

function membrete(logo: ImageRun | null, programInfo: ProgramInfo) {
  return new Header({
    children: [
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, insideVertical: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, insideHorizontal: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.DOUBLE, size: 6, color: AZUL } },
        rows: [new TableRow({
          children: [
            new TableCell({ width: { size: 14, type: WidthType.PERCENTAGE }, borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
              children: [new Paragraph({ children: logo ? [logo] : [t(INSTITUCION.sigla, { bold: true, color: AZUL })] })] }),
            new TableCell({ width: { size: 62, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER, borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
              children: [
                new Paragraph({ children: [t(INSTITUCION.sistema.toUpperCase(), { bold: true, color: AZUL, size: 20 })] }),
                new Paragraph({ children: [t('Informe de autoevaluación de programa académico · Acuerdo CESU 01 de 2025', { color: GRIS, size: 16 })] }),
              ] }),
            new TableCell({ width: { size: 24, type: WidthType.PERCENTAGE }, verticalAlign: VerticalAlign.CENTER, borders: { top: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
              children: [
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [t('Periodo ', { size: 16, color: GRIS }), t(programInfo.period, { size: 16, bold: true })] }),
                new Paragraph({ alignment: AlignmentType.RIGHT, children: [t(programInfo.programName, { size: 16, color: GRIS })] }),
              ] }),
          ],
        })],
      }),
      new Paragraph({ children: [], border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: VERDE, space: 1 } }, spacing: { after: 120 } }),
    ],
  });
}

function pie(fecha: string) {
  return new Footer({
    children: [
      new Paragraph({ border: { top: { style: BorderStyle.DOUBLE, size: 6, color: VERDE, space: 4 } }, children: [
        t(`${INSTITUCION.sigla}`, { bold: true, color: AZUL, size: 16 }),
        t(` · ${INSTITUCION.nombre} · ${INSTITUCION.ciudad} · ${INSTITUCION.web}`, { size: 16, color: GRIS }),
      ] }),
      new Paragraph({ children: [
        t(`${INSTITUCION.pie} · Generado el ${fecha} · Página `, { size: 14, color: GRIS }),
        new TextRun({ children: [PageNumber.CURRENT], size: 14, color: GRIS, font: FUENTE }),
        t(' de ', { size: 14, color: GRIS }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 14, color: GRIS, font: FUENTE }),
      ] }),
    ],
  });
}

const nivelDe = (r: number) => r === 0 ? 'Sin evaluar' : r >= 4.5 ? 'Pleno' : r >= 4.0 ? 'Alto' : r >= 3.0 ? 'Aceptable' : 'Deficiente';

export async function generarInformeDocx(
  programInfo: ProgramInfo, diagnostics: ConsolidatedDiagnostics,
  evaluations: Record<number, CharacteristicEvaluation>, logoUrl: string,
): Promise<Blob> {
  const hoy = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  const [logoA, logoB] = [await logoRun(logoUrl), await logoRun(logoUrl)];
  const filas = filasPlan(evaluations);
  const analisis = analisisPlan(evaluations, filas);

  // ── Sección 1: informe (carta vertical; ancho útil 9360 twips) ──
  const s1: (Paragraph | Table)[] = [];
  s1.push(new Paragraph({ children: [t('INFORME DE AUTOEVALUACIÓN', { bold: true, color: VERDE, size: 18 })], spacing: { before: 600, after: 80 } }));
  s1.push(new Paragraph({ children: [t(programInfo.programName, { bold: true, color: AZUL, size: 48 })], spacing: { after: 60 } }));
  s1.push(p([t(programInfo.faculty, { color: GRIS, size: 24 })], { after: 300 }));
  s1.push(tabla(['Dato', 'Valor'], [
    ['Periodo académico', programInfo.period],
    ['Fecha de emisión', fmtFechaCorta(programInfo.evaluationDate)],
    ['Evaluador / Comité responsable', programInfo.evaluatorName],
    ['Sede', programInfo.campus],
    ['Referente', 'Acuerdo 01 de 2025 del CESU y Lineamientos y aspectos por evaluar (diciembre de 2025)'],
  ], [2800, 6560], 20));

  s1.push(h('1. Resultado global'));
  s1.push(tabla(['Valoración global', 'Nivel de cumplimiento', 'Grado de logro', 'Características evaluadas'], [[
    `${diagnostics.overallScore.toFixed(2)} / 5,00`, diagnostics.statusLevel,
    `${diagnostics.overallCompliancePercentage} %`, `${diagnostics.totalEvaluated} / ${diagnostics.totalCharacteristics}`,
  ]], [2340, 2340, 2340, 2340], 20));

  const traza = trazabilidad(programInfo, evaluations);
  s1.push(h('2. Trazabilidad del proceso de autoevaluación'));
  s1.push(tabla(['Etapa', 'Estado', 'Detalle'], traza.etapas.map((e) => [e.etapa, e.estado, e.detalle]), [2600, 1100, 5660], 17));
  s1.push(h('Seguimiento por característica', 2));
  s1.push(tabla(['Car.', 'Característica', 'Peso', 'Valor.', 'CNA', 'Hallazgos', 'Evid.', 'Enlaces', 'Acciones'],
    traza.filas.map((r) => [r.codigo, r.titulo, r.peso, r.valoracion, r.cna, r.hallazgos ? 'Sí' : '—', r.evidencias, String(r.enlaces || '—'), String(r.acciones || '—')]),
    [620, 3820, 700, 700, 560, 850, 700, 700, 710], 14));

  s1.push(h('3. Consolidado por factor'));
  s1.push(tabla(['Factor', 'Nombre', 'Caract.', 'Valoración', 'Logro', 'Nivel'],
    diagnostics.factorSummaries.map((f) => [f.factorCode, f.factorName, `${f.evaluatedCount}/${f.characteristicsCount}`,
      f.averageRating > 0 ? f.averageRating.toFixed(2) : '—', `${f.compliancePercentage} %`, f.statusLevel]),
    [800, 4400, 900, 1100, 1000, 1160]));

  s1.push(h('4. Detalle por característica'));
  CESU_FACTORS.forEach((f) => {
    s1.push(h(`${f.code}. ${f.name}`, 2));
    f.characteristics.forEach((c) => {
      const ev = evaluations[c.id];
      const cna = ESCALA_CNA.find((x) => x.code === ev?.cnaLevel);
      const info = CESU_ASPECTS[c.code];
      s1.push(new Paragraph({ keepNext: true, spacing: { before: 160, after: 60 }, children: [t(`${c.code} `, { bold: true, color: VERDE }), t(c.title, { bold: true })] }));
      if (info) {
        s1.push(new Paragraph({ keepNext: true, spacing: { after: 40 }, children: [t('Qué se evalúa: ', { bold: true, size: 17 }), t(info.descripcion, { size: 17 })] }));
        info.aspectos.forEach((a) => s1.push(new Paragraph({ keepNext: true, indent: { left: 360 }, spacing: { after: 20 }, children: [t(`A${a.n}. `, { bold: true, size: 17 }), t(a.texto, { size: 17 })] })));
      }
      const n = f.characteristics.length;
      s1.push(tabla(['Ponderación', 'Valoración', 'Apreciación del Comité', 'Evidencias'], [[
        `${(100 / n).toFixed(1)} % del factor · aporte ${ev && ev.rating > 0 ? (ev.rating / n).toFixed(2) : '—'}`,
        ev && ev.rating > 0 ? `${ev.rating.toFixed(2)} (${nivelDe(ev.rating)})` : '—',
        cna ? `${cna.code} · ${cna.label}` : 'Sin calificar',
        `${ev?.evidences.filter((e) => e.checked).length ?? 0} de ${ev?.evidences.length ?? 0} verificadas`,
      ]], [2400, 2000, 2800, 2160], 16));
      s1.push(new Paragraph({ spacing: { before: 60, after: 40 }, children: [t('Apreciaciones y hallazgos: ', { bold: true, size: 17 }), t(hallazgosDe(ev) || '—', { size: 17 })] }));
      if (planesDe(ev).length) s1.push(p([t(`Acciones de mejora: ${planesDe(ev).length} (ver matriz del plan de mejoramiento).`, { size: 16, color: GRIS })], { after: 40 }));
      enlacesDe(ev).forEach((l) => s1.push(new Paragraph({ spacing: { after: 20 }, indent: { left: 360 }, children: [t(`${l.tipo}: `, { size: 16, color: GRIS }), enlace(l.label, l.url), t(`  ${l.url}`, { size: 14, color: GRIS })] })));
    });
  });

  s1.push(h('5. Plan de mejoramiento — análisis'));
  analisis.forEach((x) => s1.push(p(x, { align: AlignmentType.JUSTIFIED })));
  s1.push(p([t('La matriz del plan de mejoramiento se presenta en la sección siguiente (hoja horizontal) y puede diligenciarse y actualizarse directamente en este documento.', { italics: true, color: GRIS })]));

  const todos = CESU_FACTORS.flatMap((f) => f.characteristics.flatMap((c) => enlacesDe(evaluations[c.id], c.code)));
  s1.push(h('6. Enlaces y documentos soporte'));
  if (todos.length) {
    s1.push(new Table({
      width: { size: 9360, type: WidthType.DXA }, columnWidths: [700, 1600, 3000, 4060],
      rows: [
        new TableRow({ tableHeader: true, children: ['Car.', 'Tipo', 'Documento', 'Enlace'].map((e, k) => celda(e, { head: true, w: [700, 1600, 3000, 4060][k], size: 16 })) }),
        ...todos.map((l) => new TableRow({ children: [
          celda(l.codigo, { w: 700, size: 16 }), celda(l.tipo, { w: 1600, size: 16 }), celda(l.label, { w: 3000, size: 16 }),
          new TableCell({ width: { size: 4060, type: WidthType.DXA }, borders: bordes, margins: { top: 50, bottom: 50, left: 80, right: 80 },
            children: [new Paragraph({ children: [enlace(l.url, l.url, 15)] })] }),
        ] })),
      ],
    }));
  } else {
    s1.push(p([t('No se registraron enlaces a documentos soporte.', { color: GRIS })]));
  }

  s1.push(h('7. Nota metodológica'));
  s1.push(p('Las valoraciones provienen de encuestas de percepción con escala Muy favorable (4), Favorable (3), Desfavorable (2) y Muy desfavorable (1); «No aplica» se excluye. Se promedia por actor, luego entre actores (igual peso) y se convierte a la escala 1–5 mediante v = 1 + (x − 1) × 4/3. Niveles: Pleno ≥ 4,5 · Alto ≥ 4,0 · Aceptable ≥ 3,0 · Deficiente < 3,0. La apreciación del Comité (NC, CI, CA, CP) es un juicio cualitativo basado en evidencias sobre los aspectos por evaluar y no modifica la valoración numérica.', { align: AlignmentType.JUSTIFIED }));

  s1.push(new Paragraph({ spacing: { before: 900 }, children: [] }));
  s1.push(new Table({
    width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680],
    rows: [new TableRow({ children: [programInfo.evaluatorName || 'Equipo de autoevaluación del programa', 'Comité de Aseguramiento de la Calidad'].map((txt) =>
      new TableCell({ borders: { top: { style: BorderStyle.SINGLE, size: 6, color: '6B7280' }, bottom: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, left: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' }, right: { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' } },
        margins: { left: 300, right: 300 },
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [t(txt, { bold: true, size: 18 })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, children: [t(`${INSTITUCION.sigla} · ${INSTITUCION.ciudad}`, { size: 16, color: GRIS })] })] })) })],
  }));

  // ── Sección 2: matriz del plan (oficio horizontal; ancho útil ≈ 19000 twips) ──
  const enc = ['Factor', 'Característica', 'Nivel', 'Apreciaciones y hallazgos', 'Causa raíz', 'Línea base (valor + fecha)',
    'Indicador de mejora', 'Meta', 'Acción de mejora', 'Responsable', 'Fecha de inicio', 'Fecha límite', 'Plazo (meses)',
    'Avance', 'Estado', 'Evidencia de cierre', 'Observaciones'];
  const anchos = [600, 1500, 1000, 1450, 1400, 1100, 1300, 900, 1620, 1200, 1050, 1050, 650, 650, 900, 1200, 1150];
  const filasM = filas.map((r) => [r.factor, `${r.codigo} ${r.caracteristica}`, r.nivel, r.hallazgos || '—', r.p.causaRaiz,
    `${r.p.lineaBaseValor || '—'}\n${fmtFechaCorta(r.p.lineaBaseFecha)}`, r.p.indicador, r.p.meta, r.p.accion, r.p.responsable,
    fmtFechaCorta(r.p.fechaInicio), fmtFechaCorta(r.p.fechaLimite), r.plazo, `${r.p.avance} %`, r.estado, r.p.evidenciaCierre, r.p.observaciones]);
  // Filas en blanco para acciones adicionales
  for (let i = 0; i < 3; i++) filasM.push(enc.map(() => ' '));

  const s2: (Paragraph | Table)[] = [
    h('Matriz del plan de mejoramiento'),
    p([t('Estados: Sin iniciar · En ejecución · Cumplida · Vencida · Cancelada. El plazo se expresa en meses entre la fecha de inicio y la fecha límite. Responsable: instancia o equipo, no una persona.', { size: 16, color: GRIS })]),
    tabla(enc, filasM, anchos, 14),
  ];

  const doc = new Document({
    creator: `${INSTITUCION.sigla} — SIAC`,
    title: `Informe de autoevaluación — ${programInfo.programName}`,
    styles: { default: { document: { run: { font: FUENTE, size: 20 } } } },
    sections: [
      { properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1900, bottom: 1300, left: 1440, right: 1440, header: 500, footer: 500 } } },
        headers: { default: membrete(logoA, programInfo) }, footers: { default: pie(hoy) }, children: s1 },
      { properties: { page: { size: { width: 12240, height: 20160, orientation: PageOrientation.LANDSCAPE }, margin: { top: 1900, bottom: 1100, left: 720, right: 720, header: 500, footer: 450 } } },
        headers: { default: membrete(logoB, programInfo) }, footers: { default: pie(hoy) }, children: s2 },
    ],
  });
  return Packer.toBlob(doc);
}
