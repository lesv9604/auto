import { ProgramInfo, CharacteristicEvaluation } from '../types';
import { CESU_FACTORS } from './cesuData';

export const UNIPAZ_PROGRAMS = [
  {
    name: 'Ingeniería Agroindustrial',
    faculty: 'Escuela de Ingeniería de Producción',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Ingeniería Ambiental y Sanitaria',
    faculty: 'Escuela de Ingeniería de Producción',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Ingeniería Agronómica',
    faculty: 'Escuela de Ciencias Agrarias',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Medicina Veterinaria y Zootecnia',
    faculty: 'Escuela de Ciencias Agrarias',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Ingeniería de Petróleos',
    faculty: 'Escuela de Ingeniería de Producción',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Licenciatura en Artes',
    faculty: 'Escuela de Ciencias Sociales y Humanidades',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Trabajo Social',
    faculty: 'Escuela de Ciencias Sociales y Humanidades',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  },
  {
    name: 'Administración en Negocios Internacionales',
    faculty: 'Escuela de Ciencias Administrativas y Contables',
    campus: 'Campus Universitario Santa Rosa, Barrancabermeja'
  }
];

export const DEFAULT_PROGRAM_INFO: ProgramInfo = {
  programName: 'Ingeniería Agroindustrial',
  faculty: 'Escuela de Ingeniería de Producción',
  campus: 'Campus Universitario Santa Rosa - UNIPAZ',
  evaluatorName: 'Comité de Autoevaluación Curricular',
  evaluatorRole: 'Evaluador Interno de Calidad',
  period: '2026-I',
  evaluationDate: new Date().toISOString().split('T')[0],
  notes: 'Evaluación de diagnóstico según Modelo de Acreditación CESU (Acuerdo 01 de 2025).'
};

export function createBlankEvaluationData(): Record<number, CharacteristicEvaluation> {
  const evaluations: Record<number, CharacteristicEvaluation> = {};

  CESU_FACTORS.forEach((factor) => {
    factor.characteristics.forEach((char) => {
      evaluations[char.id] = {
        characteristicId: char.id,
        factorId: factor.id,
        rating: 3.5, // Default neutral
        weight: char.defaultWeight,
        qualitativeJustification: '',
        actionPlan: '',
        evidences: char.defaultEvidences.map((ev, idx) => ({
          id: `ev-${char.id}-${idx}`,
          label: ev,
          checked: false
        }))
      };
    });
  });

  return evaluations;
}

