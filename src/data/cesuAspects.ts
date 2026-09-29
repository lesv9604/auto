/**
 * Aspectos por evaluar por característica — programas académicos.
 * Fuente: CNA, "Lineamientos y aspectos por evaluar para la acreditación en alta
 * calidad de los programas académicos, las unidades académicas y las
 * instituciones de educación superior", aprobados por el CESU el 16 de
 * diciembre de 2025 (Acuerdo 01 de 2025), Capítulo 1. Transcripción textual;
 * `n` es la numeración oficial (1–70).
 * La "pregunta" de perspectiva es una guía institucional (no hace parte del documento).
 */
export interface CharacteristicAspects {
  tituloOficial: string;
  aspectos: { n: number; texto: string }[];
  pregunta: string;
}

export const FUENTE_ASPECTOS =
  'Fuente: Lineamientos y aspectos por evaluar para la acreditación en alta calidad (CESU, 16 de diciembre de 2025), Cap. 1 — programas académicos. Numeración oficial.';

export const CESU_ASPECTS: Record<string, CharacteristicAspects> = {
  C01: {
    tituloOficial: 'Proyecto educativo del programa',
    aspectos: [
      { n: 1, texto: 'Identifica en el proyecto educativo del programa, o lo que haga sus veces, los elementos educativos más relevantes del programa de acuerdo con el ámbito profesional/laboral y/o el académico y el campo de conocimiento y/o en sus entornos sociales y comunitarios.' },
      { n: 2, texto: 'Evalúa y mejora la apropiación del proyecto educativo del programa, o lo que haga sus veces, por parte de toda la comunidad del programa.' },
      { n: 3, texto: 'Demuestra la coherencia con la identidad institucional y las conexiones con las declaraciones del proyecto educativo del programa, o lo que haga sus veces, con el ámbito profesional/laboral y/o el académico y el campo de conocimiento y/o en sus entornos sociales y comunitarios.' },
    ],
    pregunta: '¿El PEP es coherente con la misión institucional y los campos de acción de la profesión, orienta las labores del programa y es de conocimiento público?',
  },
  C02: {
    tituloOficial: 'Relevancia académica y pertinencia social del programa académico',
    aspectos: [
      { n: 4, texto: 'Analiza y sustenta su relevancia y pertinencia a partir de las necesidades locales, regionales, nacionales o internacionales previamente definidas.' },
      { n: 5, texto: 'Logra el reconocimiento de actores externos (del ámbito profesional/laboral y/o el académico y el campo de conocimiento y/o en sus entornos sociales y comunitarios).' },
    ],
    pregunta: '¿El programa responde a necesidades del entorno previamente definidas y sustentadas, y es reconocido por su impacto?',
  },
  C03: {
    tituloOficial: 'Incidencia de las actividades de formación integral',
    aspectos: [
      { n: 6, texto: 'Identifica y evalúa los impactos en la formación integral desde la participación de los estudiantes en las distintas actividades que la promueven.' },
    ],
    pregunta: '¿Los estudiantes participan en actividades de formación integral y el programa evalúa su impacto?',
  },
  C04: {
    tituloOficial: 'Orientación, acompañamiento y seguimiento a estudiantes',
    aspectos: [
      { n: 7, texto: 'Evidencia resultados, logros e impactos en la permanencia y la graduación oportuna en el marco de la normatividad y del contexto del programa, de la caracterización de los estudiantes, y de las estrategias de orientación, acompañamiento y seguimiento acordes con las características particulares de la comunidad de estudiantes.' },
    ],
    pregunta: '¿El programa acompaña a sus estudiantes según su caracterización de ingreso y ese acompañamiento tiene impacto demostrable?',
  },
  C05: {
    tituloOficial: 'Estrategias pedagógicas para el fortalecimiento de la autonomía y el trabajo colaborativo con responsabilidad social',
    aspectos: [
      { n: 8, texto: 'Identifica y evalúa los logros, resultados e impactos de las estrategias y los recursos pedagógicos para el fortalecimiento de la autonomía y el trabajo colaborativo de los estudiantes.' },
    ],
    pregunta: '¿El programa desarrolla y evalúa el trabajo autónomo y colaborativo con responsabilidad social?',
  },
  C06: {
    tituloOficial: 'Políticas académicas y normativas en el proceso formativo en procura de una cultura de paz y tolerancia, el antirracismo, la perspectiva de género y la atención a poblaciones diversas, entre otros',
    aspectos: [
      { n: 9, texto: 'Identifica y evalúa los resultados, logros e impactos de las políticas académicas y normativas que reconocen y acogen características particulares de la comunidad de estudiantes en el proceso formativo.' },
    ],
    pregunta: '¿Los reglamentos y políticas académicas se conocen, se aplican y promueven la paz, la equidad de género y la inclusión?',
  },
  C07: {
    tituloOficial: 'Estímulos y apoyos para todos los estudiantes y en atención a la diversidad, el pluralismo y la inclusión',
    aspectos: [
      { n: 10, texto: 'Identifica los estímulos y apoyos dirigidos a toda la comunidad estudiantil y aquellos con enfoque diferencial.' },
      { n: 11, texto: 'Identifica y evalúa los impactos de los estímulos y apoyos para estudiantes y en atención a la diversidad, el pluralismo y la inclusión de acuerdo con los ajustes razonables.' },
    ],
    pregunta: '¿Los estímulos y apoyos tienen impacto demostrable y atienden la diversidad y la inclusión?',
  },
  C08: {
    tituloOficial: 'Resultados de los procesos de selección, vinculación y permanencia de los profesores en el mejoramiento del programa',
    aspectos: [
      { n: 12, texto: 'Evalúa los resultados de los procesos de selección, vinculación y permanencia de los profesores identificando su incidencia en el mejoramiento del programa y en sus procesos y resultados académicos.' },
    ],
    pregunta: '¿La selección, vinculación y permanencia de profesores es transparente y contribuye al mejoramiento del programa?',
  },
  C09: {
    tituloOficial: 'Estatuto, trayectoria y reconocimiento profesoral',
    aspectos: [
      { n: 13, texto: 'Identifica la apropiación y conexiones de los docentes con el estatuto, o lo que haga sus veces, y el quehacer profesoral.' },
      { n: 14, texto: 'Identifica los efectos de la aplicación del estatuto profesoral, o lo que haga sus veces, en la trayectoria profesoral, la inclusión, el reconocimiento de los méritos y el ascenso en el escalafón y los que se declaren en las normativas relacionadas.' },
    ],
    pregunta: '¿El estatuto profesoral se aplica y tiene efectos en la trayectoria, el reconocimiento y el ascenso de los profesores?',
  },
  C10: {
    tituloOficial: 'Planta profesoral para materializar el proyecto educativo del programa',
    aspectos: [
      { n: 15, texto: 'Demuestra que cuenta con una planta profesoral que, en número, tipo de vinculación, formación y contratación es coherente con las características' },
      { n: 16, texto: 'Demuestra resultados, logros e impactos de actividades realizadas en el programa por profesores que contribuyen a la materialización del proyecto educativo del programa, o lo que haga sus veces.' },
    ],
    pregunta: '¿La planta profesoral es suficiente y adecuada para materializar el PEP y atender a todos los estudiantes?',
  },
  C11: {
    tituloOficial: 'Capacidades, procesos, y resultados, del desarrollo profesoral del programa en coherencia con el proyecto educativo',
    aspectos: [
      { n: 17, texto: 'Identifica los programas y acciones relacionadas con el desarrollo profesoral en coherencia con las políticas institucionales.' },
      { n: 18, texto: 'Identifica y evalúa los resultados en la implementación de las políticas relacionadas con el desarrollo profesoral y su contribución al mejoramiento del programa.' },
    ],
    pregunta: '¿El desarrollo profesoral genera resultados coherentes con el PEP y las necesidades del programa?',
  },
  C12: {
    tituloOficial: 'Coherencia entre los estímulos a la trayectoria de los profesores del programa y el proyecto educativo',
    aspectos: [
      { n: 19, texto: 'Demuestra la coherencia entre los estímulos a la trayectoria de los profesores con los procesos y resultados académicos y evidencia su contribución al mejoramiento del programa.' },
    ],
    pregunta: '¿Los estímulos a los profesores reconocen méritos y son coherentes con el PEP?',
  },
  C13: {
    tituloOficial: 'Producción, pertinencia, utilización e impacto de material docente',
    aspectos: [
      { n: 20, texto: 'Fomenta, apoya y evalúa la producción del material docente de acuerdo con las características y modalidad del programa académico.' },
      { n: 21, texto: 'Identifica y evalúa los impactos del material docente en los procesos y resultados académicos.' },
    ],
    pregunta: '¿Los profesores producen material docente pertinente que se usa y se evalúa periódicamente?',
  },
  C14: {
    tituloOficial: 'Evaluación integral de profesores y sus efectos en el mejoramiento del programa',
    aspectos: [
      { n: 22, texto: 'Demuestra como la evaluación integral docente mejora el desempeño de la planta docente y sus efectos sobre la calidad del programa.' },
      { n: 23, texto: 'Evalúa de manera integral a los profesores en las distintas labores e identifica los efectos sobre la calidad del programa y la mejora en las prácticas pedagógicas, la permanencia, en la trayectoria, entre otros.' },
    ],
    pregunta: '¿La evaluación de profesores es integral, conocida previamente y produce mejoras en el programa?',
  },
  C15: {
    tituloOficial: 'Seguimiento de los egresados, su caracterización y aportes en el mejoramiento del programa',
    aspectos: [
      { n: 24, texto: 'Demuestra un seguimiento permanente y representativo a la ubicación, realizaciones, redes, logros e impactos de sus egresados y sus contribuciones al mejoramiento del programa.' },
    ],
    pregunta: '¿El programa hace seguimiento a sus egresados y usa sus aportes para mejorar?',
  },
  C16: {
    tituloOficial: 'Impacto y reconocimientos obtenidos por los egresados en el medio social y el ámbito académico',
    aspectos: [
      { n: 25, texto: 'Evidencia el reconocimiento al desempeño y evalúa el aporte de los egresados a la solución de los problemas económicos, ambientales, tecnológicos, sociales y culturales, a través del ejercicio de la disciplina, profesión, ocupación u oficio correspondiente.' },
    ],
    pregunta: '¿Los egresados son reconocidos y aportan a la solución de problemas de su entorno?',
  },
  C17: {
    tituloOficial: 'Evaluación de la gestión curricular y sus efectos en la mejora del programa desde una perspectiva de integralidad, flexibilidad e interacción de las disciplinas',
    aspectos: [
      { n: 26, texto: 'Demuestra los efectos de la evaluación de la gestión curricular en la mejora del programa.' },
      { n: 27, texto: 'Evalúa la pertinencia de la definición de la denominación, la duración y el número de créditos desde una perspectiva de integralidad, flexibilidad e interacción de las disciplinas.' },
      { n: 28, texto: 'Evalúa los efectos de las modificaciones realizadas en los aspectos académicos y de evaluación del programa.' },
    ],
    pregunta: '¿La gestión curricular se evalúa y produce un currículo integral, flexible, pertinente y actualizado?',
  },
  C18: {
    tituloOficial: 'Coherencia de las estrategias pedagógicas con el proyecto educativo del programa académico y las características de la comunidad de estudiantes',
    aspectos: [
      { n: 29, texto: 'Demuestra que las estrategias pedagógicas responden a las características particulares de la oferta del programa, la formación de los profesores de la comunidad de estudiantes e incorpora los resultados de las investigaciones pedagógicas institucionales en conexión con el proyecto educativo institucional y el proyecto educativo del programa, o lo que haga sus veces.' },
    ],
    pregunta: '¿Las estrategias pedagógicas son coherentes con el PEP, el modelo institucional y las características de los estudiantes?',
  },
  C19: {
    tituloOficial: 'Sistema de evaluación de estudiantes en coherencia con las transformaciones en las teorías y métodos de aprendizaje, las dinámicas del contexto y las declaraciones del programa',
    aspectos: [
      { n: 30, texto: 'Evidencia sistemas de evaluación que integren procedimientos claros y transparentes, dan cuenta de los procesos y resultados académicos con innovaciones que generan transformaciones profundas en el aprendizaje, facilitar la inclusión y acoger las dinámicas y cambios particulares de los campos del conocimiento.' },
    ],
    pregunta: '¿El sistema de evaluación de estudiantes es claro, transparente, innovador e inclusivo?',
  },
  C20: {
    tituloOficial: 'Aportes del sistema de evaluación de los procesos y resultados académicos al mejoramiento curricular del programa',
    aspectos: [
      { n: 31, texto: 'Demuestra los efectos de la evaluación sistemática y permanente de los procesos y resultados académicos en la mejora del programa' },
    ],
    pregunta: '¿La evaluación de los resultados académicos genera ajustes curriculares y metodológicos documentados?',
  },
  C21: {
    tituloOficial: 'Coherencia entre las competencias, capacidades, habilidades y/o destrezas, los procesos y resultados académicos previstos y demás aspectos curriculares definidos en el proyecto educativo del programa académico',
    aspectos: [
      { n: 32, texto: 'Demuestra los efectos del diseño curricular en el cumplimiento de los propósitos del proyecto educativo del programa, o lo que haga sus veces, y el' },
    ],
    pregunta: '¿Las competencias del perfil de egreso son coherentes con el currículo y se evalúa su logro?',
  },
  C22: {
    tituloOficial: 'Impacto de las políticas y estrategias implementadas para la permanencia y la graduación',
    aspectos: [
      { n: 33, texto: 'Identifica los resultados y logros y evalúa los impactos de las políticas y estrategias implementadas para la permanencia y la graduación de los estudiantes atendiendo criterios de equidad e inclusión.' },
    ],
    pregunta: '¿Las estrategias de permanencia y graduación tienen impacto demostrable y enfoque de equidad?',
  },
  C23: {
    tituloOficial: 'Caracterización y atención de estudiantes a través de los sistemas, estrategias y programas dispuestos para tal fin',
    aspectos: [
      { n: 34, texto: 'Demuestra la existencia de un sistema de alertas tempranas para la prevención y atención diferenciada de los estudiantes y da cuenta de su efectividad.' },
      { n: 35, texto: 'Demuestra el impacto de la caracterización a lo largo del proceso formativo de los estudiantes en la determinación de las estrategias y apoyos que promueven la permanencia y graduación oportuna.' },
    ],
    pregunta: '¿La caracterización y las alertas tempranas generan atención diferenciada efectiva?',
  },
  C24: {
    tituloOficial: 'Evolución de los ajustes a los aspectos curriculares y pedagógicos como resultado de los programas de permanencia y graduación',
    aspectos: [
      { n: 36, texto: 'Demuestra el impacto de los programas de permanencia y graduación en la evolución de las transformaciones curriculares y pedagógicas, en el marco de una formación integral.' },
    ],
    pregunta: '¿Los análisis de permanencia y graduación han producido ajustes curriculares y pedagógicos?',
  },
  C25: {
    tituloOficial: 'Contribución de los mecanismos de selección a la reducción de la deserción y la graduación oportuna',
    aspectos: [
      { n: 37, texto: 'Demuestra la contribución efectiva de los mecanismos de selección con criterios de equidad e inclusión en el desarrollo de actividades orientadas a la reducción de la deserción y a la graduación oportuna.' },
    ],
    pregunta: '¿Los mecanismos de selección se analizan y ajustan para reducir la deserción con equidad?',
  },
  C26: {
    tituloOficial: 'Inserción del programa en contextos académicos locales, regionales, nacionales e internacionales',
    aspectos: [
      { n: 38, texto: 'Evidencia la Incorporación de las tendencias de contextos locales, regionales, nacionales e internacionales en la actualización de los aspectos curriculares, a partir de espacios de reflexión y análisis.' },
    ],
    pregunta: '¿La actualización curricular incorpora tendencias e indicadores de calidad nacionales e internacionales?',
  },
  C27: {
    tituloOficial: 'Resultados y logros de las relaciones y de la cooperación de profesores y estudiantes con comunidades locales, regionales, nacionales y extranjeras y sus efectos en el posicionamiento del programa',
    aspectos: [
      { n: 39, texto: 'Evidencia y evalúa el impacto en la cooperación de profesores y estudiantes con otras instituciones o entidades locales, regionales, nacionales y extranjeras en el desarrollo de las labores del programa.' },
    ],
    pregunta: '¿La cooperación con otras instituciones y comunidades genera resultados y posicionamiento para el programa?',
  },
  C28: {
    tituloOficial: 'Efectos de las políticas para el desarrollo de habilidades comunicativas en una o varias lenguas en coherencia con el proyecto educativo del programa académico',
    aspectos: [
      { n: 40, texto: 'Identifica y evalúa los impactos de las políticas institucionales el desarrollo de habilidades comunicativas en una o varias lenguas en coherencia con sus declaraciones' },
    ],
    pregunta: '¿Las estrategias para el desarrollo de competencias comunicativas en otras lenguas tienen efectos demostrables?',
  },
  C29: {
    tituloOficial: 'Impacto y aportes de la proyección e interacción social en diferentes contextos',
    aspectos: [
      { n: 41, texto: 'Identifica y evalúa los impactos y los aportes de la extensión y la proyección e interacción social en la solución de los problemas y la transformación de sus contextos.' },
      { n: 42, texto: 'Identifica y evalúa los impactos que tiene la participación de los estudiantes en las actividades de extensión, proyección e interacción social sobre sus procesos de formación.' },
    ],
    pregunta: '¿La proyección social del programa tiene impactos en el contexto y en la formación de los estudiantes?',
  },
  C30: {
    tituloOficial: 'Capacidades y procesos para la consolidación de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural en el programa académico',
    aspectos: [
      { n: 43, texto: 'Evalúa la consolidación y la evolución de las condiciones y los recursos para el desarrollo de actividades de investigación, la innovación, el desarrollo tecnológico, la creación e investigación-creación artística y cultural, de los profesores del programa, reconocidas por el Sistema Nacional de Ciencia, Tecnología e Innovación.' },
    ],
    pregunta: '¿El programa cuenta con profesores investigadores reconocidos y con recursos para la investigación y la creación?',
  },
  C31: {
    tituloOficial: 'Identificación de los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural en los diferentes contextos del programa',
    aspectos: [
      { n: 44, texto: 'Evidencia los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural que contribuyen a la actualización y generación de conocimiento o a la solución de problemas de la sociedad, la generación de nuevos espacios para la renovación permanente de enfoques conceptuales y teóricos que contribuyan al desarrollo investigativo innovador y a la producción intelectual.' },
      { n: 45, texto: 'Evalúa los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural sobre la formación de los estudiantes.' },
    ],
    pregunta: '¿Los resultados de investigación y creación enriquecen el currículo y aportan a la sociedad?',
  },
  C32: {
    tituloOficial: 'Coherencia de las líneas de investigación y/o creación y resultados con el proyecto educativo del programa académico',
    aspectos: [
      { n: 46, texto: 'Articula los propósitos académicos con las dinámicas investigativas desde los productos y actividades asociados a las líneas de investigación con las declaraciones del programa.' },
    ],
    pregunta: '¿Las líneas de investigación y sus avances son coherentes con el PEP?',
  },
  C33: {
    tituloOficial: 'Resultados de la formación para la investigación, desarrollo tecnológico, la innovación y la creación',
    aspectos: [
      { n: 47, texto: 'Consolida la participación de la comunidad de estudiantes en las actividades de formación para la investigación, la innovación, el desarrollo tecnológico, la creación e investigación-creación artística y cultural.' },
      { n: 48, texto: 'Identifica y sistematiza los resultados de la formación para la investigación, la innovación, el desarrollo tecnológico, la creación e investigación-creación artística y cultural de los estudiantes del programa.' },
    ],
    pregunta: '¿La formación para la investigación y la creación produce resultados demostrables en los estudiantes?',
  },
  C34: {
    tituloOficial: 'Demostración del uso de los resultados de investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y cultural en el mejoramiento del programa',
    aspectos: [
      { n: 49, texto: 'Incorpora e implementa los resultados de investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y' },
    ],
    pregunta: '¿Los resultados de investigación se usan para mejorar el programa y ese uso está sistematizado?',
  },
  C35: {
    tituloOficial: 'Impacto de la investigación y/o la investigación-creación en el contexto en el que se ofrece el programa',
    aspectos: [
      { n: 50, texto: 'Evalúa la pertinencia y el impacto de los resultados investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y cultural en los contextos del programa.' },
    ],
    pregunta: '¿La investigación del programa genera impactos verificables en su contexto?',
  },
  C36: {
    tituloOficial: 'Evolución y evaluación de los programas y servicios que desarrollan las políticas de bienestar en el marco del pluralismo, la diversidad y la inclusión',
    aspectos: [
      { n: 51, texto: 'Evalúa la implementación de las políticas relacionadas con los programas y servicios de bienestar en el marco del pluralismo, la diversidad y la inclusión, basado en el nivel de participación de la comunidad del programa.' },
      { n: 52, texto: 'Evalúa la evolución de los programas y servicios de bienestar en el marco del pluralismo, la diversidad y la inclusión, basado en el nivel de participación de la comunidad del programa.' },
    ],
    pregunta: '¿Los programas de bienestar se evalúan y atienden a todos los estamentos con enfoque de inclusión?',
  },
  C37: {
    tituloOficial: 'Incidencia de los programas, planes y actividades de bienestar en la formación integral y en la calidad de vida de la comunidad de estudiantes',
    aspectos: [
      { n: 53, texto: 'Identifica y evalúa los impactos de los programas, planes y actividades de bienestar en la formación integral y en la calidad de vida de la comunidad de estudiantes.' },
    ],
    pregunta: '¿El bienestar tiene incidencia demostrable en la formación y la calidad de vida de los estudiantes?',
  },
  C38: {
    tituloOficial: 'Adaptación y evaluación de los programas, actividades e infraestructura de bienestar a las condiciones particulares que determinan la oferta del programa',
    aspectos: [
      { n: 54, texto: 'Consolida y demuestra el avance de la infraestructura, los programas y servicios con los que desarrollan las políticas de bienestar en el marco del pluralismo, la diversidad y la inclusión, teniendo como referencia las características particulares de toda la comunidad del programa y las que determinan su oferta.' },
    ],
    pregunta: '¿El bienestar se adapta a las condiciones particulares del programa y promueve la participación estudiantil?',
  },
  C39: {
    tituloOficial: 'Evolución y evaluación de los medios educativos que soportan los ambientes de aprendizaje del programa',
    aspectos: [
      { n: 55, texto: 'Evalúa la pertinencia y la actualización de los medios educativos que soportan' },
    ],
    pregunta: '¿Los medios educativos son suficientes, se actualizan y se evalúan en coherencia con las estrategias pedagógicas?',
  },
  C40: {
    tituloOficial: 'Aporte de los medios educativos en los procesos y resultados académicos de los estudiantes atendiendo su contexto y a los principios rectores de la alta calidad',
    aspectos: [
      { n: 56, texto: 'Identifica y evalúa los efectos de los medios educativos en los procesos y resultados académicos de los estudiantes atendiendo su contexto.' },
    ],
    pregunta: '¿Los estudiantes acceden, usan y se apropian de los medios educativos en su proceso de aprendizaje?',
  },
  C41: {
    tituloOficial: 'Evolución de la suficiencia y calidad de los medios educativos, recursos bibliográficos y de información en coherencia con las dinámicas propias del programa y su mejoramiento',
    aspectos: [
      { n: 57, texto: 'Evalúa de la idoneidad, el uso, la usabilidad, la suficiencia y la calidad de los medios educativos, recursos bibliográficos y de información y de los servicios asociados, en coherencia con las características particulares de la comunidad del programa, y las que determinan su oferta.' },
    ],
    pregunta: '¿Los recursos bibliográficos, de información y tecnológicos son suficientes, actualizados y licenciados?',
  },
  C42: {
    tituloOficial: 'Evolución, suficiencia y evaluación de los recursos de infraestructura física y tecnológica en coherencia con el proyecto educativo del programa académico',
    aspectos: [
      { n: 58, texto: 'Evalúa de la pertinencia, el uso, la usabilidad, la suficiencia, la actualización, el' },
    ],
    pregunta: '¿La infraestructura física y tecnológica es suficiente, evoluciona y se evalúa según el PEP?',
  },
  C43: {
    tituloOficial: 'Identificación de los logros y resultados de la organización y la gestión del programa',
    aspectos: [
      { n: 59, texto: 'Identifica y evalúa los principales logros y resultados de la organización y la gestión del programa.' },
      { n: 60, texto: 'Evidencia la participación en los cuerpos (s) colegiado(s) de los representantes de los profesores, los estudiantes y los egresados y su contribución a los planes de mejoramiento del programa.' },
    ],
    pregunta: '¿La organización del programa tiene participación de profesores, estudiantes y egresados y mide sus logros?',
  },
  C44: {
    tituloOficial: 'Evolución y evaluación de la sostenibilidad, los recursos y las capacidades del programa en coherencia con el proyecto educativo',
    aspectos: [
      { n: 61, texto: 'Consolida y demuestra el avance de la sostenibilidad, los recursos y las capacidades en coherencia con las características particulares de la comunidad del programa, las que determinan su oferta y su crecimiento o los desafíos del contexto.' },
    ],
    pregunta: '¿Las capacidades y recursos del programa son sostenibles y favorecen la permanencia y la graduación?',
  },
  C45: {
    tituloOficial: 'Liderazgo en la dirección y gestión',
    aspectos: [
      { n: 62, texto: 'Evalúa el impacto del liderazgo en la dirección y gestión en la consolidación de la comunidad académica del programa y en cultura de la calidad y en los procesos de mejoramiento.' },
    ],
    pregunta: '¿La dirección del programa ejerce un liderazgo participativo con procesos claros y conocidos?',
  },
  C46: {
    tituloOficial: 'Sistemas de comunicación e información actualizados, accesibles y oportunos en el mejoramiento del programa',
    aspectos: [
      { n: 63, texto: 'Demuestra la accesibilidad, consistencia, actualización y protección de los datos en sistemas de información y sus contribuciones a la toma de decisiones para la autorregulación, autoevaluación y el mejoramiento permanente.' },
      { n: 64, texto: 'Demuestra la efectividad de los sistemas de comunicación en coherencia con las características particulares de la comunidad del programa, las que determinan su oferta.' },
    ],
    pregunta: '¿La comunicación y los sistemas de información son accesibles, oportunos y protegen los datos?',
  },
  C47: {
    tituloOficial: 'Consolidación de los recursos y capacidades coherentes con la evolución del programa',
    aspectos: [
      { n: 65, texto: 'Identifica el impacto de los recursos en la permanencia, el desarrollo académico y la graduación oportuna de los estudiantes, en coherencia con la evolución del programa.' },
    ],
    pregunta: '¿Los recursos y capacidades se han consolidado al ritmo de la evolución del programa?',
  },
  C48: {
    tituloOficial: 'Identificación de la sostenibilidad financiera del programa académico',
    aspectos: [
      { n: 66, texto: 'Demuestra que dispone de los recursos financieros de funcionamiento e inversión, necesarios para el desarrollo del programa y desarrolla procesos de planeación, seguimiento y ejecución de dichos recursos en coherencia con las dinámicas propias del programa y sus planes de mejoramiento.' },
    ],
    pregunta: '¿El programa cuenta con recursos financieros suficientes para su funcionamiento e inversión?',
  },
  C49: {
    tituloOficial: 'Reflexión y participación de la comunidad en los procesos de gestión, autoevaluación, autorregulación y mejoramiento permanente del programa académico',
    aspectos: [
      { n: 67, texto: 'Presenta y evalúa resultados de la participación representativa, reflexiva y critica de la comunidad académica del programa en los procesos de autorregulación, autoevaluación y mejoramiento permanente, para promover una cultura de la calidad y contribuir a la consolidación del sistema interno de aseguramiento de la calidad.' },
    ],
    pregunta: '¿La autoevaluación es periódica, participativa e incide en las decisiones de mejoramiento?',
  },
  C50: {
    tituloOficial: 'Consolidación de la información y los datos que dan cuenta de los resultados, logros e impactos de la alta calidad del programa en el periodo de observación correspondiente a la autoevaluación',
    aspectos: [
      { n: 68, texto: 'Demuestra la evolución y la consolidación de la información y los datos en el marco del sistema interno de aseguramiento de la calidad, para soportar los procesos de autoevaluación, autorregulación y del mejoramiento permanente del programa académico.' },
    ],
    pregunta: '¿La información del programa está consolidada en el SIAC y soporta la autoevaluación?',
  },
  C51: {
    tituloOficial: 'Identificación de los principales resultados, logros e impactos de la cultura de la calidad en el mejoramiento del programa',
    aspectos: [
      { n: 69, texto: 'Identifica los principales resultados y logros y evalúa los impactos de la cultura de la calidad en el mejoramiento del programa.' },
      { n: 70, texto: 'Implementa las recomendaciones realizadas en los procesos de autoevaluación, y realiza un seguimiento que permite evaluar sus efectos sobre mejoramiento permanente del programa.' },
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
