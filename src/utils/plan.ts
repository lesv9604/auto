import { CharacteristicEvaluation, EstadoPlan, PlanAccion } from '../types';
import { CESU_FACTORS } from '../data/cesuData';
import { ESCALA_CNA } from '../data/cesuAspects';


/** Responsable genérico: las acciones las aborda el equipo, no una persona. */
export const RESPONSABLE_DEFECTO = 'Comité de autoevaluación del programa';

export const ESTADOS_PLAN: EstadoPlan[] = ['Sin iniciar', 'En ejecución', 'Cumplida', 'Cancelada'];

export function nuevaAccion(parcial: Partial<PlanAccion> = {}): PlanAccion {
  return {
    id: `pm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    causaRaiz: '', lineaBaseValor: '', lineaBaseFecha: '', indicador: '', meta: '',
    accion: '', responsable: RESPONSABLE_DEFECTO, fechaInicio: '', fechaLimite: '',
    avance: 0, estado: 'Sin iniciar', evidenciaCierre: '', observaciones: '',
    ...parcial,
  };
}

/** Acciones de una característica (migra el texto antiguo de "Plan de acción"). */
export function planesDe(ev?: CharacteristicEvaluation): PlanAccion[] {
  if (!ev) return [];
  if (ev.planes) return ev.planes;
  return ev.actionPlan?.trim() ? [nuevaAccion({ id: `pm-legacy-${ev.characteristicId}`, accion: ev.actionPlan.trim() })] : [];
}

/** Hallazgos unificados (migra la antigua "Justificación cualitativa"). */
export const hallazgosDe = (ev?: CharacteristicEvaluation) =>
  (ev?.hallazgos ?? ev?.qualitativeJustification ?? '').trim();

/** Plazo en meses entre inicio y fecha límite (redondeado a 1 decimal). */
export function plazoMeses(inicio: string, limite: string): number | null {
  if (!inicio || !limite) return null;
  const a = new Date(`${inicio}T00:00:00`), b = new Date(`${limite}T00:00:00`);
  if (isNaN(+a) || isNaN(+b) || b < a) return null;
  return Math.round(((+b - +a) / (1000 * 60 * 60 * 24 * 30.44)) * 10) / 10;
}

/** Estado mostrado: una acción no cumplida con fecha límite pasada se reporta como vencida. */
export function estadoEfectivo(p: PlanAccion, hoy = new Date()): EstadoPlan | 'Vencida' {
  if (p.estado === 'Cumplida' || p.estado === 'Cancelada') return p.estado;
  if (p.fechaLimite && new Date(`${p.fechaLimite}T23:59:59`) < hoy) return 'Vencida';
  return p.estado;
}

export const ESTADO_COLOR: Record<string, string> = {
  'Sin iniciar': '#6B7280', 'En ejecución': '#1D5FB8', Cumplida: '#00963F', Cancelada: '#6B7280', Vencida: '#B42318',
};

/** Una característica es prioritaria si su valoración es < 4,0 o el Comité la califica NC/CI. */
export const esPrioritaria = (ev?: CharacteristicEvaluation) =>
  !!ev && ((ev.rating > 0 && ev.rating < 4) || ev.cnaLevel === 'NC' || ev.cnaLevel === 'CI');

export const fmtFechaCorta = (iso: string) => {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return d && m && y ? `${d}/${m}/${y}` : iso;
};

// ─── Datos del plan para el informe (PDF y Word) ─────────────────────────────

export interface FilaPlan {
  factor: string; factorNombre: string; codigo: string; caracteristica: string;
  valoracion: string; cna: string; nivel: string; hallazgos: string;
  p: PlanAccion; plazo: string; estado: string;
}

const nivelNum = (r: number) =>
  r === 0 ? 'Sin evaluar' : r >= 4.5 ? 'Pleno' : r >= 4.0 ? 'Alto' : r >= 3.0 ? 'Aceptable' : 'Deficiente';

export function filasPlan(evaluations: Record<number, CharacteristicEvaluation>): FilaPlan[] {
  const out: FilaPlan[] = [];
  CESU_FACTORS.forEach((f) => f.characteristics.forEach((c) => {
    const ev = evaluations[c.id];
    const cna = ESCALA_CNA.find((x) => x.code === ev?.cnaLevel);
    const valoracion = ev && ev.rating > 0 ? ev.rating.toFixed(2) : '—';
    planesDe(ev).forEach((p) => {
      const plazo = plazoMeses(p.fechaInicio, p.fechaLimite);
      out.push({
        factor: f.code, factorNombre: f.name, codigo: c.code, caracteristica: c.title,
        valoracion, cna: cna ? `${cna.code} · ${cna.label}` : 'Sin calificar',
        nivel: `${valoracion} (${nivelNum(ev?.rating ?? 0)}) · ${cna ? cna.code : 'Sin calificar'}`,
        hallazgos: hallazgosDe(ev), p, plazo: plazo !== null ? `${plazo}` : '—', estado: estadoEfectivo(p),
      });
    });
  }));
  return out;
}

/** Texto de análisis genérico (redacción institucional, sin nombres de personas). */
export function analisisPlan(evaluations: Record<number, CharacteristicEvaluation>, filas: FilaPlan[]): string[] {
  const chars = CESU_FACTORS.flatMap((f) => f.characteristics.map((c) => ({ c, f, ev: evaluations[c.id] })));
  const prioritarias = chars.filter((x) => esPrioritaria(x.ev));
  const sinAccion = prioritarias.filter((x) => planesDe(x.ev).length === 0);
  const cuenta = (e: string) => filas.filter((r) => r.estado === e).length;
  const porFactor = new Map<string, number>();
  filas.forEach((r) => porFactor.set(r.factor, (porFactor.get(r.factor) ?? 0) + 1));
  const top = [...porFactor.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3)
    .map(([k, n]) => `${k} (${n})`).join(', ');
  const avance = filas.length ? Math.round(filas.reduce((s, r) => s + r.p.avance, 0) / filas.length) : 0;

  const t: string[] = [];
  t.push('El plan de mejoramiento recoge las acciones que el programa académico formula a partir de los resultados de la autoevaluación, con el propósito de atender las oportunidades de mejora identificadas y sostener las fortalezas. Su formulación, ejecución y seguimiento son responsabilidad colectiva del equipo de autoevaluación del programa y de las instancias institucionales competentes, en el marco del Sistema Interno de Aseguramiento de la Calidad.');
  const criticas = prioritarias.filter((x) => (x.ev!.rating > 0 && x.ev!.rating < 3) || x.ev!.cnaLevel === 'NC');
  const fortalecer = prioritarias.filter((x) => !criticas.includes(x));
  const lista = (xs: typeof chars) => xs.length <= 15 ? `: ${xs.map((x) => x.c.code).join(', ')}` : ' (ver detalle por característica)';
  t.push(`Se consideran prioritarias las características con valoración inferior a 4,0 o con apreciación del Comité «No se cumple» o «Se cumple insuficientemente». En este ejercicio se identifican ${prioritarias.length} característica(s) prioritaria(s): ${criticas.length} en situación crítica (valoración inferior a 3,0 o calificación NC)${criticas.length ? lista(criticas) : ''}, y ${fortalecer.length} por fortalecer (valoración entre 3,0 y 3,99 o calificación CI)${fortalecer.length ? lista(fortalecer) : ''}.`);
  if (filas.length) {
    t.push(`El plan registra ${filas.length} acción(es) de mejora${top ? `, concentradas principalmente en los factores ${top}` : ''}. Estado de las acciones: ${cuenta('Sin iniciar')} sin iniciar, ${cuenta('En ejecución')} en ejecución, ${cuenta('Cumplida')} cumplida(s), ${cuenta('Vencida')} vencida(s) y ${cuenta('Cancelada')} cancelada(s). El avance promedio reportado es de ${avance} %.`);
  } else {
    t.push('A la fecha de emisión no se han registrado acciones de mejora.');
  }
  if (sinAccion.length) {
    t.push(`Se recomienda formular acciones para las ${sinAccion.length} característica(s) prioritaria(s) que aún no cuentan con ellas${sinAccion.length <= 15 ? `: ${sinAccion.map((x) => x.c.code).join(', ')}` : ', comenzando por las de situación crítica'}.`);
  }
  t.push('Cada acción se formula a partir de su causa raíz, parte de una línea base con fecha, define un indicador y una meta verificables, y se cierra únicamente con evidencia. El seguimiento periódico permitirá actualizar el avance y el estado de cada acción e incorporar sus resultados en el siguiente ciclo de autoevaluación.');
  return t;
}