export function createDemoEvaluationData(): Record<number, CharacteristicEvaluation> {
  const evaluations: Record<number, CharacteristicEvaluation> = {};

  // Custom initial demo evaluations for 51 characteristics
  const demoCustoms: Record<number, { rating: number; justification: string; action: string; checkedIndices: number[] }> = {
    1: {
      rating: 4.6,
      justification: 'El PEP de Ingeniería Agroindustrial de UNIPAZ está totalmente articulado con la visión de desarrollo territorial sostenible del Magdalena Medio. Ampliamente socializado con la comunidad.',
      action: 'Realizar jornadas semestrales de inducción al PEP para docentes nuevos y representantes estudiantiles.',
      checkedIndices: [0, 1, 2, 3]
    },
    2: {
      rating: 4.5,
      justification: 'Alta pertinencia social del programa al responder a la transformación agroalimentaria, seguridad alimentaria y sostenibilidad ambiental en Barrancabermeja y Santander.',
      action: 'Consolidar el observatorio de demandas tecnológicas del sector productivo regional.',
      checkedIndices: [0, 1, 2]
    },
    3: {
      rating: 4.2,
      justification: 'Estudiantes participan activamente en semilleros, jornadas de investigación de RedCOLSI y eventos deportivos/culturales institucionales.',
      action: 'Incentivar la coautoría estudiantil en publicaciones de investigación y creación.',
      checkedIndices: [0, 1, 2, 3]
    },
    4: {
      rating: 4.3,
      justification: 'Acompañamiento tutorial continuo a estudiantes por parte de docentes de planta y profesionales de Bienestar Universitario.',
      action: 'Perfeccionar la plataforma digital para el registro unificado de asesorías académicas.',
      checkedIndices: [0, 1, 2]
    },
    5: {
      rating: 4.1,
      justification: 'Aplicación de aprendizaje basado en problemas (ABP) y proyectos integradores en los laboratorios de transformación de alimentos.',
      action: 'Capacitar docentes en evaluación por competencias y aprendizaje colaborativo activo.',
      checkedIndices: [0, 1, 2, 3]
    },
    6: {
      rating: 4.4,
      justification: 'Reglamento estudiantil divulgado. Campañas permanentes sobre cultura de paz, equidad de género, antirracismo y no discriminación.',
      action: 'Fortalecer la ruta de atención integral para la diversidad e inclusión en el campus.',
      checkedIndices: [0, 1, 2, 3]
    },
    7: {
      rating: 4.5,
      justification: 'Excelente cobertura de estímulos: becas por promedio, auxilio de transporte institucional y auxilio de alimentación.',
      action: 'Ampliar el número de plazas para monitorías de investigación y de laboratorio.',
      checkedIndices: [0, 1, 2]
    },
    8: {
      rating: 4.3,
      justification: 'Procesos de selección docente mediante concursos públicos de méritos en UNIPAZ, con criterios claros de idoneidad.',
      action: 'Mantener la periodicidad de los concursos públicos de méritos para planta docente.',
      checkedIndices: [0, 1, 2, 3]
    },
    9: {
      rating: 4.2,
      justification: 'Aplicación rigurosa del estatuto profesoral en la asignación de escalafón docente e incentivos académicos.',
      action: 'Socializar de manera continua las novedades reglamentarias en el comité docente.',
      checkedIndices: [0, 1, 2]
    },
    10: {
      rating: 4.6,
      justification: 'Planta docente altamente calificada con títulos de doctorado y maestría en áreas de biotecnología, ingeniería y ciencias agrarias.',
      action: 'Apoyar la comisión de estudios doctorales para dos profesores de tiempo completo.',
      checkedIndices: [0, 1, 2, 3]
    },
    11: {
      rating: 4.4,
      justification: 'Ejecución semestral del plan de cualificación docente en pedagogía universitaria, TICs y metodologías de investigación.',
      action: 'Ofrecer diplomado en evaluación directa de Resultados de Aprendizaje Esperados (RAE).',
      checkedIndices: [0, 1, 2, 3]
    },
    12: {
      rating: 4.1,
      justification: 'Incentivos a la producción científica y tecnológica mediante convocatorias internas y exención de carga lectiva.',
      action: 'Agilizar los desembolsos para financiación de publicaciones en revistas indexadas.',
      checkedIndices: [0, 1, 2]
    },
    13: {
      rating: 4.0,
      justification: 'Elaboración y actualización de guías de laboratorio y módulos didácticos digitales por parte de los docentes.',
      action: 'Indexar todos los módulos de asignatura en el Repositorio Digital Institucional de UNIPAZ.',
      checkedIndices: [0, 1, 2, 3]
    },
    14: {
      rating: 4.3,
      justification: 'Sistema integral de evaluación docente (estudiantes, auto y jefe inmediato) con retroalimentación para planes de mejoramiento.',
      action: 'Asegurar la entrega oportuna de los reportes individuales de evaluación docente.',
      checkedIndices: [0, 1, 2, 3]
    },
    15: {
      rating: 3.9,
      justification: 'Base de datos del Observatorio de Egresados en funcionamiento, con participación en comités curriculares.',
      action: 'Implementar la nueva plataforma interactiva para el seguimiento laboral de graduados UNIPAZ.',
      checkedIndices: [0, 1, 2]
    },
    16: {
      rating: 4.2,
      justification: 'Egresados destacados en la dirección de plantas agroindustriales, entidades de desarrollo rural y proyectos de emprendimiento.',
      action: 'Crear el catálogo de casos de éxito y reconocimientos de egresados del programa.',
      checkedIndices: [0, 1, 2, 3]
    },
    17: {
      rating: 4.4,
      justification: 'Malla curricular flexible con electivas de profundizar en procesamiento de cárnicos, lácteos, frutas y biotecnología.',
      action: 'Aumentar la oferta de asignaturas electivas interdisciplinares en proyectos sostenibles.',
      checkedIndices: [0, 1, 2, 3]
    },
    18: {
      rating: 4.3,
      justification: 'Estrategias pedagógicas coherentes con el modelo constructivista y la experimentación práctica en campus Santa Rosa.',
      action: 'Continuar fortaleciendo las salidas de campo a empresas del sector agroindustrial.',
      checkedIndices: [0, 1, 2]
    },
    19: {
      rating: 4.2,
      justification: 'Sistema de evaluación continuo, transparente y formativo con criterios publicados oportunamente en los sílabos.',
      action: 'Promover el uso estandarizado de rúbricas socioformativas en todas las asignaturas.',
      checkedIndices: [0, 1, 2, 3]
    },
    20: {
      rating: 4.1,
      justification: 'Análisis sistemático de los resultados en las pruebas Saber Pro para realimentar los módulos de competencias ciudadanas e inglés.',
      action: 'Implementar simulación de pruebas Saber Pro desde el séptimo semestre.',
      checkedIndices: [0, 1, 2, 3]
    },
    21: {
      rating: 4.5,
      justification: 'Articulación clara de los Resultados de Aprendizaje Esperados (RAE) con el perfil profesional del Ingeniero Agroindustrial.',
      action: 'Realizar auditoría anual al cumplimiento de RAE por área de conocimiento.',
      checkedIndices: [0, 1, 2, 3]
    },
    22: {
      rating: 4.3,
      justification: 'Tasa de deserción en niveles inferiores al promedio nacional del área, gracias al acompañamiento temprano.',
      action: 'Fortalecer el sistema de alertas tempranas SPADIES / UNIPAZ.',
      checkedIndices: [0, 1, 2, 3]
    },
    23: {
      rating: 4.2,
      justification: 'Sistemas de alerta temprana operando en la plataforma de notas para detectar bajo rendimiento académicos antes del segundo corte.',
      action: 'Articular de forma inmediata la alerta con las tutorías de ciencias básicas.',
      checkedIndices: [0, 1, 2]
    },
    24: {
      rating: 4.0,
      justification: 'Cursos nivelatorios en matemáticas y química básica dictados durante las primeras semanas de semestre.',
      action: 'Institucionalizar el curso de nivelación cuantitativa para estudiantes de primer ingreso.',
      checkedIndices: [0, 1, 2, 3]
    },
    25: {
      rating: 4.4,
      justification: 'Diversidad de modalidades de grado (pasantía profesional, proyecto investigativo, diplomado) que agilizan la titulación.',
      action: 'Simplificar los tiempos de respuesta en la aprobación de trabajos de grado.',
      checkedIndices: [0, 1, 2, 3]
    },
    26: {
      rating: 4.2,
      justification: 'Convenios de movilidad e interacción con universidades acreditadas de Colombia y la región andina.',
      action: 'Firmar convenio de doble titulación o intercambio con universidades internacionales.',
      checkedIndices: [0, 1, 2]
    },
    27: {
      rating: 4.6,
      justification: 'Fuerte vinculación con asociaciones de pequeños productores agrícolas y cooperativas de la provincia de Yariguíes.',
      action: 'Sistematizar los indicadores de transferencia tecnológica en el campo.',
      checkedIndices: [0, 1, 2, 3]
    },
    28: {
      rating: 3.8,
      justification: 'Exigencia de nivel B1 de inglés en el Centro de Idiomas de UNIPAZ, con margen de mejora en la fluidez verbal.',
      action: 'Aumentar las lecturas técnicas en inglés dentro de las asignaturas de especialidad.',
      checkedIndices: [0, 1, 2]
    },
    29: {
      rating: 4.7,
      justification: 'Proyectos de proyección social reconocidos en el territorio por su aporte a la seguridad alimentaria e innovación rural.',
      action: 'Postular los proyectos a premios de innovación social universitaria.',
      checkedIndices: [0, 1, 2, 3]
    },
    30: {
      rating: 4.4,
      justification: 'Grupos de investigación categorizados en MinCiencias en el área agroindustrial y ambiental con recursos del presupuesto de UNIPAZ.',
      action: 'Adquirir nuevos reactivos y equipos para la línea de bioprocesos.',
      checkedIndices: [0, 1, 2, 3]
    },
    31: {
      rating: 4.3,
      justification: 'Publicación de artículos en revistas indexadas de alcance nacional e internacional por parte de docentes investigadores.',
      action: 'Incrementar la producción en revistas Scopus Q1 y Q2.',
      checkedIndices: [0, 1, 2, 3]
    },
    32: {
      rating: 4.5,
      justification: 'Líneas de investigación en aprovechamiento de subproductos agroindustriales totalmente alineadas con la vocación del programa.',
      action: 'Mantener la revisión trienal de las líneas investigativas.',
      checkedIndices: [0, 1, 2, 3]
    },
    33: {
      rating: 4.3,
      justification: 'Semilleros de investigación muy activos con ponencias regionales y nacionales en RedCOLSI.',
      action: 'Financiar la asistencia de semilleristas a congresos internacionales.',
      checkedIndices: [0, 1, 2, 3]
    },
    34: {
      rating: 4.2,
      justification: 'Resultados de investigación docentes son incorporados en la bibliografía y desarrollo de guías didácticas.',
      action: 'Publicar el libro de texto del programa sobre procesos agroindustriales del trópico.',
      checkedIndices: [0, 1, 2]
    },
    35: {
      rating: 4.6,
      justification: 'Investigaciones enfocadas en atender problemáticas del cultivo de palma, cacaotero, ganadería y pesca del Magdalena Medio.',
      action: 'Fortalecer las alianzas con la Federación Nacional de Cacaoteros y Fedepalma.',
      checkedIndices: [0, 1, 2, 3]
    },
    36: {
      rating: 4.4,
      justification: 'Servicios de Bienestar Universitario abiertos a toda la comunidad con enfoques de inclusión, diversidad e igualdad.',
      action: 'Difundir los programas de bienestar a través de canales digitales y redes sociales.',
      checkedIndices: [0, 1, 2, 3]
    },
    37: {
      rating: 4.5,
      justification: 'Promoción activa de la salud mental, deporte formativo y grupos culturales en el campus Santa Rosa.',
      action: 'Aumentar las frecuencias del transporte institucional para eventos nocturnos.',
      checkedIndices: [0, 1, 2, 3]
    },
    38: {
      rating: 4.3,
      justification: 'Escenarios deportivos (canchas, zonas verdes, gimnasio) e infraestructura de bienestar en buen estado de conservación.',
      action: 'Adecuar zonas de sombra y esparcimiento al aire libre adicionales.',
      checkedIndices: [0, 1, 2]
    },
    39: {
      rating: 4.3,
      justification: 'Laboratorios de química, microbiología, operaciones unitarias y planta piloto equipados para la enseñanza práctica.',
      action: 'Adquirir un viscosímetro de precisión para el laboratorio de análisis de alimentos.',
      checkedIndices: [0, 1, 2, 3]
    },
    40: {
      rating: 4.4,
      justification: 'Uso intensivo de laboratorios y plantas piloto para la consecución de las competencias experimentales de los estudiantes.',
      action: 'Optimizar los horarios de uso de la planta piloto agroindustrial.',
      checkedIndices: [0, 1, 2, 3]
    },
    41: {
      rating: 4.2,
      justification: 'Suscripción activa a bases de datos digitales científicas (Scopus, ScienceDirect, e-libro) y biblioteca física.',
      action: 'Realizar talleres de capacitación en búsqueda bibliográfica en bases de datos.',
      checkedIndices: [0, 1, 2, 3]
    },
    42: {
      rating: 4.4,
      justification: 'Aulas dotadas con videobeam, aire acondicionado, conectividad Wi-Fi y protocolos de bioseguridad en el campus Santa Rosa.',
      action: 'Continuar con el plan de mantenimiento preventivo del sistema de climatización.',
      checkedIndices: [0, 1, 2, 3]
    },
    43: {
      rating: 4.3,
      justification: 'Estructura organizacional eficiente con comité de programa y consejo de escuela sesionando regularmente.',
      action: 'Publicar las actas resumidas de comités en la intranet para consulta pública.',
      checkedIndices: [0, 1, 2, 3]
    },
    44: {
      rating: 4.2,
      justification: 'Sostenibilidad operativa y equilibrio en las capacidades del programa frente a la demanda estudiantil.',
      action: 'Mantener la proyección presupuestal trienal del programa.',
      checkedIndices: [0, 1, 2]
    },
    45: {
      rating: 4.5,
      justification: 'Liderazgo comprometido de la Dirección de Programa y equipo docente en los procesos de autoevaluación.',
      action: 'Participar en redes nacionales de directores de programas agroindustriales.',
      checkedIndices: [0, 1, 2, 3]
    },
    46: {
      rating: 4.1,
      justification: 'Plataforma web e intranet de UNIPAZ activas para consulta de notas, trámites y solicitudes académicas.',
      action: 'Actualizar periódicamente las noticias y logros en el portal oficial del programa.',
      checkedIndices: [0, 1, 2]
    },
    47: {
      rating: 4.3,
      justification: 'Inversiones continuas en la modernización de laboratorios y dotación tecnológica durante los últimos 5 años.',
      action: 'Priorizar proyectos de renovación de equipos en el plan anual de compras.',
      checkedIndices: [0, 1, 2, 3]
    },
    48: {
      rating: 4.4,
      justification: 'Asignación presupuestal institucional garantizada para el normal desarrollo de las clases, laboratorios y salidas de campo.',
      action: 'Gestión de recursos adicionales mediante convenios de extensión con el sector privado.',
      checkedIndices: [0, 1, 2, 3]
    },
    49: {
      rating: 4.6,
      justification: 'Participación masiva y reflexiva de docentes, estudiantes y egresados en el proceso de autoevaluación con fines de acreditación CESU 2025.',
      action: 'Mantener las mesas de trabajo estamentarias para el seguimiento continuo.',
      checkedIndices: [0, 1, 2, 3]
    },
    50: {
      rating: 4.5,
      justification: 'Consolidación del repositorio de evidencias digitales documentadas y trazables para el análisis de los pares evaluadores del CNA.',
      action: 'Efectuar auditoría interna previa a la radicación del informe final.',
      checkedIndices: [0, 1, 2, 3]
    },
    51: {
      rating: 4.7,
      justification: 'Cultura de la calidad consolidada a través del SIAC UNIPAZ, con evidencias de cumplimiento en planes de mejoramiento anteriores.',
      action: 'Institucionalizar el tablero digital de control de avance del Plan de Mejoramiento del Programa.',
      checkedIndices: [0, 1, 2, 3]
    }
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
          checked: demo?.checkedIndices.includes(idx) ?? true
        }))
      };
    });
  });

  return evaluations;
}
