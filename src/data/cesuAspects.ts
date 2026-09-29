/**
 * Aspectos por evaluar por característica — Acuerdo CESU 01 de 2025.
 *
 * IMPORTANTE: el Acuerdo 01/2025 NO enumera aspectos por evaluar; define 12
 * factores y 51 características con su descripción (art. 13). Según el
 * numeral 2.4.2 c), los aspectos son indicativos y la institución puede
 * definirlos. Los aspectos siguientes se DERIVAN del texto oficial de cada
 * característica y deben ser validados por el Comité de Autoevaluación.
 * El art. 73 deroga el Acuerdo 02/2020 y sus lineamientos (incluida la guía
 * de aspectos del CNA de 2022).
 */
export interface CharacteristicAspects {
  tituloOficial: string;
  aspectos: string[];
  pregunta: string;
}

export const FUENTE_ASPECTOS =
  'Aspectos institucionales derivados del texto de cada característica del Acuerdo CESU 01 de 2025 (art. 13). Pendientes de validación por el Comité.';

export const CESU_ASPECTS: Record<string, CharacteristicAspects> = {
  C01: {
    tituloOficial: 'Proyecto educativo del programa',
    aspectos: [
      'Demuestra la coherencia del PEP (o lo que haga sus veces) con la misión y la identidad institucional y con los campos de acción de la profesión o disciplina.',
      'Evidencia que el PEP orienta las labores formativas, académicas, docentes, de investigación-creación, innovación, artísticas, culturales y de extensión, en relación con los objetivos de formación integral.',
      'Garantiza que el PEP es de conocimiento público y evalúa su apropiación por la comunidad del programa.',
      'En programas del área de la salud, demuestra la coherencia entre la institución y los escenarios de práctica formativa.',
    ],
    pregunta: '¿El PEP es coherente con la misión institucional y los campos de acción de la profesión, orienta las labores del programa y es de conocimiento público?',
  },
  C02: {
    tituloOficial: 'Relevancia académica y pertinencia social del programa académico',
    aspectos: [
      'Identifica y sustenta las necesidades locales, regionales, nacionales o internacionales a las que responde el programa.',
      'Demuestra la respuesta efectiva del programa a esas necesidades, independientemente de su modalidad y naturaleza.',
      'Evidencia el reconocimiento externo que recibe por el modo como impacta y cumple su finalidad.',
    ],
    pregunta: '¿El programa responde a necesidades del entorno previamente definidas y sustentadas, y es reconocido por su impacto?',
  },
  C03: {
    tituloOficial: 'Incidencia de las actividades de formación integral',
    aspectos: [
      'Da cuenta de la participación de los estudiantes en investigación, desarrollo tecnológico, innovación, creación e investigación-creación artística, cultural y deportiva.',
      'Evidencia la participación en proyectos de desarrollo social y ambiental con comunidades u organizaciones, y en relacionamiento nacional e internacional.',
      'Evalúa el impacto de estas actividades en la formación integral, en coherencia con el PEP.',
    ],
    pregunta: '¿Los estudiantes participan en actividades de formación integral y el programa evalúa su impacto?',
  },
  C04: {
    tituloOficial: 'Orientación, acompañamiento y seguimiento a estudiantes',
    aspectos: [
      'Demuestra procesos de orientación, acompañamiento y seguimiento académico en el marco de las políticas institucionales.',
      'Articula el acompañamiento con la caracterización realizada al ingreso, según la modalidad y el nivel de formación.',
      'Evidencia el impacto del acompañamiento en la formación, la permanencia y la graduación.',
    ],
    pregunta: '¿El programa acompaña a sus estudiantes según su caracterización de ingreso y ese acompañamiento tiene impacto demostrable?',
  },
  C05: {
    tituloOficial: 'Estrategias pedagógicas para el fortalecimiento de la autonomía y el trabajo colaborativo con responsabilidad social',
    aspectos: [
      'Declara, fomenta y desarrolla capacidades para el trabajo autónomo y colaborativo en entornos participativos.',
      'Dispone medios, espacios y ambientes para promover el trabajo autónomo y colaborativo.',
      'Evalúa el impacto de estas estrategias en los procesos y resultados académicos e implementa seguimiento y mejora continua.',
    ],
    pregunta: '¿El programa desarrolla y evalúa el trabajo autónomo y colaborativo con responsabilidad social?',
  },
  C06: {
    tituloOficial: 'Políticas académicas y normativas en el proceso formativo en procura de una cultura de paz y tolerancia, el antirracismo, la perspectiva de género y la atención a poblaciones diversas, entre otros',
    aspectos: [
      'Divulga, aplica y actualiza los reglamentos estudiantiles y las políticas académicas (deberes, derechos, régimen disciplinario, participación, permanencia y graduación).',
      'Promueve una cultura de paz, tolerancia, respeto mutuo, antirracismo, perspectiva de género e identidades diversas.',
      'Garantiza la inclusión de personas con discapacidad y la atención a poblaciones diversas.',
    ],
    pregunta: '¿Los reglamentos y políticas académicas se conocen, se aplican y promueven la paz, la equidad de género y la inclusión?',
  },
  C07: {
    tituloOficial: 'Estímulos y apoyos para todos los estudiantes y en atención a la diversidad, el pluralismo y la inclusión',
    aspectos: [
      'Otorga estímulos académicos, apoyos socioeconómicos y ajustes razonables a los estudiantes.',
      'Demuestra el impacto de estos beneficios en la comunidad estudiantil.',
      'Evidencia la atención a la diversidad, el pluralismo y la inclusión.',
    ],
    pregunta: '¿Los estímulos y apoyos tienen impacto demostrable y atienden la diversidad y la inclusión?',
  },
  C08: {
    tituloOficial: 'Resultados de los procesos de selección, vinculación y permanencia de los profesores en el mejoramiento del programa',
    aspectos: [
      'Aplica de forma transparente y eficaz los criterios de selección, vinculación y permanencia de profesores.',
      'Evalúa la incidencia de estos procesos en el mejoramiento del programa.',
      'Demuestra su impacto en los procesos y resultados académicos.',
    ],
    pregunta: '¿La selección, vinculación y permanencia de profesores es transparente y contribuye al mejoramiento del programa?',
  },
  C09: {
    tituloOficial: 'Estatuto, trayectoria y reconocimiento profesoral',
    aspectos: [
      'Aplica un estatuto profesoral (o lo que haga sus veces).',
      'Demuestra sus efectos en la trayectoria profesoral, la inclusión, el reconocimiento de méritos y el ascenso en el escalafón.',
    ],
    pregunta: '¿El estatuto profesoral se aplica y tiene efectos en la trayectoria, el reconocimiento y el ascenso de los profesores?',
  },
  C10: {
    tituloOficial: 'Planta profesoral para materializar el proyecto educativo del programa',
    aspectos: [
      'Cuenta con un núcleo de profesores con la dedicación, formación y experiencia requeridas.',
      'Garantiza la atención de la totalidad de los estudiantes matriculados según la modalidad del programa.',
      'Demuestra que la planta cubre las labores formativas, investigativas, de innovación, artísticas, culturales y de extensión del PEP.',
    ],
    pregunta: '¿La planta profesoral es suficiente y adecuada para materializar el PEP y atender a todos los estudiantes?',
  },
  C11: {
    tituloOficial: 'Capacidades, procesos y resultados del desarrollo profesoral del programa en coherencia con el proyecto educativo',
    aspectos: [
      'Demuestra los resultados del desarrollo profesoral frente a las necesidades y objetivos de formación.',
      'Atiende la diversidad de los estudiantes, las modalidades, la formación investigativa y la investigación formativa.',
      'Responde a los requerimientos de internacionalización e inter y multiculturalidad.',
    ],
    pregunta: '¿El desarrollo profesoral genera resultados coherentes con el PEP y las necesidades del programa?',
  },
  C12: {
    tituloOficial: 'Coherencia entre los estímulos a la trayectoria de los profesores del programa y el proyecto educativo',
    aspectos: [
      'Divulga, aplica y actualiza criterios académicos en la política de estímulos a profesores.',
      'Asocia los estímulos a méritos o logros académicos y profesionales.',
      'Demuestra coherencia de los estímulos con el PEP y con los procesos y resultados académicos.',
    ],
    pregunta: '¿Los estímulos a los profesores reconocen méritos y son coherentes con el PEP?',
  },
  C13: {
    tituloOficial: 'Producción, pertinencia, utilización e impacto de material docente',
    aspectos: [
      'Los profesores producen, individual y colaborativamente, materiales propios para las actividades académicas.',
      'Los materiales soportan los ambientes de aprendizaje según la modalidad del programa.',
      'Evalúa periódicamente los materiales con criterios y mecanismos académicos previamente definidos.',
    ],
    pregunta: '¿Los profesores producen material docente pertinente que se usa y se evalúa periódicamente?',
  },
  C14: {
    tituloOficial: 'Evaluación integral de profesores y sus efectos en el mejoramiento del programa',
    aspectos: [
      'Realiza procesos periódicos y permanentes de evaluación integral de profesores y de sus redes de trabajo colaborativo.',
      'La evaluación abarca las distintas labores: docencia, investigación-creación, innovación, cultura y extensión.',
      'Los procesos son establecidos, difundidos y conocidos previamente, y tienen efectos en el mejoramiento del programa.',
    ],
    pregunta: '¿La evaluación de profesores es integral, conocida previamente y produce mejoras en el programa?',
  },
  C15: {
    tituloOficial: 'Seguimiento de los egresados, su caracterización y aportes en el mejoramiento del programa',
    aspectos: [
      'Hace seguimiento a la ubicación, realizaciones, redes, logros e impactos de sus egresados.',
      'Caracteriza a sus egresados de manera coherente con los fines institucionales y del programa.',
      'Incorpora los aportes de los egresados en el mejoramiento del programa.',
    ],
    pregunta: '¿El programa hace seguimiento a sus egresados y usa sus aportes para mejorar?',
  },
  C16: {
    tituloOficial: 'Impacto y reconocimientos obtenidos por los egresados en el medio social y el ámbito académico',
    aspectos: [
      'Evidencia el reconocimiento de la calidad de la formación recibida por sus egresados.',
      'Demuestra el desempeño destacado de los egresados en su disciplina, profesión u oficio.',
      'Da cuenta del aporte de los egresados a la solución de problemas económicos, ambientales, tecnológicos, sociales y culturales.',
    ],
    pregunta: '¿Los egresados son reconocidos y aportan a la solución de problemas de su entorno?',
  },
  C17: {
    tituloOficial: 'Evaluación de la gestión curricular y sus efectos en la mejora del programa desde una perspectiva de integralidad, flexibilidad e interacción de las disciplinas',
    aspectos: [
      'La estructura curricular promueve la interacción disciplinar, la formación en valores y el desarrollo de competencias para la formación integral.',
      'La evaluación curricular contribuye a la mejora de la flexibilidad, pertinencia y actualización del currículo.',
      'Facilita rutas de formación y movilidad dentro y fuera de la oferta institucional, nacional e internacional.',
      'La denominación, duración y créditos reflejan una reflexión de la comunidad académica acorde con la normatividad y los referentes del área.',
    ],
    pregunta: '¿La gestión curricular se evalúa y produce un currículo integral, flexible, pertinente y actualizado?',
  },
  C18: {
    tituloOficial: 'Coherencia de las estrategias pedagógicas con el proyecto educativo del programa académico y las características de la comunidad de estudiantes',
    aspectos: [
      'Muestra coherencia entre las estrategias pedagógicas, la modalidad y el modelo pedagógico institucional.',
      'Diseña las estrategias según los objetivos de formación y evalúa sus resultados académicos.',
      'Incorpora aportes de la investigación pedagógica y la formación y actualización de los profesores.',
      'En programas de salud, demuestra estrategias en escenarios de práctica idóneos y suficientes (convenios docencia–servicio).',
    ],
    pregunta: '¿Las estrategias pedagógicas son coherentes con el PEP, el modelo institucional y las características de los estudiantes?',
  },
  C19: {
    tituloOficial: 'Sistema de evaluación de estudiantes en coherencia con las transformaciones en las teorías y métodos de aprendizaje, las dinámicas del contexto y las declaraciones del programa',
    aspectos: [
      'Cuenta con un sistema de evaluación de estudiantes basado en políticas y normas claras, universales y transparentes.',
      'Valora procesos y resultados académicos, actitudes, conocimientos, capacidades y habilidades según los objetivos de formación.',
      'Integra la innovación y el desmonte de barreras a la inclusión, especialmente de personas con discapacidad.',
    ],
    pregunta: '¿El sistema de evaluación de estudiantes es claro, transparente, innovador e inclusivo?',
  },
  C20: {
    tituloOficial: 'Aportes del sistema de evaluación de los procesos y resultados académicos al mejoramiento curricular del programa',
    aspectos: [
      'Evalúa periódicamente, en diferentes momentos del plan de estudios, el logro de los procesos y resultados académicos previstos.',
      'Toma acciones de ajuste curricular y metodológico con base en dicha evaluación.',
    ],
    pregunta: '¿La evaluación de los resultados académicos genera ajustes curriculares y metodológicos documentados?',
  },
  C21: {
    tituloOficial: 'Coherencia entre las competencias, capacidades, habilidades y/o destrezas, los procesos y resultados académicos previstos y demás aspectos curriculares definidos en el proyecto educativo del programa académico',
    aspectos: [
      'Demuestra coherencia entre las competencias definidas, los procesos y resultados académicos y los demás aspectos curriculares del PEP.',
      'Articula las competencias con los propósitos del perfil de egreso.',
      'Evalúa y demuestra el desarrollo de las competencias en los estudiantes.',
    ],
    pregunta: '¿Las competencias del perfil de egreso son coherentes con el currículo y se evalúa su logro?',
  },
  C22: {
    tituloOficial: 'Impacto de las políticas y estrategias implementadas para la permanencia y la graduación',
    aspectos: [
      'Demuestra la existencia y los resultados de las políticas de bienestar, permanencia y graduación.',
      'Implementa programas de apoyo con enfoques diferenciales, accesibles, interculturales, territoriales e interseccionales.',
      'Incorpora inducción, acompañamiento, orientación vocacional, adaptación a la vida universitaria y orientación para el trabajo de grado y la práctica.',
    ],
    pregunta: '¿Las estrategias de permanencia y graduación tienen impacto demostrable y enfoque de equidad?',
  },
  C23: {
    tituloOficial: 'Caracterización y atención de estudiantes a través de los sistemas, estrategias y programas dispuestos para tal fin',
    aspectos: [
      'Demuestra el impacto de la caracterización de estudiantes (condiciones de ingreso, desempeño y permanencia).',
      'Evidencia la efectividad del sistema de alertas tempranas en la prevención y atención diferenciada.',
      'Relaciona las acciones con los índices de permanencia y graduación.',
    ],
    pregunta: '¿La caracterización y las alertas tempranas generan atención diferenciada efectiva?',
  },
  C24: {
    tituloOficial: 'Evolución de los ajustes a los aspectos curriculares y pedagógicos como resultado de los programas de permanencia y graduación',
    aspectos: [
      'Analiza el seguimiento de los programas de permanencia, las líneas base de alertas tempranas y las cifras y tiempos de graduación.',
      'Demuestra la evolución de los ajustes curriculares y pedagógicos derivados de ese análisis, según el contexto de los estudiantes.',
    ],
    pregunta: '¿Los análisis de permanencia y graduación han producido ajustes curriculares y pedagógicos?',
  },
  C25: {
    tituloOficial: 'Contribución de los mecanismos de selección a la reducción de la deserción y la graduación oportuna',
    aspectos: [
      'Analiza la contribución de los mecanismos de selección a la reducción de la deserción y a la graduación oportuna.',
      'Realiza ajustes a los procesos de selección derivados de ese análisis, en correspondencia con el principio de equidad.',
    ],
    pregunta: '¿Los mecanismos de selección se analizan y ajustan para reducir la deserción con equidad?',
  },
  C26: {
    tituloOficial: 'Inserción del programa en contextos académicos locales, regionales, nacionales e internacionales',
    aspectos: [
      'Toma como referencia las tendencias y el estado del arte de la disciplina o profesión en la actualización curricular.',
      'Considera indicadores de calidad reconocidos por la comunidad académica nacional e internacional.',
    ],
    pregunta: '¿La actualización curricular incorpora tendencias e indicadores de calidad nacionales e internacionales?',
  },
  C27: {
    tituloOficial: 'Resultados y logros de las relaciones y de la cooperación de profesores y estudiantes con comunidades locales, regionales, nacionales y extranjeras y sus efectos en el posicionamiento del programa',
    aspectos: [
      'Mantiene cooperación de profesores y estudiantes con instituciones o entidades locales, regionales, nacionales y extranjeras.',
      'Demuestra el impacto de esa cooperación en las labores formativas, investigativas, culturales y de extensión.',
      'Evidencia sus efectos en el posicionamiento del programa.',
    ],
    pregunta: '¿La cooperación con otras instituciones y comunidades genera resultados y posicionamiento para el programa?',
  },
  C28: {
    tituloOficial: 'Efectos de las políticas para el desarrollo de habilidades comunicativas en una o varias lenguas en coherencia con el proyecto educativo del programa académico',
    aspectos: [
      'Implementa políticas y estrategias para el desarrollo de competencias comunicativas en una o varias lenguas.',
      'Demuestra el efecto de dichas políticas en los estudiantes.',
      'En interacción con comunidades no hispanohablantes, respeta sus particularidades y tradiciones culturales y ancestrales.',
    ],
    pregunta: '¿Las estrategias para el desarrollo de competencias comunicativas en otras lenguas tienen efectos demostrables?',
  },
  C29: {
    tituloOficial: 'Impacto y aportes de la proyección e interacción social en diferentes contextos',
    aspectos: [
      'Identifica los impactos y aportes de la extensión, proyección social e interacción con las comunidades.',
      'Demuestra cómo estas actividades contribuyen a la formación de los estudiantes.',
      'Promueve la participación de la comunidad académica en la solución de problemas y la transformación del contexto.',
    ],
    pregunta: '¿La proyección social del programa tiene impactos en el contexto y en la formación de los estudiantes?',
  },
  C30: {
    tituloOficial: 'Capacidades y procesos para la consolidación de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación-creación artística y cultural en el programa académico',
    aspectos: [
      'Demuestra que los profesores realizan investigación, desarrollo tecnológico, innovación o creación reconocidas por el Sistema Nacional de CTeI.',
      'Cuenta con condiciones y recursos institucionales para el desarrollo de dichas actividades.',
    ],
    pregunta: '¿El programa cuenta con profesores investigadores reconocidos y con recursos para la investigación y la creación?',
  },
  C31: {
    tituloOficial: 'Identificación de los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación-creación artística y cultural en los diferentes contextos del programa',
    aspectos: [
      'Los productos de investigación, innovación y creación enriquecen los aspectos curriculares y la formación de los estudiantes.',
      'Contribuyen a la generación de conocimiento o a la solución de problemas de la sociedad.',
      'Generan espacios de renovación de enfoques conceptuales y producción intelectual.',
    ],
    pregunta: '¿Los resultados de investigación y creación enriquecen el currículo y aportan a la sociedad?',
  },
  C32: {
    tituloOficial: 'Coherencia de las líneas de investigación y/o creación y resultados con el proyecto educativo del programa académico',
    aspectos: [
      'Demuestra coherencia entre las líneas de investigación y las declaraciones del PEP.',
      'Evidencia los avances alcanzados en el periodo de observación y su articulación con los propósitos académicos.',
    ],
    pregunta: '¿Las líneas de investigación y sus avances son coherentes con el PEP?',
  },
  C33: {
    tituloOficial: 'Resultados de la formación para la investigación, desarrollo tecnológico, la innovación y la creación',
    aspectos: [
      'Demuestra los resultados de la interacción profesor–estudiante en capacidades de indagación, pensamiento crítico, creativo e innovador.',
      'Forma en diferentes métodos para la investigación, la innovación y/o la creación artística y cultural, según la modalidad.',
    ],
    pregunta: '¿La formación para la investigación y la creación produce resultados demostrables en los estudiantes?',
  },
  C34: {
    tituloOficial: 'Demostración del uso de los resultados de investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y cultural en el mejoramiento del programa',
    aspectos: [
      'Da cuenta del uso de los resultados de investigación, innovación y creación en el mejoramiento del programa.',
      'Sistematiza la información que soporta el seguimiento de dicho uso.',
    ],
    pregunta: '¿Los resultados de investigación se usan para mejorar el programa y ese uso está sistematizado?',
  },
  C35: {
    tituloOficial: 'Impacto de la investigación y/o la investigación-creación en el contexto en el que se ofrece el programa',
    aspectos: [
      'Da cuenta de los impactos generados en el contexto o entorno por la investigación del programa.',
      'Relaciona los resultados del periodo de observación con proyectos asociados a las líneas del PEP.',
    ],
    pregunta: '¿La investigación del programa genera impactos verificables en su contexto?',
  },
  C36: {
    tituloOficial: 'Evolución y evaluación de los programas y servicios que desarrollan las políticas de bienestar en el marco del pluralismo, la diversidad y la inclusión',
    aspectos: [
      'Implementa políticas y protocolos de bienestar definidos institucionalmente.',
      'Evalúa la evolución de programas y servicios de bienestar para estudiantes, docentes y personal administrativo.',
      'Atiende las condiciones y necesidades de cada estamento y lugar, en el marco del pluralismo, la diversidad, la equidad y la inclusión.',
    ],
    pregunta: '¿Los programas de bienestar se evalúan y atienden a todos los estamentos con enfoque de inclusión?',
  },
  C37: {
    tituloOficial: 'Incidencia de los programas, planes y actividades de bienestar en la formación integral y en la calidad de vida de la comunidad de estudiantes',
    aspectos: [
      'Identifica los impactos del bienestar en la formación integral y la calidad de vida de los estudiantes.',
      'Sistematiza la información de seguimiento desde la admisión hasta la graduación.',
    ],
    pregunta: '¿El bienestar tiene incidencia demostrable en la formación y la calidad de vida de los estudiantes?',
  },
  C38: {
    tituloOficial: 'Adaptación y evaluación de los programas, actividades e infraestructura de bienestar a las condiciones particulares que determinan la oferta del programa',
    aspectos: [
      'Cuenta con mecanismos de evaluación de los programas y actividades de bienestar.',
      'Realiza adaptaciones según las condiciones particulares del entorno y de la comunidad del programa.',
      'Promueve la participación de los estudiantes en bienestar y en el uso de la infraestructura disponible.',
    ],
    pregunta: '¿El bienestar se adapta a las condiciones particulares del programa y promueve la participación estudiantil?',
  },
  C39: {
    tituloOficial: 'Evolución y evaluación de los medios educativos que soportan los ambientes de aprendizaje del programa',
    aspectos: [
      'Dispone de los medios educativos necesarios para los procesos formativos.',
      'Implementa programas de mejoramiento, actualización y evaluación de los medios educativos.',
      'Demuestra coherencia con las estrategias pedagógicas, tecnológicas y de acompañamiento.',
    ],
    pregunta: '¿Los medios educativos son suficientes, se actualizan y se evalúan en coherencia con las estrategias pedagógicas?',
  },
  C40: {
    tituloOficial: 'Aporte de los medios educativos en los procesos y resultados académicos de los estudiantes atendiendo su contexto y a los principios rectores de la alta calidad',
    aspectos: [
      'Demuestra la disponibilidad y el acceso de los estudiantes a espacios, recursos, herramientas y equipos.',
      'Evidencia el uso y la apropiación de esos recursos para enriquecer la enseñanza y el aprendizaje.',
    ],
    pregunta: '¿Los estudiantes acceden, usan y se apropian de los medios educativos en su proceso de aprendizaje?',
  },
  C41: {
    tituloOficial: 'Evolución de la suficiencia y calidad de los medios educativos, recursos bibliográficos y de información en coherencia con las dinámicas propias del programa y su mejoramiento',
    aspectos: [
      'Demuestra la evolución y suficiencia de recursos bibliográficos, de información y plataformas informáticas.',
      'Cuenta con equipos de cómputo y telecomunicaciones (hardware y software licenciado) actualizados.',
      'Los recursos apoyan el diseño de contenidos, las estrategias pedagógicas y el seguimiento a los estudiantes.',
    ],
    pregunta: '¿Los recursos bibliográficos, de información y tecnológicos son suficientes, actualizados y licenciados?',
  },
  C42: {
    tituloOficial: 'Evolución, suficiencia y evaluación de los recursos de infraestructura física y tecnológica en coherencia con el proyecto educativo del programa académico',
    aspectos: [
      'Demuestra la suficiencia de espacios físicos, aulas, laboratorios, talleres, centros de simulación, biblioteca y salas de estudio.',
      'Demuestra la suficiencia de plataformas y recursos tecnológicos.',
      'Evalúa la evolución de la infraestructura frente a las labores formativas, investigativas y de extensión.',
    ],
    pregunta: '¿La infraestructura física y tecnológica es suficiente, evoluciona y se evalúa según el PEP?',
  },
  C43: {
    tituloOficial: 'Identificación de los logros y resultados de la organización y la gestión del programa',
    aspectos: [
      'Cuenta con cuerpos colegiados con representación de profesores, estudiantes y egresados.',
      'Tiene mecanismos administrativos para identificar los logros y resultados de la organización y la gestión.',
    ],
    pregunta: '¿La organización del programa tiene participación de profesores, estudiantes y egresados y mide sus logros?',
  },
  C44: {
    tituloOficial: 'Evolución y evaluación de la sostenibilidad, los recursos y las capacidades del programa en coherencia con el proyecto educativo',
    aspectos: [
      'Evalúa la sostenibilidad de recursos humanos, técnicos, tecnológicos, bibliográficos, de laboratorios e infraestructura.',
      'Demuestra que esas capacidades favorecen la permanencia, el desarrollo académico y la graduación.',
    ],
    pregunta: '¿Las capacidades y recursos del programa son sostenibles y favorecen la permanencia y la graduación?',
  },
  C45: {
    tituloOficial: 'Liderazgo en la dirección y gestión',
    aspectos: [
      'La dirección y los comités ejercen liderazgo con participación de profesores, estudiantes y egresados.',
      'Existen procesos, trámites y procedimientos claros y conocidos por la comunidad y los grupos de interés.',
    ],
    pregunta: '¿La dirección del programa ejerce un liderazgo participativo con procesos claros y conocidos?',
  },
  C46: {
    tituloOficial: 'Sistemas de comunicación e información actualizados, accesibles y oportunos en el mejoramiento del programa',
    aspectos: [
      'Cuenta con mecanismos de comunicación entre todos los miembros de la comunidad.',
      'Tiene sistemas de información establecidos, accesibles y oportunos.',
      'Garantiza la protección de datos personales.',
    ],
    pregunta: '¿La comunicación y los sistemas de información son accesibles, oportunos y protegen los datos?',
  },
  C47: {
    tituloOficial: 'Consolidación de los recursos y capacidades coherentes con la evolución del programa',
    aspectos: [
      'Muestra la consolidación de recursos y capacidades coherentes con la evolución del programa.',
      'Demuestra que favorecen la permanencia, el desarrollo académico y la graduación de los estudiantes.',
    ],
    pregunta: '¿Los recursos y capacidades se han consolidado al ritmo de la evolución del programa?',
  },
  C48: {
    tituloOficial: 'Identificación de la sostenibilidad financiera del programa académico',
    aspectos: [
      'Dispone de recursos financieros para su funcionamiento e inversión.',
      'Los recursos son acordes con sus características, modalidad, naturaleza jurídica, identidad, misión, tipología y contexto.',
    ],
    pregunta: '¿El programa cuenta con recursos financieros suficientes para su funcionamiento e inversión?',
  },
  C49: {
    tituloOficial: 'Reflexión y participación de la comunidad en los procesos de gestión, autoevaluación, autorregulación y mejoramiento permanente del programa académico',
    aspectos: [
      'Aplica criterios y procedimientos para la evaluación periódica y participativa.',
      'Estudiantes, profesores y egresados participan en la toma de decisiones a través de comités u otras formas de organización.',
      'Evidencia una cultura de mejoramiento permanente.',
    ],
    pregunta: '¿La autoevaluación es periódica, participativa e incide en las decisiones de mejoramiento?',
  },
  C50: {
    tituloOficial: 'Consolidación de la información y los datos que dan cuenta de los resultados, logros e impactos de la alta calidad del programa en el periodo de observación correspondiente a la autoevaluación',
    aspectos: [
      'Consolida la información y los datos en el marco del Sistema Interno de Aseguramiento de la Calidad (SIAC).',
      'Usa esa información para soportar la autoevaluación, la autorregulación y el mejoramiento permanente.',
    ],
    pregunta: '¿La información del programa está consolidada en el SIAC y soporta la autoevaluación?',
  },
  C51: {
    tituloOficial: 'Identificación de los principales resultados, logros e impactos de la cultura de la calidad en el mejoramiento del programa',
    aspectos: [
      'Identifica los principales resultados, logros e impactos de la cultura de la calidad.',
      'Implementa las recomendaciones de los procesos de autoevaluación y hace seguimiento.',
    ],
    pregunta: '¿La cultura de la calidad ha producido resultados identificables y se implementan las recomendaciones?',
  },
};

/** Escala de calificación del Comité (apreciación cualitativa, independiente de las encuestas). */
export const ESCALA_CNA = [
  { code: 'NC', label: 'No se cumple', desc: 'La característica está ausente o no existe evidencia de su desarrollo.', color: '#B42318' },
  { code: 'CI', label: 'Se cumple insuficientemente', desc: 'Existen esfuerzos iniciales pero con vacíos significativos de evidencia o impacto.', color: '#C4640A' },
  { code: 'CA', label: 'Se cumple aceptablemente', desc: 'La característica se desarrolla de forma adecuada con evidencias verificables.', color: '#1D5FB8' },
  { code: 'CP', label: 'Se cumple plenamente', desc: 'Hay resultados, logros e impactos demostrados con evidencia sólida y trazable.', color: '#00963F' },
] as const;
export type NivelCNA = (typeof ESCALA_CNA)[number]['code'];
