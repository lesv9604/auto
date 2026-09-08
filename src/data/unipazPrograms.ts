import { ProgramInfo, CharacteristicEvaluation, ProgramLevel } from '../types';
import { CESU_FACTORS } from './cesuData';

// ─── Estructura real de escuelas y programas ─────────────────────────────────

export interface UnipazProgram {
  name: string;
  level: ProgramLevel;
}

export interface UnipazSchool {
  name: string;
  programs: UnipazProgram[];
}

export const UNIPAZ_SCHOOLS: UnipazSchool[] = [
  {
    name: 'Escuela de Ciencias',
    programs: [
      { name: 'Administración de Negocios Internacionales', level: 'pregrado' },
      { name: 'Ingeniería Informática',                    level: 'pregrado' },
      { name: 'Licenciatura en Artes',                     level: 'pregrado' },
      { name: 'Química',                                   level: 'pregrado' },
      { name: 'Especialización en BigData e Inteligencia de Negocios', level: 'posgrado' },
      { name: 'Especialización en Gerencia de Proyectos Culturales',   level: 'posgrado' },
      { name: 'Maestría en Educación',                                 level: 'posgrado' },
    ],
  },
  {
    name: 'Escuela de Ciencias Sociales y de las Comunicaciones',
    programs: [
      { name: 'Comunicación Social',          level: 'pregrado' },
      { name: 'Trabajo Social',               level: 'pregrado' },
      { name: 'Derecho',                      level: 'pregrado' },
      { name: 'Especialización en Resolución de Conflictos', level: 'posgrado' },
    ],
  },
  {
    name: 'Escuela de Ingeniería Agroindustrial',
    programs: [
      { name: 'Técnico Profesional en Operación del Recurso Energético', level: 'pregrado' },
      { name: 'Tecnología en Procesamiento de Alimentos',                level: 'pregrado' },
      { name: 'Ingeniería Agroindustrial',                               level: 'pregrado' },
      { name: 'Profesional en Turismo',                                  level: 'pregrado' },
      { name: 'Especialización Tecnológica en Control de Calidad de Biocombustibles Líquidos', level: 'posgrado' },
      { name: 'Especialización en Agronegocios',                         level: 'posgrado' },
      { name: 'Especialización en Mercadeo Global Empresarial',          level: 'posgrado' },
      { name: 'Maestría en Logística y Cadena de Suministro',            level: 'posgrado' },
    ],
  },
  {
    name: 'Escuela de Ingeniería Agronómica',
    programs: [
      { name: 'Ingeniería Agronómica', level: 'pregrado' },
    ],
  },
  {
    name: 'Escuela de Ingeniería Ambiental y de Saneamiento',
    programs: [
      { name: 'Ingeniería Civil',                    level: 'pregrado' },
      { name: 'Tecnología en Obras Civiles',         level: 'pregrado' },
      { name: 'Ingeniería Ambiental y de Saneamiento', level: 'pregrado' },
      { name: 'Especialización en Gestión Ambiental', level: 'posgrado' },
    ],
  },
  {
    name: 'Escuela de Ingeniería de Producción',
    programs: [
      { name: 'Tecnología en Operación de Sistemas Electromécanicos',  level: 'pregrado' },
      { name: 'Tecnología en Seguridad y Salud en el Trabajo',         level: 'pregrado' },
      { name: 'Ingeniería de Producción',                              level: 'pregrado' },
      { name: 'Ingeniería en Seguridad y Salud en el Trabajo',         level: 'pregrado' },
      { name: 'Especialización en Seguridad y Salud en el Trabajo',    level: 'posgrado' },
    ],
  },
  {
    name: 'Escuela de Medicina Veterinaria y Zootecnia',
    programs: [
      { name: 'Medicina Veterinaria y Zootecnia',                          level: 'pregrado' },
      { name: 'Especialización en Medicina Interna en Caninos y Felinos',  level: 'posgrado' },
    ],
  },
  {
    name: 'Escuela de Ciencias de la Salud',
    programs: [
      { name: 'Tecnología en Gestión Deportiva y Actividad Física', level: 'pregrado' },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Devuelve solo las escuelas que tienen programas del nivel solicitado */
export function getSchoolsByLevel(level: ProgramLevel): UnipazSchool[] {
  return UNIPAZ_SCHOOLS.map((s) => ({
    ...s,
    programs: s.programs.filter((p) => p.level === level),
  })).filter((s) => s.programs.length > 0);
}

/** Construye un ProgramInfo base a partir de la selección del usuario */
export function buildProgramInfo(school: string, program: string): ProgramInfo {
  return {
    programName: program,
    faculty: school,
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja',
    evaluatorName: '',
    evaluatorRole: 'Comité de Autoevaluación Curricular',
    period: '2026-I',
    evaluationDate: new Date().toISOString().split('T')[0],
    notes: 'Diagnóstico de autoevaluación según Acuerdo CESU 01 de 2025.',
  };
}

// ─── Datos de evaluación ──────────────────────────────────────────────────────

export const DEFAULT_PROGRAM_INFO: ProgramInfo = {
  programName: 'Ingeniería Agroindustrial',
  faculty: 'Escuela de Ingeniería Agroindustrial',
  campus: 'Campus Universitario Santa Rosa, Barrancabermeja',
  evaluatorName: 'Comité de Autoevaluación Curricular',
  evaluatorRole: 'Evaluador Interno de Calidad',
  period: '2026-I',
  evaluationDate: new Date().toISOString().split('T')[0],
  notes: 'Evaluación de diagnóstico según Modelo de Acreditación CESU (Acuerdo 01 de 2025).',
};

export function createBlankEvaluationData(): Record<number, CharacteristicEvaluation> {
  const evaluations: Record<number, CharacteristicEvaluation> = {};
  CESU_FACTORS.forEach((factor) => {
    factor.characteristics.forEach((char) => {
      evaluations[char.id] = {
        characteristicId: char.id,
        factorId: factor.id,
        rating: 3.5,
        weight: char.defaultWeight,
        qualitativeJustification: '',
        actionPlan: '',
        evidences: char.defaultEvidences.map((ev, idx) => ({
          id: `ev-${char.id}-${idx}`,
          label: ev,
          checked: false,
        })),
      };
    });
  });
  return evaluations;
}

export function createDemoEvaluationData(): Record<number, CharacteristicEvaluation> {
  const evaluations: Record<number, CharacteristicEvaluation> = {};

  const demoCustoms: Record<number, { rating: number; justification: string; action: string; checkedIndices: number[] }> = {
    1: { rating: 4.6, justification: 'El PEP está articulado con la visión de desarrollo territorial sostenible del Magdalena Medio.', action: 'Realizar jornadas semestrales de inducción al PEP para docentes nuevos y representantes estudiantiles.', checkedIndices: [0,1,2,3] },
    2: { rating: 4.5, justification: 'Alta pertinencia social del programa al responder a la transformación agroalimentaria y sostenibilidad ambiental.', action: 'Consolidar el observatorio de demandas tecnológicas del sector productivo regional.', checkedIndices: [0,1,2] },
    3: { rating: 4.2, justification: 'Estudiantes participan activamente en semilleros y jornadas de investigación RedCOLSI.', action: 'Incentivar la coautoría estudiantil en publicaciones de investigación.', checkedIndices: [0,1,2,3] },
    4: { rating: 4.3, justification: 'Acompañamiento tutorial continuo por parte de docentes de planta y Bienestar Universitario.', action: 'Perfeccionar la plataforma digital para registro unificado de asesorías.', checkedIndices: [0,1,2] },
    5: { rating: 4.1, justification: 'Aplicación de ABP y proyectos integradores en laboratorios de transformación de alimentos.', action: 'Capacitar docentes en evaluación por competencias y aprendizaje colaborativo.', checkedIndices: [0,1,2,3] },
    6: { rating: 4.4, justification: 'Reglamento estudiantil divulgado. Campañas sobre cultura de paz, equidad de género y no discriminación.', action: 'Fortalecer la ruta de atención integral para la diversidad e inclusión.', checkedIndices: [0,1,2,3] },
    7: { rating: 4.5, justification: 'Excelente cobertura de estímulos: becas, auxilio de transporte y alimentación.', action: 'Ampliar plazas para monitorías de investigación y laboratorio.', checkedIndices: [0,1,2] },
    8: { rating: 4.3, justification: 'Procesos de selección docente mediante concursos públicos de méritos.', action: 'Mantener la periodicidad de los concursos públicos de méritos.', checkedIndices: [0,1,2,3] },
    9: { rating: 4.2, justification: 'Aplicación rigurosa del estatuto profesoral en asignación de escalafón e incentivos.', action: 'Socializar de manera continua las novedades reglamentarias.', checkedIndices: [0,1,2] },
    10: { rating: 4.6, justification: 'Planta docente con títulos de doctorado y maestría en áreas de biotecnología e ingeniería.', action: 'Apoyar comisiones de estudios doctorales para dos profesores de tiempo completo.', checkedIndices: [0,1,2,3] },
    11: { rating: 4.4, justification: 'Plan de cualificación docente semestral en pedagogía universitaria y metodologías de investigación.', action: 'Ofrecer diplomado en evaluación directa de Resultados de Aprendizaje Esperados.', checkedIndices: [0,1,2,3] },
    12: { rating: 4.1, justification: 'Incentivos a la producción científica mediante convocatorias internas.', action: 'Agilizar desembolsos para publicaciones en revistas indexadas.', checkedIndices: [0,1,2] },
    13: { rating: 4.0, justification: 'Elaboración y actualización de guías de laboratorio y módulos didácticos digitales.', action: 'Indexar todos los módulos en el Repositorio Digital Institucional.', checkedIndices: [0,1,2,3] },
    14: { rating: 4.3, justification: 'Sistema integral de evaluación docente con retroalimentación para planes de mejoramiento.', action: 'Asegurar la entrega oportuna de reportes individuales de evaluación docente.', checkedIndices: [0,1,2,3] },
    15: { rating: 3.9, justification: 'Observatorio de Egresados en funcionamiento, con participación en comités curriculares.', action: 'Implementar la plataforma interactiva para seguimiento laboral de graduados.', checkedIndices: [0,1,2] },
    16: { rating: 4.2, justification: 'Egresados destacados en dirección de plantas agroindustriales y proyectos de emprendimiento.', action: 'Crear el catálogo de casos de éxito de egresados del programa.', checkedIndices: [0,1,2,3] },
    17: { rating: 4.4, justification: 'Malla curricular flexible con electivas en procesamiento de cárnicos, lácteos y biotecnología.', action: 'Aumentar la oferta de asignaturas electivas interdisciplinares.', checkedIndices: [0,1,2,3] },
    18: { rating: 4.3, justification: 'Estrategias pedagógicas coherentes con el modelo constructivista y experimentación práctica.', action: 'Continuar fortaleciendo las salidas de campo a empresas del sector.', checkedIndices: [0,1,2] },
    19: { rating: 4.2, justification: 'Sistema de evaluación continuo, transparente y formativo con criterios en los sílabos.', action: 'Promover uso estandarizado de rúbricas socioformativas en todas las asignaturas.', checkedIndices: [0,1,2,3] },
    20: { rating: 4.1, justification: 'Análisis sistemático de resultados en pruebas Saber Pro para realimentar módulos.', action: 'Implementar simulación de pruebas Saber Pro desde el séptimo semestre.', checkedIndices: [0,1,2,3] },
    21: { rating: 4.5, justification: 'Articulación clara de los RAE con el perfil profesional del egresado.', action: 'Realizar auditoría anual al cumplimiento de RAE por área de conocimiento.', checkedIndices: [0,1,2,3] },
    22: { rating: 4.3, justification: 'Tasa de deserción inferior al promedio nacional gracias al acompañamiento temprano.', action: 'Fortalecer el sistema de alertas tempranas SPADIES / UNIPAZ.', checkedIndices: [0,1,2,3] },
    23: { rating: 4.2, justification: 'Sistemas de alerta temprana operando en la plataforma de notas.', action: 'Articular de forma inmediata la alerta con tutorías de ciencias básicas.', checkedIndices: [0,1,2] },
    24: { rating: 4.0, justification: 'Cursos nivelatorios en matemáticas y química básica en las primeras semanas de semestre.', action: 'Institucionalizar el curso de nivelación cuantitativa para estudiantes de primer ingreso.', checkedIndices: [0,1,2,3] },
    25: { rating: 4.4, justification: 'Diversidad de modalidades de grado que agilizan la titulación.', action: 'Simplificar los tiempos de respuesta en la aprobación de trabajos de grado.', checkedIndices: [0,1,2,3] },
    26: { rating: 4.2, justification: 'Convenios de movilidad con universidades acreditadas de Colombia y la región andina.', action: 'Firmar convenio de doble titulación con universidades internacionales.', checkedIndices: [0,1,2] },
    27: { rating: 4.6, justification: 'Fuerte vinculación con asociaciones de pequeños productores y cooperativas de Yariguíes.', action: 'Sistematizar los indicadores de transferencia tecnológica en el campo.', checkedIndices: [0,1,2,3] },
    28: { rating: 3.8, justification: 'Exigencia de nivel B1 de inglés, con margen de mejora en fluidez verbal.', action: 'Aumentar lecturas técnicas en inglés dentro de asignaturas de especialidad.', checkedIndices: [0,1,2] },
    29: { rating: 4.7, justification: 'Proyectos de proyección social reconocidos por su aporte a la seguridad alimentaria.', action: 'Postular los proyectos a premios de innovación social universitaria.', checkedIndices: [0,1,2,3] },
    30: { rating: 4.4, justification: 'Grupos de investigación categorizados en MinCiencias en áreas agroindustrial y ambiental.', action: 'Adquirir nuevos reactivos y equipos para la línea de bioprocesos.', checkedIndices: [0,1,2,3] },
    31: { rating: 4.3, justification: 'Publicación de artículos en revistas indexadas de alcance nacional e internacional.', action: 'Incrementar la producción en revistas Scopus Q1 y Q2.', checkedIndices: [0,1,2,3] },
    32: { rating: 4.5, justification: 'Líneas de investigación en aprovechamiento de subproductos agroindustriales.', action: 'Mantener la revisión trienal de las líneas investigativas.', checkedIndices: [0,1,2,3] },
    33: { rating: 4.3, justification: 'Semilleros de investigación activos con ponencias en RedCOLSI.', action: 'Financiar la asistencia de semilleristas a congresos internacionales.', checkedIndices: [0,1,2,3] },
    34: { rating: 4.2, justification: 'Resultados de investigación incorporados en bibliografía y guías didácticas.', action: 'Publicar el libro de texto sobre procesos agroindustriales del trópico.', checkedIndices: [0,1,2] },
    35: { rating: 4.6, justification: 'Investigaciones enfocadas en problemáticas de cultivo de palma, cacao y ganadería.', action: 'Fortalecer alianzas con Federación Nacional de Cacaoteros y Fedepalma.', checkedIndices: [0,1,2,3] },
    36: { rating: 4.4, justification: 'Servicios de Bienestar Universitario con enfoques de inclusión y diversidad.', action: 'Difundir los programas de bienestar a través de redes sociales.', checkedIndices: [0,1,2,3] },
    37: { rating: 4.5, justification: 'Promoción activa de salud mental, deporte formativo y grupos culturales en campus.', action: 'Aumentar frecuencias del transporte institucional para eventos nocturnos.', checkedIndices: [0,1,2,3] },
    38: { rating: 4.3, justification: 'Escenarios deportivos e infraestructura de bienestar en buen estado de conservación.', action: 'Adecuar zonas de sombra y esparcimiento adicionales al aire libre.', checkedIndices: [0,1,2] },
    39: { rating: 4.3, justification: 'Laboratorios de química, microbiología y planta piloto equipados para enseñanza práctica.', action: 'Adquirir viscosímetro de precisión para análisis de alimentos.', checkedIndices: [0,1,2,3] },
    40: { rating: 4.4, justification: 'Uso intensivo de laboratorios para la consecución de competencias experimentales.', action: 'Optimizar los horarios de uso de la planta piloto agroindustrial.', checkedIndices: [0,1,2,3] },
    41: { rating: 4.2, justification: 'Suscripción activa a bases de datos científicas (Scopus, ScienceDirect, e-libro).', action: 'Realizar talleres de capacitación en búsqueda bibliográfica avanzada.', checkedIndices: [0,1,2,3] },
    42: { rating: 4.4, justification: 'Aulas dotadas con videobeam, aire acondicionado, Wi-Fi y protocolos de bioseguridad.', action: 'Continuar el plan de mantenimiento preventivo del sistema de climatización.', checkedIndices: [0,1,2,3] },
    43: { rating: 4.3, justification: 'Estructura organizacional eficiente con comité de programa y consejo de escuela.', action: 'Publicar actas resumidas de comités en la intranet para consulta pública.', checkedIndices: [0,1,2,3] },
    44: { rating: 4.2, justification: 'Sostenibilidad operativa y equilibrio en capacidades del programa.', action: 'Mantener la proyección presupuestal trienal del programa.', checkedIndices: [0,1,2] },
    45: { rating: 4.5, justification: 'Liderazgo comprometido de la Dirección de Programa en procesos de autoevaluación.', action: 'Participar en redes nacionales de directores de programas agroindustriales.', checkedIndices: [0,1,2,3] },
    46: { rating: 4.1, justification: 'Plataforma web e intranet activas para consulta de notas y trámites académicos.', action: 'Actualizar periódicamente las noticias y logros en el portal oficial.', checkedIndices: [0,1,2] },
    47: { rating: 4.3, justification: 'Inversiones continuas en modernización de laboratorios y dotación tecnológica.', action: 'Priorizar proyectos de renovación de equipos en el plan anual de compras.', checkedIndices: [0,1,2,3] },
    48: { rating: 4.4, justification: 'Asignación presupuestal garantizada para clases, laboratorios y salidas de campo.', action: 'Gestionar recursos adicionales mediante convenios con el sector privado.', checkedIndices: [0,1,2,3] },
    49: { rating: 4.6, justification: 'Participación masiva de docentes, estudiantes y egresados en autoevaluación CESU 2025.', action: 'Mantener las mesas de trabajo estamentarias para seguimiento continuo.', checkedIndices: [0,1,2,3] },
    50: { rating: 4.5, justification: 'Repositorio de evidencias digitales documentadas y trazables para pares evaluadores.', action: 'Efectuar auditoría interna previa a la radicación del informe final.', checkedIndices: [0,1,2,3] },
    51: { rating: 4.7, justification: 'Cultura de la calidad consolidada a través del SIAC UNIPAZ.', action: 'Institucionalizar el tablero digital de control del Plan de Mejoramiento.', checkedIndices: [0,1,2,3] },
  };

  CESU_FACTORS.forEach((factor) => {
    factor.characteristics.forEach((char) => {
      const demo = demoCustoms[char.id];
      evaluations[char.id] = {
        characteristicId: char.id,
        factorId: factor.id,
        rating: demo?.rating ?? 4.2,
        weight: char.defaultWeight,
        qualitativeJustification: demo?.justification ?? 'Evaluación satisfactoria en el diagnóstico de autoevaluación.',
        actionPlan: demo?.action ?? 'Continuar con el plan de desarrollo del programa académico.',
        evidences: char.defaultEvidences.map((ev, idx) => ({
          id: `ev-${char.id}-${idx}`,
          label: ev,
          checked: demo?.checkedIndices.includes(idx) ?? true,
        })),
      };
    });
  });

  return evaluations;
}
