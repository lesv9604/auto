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
  descripcion: string;
  aspectos: { n: number; texto: string }[];
  pregunta: string;
}

export const FUENTE_ASPECTOS =
  'Fuente: Lineamientos y aspectos por evaluar para la acreditación en alta calidad (CESU, 16 de diciembre de 2025), Cap. 1 — programas académicos. Numeración oficial.';

export const CESU_ASPECTS: Record<string, CharacteristicAspects> = {
  C01: {
    tituloOficial: 'Proyecto educativo del programa',
    descripcion: 'El proyecto educativo del programa académico, o lo que haga sus veces, es coherente con la misión y la identidad institucional, así como con los campos de acción de las profesiones o disciplinas, y orienta el desarrollo de las labores formativas, académicas, docentes, de investigación creación, de innovación, científicas, artísticas y culturales, y de relación con el sector externo (extensión o proyección social), en relación con los objetivos de formación profesional e integral de los estudiantes. El proyecto educativo del programa académico, o lo que haga sus veces, debe ser de conocimiento público. En el caso de los programas académicos del área de la salud, además, se tendrá en cuenta la relación y coherencia entre la institución de educación superior y los escenarios donde se realizan las prácticas formativas.',
    aspectos: [
      { n: 1, texto: 'Identifica en el proyecto educativo del programa, o lo que haga sus veces, los elementos educativos más relevantes del programa de acuerdo con el ámbito profesional/laboral y/o el académico y el campo de conocimiento y/o en sus entornos sociales y comunitarios.' },
      { n: 2, texto: 'Evalúa y mejora la apropiación del proyecto educativo del programa, o lo que haga sus veces, por parte de toda la comunidad del programa.' },
      { n: 3, texto: 'Demuestra la coherencia con la identidad institucional y las conexiones con las declaraciones del proyecto educativo del programa, o lo que haga sus veces, con el ámbito profesional/laboral y/o el académico y el campo de conocimiento y/o en sus entornos sociales y comunitarios.' },
    ],
    pregunta: '¿El PEP es coherente con la misión institucional y los campos de acción de la profesión, orienta las labores del programa y es de conocimiento público?',
  },
  C02: {
    tituloOficial: 'Relevancia académica y pertinencia social del programa académico',
    descripcion: 'El programa académico responde a las necesidades locales, regionales, nacionales o internacionales previamente definidas y sustentadas, independientemente de la(s) modalidad(es) en la(las) que se oferta, su naturaleza y el reconocimiento que recibe por el modo como impacta y hace realidad su finalidad.',
    aspectos: [
      { n: 4, texto: 'Analiza y sustenta su relevancia y pertinencia a partir de las necesidades locales, regionales, nacionales o internacionales previamente definidas.' },
      { n: 5, texto: 'Logra el reconocimiento de actores externos (del ámbito profesional/laboral y/o el académico y el campo de conocimiento y/o en sus entornos sociales y comunitarios).' },
    ],
    pregunta: '¿El programa responde a necesidades del entorno previamente definidas y sustentadas, y es reconocido por su impacto?',
  },
  C03: {
    tituloOficial: 'Incidencia de las actividades de formación integral',
    descripcion: 'El programa académico da cuenta de la participación de los estudiantes en actividades de investigación, desarrollo tecnológico, innovación, creación e investigación-creación artística, cultural y deportiva, así como en proyectos de desarrollo social y ambiental con comunidades o con diferentes organizaciones, relacionamiento nacional e internacional y en otras acciones de formación complementaria, que inciden en la formación integral, evaluando su impacto en coherencia con las características y el proyecto educativo del programa, o lo que haga sus veces.',
    aspectos: [
      { n: 6, texto: 'Identifica y evalúa los impactos en la formación integral desde la participación de los estudiantes en las distintas actividades que la promueven.' },
    ],
    pregunta: '¿Los estudiantes participan en actividades de formación integral y el programa evalúa su impacto?',
  },
  C04: {
    tituloOficial: 'Orientación, acompañamiento y seguimiento a estudiantes',
    descripcion: 'El programa académico, en el marco de las políticas institucionales demuestra procesos de orientación, acompañamiento y seguimiento académico a sus estudiantes, con impacto evidente en su formación, permanencia y graduación, de acuerdo con la caracterización realizada al momento de su ingreso, según la modalidad y el nivel de formación del programa.',
    aspectos: [
      { n: 7, texto: 'Evidencia resultados, logros e impactos en la permanencia y la graduación oportuna en el marco de la normatividad y del contexto del programa, de la caracterización de los estudiantes, y de las estrategias de orientación, acompañamiento y seguimiento acordes con las características particulares de la comunidad de estudiantes.' },
    ],
    pregunta: '¿El programa acompaña a sus estudiantes según su caracterización de ingreso y ese acompañamiento tiene impacto demostrable?',
  },
  C05: {
    tituloOficial: 'Estrategias pedagógicas para el fortalecimiento de la autonomía y el trabajo colaborativo con responsabilidad social',
    descripcion: 'El programa académico declara, evalúa, fomenta y desarrolla, durante el proceso de aprendizaje, las capacidades, habilidades y destrezas para el trabajo autónomo y el trabajo colaborativo de cada estudiante en entornos participativos con otros estudiantes y demás actores de la comunidad académica. El programa genera los medios, espacios y ambientes necesarios para promover el trabajo autónomo y colaborativo, y evalúa su impacto en los procesos y resultados académicos de los estudiantes. Además, implementa estrategias de seguimiento y mejora continua.',
    aspectos: [
      { n: 8, texto: 'Identifica y evalúa los logros, resultados e impactos de las estrategias y los recursos pedagógicos para el fortalecimiento de la autonomía y el trabajo colaborativo de los estudiantes.' },
    ],
    pregunta: '¿El programa desarrolla y evalúa el trabajo autónomo y colaborativo con responsabilidad social?',
  },
  C06: {
    tituloOficial: 'Políticas académicas y normativas en el proceso formativo en procura de una cultura de paz y tolerancia, el antirracismo, la perspectiva de género y la atención a poblaciones diversas, entre otros',
    descripcion: 'El programa académico da cuenta de la divulgación, aplicación y actualización de los reglamentos estudiantiles y las políticas académicas aprobadas, en los que se definen, entre otros aspectos, los deberes y derechos, el régimen disciplinario, la participación de la comunidad académica en la toma de decisiones y las condiciones y exigencias académicas de permanencia, graduación y la generación de una cultura de la paz, la tolerancia, el reconocimiento y el respeto mutuo, el antirracismo, la perspectiva de género e identidades diversas, y la inclusión de personas con discapacidad, entre otros, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 9, texto: 'Identifica y evalúa los resultados, logros e impactos de las políticas académicas y normativas que reconocen y acogen características particulares de la comunidad de estudiantes en el proceso formativo.' },
    ],
    pregunta: '¿Los reglamentos y políticas académicas se conocen, se aplican y promueven la paz, la equidad de género y la inclusión?',
  },
  C07: {
    tituloOficial: 'Estímulos y apoyos para todos los estudiantes y en atención a la diversidad, el pluralismo y la inclusión',
    descripcion: 'El programa académico demuestra el impacto de los beneficios otorgados a los estudiantes, a través de estímulos académicos, apoyos socioeconómicos y ajustes razonables. A su vez, demuestra la atención a la diversidad, el pluralismo y la inclusión en la comunidad de estudiantes.',
    aspectos: [
      { n: 10, texto: 'Identifica los estímulos y apoyos dirigidos a toda la comunidad estudiantil y aquellos con enfoque diferencial.' },
      { n: 11, texto: 'Identifica y evalúa los impactos de los estímulos y apoyos para estudiantes y en atención a la diversidad, el pluralismo y la inclusión de acuerdo con los ajustes razonables.' },
    ],
    pregunta: '¿Los estímulos y apoyos tienen impacto demostrable y atienden la diversidad y la inclusión?',
  },
  C08: {
    tituloOficial: 'Resultados de los procesos de selección, vinculación y permanencia de los profesores en el mejoramiento del programa',
    descripcion: 'La institución demuestra la aplicación transparente y eficaz de los criterios establecidos para los procesos de selección, vinculación y permanencia de sus profesores, y evalúa la incidencia de estos procesos en el mejoramiento del programa y el impacto en los procesos y resultados académicos.',
    aspectos: [
      { n: 12, texto: 'Evalúa los resultados de los procesos de selección, vinculación y permanencia de los profesores identificando su incidencia en el mejoramiento del programa y en sus procesos y resultados académicos.' },
    ],
    pregunta: '¿La selección, vinculación y permanencia de profesores es transparente y contribuye al mejoramiento del programa?',
  },
  C09: {
    tituloOficial: 'Estatuto, trayectoria y reconocimiento profesoral',
    descripcion: 'La institución demuestra la aplicación de un estatuto profesoral, o lo que hace sus veces, y sus efectos en la trayectoria profesoral, la inclusión, el reconocimiento de los méritos y el ascenso en el escalafón, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 13, texto: 'Identifica la apropiación y conexiones de los docentes con el estatuto, o lo que haga sus veces, y el quehacer profesoral.' },
      { n: 14, texto: 'Identifica los efectos de la aplicación del estatuto profesoral, o lo que haga sus veces, en la trayectoria profesoral, la inclusión, el reconocimiento de los méritos y el ascenso en el escalafón y los que se declaren en las normativas relacionadas.' },
    ],
    pregunta: '¿El estatuto profesoral se aplica y tiene efectos en la trayectoria, el reconocimiento y el ascenso de los profesores?',
  },
  C10: {
    tituloOficial: 'Planta profesoral para materializar el proyecto educativo del programa',
    descripcion: 'El programa académico cuenta, directamente o a través de la facultad, escuela o departamento respectivo, con un núcleo de profesores con la dedicación, formación y experiencia requeridos para el desarrollo de las labores formativas, académicas, docentes, de investigación-creación, de innovación, científicas, artísticas y culturales, y de relación con el sector externo (extensión o proyección social) y para la atención de la totalidad de los estudiantes matriculados, de acuerdo con las características y modalidad del programa académico para materializar el proyecto educativo del programa, o lo que haga sus veces.',
    aspectos: [
      { n: 15, texto: 'Demuestra que cuenta con una planta profesoral que, en número, tipo de vinculación, formación y contratación es coherente con las características' },
      { n: 16, texto: 'Demuestra resultados, logros e impactos de actividades realizadas en el programa por profesores que contribuyen a la materialización del proyecto educativo del programa, o lo que haga sus veces.' },
    ],
    pregunta: '¿La planta profesoral es suficiente y adecuada para materializar el PEP y atender a todos los estudiantes?',
  },
  C11: {
    tituloOficial: 'Capacidades, procesos, y resultados, del desarrollo profesoral del programa en coherencia con el proyecto educativo',
    descripcion: 'Se demuestran los resultados del desarrollo profesoral, en relación con las capacidades y procesos de la institución para responder a las necesidades y los objetivos de formación, la diversidad de los estudiantes, las modalidades del programa, la formación investigativa, la investigación formativa y los requerimientos de internacionalización y de inter y multiculturalidad de profesores y estudiantes, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 17, texto: 'Identifica los programas y acciones relacionadas con el desarrollo profesoral en coherencia con las políticas institucionales.' },
      { n: 18, texto: 'Identifica y evalúa los resultados en la implementación de las políticas relacionadas con el desarrollo profesoral y su contribución al mejoramiento del programa.' },
    ],
    pregunta: '¿El desarrollo profesoral genera resultados coherentes con el PEP y las necesidades del programa?',
  },
  C12: {
    tituloOficial: 'Coherencia entre los estímulos a la trayectoria de los profesores del programa y el proyecto educativo',
    descripcion: 'La institución y el programa académico demuestran la divulgación, aplicación y actualización de criterios académicos en la política de estímulos que reconoce y favorece el ejercicio calificado de las labores formativas, académicas, docentes, de investigación-creación, de innovación, científicas, artísticas y culturales, y de relación con el sector externo (extensión o proyección social). En los programas de alta calidad, los estímulos que reciben los profesores deben asociarse a los méritos o logros académicos y profesionales, en coherencia con el proyecto educativo del programa académico, o lo que haga sus veces, y con los procesos y resultados académicos.',
    aspectos: [
      { n: 19, texto: 'Demuestra la coherencia entre los estímulos a la trayectoria de los profesores con los procesos y resultados académicos y evidencia su contribución al mejoramiento del programa.' },
    ],
    pregunta: '¿Los estímulos a los profesores reconocen méritos y son coherentes con el PEP?',
  },
  C13: {
    tituloOficial: 'Producción, pertinencia, utilización e impacto de material docente',
    descripcion: 'Los profesores producen de manera individual y colaborativa con otros profesores de la institución, materiales propios del tipo de formación para el desarrollo de las diversas actividades académicas, que soportan los ambientes de aprendizaje, los cuales se evalúan periódicamente con base en criterios y mecanismos académicos previamente definidos, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 20, texto: 'Fomenta, apoya y evalúa la producción del material docente de acuerdo con las características y modalidad del programa académico.' },
      { n: 21, texto: 'Identifica y evalúa los impactos del material docente en los procesos y resultados académicos.' },
    ],
    pregunta: '¿Los profesores producen material docente pertinente que se usa y se evalúa periódicamente?',
  },
  C14: {
    tituloOficial: 'Evaluación integral de profesores y sus efectos en el mejoramiento del programa',
    descripcion: 'El programa académico demuestra procesos periódicos y permanentes de evaluación integral de los profesores y de las redes de trabajo colaborativo que conforman, con alcance a las distintas actividades y desempeños en las labores formativas, académicas, docentes, de investigación-creación, de innovación, científicas, artísticas y culturales, y de relación con el sector externo (extensión o proyección social). Dichos procesos son establecidos, difundidos y conocidos previamente, y son coherentes con las características y modalidad del programa académico.',
    aspectos: [
      { n: 22, texto: 'Demuestra como la evaluación integral docente mejora el desempeño de la planta docente y sus efectos sobre la calidad del programa.' },
      { n: 23, texto: 'Evalúa de manera integral a los profesores en las distintas labores e identifica los efectos sobre la calidad del programa y la mejora en las prácticas pedagógicas, la permanencia, en la trayectoria, entre otros.' },
    ],
    pregunta: '¿La evaluación de profesores es integral, conocida previamente y produce mejoras en el programa?',
  },
  C15: {
    tituloOficial: 'Seguimiento de los egresados, su caracterización y aportes en el mejoramiento del programa',
    descripcion: 'El programa académico da cuenta del seguimiento a la ubicación, realizaciones, redes, logros e impactos de sus egresados, de manera coherente con los fines de la institución y con sus propios fines.',
    aspectos: [
      { n: 24, texto: 'Demuestra un seguimiento permanente y representativo a la ubicación, realizaciones, redes, logros e impactos de sus egresados y sus contribuciones al mejoramiento del programa.' },
    ],
    pregunta: '¿El programa hace seguimiento a sus egresados y usa sus aportes para mejorar?',
  },
  C16: {
    tituloOficial: 'Impacto y reconocimientos obtenidos por los egresados en el medio social y el ámbito académico',
    descripcion: 'El programa académico evidencia el reconocimiento de la alta calidad de la formación recibida, el desempeño destacado y el aporte de los egresados a la solución de los problemas económicos, ambientales, tecnológicos, sociales y culturales, a través del ejercicio de la disciplina, profesión, ocupación u oficio correspondiente.',
    aspectos: [
      { n: 25, texto: 'Evidencia el reconocimiento al desempeño y evalúa el aporte de los egresados a la solución de los problemas económicos, ambientales, tecnológicos, sociales y culturales, a través del ejercicio de la disciplina, profesión, ocupación u oficio correspondiente.' },
    ],
    pregunta: '¿Los egresados son reconocidos y aportan a la solución de problemas de su entorno?',
  },
  C17: {
    tituloOficial: 'Evaluación de la gestión curricular y sus efectos en la mejora del programa desde una perspectiva de integralidad, flexibilidad e interacción de las disciplinas',
    descripcion: 'El programa académico demuestra que su estructura curricular promueve la interacción con diferentes disciplinas, la formación en valores, la apropiación de conocimientos y métodos, y el desarrollo de las competencias, capacidades, habilidades y/o destrezas para el ejercicio de la disciplina, profesión, ocupación u oficio, promoviendo la formación integral del estudiante en coherencia con la misión institucional y los objetivos propios del programa académico. La evaluación curricular contribuye a la mejora continua de la gestión curricular, su flexibilidad, pertinencia y actualización, facilitando la movilidad de los estudiantes a través de rutas de formación que ellos mismos construyen a partir de su propia trayectoria, intereses y aspiraciones. Dichas rutas pueden ser transitadas dentro de la misma oferta institucional o fuera de ella, en el ámbito nacional e internacional. El programa académico evidencia en la definición de su denominación, en la determinación de su duración y en el número de créditos, o en las respectivas modificaciones, una reflexión de la comunidad académica en coherencia con las políticas académicas institucionales, la normatividad vigente y los referentes en el área del conocimiento.',
    aspectos: [
      { n: 26, texto: 'Demuestra los efectos de la evaluación de la gestión curricular en la mejora del programa.' },
      { n: 27, texto: 'Evalúa la pertinencia de la definición de la denominación, la duración y el número de créditos desde una perspectiva de integralidad, flexibilidad e interacción de las disciplinas.' },
      { n: 28, texto: 'Evalúa los efectos de las modificaciones realizadas en los aspectos académicos y de evaluación del programa.' },
    ],
    pregunta: '¿La gestión curricular se evalúa y produce un currículo integral, flexible, pertinente y actualizado?',
  },
  C18: {
    tituloOficial: 'Coherencia de las estrategias pedagógicas con el proyecto educativo del programa académico y las características de la comunidad de estudiantes',
    descripcion: 'El programa académico muestra coherencia entre las estrategias pedagógicas utilizadas, sus características y modalidad con el modelo pedagógico de la institución. Estas estrategias son diseñadas de acuerdo con los objetivos de los procesos de formación, de cuya evaluación se obtienen los resultados académicos previstos, se atienden los aportes de la investigación pedagógica y se prospectan los procesos de formación y actualización de los profesores. En el caso de los programas académicos del área de la salud, a través de los convenios docencia–servicio, demuestran estrategias adecuadas de enseñanza-aprendizaje en escenarios de práctica idóneos y suficientes para soportar esta formación.',
    aspectos: [
      { n: 29, texto: 'Demuestra que las estrategias pedagógicas responden a las características particulares de la oferta del programa, la formación de los profesores de la comunidad de estudiantes e incorpora los resultados de las investigaciones pedagógicas institucionales en conexión con el proyecto educativo institucional y el proyecto educativo del programa, o lo que haga sus veces.' },
    ],
    pregunta: '¿Las estrategias pedagógicas son coherentes con el PEP, el modelo institucional y las características de los estudiantes?',
  },
  C19: {
    tituloOficial: 'Sistema de evaluación de estudiantes en coherencia con las transformaciones en las teorías y métodos de aprendizaje, las dinámicas del contexto y las declaraciones del programa',
    descripcion: 'El programa académico cuenta con un sistema de evaluación de estudiantes basado en políticas y normas claras, universales y transparentes. Dicho sistema permite valorar periódica o permanentemente los procesos y resultados académicos, las actitudes, los conocimientos, las capacidades y las habilidades adquiridas por los estudiantes en coherencia con los objetivos de formación previstos. Los sistemas de evaluación integran la innovación para generar transformaciones profundas en el aprendizaje y acogen dinámicas que les permitan ser coherentes con los cambios en el conocimiento, y con el desmonte de barreras a la inclusión, especialmente de personas en condición de discapacidad.',
    aspectos: [
      { n: 30, texto: 'Evidencia sistemas de evaluación que integren procedimientos claros y transparentes, dan cuenta de los procesos y resultados académicos con innovaciones que generan transformaciones profundas en el aprendizaje, facilitar la inclusión y acoger las dinámicas y cambios particulares de los campos del conocimiento.' },
    ],
    pregunta: '¿El sistema de evaluación de estudiantes es claro, transparente, innovador e inclusivo?',
  },
  C20: {
    tituloOficial: 'Aportes del sistema de evaluación de los procesos y resultados académicos al mejoramiento curricular del programa',
    descripcion: 'El programa académico demuestra la existencia de un proceso de mejoramiento permanente, en el cual se evalúa, de manera periódica, y en diferentes momentos a lo largo del plan de estudios, el grado en que los estudiantes alcanzan los procesos y resultados académicos previstos y, con base en dicha evaluación, se toman acciones de ajuste a los aspectos curriculares y a las metodologías de enseñanza - aprendizaje.',
    aspectos: [
      { n: 31, texto: 'Demuestra los efectos de la evaluación sistemática y permanente de los procesos y resultados académicos en la mejora del programa' },
    ],
    pregunta: '¿La evaluación de los resultados académicos genera ajustes curriculares y metodológicos documentados?',
  },
  C21: {
    tituloOficial: 'Coherencia entre las competencias, capacidades, habilidades y/o destrezas, los procesos y resultados académicos previstos y demás aspectos curriculares definidos en el proyecto educativo del programa académico',
    descripcion: 'El programa académico demuestra coherencia entre las competencias, capacidades, habilidades y/o destrezas definidas, los procesos y resultados académicos y demás aspectos curriculares contemplados en el proyecto educativo, o el que haga sus veces, entendiendo que las competencias, capacidades, habilidades y/o destrezas se desarrollan durante la vida de cada persona, pero los procesos formativos contribuyen a su potenciación. Las competencias, capacidades, habilidades y/o destrezas son conjuntos articulados de conocimientos, disposiciones, actitudes y aptitudes que hacen posible comprender y analizar problemas o situaciones para actuar coherente y eficazmente, individual o colectivamente, en determinadas situaciones; y pueden ser evaluadas, demostradas y delimitadas en articulación con los propósitos declarados en el perfil de egreso de cada programa y los procesos y resultados académicos previstos.',
    aspectos: [
      { n: 32, texto: 'Demuestra los efectos del diseño curricular en el cumplimiento de los propósitos del proyecto educativo del programa, o lo que haga sus veces, y el' },
    ],
    pregunta: '¿Las competencias del perfil de egreso son coherentes con el currículo y se evalúa su logro?',
  },
  C22: {
    tituloOficial: 'Impacto de las políticas y estrategias implementadas para la permanencia y la graduación',
    descripcion: 'El programa académico demuestra la existencia, los resultados y las evidencias de impacto de las políticas de bienestar, permanencia y graduación, de los programas de apoyo que pueden tener, por ejemplo, enfoques diferenciales, accesibles, interculturales, plurilingües, territoriales e interseccionales para la permanencia con equidad fundada en una educación inclusiva, y la graduación de los estudiantes, que incorporan, entre otros, procesos de inducción, acompañamiento, orientación vocacional, adaptación a la vida universitaria, orientación para el trabajo de grado y práctica laboral.',
    aspectos: [
      { n: 33, texto: 'Identifica los resultados y logros y evalúa los impactos de las políticas y estrategias implementadas para la permanencia y la graduación de los estudiantes atendiendo criterios de equidad e inclusión.' },
    ],
    pregunta: '¿Las estrategias de permanencia y graduación tienen impacto demostrable y enfoque de equidad?',
  },
  C23: {
    tituloOficial: 'Caracterización y atención de estudiantes a través de los sistemas, estrategias y programas dispuestos para tal fin',
    descripcion: 'El programa académico demuestra el impacto de la caracterización de sus estudiantes, en cuanto a condiciones de ingreso, desempeño y permanencia en este. El sistema de alertas tempranas da cuenta de su efectividad en el desarrollo de acciones de prevención y atención diferenciada de los estudiantes en relación con los índices de permanencia y graduación.',
    aspectos: [
      { n: 34, texto: 'Demuestra la existencia de un sistema de alertas tempranas para la prevención y atención diferenciada de los estudiantes y da cuenta de su efectividad.' },
      { n: 35, texto: 'Demuestra el impacto de la caracterización a lo largo del proceso formativo de los estudiantes en la determinación de las estrategias y apoyos que promueven la permanencia y graduación oportuna.' },
    ],
    pregunta: '¿La caracterización y las alertas tempranas generan atención diferenciada efectiva?',
  },
  C24: {
    tituloOficial: 'Evolución de los ajustes a los aspectos curriculares y pedagógicos como resultado de los programas de permanencia y graduación',
    descripcion: 'El programa académico demuestra la evolución de los ajustes en sus aspectos curriculares, a partir del análisis del seguimiento, entre otros, de los programas de permanencia, las líneas base de las alertas tempranas y las cifras y tiempos de graduación implementados en su interior en el marco de la realidad contextual y sociocultural de la comunidad estudiantil.',
    aspectos: [
      { n: 36, texto: 'Demuestra el impacto de los programas de permanencia y graduación en la evolución de las transformaciones curriculares y pedagógicas, en el marco de una formación integral.' },
    ],
    pregunta: '¿Los análisis de permanencia y graduación han producido ajustes curriculares y pedagógicos?',
  },
  C25: {
    tituloOficial: 'Contribución de los mecanismos de selección a la reducción de la deserción y la graduación oportuna',
    descripcion: 'El programa académico demuestra el análisis y contribución de los mecanismos de selección en el desarrollo de actividades orientadas a la reducción de la deserción y a la graduación oportuna, así como los ajustes a los procesos de selección derivados de dichos análisis, en correspondencia con el principio de equidad definido en el presente Acuerdo.',
    aspectos: [
      { n: 37, texto: 'Demuestra la contribución efectiva de los mecanismos de selección con criterios de equidad e inclusión en el desarrollo de actividades orientadas a la reducción de la deserción y a la graduación oportuna.' },
    ],
    pregunta: '¿Los mecanismos de selección se analizan y ajustan para reducir la deserción con equidad?',
  },
  C26: {
    tituloOficial: 'Inserción del programa en contextos académicos locales, regionales, nacionales e internacionales',
    descripcion: 'El programa académico da cuenta de que en la reflexión, organización y actualización de sus aspectos curriculares toma como referencia las tendencias, el estado del arte de la disciplina o profesión y los indicadores de calidad reconocidos por la comunidad académica nacional e internacional.',
    aspectos: [
      { n: 38, texto: 'Evidencia la Incorporación de las tendencias de contextos locales, regionales, nacionales e internacionales en la actualización de los aspectos curriculares, a partir de espacios de reflexión y análisis.' },
    ],
    pregunta: '¿La actualización curricular incorpora tendencias e indicadores de calidad nacionales e internacionales?',
  },
  C27: {
    tituloOficial: 'Resultados y logros de las relaciones y de la cooperación de profesores y estudiantes con comunidades locales, regionales, nacionales y extranjeras y sus efectos en el posicionamiento del programa',
    descripcion: 'El programa académico demuestra el impacto de la cooperación de profesores y estudiantes con otras instituciones o entidades locales, regionales, nacionales y extranjeras, en el desarrollo de labores formativas, académicas, docentes, de investigación-creación, de innovación, científicas, artísticas y culturales, y de relación con el sector externo (extensión o proyección social).',
    aspectos: [
      { n: 39, texto: 'Evidencia y evalúa el impacto en la cooperación de profesores y estudiantes con otras instituciones o entidades locales, regionales, nacionales y extranjeras en el desarrollo de las labores del programa.' },
    ],
    pregunta: '¿La cooperación con otras instituciones y comunidades genera resultados y posicionamiento para el programa?',
  },
  C28: {
    tituloOficial: 'Efectos de las políticas para el desarrollo de habilidades comunicativas en una o varias lenguas en coherencia con el proyecto educativo del programa académico',
    descripcion: 'El programa académico demuestra el efecto de las políticas y estrategias implementadas para el desarrollo de las competencias comunicativas, en una o varias lenguas. Y tratándose de programas académicos que interactúan con comunidades no hispanohablantes, atienden y respetan las particularidades y las tradiciones culturales y ancestrales del país.',
    aspectos: [
      { n: 40, texto: 'Identifica y evalúa los impactos de las políticas institucionales el desarrollo de habilidades comunicativas en una o varias lenguas en coherencia con sus declaraciones' },
    ],
    pregunta: '¿Las estrategias para el desarrollo de competencias comunicativas en otras lenguas tienen efectos demostrables?',
  },
  C29: {
    tituloOficial: 'Impacto y aportes de la proyección e interacción social en diferentes contextos',
    descripcion: 'El programa académico identifica y da cuenta de los diferentes impactos y aportes del programa en las actividades de extensión, proyección social e interacción en general con las comunidades y sus contextos y cómo estos contribuyen a la formación de sus estudiantes y promueven la participación de la comunidad académica del programa en la solución de los problemas y transformación de su contexto.',
    aspectos: [
      { n: 41, texto: 'Identifica y evalúa los impactos y los aportes de la extensión y la proyección e interacción social en la solución de los problemas y la transformación de sus contextos.' },
      { n: 42, texto: 'Identifica y evalúa los impactos que tiene la participación de los estudiantes en las actividades de extensión, proyección e interacción social sobre sus procesos de formación.' },
    ],
    pregunta: '¿La proyección social del programa tiene impactos en el contexto y en la formación de los estudiantes?',
  },
  C30: {
    tituloOficial: 'Capacidades y procesos para la consolidación de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural en el programa académico',
    descripcion: 'El programa académico demuestra que los profesores realizan actividades de investigación, desarrollo tecnológico, innovación o creación, reconocidas por el Sistema Nacional de Ciencia y Tecnología, y cuenta con condiciones y recursos institucionales para el desarrollo de dichas actividades.',
    aspectos: [
      { n: 43, texto: 'Evalúa la consolidación y la evolución de las condiciones y los recursos para el desarrollo de actividades de investigación, la innovación, el desarrollo tecnológico, la creación e investigación-creación artística y cultural, de los profesores del programa, reconocidas por el Sistema Nacional de Ciencia, Tecnología e Innovación.' },
    ],
    pregunta: '¿El programa cuenta con profesores investigadores reconocidos y con recursos para la investigación y la creación?',
  },
  C31: {
    tituloOficial: 'Identificación de los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural en los diferentes contextos del programa',
    descripcion: 'El programa académico evidencia que los productos resultantes de la investigación, el desarrollo tecnológico, la innovación y la creación enriquecen los aspectos curriculares, fortalecen la formación de los estudiantes y contribuyen a la actualización y generación de conocimiento o a la solución de problemas de la sociedad, la generación de nuevos espacios para la renovación permanente de enfoques conceptuales y teóricos que contribuyan al desarrollo investigativo innovador y a la producción intelectual.',
    aspectos: [
      { n: 44, texto: 'Evidencia los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural que contribuyen a la actualización y generación de conocimiento o a la solución de problemas de la sociedad, la generación de nuevos espacios para la renovación permanente de enfoques conceptuales y teóricos que contribuyan al desarrollo investigativo innovador y a la producción intelectual.' },
      { n: 45, texto: 'Evalúa los resultados, logros e impactos de la investigación, el desarrollo tecnológico, la innovación, la creación e investigación creación artística y cultural sobre la formación de los estudiantes.' },
    ],
    pregunta: '¿Los resultados de investigación y creación enriquecen el currículo y aportan a la sociedad?',
  },
  C32: {
    tituloOficial: 'Coherencia de las líneas de investigación y/o creación y resultados con el proyecto educativo del programa académico',
    descripcion: 'El programa académico demuestra que existe una relación coherente entre las líneas de investigación y los avances alcanzados en el periodo de observación con las declaraciones de su proyecto educativo de programa, o lo que haga sus veces, la articulación de los propósitos académicos y las dinámicas investigativas.',
    aspectos: [
      { n: 46, texto: 'Articula los propósitos académicos con las dinámicas investigativas desde los productos y actividades asociados a las líneas de investigación con las declaraciones del programa.' },
    ],
    pregunta: '¿Las líneas de investigación y sus avances son coherentes con el PEP?',
  },
  C33: {
    tituloOficial: 'Resultados de la formación para la investigación, desarrollo tecnológico, la innovación y la creación',
    descripcion: 'El programa académico demuestra los resultados de la interacción profesor-estudiante en el desarrollo de capacidades de indagación y búsqueda, pensamiento crítico, creativo e innovador y en la formación en diferentes métodos para la investigación, la innovación y/o la creación artística y cultural, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 47, texto: 'Consolida la participación de la comunidad de estudiantes en las actividades de formación para la investigación, la innovación, el desarrollo tecnológico, la creación e investigación-creación artística y cultural.' },
      { n: 48, texto: 'Identifica y sistematiza los resultados de la formación para la investigación, la innovación, el desarrollo tecnológico, la creación e investigación-creación artística y cultural de los estudiantes del programa.' },
    ],
    pregunta: '¿La formación para la investigación y la creación produce resultados demostrables en los estudiantes?',
  },
  C34: {
    tituloOficial: 'Demostración del uso de los resultados de investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y cultural en el mejoramiento del programa',
    descripcion: 'El programa académico da cuenta del uso de resultados de investigación, desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y cultural en el mejoramiento del programa, mediante la sistematización de la información que soporta el seguimiento realizado.',
    aspectos: [
      { n: 49, texto: 'Incorpora e implementa los resultados de investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y' },
    ],
    pregunta: '¿Los resultados de investigación se usan para mejorar el programa y ese uso está sistematizado?',
  },
  C35: {
    tituloOficial: 'Impacto de la investigación y/o la investigación-creación en el contexto en el que se ofrece el programa',
    descripcion: 'El programa académico da cuenta de los impactos generados en su contexto o entorno, de los resultados alcanzados en el periodo de observación, de los desarrollos de los proyectos de investigación asociados coherentemente a las líneas de investigación manifiestos en su proyecto educativo, o en lo que haga sus veces.',
    aspectos: [
      { n: 50, texto: 'Evalúa la pertinencia y el impacto de los resultados investigación, el desarrollo tecnológico, la innovación y/o la creación e investigación-creación artística y cultural en los contextos del programa.' },
    ],
    pregunta: '¿La investigación del programa genera impactos verificables en su contexto?',
  },
  C36: {
    tituloOficial: 'Evolución y evaluación de los programas y servicios que desarrollan las políticas de bienestar en el marco del pluralismo, la diversidad y la inclusión',
    descripcion: 'El programa académico demuestra la implementación de políticas y protocolos de bienestar, definidos institucionalmente, a través de la evolución y evaluación de los programas y servicios que buscan el desarrollo humano y el mejoramiento de la calidad de vida de la persona y del grupo institucional como un todo (estudiantes, docentes y personal administrativo). Estos tienen en cuenta las condiciones y necesidades de cada estamento, en cada uno de los lugares donde desarrolla sus labores, de acuerdo con las características y modalidad del programa académico, en el marco del pluralismo, la diversidad, la equidad y la inclusión.',
    aspectos: [
      { n: 51, texto: 'Evalúa la implementación de las políticas relacionadas con los programas y servicios de bienestar en el marco del pluralismo, la diversidad y la inclusión, basado en el nivel de participación de la comunidad del programa.' },
      { n: 52, texto: 'Evalúa la evolución de los programas y servicios de bienestar en el marco del pluralismo, la diversidad y la inclusión, basado en el nivel de participación de la comunidad del programa.' },
    ],
    pregunta: '¿Los programas de bienestar se evalúan y atienden a todos los estamentos con enfoque de inclusión?',
  },
  C37: {
    tituloOficial: 'Incidencia de los programas, planes y actividades de bienestar en la formación integral y en la calidad de vida de la comunidad de estudiantes',
    descripcion: 'El programa académico identifica y da cuenta de los diferentes impactos y aportes de las actividades de bienestar en la formación integral y en la calidad de vida de los estudiantes, mediante la sistematización de la información que soporta el seguimiento realizado, desde la admisión hasta la graduación.',
    aspectos: [
      { n: 53, texto: 'Identifica y evalúa los impactos de los programas, planes y actividades de bienestar en la formación integral y en la calidad de vida de la comunidad de estudiantes.' },
    ],
    pregunta: '¿El bienestar tiene incidencia demostrable en la formación y la calidad de vida de los estudiantes?',
  },
  C38: {
    tituloOficial: 'Adaptación y evaluación de los programas, actividades e infraestructura de bienestar a las condiciones particulares que determinan la oferta del programa',
    descripcion: 'El programa académico da cuenta de los mecanismos y ejercicios de evaluación y de las adaptaciones realizadas para atender a las condiciones particulares de su entorno y de los miembros de su comunidad y para promover la participación de los estudiantes en los programas y actividades de bienestar y en el uso de la infraestructura disponible.',
    aspectos: [
      { n: 54, texto: 'Consolida y demuestra el avance de la infraestructura, los programas y servicios con los que desarrollan las políticas de bienestar en el marco del pluralismo, la diversidad y la inclusión, teniendo como referencia las características particulares de toda la comunidad del programa y las que determinan su oferta.' },
    ],
    pregunta: '¿El bienestar se adapta a las condiciones particulares del programa y promueve la participación estudiantil?',
  },
  C39: {
    tituloOficial: 'Evolución y evaluación de los medios educativos que soportan los ambientes de aprendizaje del programa',
    descripcion: 'El programa académico dispone los medios educativos necesarios para el desarrollo de los procesos formativos y ha puesto en marcha programas de mejoramiento, actualización y evaluación de estos medios, en coherencia con las estrategias pedagógicas, tecnológicas y de acompañamiento, con el fin de lograr el mejoramiento permanente de las labores formativas, académicas, docentes, de investigación-creación, de innovación, científicas, artísticas y culturales, y de relación con el sector externo (extensión o proyección social), y de cualificar los aprendizajes asociados a estas actividades, en coherencia con los procesos y resultados académicos, las características y la modalidad del programa académico.',
    aspectos: [
      { n: 55, texto: 'Evalúa la pertinencia y la actualización de los medios educativos que soportan' },
    ],
    pregunta: '¿Los medios educativos son suficientes, se actualizan y se evalúan en coherencia con las estrategias pedagógicas?',
  },
  C40: {
    tituloOficial: 'Aporte de los medios educativos en los procesos y resultados académicos de los estudiantes atendiendo su contexto y a los principios rectores de la alta calidad',
    descripcion: 'El programa académico demuestra la disponibilidad, acceso, uso y apropiación, por parte de los estudiantes, de espacios, recursos, herramientas y equipos para enriquecer los procesos de enseñanza y aprendizaje, de acuerdo con las características y modalidad del programa académico, atendiendo a su contexto y a los principios rectores de la alta calidad.',
    aspectos: [
      { n: 56, texto: 'Identifica y evalúa los efectos de los medios educativos en los procesos y resultados académicos de los estudiantes atendiendo su contexto.' },
    ],
    pregunta: '¿Los estudiantes acceden, usan y se apropian de los medios educativos en su proceso de aprendizaje?',
  },
  C41: {
    tituloOficial: 'Evolución de la suficiencia y calidad de los medios educativos, recursos bibliográficos y de información en coherencia con las dinámicas propias del programa y su mejoramiento',
    descripcion: 'El programa académico demuestra la evolución y suficiencia de los medios educativos, recursos bibliográficos y de información, plataformas informáticas y los equipos computacionales y de telecomunicaciones (hardware y software licenciado) actualizados y adecuados para el diseño y la producción de contenidos, la implementación de estrategias pedagógicas y el continuo apoyo y seguimiento de las actividades académicas de los estudiantes, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 57, texto: 'Evalúa de la idoneidad, el uso, la usabilidad, la suficiencia y la calidad de los medios educativos, recursos bibliográficos y de información y de los servicios asociados, en coherencia con las características particulares de la comunidad del programa, y las que determinan su oferta.' },
    ],
    pregunta: '¿Los recursos bibliográficos, de información y tecnológicos son suficientes, actualizados y licenciados?',
  },
  C42: {
    tituloOficial: 'Evolución, suficiencia y evaluación de los recursos de infraestructura física y tecnológica en coherencia con el proyecto educativo del programa académico',
    descripcion: 'El programa académico demuestra la evolución, suficiencia y evaluación de los espacios físicos, aulas, laboratorios, talleres, centros de simulación, plataformas tecnológicas, recursos tecnológicos, biblioteca y salas de estudio, para el cumplimiento de sus labores formativas, académicas, docentes, investigativas, científicas, culturales, de innovación y de extensión, de acuerdo con las características y modalidad del programa académico.',
    aspectos: [
      { n: 58, texto: 'Evalúa de la pertinencia, el uso, la usabilidad, la suficiencia, la actualización, el' },
    ],
    pregunta: '¿La infraestructura física y tecnológica es suficiente, evoluciona y se evalúa según el PEP?',
  },
  C43: {
    tituloOficial: 'Identificación de los logros y resultados de la organización y la gestión del programa',
    descripcion: 'El programa académico cuenta con una estructura organizacional con cuerpo(s) colegiado(s) donde participan por lo menos representantes de los profesores, los estudiantes y los egresados, y que, además, tiene implementados los mecanismos administrativos necesarios para identificar los logros y resultados de la organización y la gestión del programa.',
    aspectos: [
      { n: 59, texto: 'Identifica y evalúa los principales logros y resultados de la organización y la gestión del programa.' },
      { n: 60, texto: 'Evidencia la participación en los cuerpos (s) colegiado(s) de los representantes de los profesores, los estudiantes y los egresados y su contribución a los planes de mejoramiento del programa.' },
    ],
    pregunta: '¿La organización del programa tiene participación de profesores, estudiantes y egresados y mide sus logros?',
  },
  C44: {
    tituloOficial: 'Evolución y evaluación de la sostenibilidad, los recursos y las capacidades del programa en coherencia con el proyecto educativo',
    descripcion: 'El programa académico muestra la evolución y evaluación de la sostenibilidad de las capacidades institucionales en materia de sus recursos humanos, técnicos, tecnológicos, biográficos y de laboratorios, así como de la infraestructura física, entre otros, necesarios para favorecer la permanencia, el desarrollo académico y la graduación de los estudiantes.',
    aspectos: [
      { n: 61, texto: 'Consolida y demuestra el avance de la sostenibilidad, los recursos y las capacidades en coherencia con las características particulares de la comunidad del programa, las que determinan su oferta y su crecimiento o los desafíos del contexto.' },
    ],
    pregunta: '¿Las capacidades y recursos del programa son sostenibles y favorecen la permanencia y la graduación?',
  },
  C45: {
    tituloOficial: 'Liderazgo en la dirección y gestión',
    descripcion: 'La dirección y los comités muestran su liderazgo en la gestión, a través de orientaciones en las que participan profesores, estudiantes y egresados los cuales contribuyen a la dinámica administrativa y académica. También evidencia la existencia de procesos, trámites y procedimientos claros y conocidos por la comunidad académica y los grupos de interés relacionados con el programa académico.',
    aspectos: [
      { n: 62, texto: 'Evalúa el impacto del liderazgo en la dirección y gestión en la consolidación de la comunidad académica del programa y en cultura de la calidad y en los procesos de mejoramiento.' },
    ],
    pregunta: '¿La dirección del programa ejerce un liderazgo participativo con procesos claros y conocidos?',
  },
  C46: {
    tituloOficial: 'Sistemas de comunicación e información actualizados, accesibles y oportunos en el mejoramiento del programa',
    descripcion: 'El programa académico muestra que cuenta con mecanismos que facilitan la comunicación entre todos los miembros de su comunidad y con sistemas de información establecidos y accesibles, en el marco de los derechos de la protección de datos.',
    aspectos: [
      { n: 63, texto: 'Demuestra la accesibilidad, consistencia, actualización y protección de los datos en sistemas de información y sus contribuciones a la toma de decisiones para la autorregulación, autoevaluación y el mejoramiento permanente.' },
      { n: 64, texto: 'Demuestra la efectividad de los sistemas de comunicación en coherencia con las características particulares de la comunidad del programa, las que determinan su oferta.' },
    ],
    pregunta: '¿La comunicación y los sistemas de información son accesibles, oportunos y protegen los datos?',
  },
  C47: {
    tituloOficial: 'Consolidación de los recursos y capacidades coherentes con la evolución del programa',
    descripcion: 'El programa académico muestra la consolidación de los recursos y capacidades, coherentes con la evolución del programa, necesarios para favorecer la permanencia, el desarrollo académico y la graduación de los estudiantes.',
    aspectos: [
      { n: 65, texto: 'Identifica el impacto de los recursos en la permanencia, el desarrollo académico y la graduación oportuna de los estudiantes, en coherencia con la evolución del programa.' },
    ],
    pregunta: '¿Los recursos y capacidades se han consolidado al ritmo de la evolución del programa?',
  },
  C48: {
    tituloOficial: 'Identificación de la sostenibilidad financiera del programa académico',
    descripcion: 'El programa académico dispone de recursos financieros para su funcionamiento e inversión, de acuerdo con sus características y modalidad, así como con la naturaleza jurídica de la institución, su identidad, misión, tipología y contexto.',
    aspectos: [
      { n: 66, texto: 'Demuestra que dispone de los recursos financieros de funcionamiento e inversión, necesarios para el desarrollo del programa y desarrolla procesos de planeación, seguimiento y ejecución de dichos recursos en coherencia con las dinámicas propias del programa y sus planes de mejoramiento.' },
    ],
    pregunta: '¿El programa cuenta con recursos financieros suficientes para su funcionamiento e inversión?',
  },
  C49: {
    tituloOficial: 'Reflexión y participación de la comunidad en los procesos de gestión, autoevaluación, autorregulación y mejoramiento permanente del programa académico',
    descripcion: 'El programa académico evidencia que tiene una cultura de mejoramiento permanente, que aplica criterios y procedimientos para la evaluación periódica y participativa de la comunidad en los procesos de gestión, autoevaluación, autorregulación y del mejoramiento del programa académico, liderados por los diferentes comités u otras formas de organización, en donde participan estudiantes, profesores y egresados en la toma de decisiones para el mejoramiento permanente.',
    aspectos: [
      { n: 67, texto: 'Presenta y evalúa resultados de la participación representativa, reflexiva y critica de la comunidad académica del programa en los procesos de autorregulación, autoevaluación y mejoramiento permanente, para promover una cultura de la calidad y contribuir a la consolidación del sistema interno de aseguramiento de la calidad.' },
    ],
    pregunta: '¿La autoevaluación es periódica, participativa e incide en las decisiones de mejoramiento?',
  },
  C50: {
    tituloOficial: 'Consolidación de la información y los datos que dan cuenta de los resultados, logros e impactos de la alta calidad del programa en el periodo de observación correspondiente a la autoevaluación',
    descripcion: 'El programa académico demuestra que ha consolidado la información y los datos en el marco del Sistema Interno de Aseguramiento de la Calidad Institucional para soportar los procesos de autoevaluación, autorregulación y del mejoramiento permanente del programa académico.',
    aspectos: [
      { n: 68, texto: 'Demuestra la evolución y la consolidación de la información y los datos en el marco del sistema interno de aseguramiento de la calidad, para soportar los procesos de autoevaluación, autorregulación y del mejoramiento permanente del programa académico.' },
    ],
    pregunta: '¿La información del programa está consolidada en el SIAC y soporta la autoevaluación?',
  },
  C51: {
    tituloOficial: 'Identificación de los principales resultados, logros e impactos de la cultura de la calidad en el mejoramiento del programa',
    descripcion: 'El programa académico demuestra la identificación de los principales resultados, logros e impactos y la implementación de las recomendaciones realizadas en los procesos de autoevaluación, consolidando la cultura de la calidad y el mejoramiento permanente del programa.',
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
