import { FactorDef } from '../types';

export const CESU_FACTORS: FactorDef[] = [
  {
    id: 1,
    code: 'F1',
    name: 'Proyecto educativo del programa e identidad institucional',
    description: 'Coherencia entre el proyecto educativo del programa académico, la misión, visión e identidad institucional de UNIPAZ, así como la relevancia académica y pertinencia social en el territorio.',
    characteristics: [
      {
        id: 1,
        factorId: 1,
        code: 'C1.1',
        title: 'Proyecto educativo del programa',
        description: 'Coherencia del proyecto educativo del programa académico (PEP) con la misión e identidad de UNIPAZ, orientando el desarrollo de las labores formativas, académicas, docentes, de investigación y extensión.',
        defaultWeight: 9,
        defaultEvidences: [
          'Documento Maestro del Proyecto Educativo del Programa (PEP) actualizado y aprobado',
          'Alineación formal del PEP con el Proyecto Educativo Institucional (PEI) de UNIPAZ',
          'Evidencias de jornadas de socialización del PEP con docentes, estudiantes y egresados',
          'Mecanismos de evaluación y actualización periódica del PEP'
        ]
      },
      {
        id: 2,
        factorId: 1,
        code: 'C1.2',
        title: 'Relevancia académica y pertinencia social del programa académico',
        description: 'Respuesta del programa a las necesidades locales, regionales, nacionales o internacionales sustentadas en el entorno territorial (Magdalena Medio y Santander).',
        defaultWeight: 9,
        defaultEvidences: [
          'Estudios de pertinencia social y demanda laboral en la región de Barrancabermeja y Magdalena Medio',
          'Articulación con las apuestas productivas, ambientales y culturales del territorio',
          'Evaluación periódica del impacto del programa en el entorno socioeconómico',
          'Retroalimentación de gremios, sector público y comunidades regionales'
        ]
      }
    ]
  },
  {
    id: 2,
    code: 'F2',
    name: 'Comunidad de estudiantes',
    description: 'Desarrollo integral de los estudiantes, participación en formación integral, acompañamiento académico, autonomía, perspectiva de género, inclusión y estímulos.',
    characteristics: [
      {
        id: 3,
        factorId: 2,
        code: 'C3',
        title: 'Incidencia de las actividades de formación integral',
        description: 'Participación activa de los estudiantes en investigación, innovación, extensión, actividades artísticas, culturales, deportivas e internacionales que inciden en su perfil formativo.',
        defaultWeight: 8,
        defaultEvidences: [
          'Registro de participación estudiantil en semilleros de investigación y proyectos de extensión',
          'Participación en eventos académicos, culturales, deportivos y de innovación regional/nacional',
          'Portafolio de actividades de formación integral ofertadas en el programa',
          'Evaluación del impacto de la formación integral en el desempeño estudiantil'
        ]
      },
      {
        id: 4,
        factorId: 2,
        code: 'C4',
        title: 'Orientación, acompañamiento y seguimiento a estudiantes',
        description: 'Procesos de orientación vocacional, inductiva, tutorial y académica integral para favorecer la permanencia y graduación oportuna.',
        defaultWeight: 8,
        defaultEvidences: [
          'Programa formal de inducción y adaptación a la vida universitaria en UNIPAZ',
          'Sistema institucional de tutorías académicas y acompañamiento psicológico',
          'Mecanismos de seguimiento al desempeño académico en riesgo o bajo rendimiento',
          'Indicadores de satisfacción estudiantil sobre los servicios de acompañamiento'
        ]
      },
      {
        id: 5,
        factorId: 2,
        code: 'C5',
        title: 'Estrategias pedagógicas para el fortalecimiento de la autonomía y el trabajo colaborativo',
        description: 'Desarrollo de capacidades para el trabajo autónomo, el aprendizaje colaborativo y la responsabilidad social en entornos participativos.',
        defaultWeight: 8,
        defaultEvidences: [
          'Metodologías activas de aprendizaje implementadas en los sílabos del programa',
          'Proyectos integradores interdisciplinarios y aprendizaje basado en problemas (ABP)',
          'Uso de plataformas virtuales (Moodle/UNIPAZ Virtual) para el trabajo autónomo',
          'Evaluación cualitativa del desarrollo de la autonomía y liderazgo colaborativo'
        ]
      },
      {
        id: 6,
        factorId: 2,
        code: 'C6',
        title: 'Políticas académicas, cultura de paz, antirracismo e inclusión',
        description: 'Divulgación y aplicación del reglamento estudiantil, régimen disciplinario, cultura de paz, antirracismo, perspectiva de género y atención a poblaciones diversas.',
        defaultWeight: 9,
        defaultEvidences: [
          'Reglamento estudiantil actualizado, publicado y socializado en la comunidad UNIPAZ',
          'Políticas institucionales de equidad de género, inclusión y no discriminación',
          'Talleres y protocolos de prevención de violencias de género y antirracismo',
          'Acompañamiento a estudiantes de grupos étnicos, víctimas del conflicto y poblaciones vulnerables'
        ]
      },
      {
        id: 7,
        factorId: 2,
        code: 'C7',
        title: 'Estímulos y apoyos para estudiantes, diversidad e inclusión',
        description: 'Otorgamiento de becas, auxilios socioeconómicos, monitorías, estímulos al rendimiento académico destacado y apoyos para la diversidad.',
        defaultWeight: 8,
        defaultEvidences: [
          'Resoluciones de asignación de becas, auxilio alimentario y de transporte institucional',
          'Reglamento y actas de vinculación de monitores académicos y de investigación',
          'Registros de estímulos a los mejores promedios y deportistas destacados',
          'Evaluación de la cobertura de los apoyos frente a las condiciones socioeconómicas'
        ]
      }
    ]
  },
  {
    id: 3,
    code: 'F3',
    name: 'Comunidad de profesores',
    description: 'Cuerpo docente, selección, idoneidad, estatuto profesoral, desarrollo pedagógico e investigativo, producción de material y evaluación integral.',
    characteristics: [
      {
        id: 8,
        factorId: 3,
        code: 'C8',
        title: 'Selección, vinculación y permanencia de profesores',
        description: 'Criterios transparentes de selección, méritos académicos, vinculación idónea y permanencia profesoral para el mejoramiento del programa.',
        defaultWeight: 9,
        defaultEvidences: [
          'Convocatorias públicas de méritos y actas de selección docente',
          'Hojas de vida verificadas en CvLAC/SIGEP de la planta profesoral',
          'Distribución de dedicación laboral (tiempo completo, medio tiempo, catedrático)',
          'Tasa de permanencia y estabilidad del cuerpo docente del programa'
        ]
      },
      {
        id: 9,
        factorId: 3,
        code: 'C9',
        title: 'Estatuto, trayectoria y reconocimiento profesoral',
        description: 'Aplicación del estatuto profesoral, escalafón docente, reconocimientos a los méritos académicos, investigativos y profesionales.',
        defaultWeight: 8,
        defaultEvidences: [
          'Estatuto profesoral vigente de UNIPAZ con criterios de ascenso en el escalafón',
          'Resoluciones de clasificación y ascenso en el escalafón docente',
          'Premios, reconocimientos y distinción a la labor docente e investigativa',
          'Evaluación de la transparencia en la aplicación de los derechos y deberes docentes'
        ]
      },
      {
        id: 10,
        factorId: 3,
        code: 'C10',
        title: 'Planta profesoral para materializar el proyecto educativo',
        description: 'Suficiencia en cantidad, calidad, nivel de posgrado (doctorado, maestría) y dedicación de la planta profesoral para cubrir las necesidades formativas.',
        defaultWeight: 10,
        defaultEvidences: [
          'Estadísticas de formación de posgrado de los docentes (doctorados, maestrías, especializaciones)',
          'Planes de trabajo anuales docentes asignados a docencia, investigación y extensión',
          'Relación de número de estudiantes por profesor de tiempo completo equivalente',
          'Cobertura de las áreas de conocimiento del plan de estudios por especialistas'
        ]
      },
      {
        id: 11,
        factorId: 3,
        code: 'C11',
        title: 'Capacidades, procesos y resultados del desarrollo profesoral',
        description: 'Planes de capacitación pedagógica, actualización en TICs, formación avanzada y resultados del perfeccionamiento docente.',
        defaultWeight: 8,
        defaultEvidences: [
          'Plan anual de cualificación y capacitación docente ejecutado en UNIPAZ',
          'Participación en diplomados de pedagogía universitaria y uso de herramientas digitales',
          'Apoyos institucionales y licencias para la realización de doctorados y maestrías',
          'Evaluación de la incidencia de las capacitaciones en las prácticas de aula'
        ]
      },
      {
        id: 12,
        factorId: 3,
        code: 'C12',
        title: 'Coherencia entre estímulos a la trayectoria e incentivos',
        description: 'Políticas de estímulos e incentivos económicos o académicos alineados con los logros formativos, la investigación y la proyección social.',
        defaultWeight: 8,
        defaultEvidences: [
          'Reglamento de incentivos por producción científica, patentes y libros',
          'Apoyo financiero para ponencia en eventos internacionales y nacionales',
          'Asignación de descargas de horas lectivas para proyectos de investigación o extensión',
          'Evaluación de la satisfacción profesoral con el sistema de incentivos'
        ]
      },
      {
        id: 13,
        factorId: 3,
        code: 'C13',
        title: 'Producción, pertinencia e impacto de material docente',
        description: 'Elaboración de guías de laboratorio, libros de texto, módulos de aprendizaje, recursos multimedia y material educativo propio.',
        defaultWeight: 7,
        defaultEvidences: [
          'Catálogo de módulos de asignatura, guías de práctica y materiales didácticos creados por docentes',
          'Publicaciones docentes registradas en el repositorio institucional UNIPAZ',
          'Uso de los materiales en las aulas virtuales y laboratorios',
          'Evaluación de la calidad pedagógica del material por parte de los estudiantes'
        ]
      },
      {
        id: 14,
        factorId: 3,
        code: 'C14',
        title: 'Evaluación integral de profesores y sus efectos',
        description: 'Sistema integral y periódico de evaluación del desempeño profesoral (heteroevaluación, autoevaluación y coevaluación) y planes de mejora.',
        defaultWeight: 8,
        defaultEvidences: [
          'Resultados institucionales del proceso semestral de evaluación docente',
          'Reportes de heteroevaluación estudiantil y valoración de jefes de programa',
          'Planes individuales de mejoramiento profesoral acordados',
          'Uso de la evaluación docente para decisiones de permanencia y capacitación'
        ]
      }
    ]
  },
  {
    id: 4,
    code: 'F4',
    name: 'Comunidad de egresados',
    description: 'Mecanismos de seguimiento, caracterización, vinculación continua, impacto laboral y reconocimientos de los graduados en el medio.',
    characteristics: [
      {
        id: 15,
        factorId: 4,
        code: 'C15',
        title: 'Seguimiento de egresados, caracterización y aportes al programa',
        description: 'Mantenimiento de bases de datos, caracterización de la inserción laboral y participación de los egresados en el mejoramiento curricular.',
        defaultWeight: 8,
        defaultEvidences: [
          'Base de datos actualizada del Observatorio de Egresados UNIPAZ',
          'Estudios de caracterización socioeconómica y tasa de empleabilidad de graduados',
          'Participación de representantes de egresados en Comités Curriculares',
          'Encuentros anuales de egresados y redes de contacto profesional'
        ]
      },
      {
        id: 16,
        factorId: 4,
        code: 'C16',
        title: 'Impacto y reconocimientos obtenidos por los egresados',
        description: 'Desempeño destacado de los graduados en el sector productivo, público, social o científico a nivel regional, nacional e internacional.',
        defaultWeight: 8,
        defaultEvidences: [
          'Estudios de satisfacción de empleadores y gremios del Magdalena Medio',
          'Registro de distinciones, cargos directivos y premios obtenidos por egresados',
          'Aportes de los egresados al desarrollo económico, ambiental y cultural del territorio',
          'Acreditación de egresados vinculados a programas de posgrado de excelencia'
        ]
      }
    ]
  },
  {
    id: 5,
    code: 'F5',
    name: 'Aspectos académicos y evaluación',
    description: 'Gestión curricular, flexibilidad, interdisciplinariedad, coherencia pedagógica, sistema de evaluación de aprendizajes y competencias.',
    characteristics: [
      {
        id: 17,
        factorId: 5,
        code: 'C17',
        title: 'Evaluación de la gestión curricular, flexibilidad e interdisciplinariedad',
        description: 'Estructura curricular dinámica, actualización de planes de estudio, flexibilidad en rutas formativas e interacción disciplinar.',
        defaultWeight: 9,
        defaultEvidences: [
          'Malla curricular por créditos con componentes obligatorio y electivo',
          'Acuerdos de actualización de contenidos y créditos académicos por el Consejo Académico',
          'Proyectos integradores interdisciplinarios entre diferentes carreras de UNIPAZ',
          'Mecanismos de homologación y movilidad curricular'
        ]
      },
      {
        id: 18,
        factorId: 5,
        code: 'C18',
        title: 'Coherencia de las estrategias pedagógicas con el PEP',
        description: 'Alineación entre el modelo pedagógico institucional, las estrategias didácticas aplicadas en las aulas y el perfil de los estudiantes.',
        defaultWeight: 9,
        defaultEvidences: [
          'Modelo pedagógico institucional documentado y apropiado en los sílabos',
          'Estrategias didácticas enfocadas en el aprendizaje significativo e investigativo',
          'Uso articulado de aulas de clase, campos experimentales y laboratorios',
          'Evaluación periódica de la coherencia entre enseñanza y aprendizaje'
        ]
      },
      {
        id: 19,
        factorId: 5,
        code: 'C19',
        title: 'Sistema de evaluación de estudiantes y dinámicas del contexto',
        description: 'Criterios claros, transparentes y diversos para evaluar el aprendizaje continuo de los estudiantes en coherencia con los avances pedagógicos.',
        defaultWeight: 9,
        defaultEvidences: [
          'Criterios y porcentajes de evaluación definidos en los sílabos de asignatura',
          'Diversidad de instrumentos de evaluación (exámenes, proyectos, exposiciones, rubricas)',
          'Reglamento sobre pruebas de recuperación, supletorios y revisiones de notas',
          'Mecanismos de retroalimentación oportuna sobre las evaluaciones'
        ]
      },
      {
        id: 20,
        factorId: 5,
        code: 'C20',
        title: 'Aportes del sistema de evaluación al mejoramiento curricular',
        description: 'Uso de los resultados de las evaluaciones académicas y pruebas de Estado (Saber Pro) para realimentar el plan de estudios.',
        defaultWeight: 9,
        defaultEvidences: [
          'Análisis histórico de los resultados en pruebas Saber Pro / Saber T&T',
          'Informes de análisis de rendimiento académico por cohorte y asignatura',
          'Planes de mejoramiento académico e intensificación en competencias genéricas',
          'Modificaciones curriculares sustentadas en el diagnóstico de aprendizajes'
        ]
      },
      {
        id: 21,
        factorId: 5,
        code: 'C21',
        title: 'Coherencia entre competencias, capacidades y resultados de aprendizaje',
        description: 'Articulación declarada y verificable entre los resultados de aprendizaje esperados (RAE), las competencias del perfil de egreso y las asignaturas.',
        defaultWeight: 10,
        defaultEvidences: [
          'Matriz de articulación de Resultados de Aprendizaje Esperados (RAE) por asignatura',
          'Rúbricas institucionales para la valoración del logro de RAE',
          'Portafolios de evidencias de aprendizaje acumuladas por los estudiantes',
          'Evaluación periódica del grado de alcance del perfil profesional de egreso'
        ]
      }
    ]
  },
  {
    id: 6,
    code: 'F6',
    name: 'Permanencia y graduación',
    description: 'Políticas de retención, caracterización de ingresantes, alertas tempranas, graduación oportuna y ajustes curriculares.',
    characteristics: [
      {
        id: 22,
        factorId: 6,
        code: 'C22',
        title: 'Impacto de las políticas y estrategias de permanencia y graduación',
        description: 'Efectividad del conjunto de acciones institucionales para reducir las tasas de deserción y favorecer la culminación de estudios en el tiempo previsto.',
        defaultWeight: 9,
        defaultEvidences: [
          'Indicadores de tasa de deserción por cohorte y tasa de graduación oportuna',
          'Informe del comité de permanencia estudiantil de UNIPAZ',
          'Evaluación del impacto de las estrategias de apoyo psicoeducativo y económico',
          'Comparativo de indicadores de permanencia frente a los promedios nacionales (SPADIES)'
        ]
      },
      {
        id: 23,
        factorId: 6,
        code: 'C23',
        title: 'Caracterización y atención a estudiantes en riesgo de deserción',
        description: 'Identificación temprana de vulnerabilidades académicas, socioeconómicas o emocionales y atención personalizada.',
        defaultWeight: 8,
        defaultEvidences: [
          'Caracterización socioeconómica e intelectual del perfil de los estudiantes de primer ingreso',
          'Módulos de alerta temprana funcionando en la plataforma de gestión académica',
          'Remisiones y atención en el centro de tutorías universitarias y bienestar',
          'Seguimiento individual a estudiantes condicionados o en prueba académica'
        ]
      },
      {
        id: 24,
        factorId: 6,
        code: 'C24',
        title: 'Evolución de los ajustes curriculares resultantes de la permanencia',
        description: 'Modificaciones en prerequisitos, intensidad horaria, nivelatorios y metodología derivados del análisis de las materias de mayor pérdida.',
        defaultWeight: 8,
        defaultEvidences: [
          'Identificación de asignaturas con mayor índice de reprobación en el programa',
          'Talleres y cursos nivelatorios en ciencias básicas, matemáticas y comprensión de lectura',
          'Flexibilización de la malla curricular para reducir cuellos de botella',
          'Seguimiento al impacto de las nivelaciones en el rendimiento posterior'
        ]
      },
      {
        id: 25,
        factorId: 6,
        code: 'C25',
        title: 'Mecanismos de selección, reducción de deserción y graduación oportuna',
        description: 'Contribución del proceso de admisión e inducción a la reducción de la deserción temprana y facilitación de modalidades de grado.',
        defaultWeight: 8,
        defaultEvidences: [
          'Evaluación de la correlación entre puntajes de admisión y desempeño académico',
          'Diversificación de opciones de trabajo de grado (pasantía, proyecto, diplomado, investigación)',
          'Agilidad en los trámites administrativos de titulación y ceremonia de grado',
          'Reducción del tiempo promedio de permanencia en el proceso de grado'
        ]
      }
    ]
  },
  {
    id: 7,
    code: 'F7',
    name: 'Proyección e interacción con el entorno',
    description: 'Inserción del programa en entornos locales, regionales e internacionales, convenios de cooperación, bilingüismo e impacto social.',
    characteristics: [
      {
        id: 26,
        factorId: 7,
        code: 'C26',
        title: 'Inserción del programa en contextos locales, regionales e internacionales',
        description: 'Relaciones formales del programa con redes académicas, gremiales y comunitarias del Magdalena Medio, Colombia y el exterior.',
        defaultWeight: 8,
        defaultEvidences: [
          'Membresías activas en asociaciones académicas y redes de facultades de la disciplina',
          'Convenios vigentes con instituciones nacionales e internacionales',
          'Participación de profesores y estudiantes en redes de investigación o cooperación',
          'Movilidad entrante y saliente de docentes y estudiantes'
        ]
      },
      {
        id: 27,
        factorId: 7,
        code: 'C27',
        title: 'Resultados y cooperación de profesores y estudiantes con comunidades',
        description: 'Logros concretos de proyectos colaborativos con comunidades rurales, urbanas, industrias y entidades del sector público.',
        defaultWeight: 9,
        defaultEvidences: [
          'Proyectos de extensión y voluntariado ejecutados en municipios de la región',
          'Convenios de prácticas profesionales con empresas del sector petroquímico, agropecuario o social',
          'Testimonios e informes de impacto comunitario expedidos por líderes regionales',
          'Publicaciones colectivas o cartillas comunitarias derivadas de la extensión'
        ]
      },
      {
        id: 28,
        factorId: 7,
        code: 'C28',
        title: 'Efectos de políticas para el desarrollo de habilidades en otras lenguas',
        description: 'Fomento del bilingüismo (inglés/otras lenguas) para la lectura científica, comunicación y movilidad internacional de la comunidad.',
        defaultWeight: 7,
        defaultEvidences: [
          'Requisito institucional de suficiencia en segunda lengua para grado',
          'Cursos de inglés ofertados por el Centro de Idiomas UNIPAZ',
          'Inclusión de literatura en segunda lengua en los sílabos de asignatura',
          'Resultados de los estudiantes en la prueba de inglés de Saber Pro'
        ]
      },
      {
        id: 29,
        factorId: 7,
        code: 'C29',
        title: 'Impacto y aportes de la proyección e interacción social',
        description: 'Transferencia del conocimiento universitario para la solución de problemáticas sociales, ambientales y productivas del territorio.',
        defaultWeight: 9,
        defaultEvidences: [
          'Servicios de consultaría, laboratorios abiertos o asistencia técnica al territorio',
          'Participación en mesas de desarrollo regional, comités de competitividad y paz',
          'Sistematización y medición del impacto social del programa en la región',
          'Reconocimientos de la sociedad civil y entes gubernamentales a la labor de UNIPAZ'
        ]
      }
    ]
  },
  {
    id: 8,
    code: 'F8',
    name: 'Aportes de la investigación, innovación y creación',
    description: 'Investigación, desarrollo tecnológico, innovación, investigación-creación artística y cultural, grupos MinCiencias, semilleros e impacto.',
    characteristics: [
      {
        id: 30,
        factorId: 8,
        code: 'C30',
        title: 'Capacidades y procesos para la consolidación de la investigación y creación',
        description: 'Infraestructura, presupuesto, políticas e incentivos institucionales para fortalecer los grupos de investigación y la investigación-creación.',
        defaultWeight: 9,
        defaultEvidences: [
          'Grupos de investigación adscritos al programa categorizados por MinCiencias',
          'Presupuesto institucional asignado en convocatorias internas de investigación',
          'Estructura de la Vicerrectoría de Investigación y Proyección Social',
          'Aulas-laboratorio y espacios equipados para la investigación y experimentación'
        ]
      },
      {
        id: 31,
        factorId: 8,
        code: 'C31',
        title: 'Resultados, logros e impactos de la investigación e innovación',
        description: 'Producción de artículos científicos indexados, patentes, software, registros de diseño, obras artísticas o innovaciones sociales.',
        defaultWeight: 9,
        defaultEvidences: [
          'Listado de artículos en revistas indexadas (Scopus, WoS, Publindex) publicados por docentes',
          'Libros, capítulos de libro y productos de desarrollo tecnológico o creación artística',
          'Citas e índice h de los investigadores del programa académico',
          'Estrategias de divulgación científica a la comunidad general'
        ]
      },
      {
        id: 32,
        factorId: 8,
        code: 'C32',
        title: 'Coherencia de las líneas de investigación/creación con el PEP',
        description: 'Alineación de las líneas de investigación declaradas con el perfil profesional del programa y la vocación territorial.',
        defaultWeight: 8,
        defaultEvidences: [
          'Documento institucional de líneas de investigación del programa registradas en GrupLAC',
          'Proyectos de investigación ejecutados vinculados a los ejes temáticos del PEP',
          'Articulación de trabajos de grado de estudiantes con las líneas de investigación',
          'Evaluación periódica de la pertinencia de las líneas de investigación'
        ]
      },
      {
        id: 33,
        factorId: 8,
        code: 'C33',
        title: 'Resultados de la formación para la investigación y la creación',
        description: 'Fomento del espíritu crítico e investigativo mediante semilleros de investigación, jóvenes investigadores y asignaturas de metodología.',
        defaultWeight: 8,
        defaultEvidences: [
          'Semilleros de investigación vinculados al programa con planes de trabajo y actas',
          'Participación estudiantil en encuentros de semilleros (RedCOLSI, encuentros nacionales)',
          'Estudiantes vinculados como asistentes o auxiliares en proyectos financiado',
          'Ponencias y artículos coautorados por estudiantes del programa'
        ]
      },
      {
        id: 34,
        factorId: 8,
        code: 'C34',
        title: 'Demostración del uso de resultados investigativos en el mejoramiento del programa',
        description: 'Inclusión de los hallazgos y publicaciones investigativas docentes en los contenidos de las asignaturas y enriquecimiento del aula.',
        defaultWeight: 8,
        defaultEvidences: [
          'Inclusión de artículos y productos de docentes en las bibliografías de los sílabos',
          'Seminarios de actualización donde docentes presentan sus hallazgos a los estudiantes',
          'Renovación de contenidos temáticos guiada por los avances científicos de los grupos',
          'Apropiación de innovaciones tecnológicas en las prácticas de laboratorio'
        ]
      },
      {
        id: 35,
        factorId: 8,
        code: 'C35',
        title: 'Impacto de la investigación en el contexto del programa',
        description: 'Solución de problemas concretos de la industria, el medio ambiente, la salud o la sociedad en Barrancabermeja y la región.',
        defaultWeight: 9,
        defaultEvidences: [
          'Proyectos de investigación aplicada financiados por fondos de regalías o cooperación externa',
          'Impacto ambiental, productivo o cultural demostrado en comunidades atendidas',
          'Acompañamiento a microempresas y productores rurales de Santander',
          'Premios o reconocimientos externos otorgados a la investigación de UNIPAZ'
        ]
      }
    ]
  },
  {
    id: 9,
    code: 'F9',
    name: 'Bienestar de la comunidad académica del programa',
    description: 'Programas de salud, deporte, cultura, desarrollo humano, convivencia, diversidad, inclusión y clima institucional.',
    characteristics: [
      {
        id: 36,
        factorId: 9,
        code: 'C36',
        title: 'Evolución y evaluación del bienestar en diversidad, inclusión y pluralismo',
        description: 'Disponibilidad y acceso equitativo a los servicios de bienestar institucional para estudiantes, profesores y administrativos sin discriminación.',
        defaultWeight: 8,
        defaultEvidences: [
          'Plan de acción anual de la Vicerrectoría de Bienestar Universitario de UNIPAZ',
          'Estadísticas de atenciones desagregadas por estamento y género',
          'Programas adaptados para personas con discapacidad o capacidades diversas',
          'Encuestas de satisfacción y cobertura de las políticas de bienestar'
        ]
      },
      {
        id: 37,
        factorId: 9,
        code: 'C37',
        title: 'Incidencia del bienestar en la formación integral y calidad de vida',
        description: 'Aporte de las actividades deportivas, culturales, médicas y psicológicas al desarrollo humano y mitigación del estrés académico.',
        defaultWeight: 8,
        defaultEvidences: [
          'Grupos representativos deportivos y culturales participando en torneos (ASCUN)',
          'Jornadas de salud preventiva, vacunación y salud mental realizadas en el campus',
          'Talleres de manejo del estrés, hábitos saludables y promoción de la convivencia',
          'Evaluación de la percepción sobre el ambiente universitario en el campus UNIPAZ'
        ]
      },
      {
        id: 38,
        factorId: 9,
        code: 'C38',
        title: 'Adaptación de infraestructura y servicios de bienestar',
        description: 'Espacios físicos (canchas, cafeterías, zonas verdes) y recursos tecnológicos adecuados para el desarrollo de actividades de bienestar.',
        defaultWeight: 8,
        defaultEvidences: [
          'Inventario de escenarios deportivos, culturales y de esparcimiento en el campus',
          'Mantenimiento preventivo y adecuación de zonas de descanso y comedores',
          'Protocolos de primeros auxilios y atención de emergencias en el campus',
          'Adaptación de espacios de bienestar a la jornada diurna y nocturna'
        ]
      }
    ]
  },
  {
    id: 10,
    code: 'F10',
    name: 'Recursos físicos, tecnológicos, medios educativos y ambientes de aprendizaje',
    description: 'Infraestructura, aulas, laboratorios, campos de práctica, biblioteca, plataformas virtuales, recursos de información y conectividad.',
    characteristics: [
      {
        id: 39,
        factorId: 10,
        code: 'C39',
        title: 'Evolución y evaluación de medios educativos y ambientes de aprendizaje',
        description: 'Calidad, actualización y pertinencia de los recursos mediáticos, laboratorios y plataformas que soportan la enseñanza.',
        defaultWeight: 8,
        defaultEvidences: [
          'Inventario de laboratorios especializados, talleres y salas de cómputo del programa',
          'Certificados de calibración y actualización de software y equipos de laboratorio',
          'Acceso y uso del campus virtual institucional (plataforma Moodle/UNIPAZ)',
          'Evaluación periódica de la suficiencia de recursos didácticos por docentes y alumnos'
        ]
      },
      {
        id: 40,
        factorId: 10,
        code: 'C40',
        title: 'Aporte de los medios educativos en los resultados académicos',
        description: 'Uso efectivo de las tecnologías y laboratorios para la consecución de las competencias y resultados de aprendizaje esperados (RAE).',
        defaultWeight: 9,
        defaultEvidences: [
          'Prácticas de laboratorio programadas y ejecutadas según los sílabos',
          'Uso de simuladores, software especializado (CAD, GIS, análisis de datos) en clase',
          'Evaluación del desempeño práctico de los estudiantes en escenarios reales o simulados',
          'Seguimiento al uso de guías de laboratorio pedagógicas'
        ]
      },
      {
        id: 41,
        factorId: 10,
        code: 'C41',
        title: 'Evolución de la suficiencia de recursos bibliográficos e información',
        description: 'Colección bibliográfica física en biblioteca, suscripciones a bases de datos científicas digitales y préstamos.',
        defaultWeight: 8,
        defaultEvidences: [
          'Catálogo en línea de la biblioteca UNIPAZ y volumen de títulos de la disciplina',
          'Suscripciones a bases de datos bibliográficas internacionales (Scopus, ScienceDirect, IEEE, e-libro)',
          'Estadísticas de consulta presencial y remota de libros y bases de datos',
          'Plan anual de compras bibliográficas sugeridas por los docentes del programa'
        ]
      },
      {
        id: 42,
        factorId: 10,
        code: 'C42',
        title: 'Infraestructura física, tecnológica y sostenibilidad en el campus',
        description: 'Capacidad de aulas, condiciones de iluminación, ventilación, conectividad Wi-Fi, accesibilidad y mantenimiento general en el campus Santa Rosa.',
        defaultWeight: 9,
        defaultEvidences: [
          'Planes de mantenimiento preventivo y correctivo de planta física de UNIPAZ',
          'Ancho de banda e infraestructura de red inalámbrica en todo el campus',
          'Cumplimiento de normas de bioseguridad, seguridad industrial y evacuación',
          'Adaptaciones de accesibilidad física para personas con movilidad reducida'
        ]
      }
    ]
  },
  {
    id: 11,
    code: 'F11',
    name: 'Organización, administración y financiación del programa académico',
    description: 'Gestión administrativa, liderazgo directivo, sistemas de información, sostenibilidad presupuestal y recursos financieros.',
    characteristics: [
      {
        id: 43,
        factorId: 11,
        code: 'C43',
        title: 'Identificación de logros y resultados de la gestión del programa',
        description: 'Efectividad de la dirección académica, comité de programa y procesos administrativos para soportar las labores académicas.',
        defaultWeight: 8,
        defaultEvidences: [
          'Estructura organizacional formal de la Escuela y la Dirección de Programa',
          'Actas de reuniones del Comité Curricular de Programa ejecutadas regularmente',
          'Cumplimiento de las metas del plan operativo anual del programa',
          'Evaluación del desempeño de la gestión administrativa'
        ]
      },
      {
        id: 44,
        factorId: 11,
        code: 'C44',
        title: 'Evolución y evaluación de la sostenibilidad y capacidades',
        description: 'Proyección estratégica del programa a mediano y largo plazo garantizando sus capacidades técnicas y operativas.',
        defaultWeight: 8,
        defaultEvidences: [
          'Plan de desarrollo del programa académico articulado al plan de UNIPAZ',
          'Análisis de la sostenibilidad de la matrícula e ingresos del programa',
          'Evaluación periódica de la capacidad operativa y de respuesta administrativa',
          'Planes de contingencia y gestión del riesgo académico'
        ]
      },
      {
        id: 45,
        factorId: 11,
        code: 'C45',
        title: 'Liderazgo en la dirección y gestión académica',
        description: 'Idoneidad, perfil calificado y visión estratégica de los directivos para guiar los procesos de acreditación y calidad.',
        defaultWeight: 8,
        defaultEvidences: [
          'Perfil y experiencia académica del Director(a) de Programa y Decano(a)',
          'Liderazgo en la conducción del proceso de autoevaluación institucional',
          'Participación directiva en redes nacionales de decanos y directores',
          'Grado de satisfacción docente y estudiantil con el liderazgo del programa'
        ]
      },
      {
        id: 46,
        factorId: 11,
        code: 'C46',
        title: 'Sistemas de comunicación e información actualizados y accesibles',
        description: 'Plataformas tecnológicas de información para el registro de notas, trámites académicos, portal web e interacción comunitaria.',
        defaultWeight: 8,
        defaultEvidences: [
          'Sistema de gestión académica (software institucional) funcionando de forma estable',
          'Portal web del programa actualizado con plan de estudios, docentes y noticias',
          'Canales oficiales de atención al estudiante e intranet institucional',
          'Cumplimiento de normatividad sobre protección de datos personales'
        ]
      },
      {
        id: 47,
        factorId: 11,
        code: 'C47',
        title: 'Consolidación de recursos y capacidades coherentes con la evolución',
        description: 'Inversión continua en la modernización de los equipos, renovación tecnológica e incremento del talento humano.',
        defaultWeight: 8,
        defaultEvidences: [
          'Histórico de inversiones realizadas en el programa durante los últimos 5 años',
          'Planes de compras y renovación tecnológica ejecutados',
          'Incremento sostenido de la cualificación del talento humano administrativo y docente',
          'Indicadores de eficiencia en el gasto asignado al programa'
        ]
      },
      {
        id: 48,
        factorId: 11,
        code: 'C48',
        title: 'Identificación de la sostenibilidad financiera del programa académico',
        description: 'Disponibilidad de presupuestos específicos para el funcionamiento y planes de mejora del programa académico en UNIPAZ.',
        defaultWeight: 9,
        defaultEvidences: [
          'Presupuesto anual asignado y ejecutado por el programa académico',
          'Informes financieros auditados y estados de resultados de UNIPAZ',
          'Proyección de ingresos por matrícula, transferencias del Estado y venta de servicios',
          'Sostenibilidad financiera demostrada para el mantenimiento del registro calificado'
        ]
      }
    ]
  },
  {
    id: 12,
    code: 'F12',
    name: 'Aseguramiento de la alta calidad del programa',
    description: 'Cultura de autoevaluación permanente, autorregulación, consolidación de datos del SIAC UNIPAZ e impacto de los planes de mejoramiento.',
    characteristics: [
      {
        id: 49,
        factorId: 12,
        code: 'C49',
        title: 'Reflexión y participación en gestión, autoevaluación y autorregulación',
        description: 'Participación activa y representativa de docentes, estudiantes, egresados y administrativos en el proceso permanente de autoevaluación.',
        defaultWeight: 9,
        defaultEvidences: [
          'Comité de Autoevaluación del Programa conformado y operando formalmente',
          'Actas de jornadas de autoevaluación, encuestas y grupos focales realizados',
          'Cultura de autorregulación evidenciada en la toma de decisiones basada en datos',
          'Apropiación del modelo de acreditación CESU (Acuerdo 01 de 2025) por la comunidad'
        ]
      },
      {
        id: 50,
        factorId: 12,
        code: 'C50',
        title: 'Consolidación de información y datos de alta calidad en el periodo',
        description: 'Sistematización rigurosa de evidencias, indicadores y estadísticas correspondientes a los 5 años del periodo de observación.',
        defaultWeight: 9,
        defaultEvidences: [
          'Documento Maestro de Autoevaluación con indicadores cuantitativos y cualitativos',
          'Repositorio digital de evidencias documentales organizadas por factor y característica',
          'Cuadros maestros de información institucional y de programa validados por el SIAC',
          'Verificabilidad y trazabilidad de los datos presentados ante los pares evaluadores'
        ]
      },
      {
        id: 51,
        factorId: 12,
        code: 'C51',
        title: 'Resultados e impactos de la cultura de la calidad y planes de mejora',
        description: 'Seguimiento, ejecución y evidencia del cumplimiento de los compromisos derivados de planes de mejoramiento previos.',
        defaultWeight: 10,
        defaultEvidences: [
          'Plan de Mejoramiento del Programa ejecutado con porcentajes de avance verificables',
          'Informes de seguimiento del SIAC presentados al Consejo Académico de UNIPAZ',
          'Mejoras concretas en infraestructura, docentes o malla curricular logradas en la vigencia',
          'Sostenibilidad de la acreditación en alta calidad e impacto en la comunidad'
        ]
      }
    ]
  }
];
