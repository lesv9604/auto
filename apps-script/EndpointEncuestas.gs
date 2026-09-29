/**
 * Endpoint de encuestas — Autoevaluación CESU 01/2025 (UNIPAZ)
 *
 * Devuelve SOLO conteos agregados por característica y actor para una
 * escuela + programa. Nunca devuelve respuestas individuales ni observaciones.
 *
 * Instalación (en la hoja de cálculo de respuestas):
 *   1. Extensiones → Apps Script → pegar este archivo.
 *   2. Configuración del proyecto → Propiedades del script → agregar
 *      API_TOKEN = <cadena aleatoria larga>  (la misma que APPS_SCRIPT_TOKEN en Vercel).
 *   3. Ajustar PESTANAS si los nombres de las pestañas son distintos.
 *   4. Implementar → Nueva implementación → Aplicación web
 *      Ejecutar como: Yo · Quién tiene acceso: Cualquier persona.
 *      (El acceso real lo controla API_TOKEN.)
 *   5. Copiar la URL /exec a APPS_SCRIPT_URL en Vercel.
 */

// actor (como lo verá la app) → nombre exacto de la pestaña
var PESTANAS = {
  'Estudiantes':     'Estudiantes',
  'Profesores':      'Profesores',
  'Empleadores':     'Empleadores',
  'Directivos':      'Directivos',
  'Egresados':       'Egresados',
  'Administrativos': 'Administrativos'
};

var COL_ESCUELA  = 'escuela';
var COL_PROGRAMA = 'programa academico';
var RE_CODIGO    = /^\s*\[C(\d{2})\]/;

// valor normalizado → clave de conteo
var ESCALA = {
  'muy favorable':    'mf',
  'favorable':        'f',
  'desfavorable':     'd',
  'muy desfavorable': 'md',
  'no aplica':        'na'
};

function doGet(e) {
  var p = (e && e.parameter) || {};
  var token = PropertiesService.getScriptProperties().getProperty('API_TOKEN');
  if (!token || p.token !== token) return json_({ error: 'No autorizado' });
  if (!p.escuela || !p.programa)   return json_({ error: 'Faltan escuela y programa' });

  var escuela  = norm_(p.escuela);
  var programa = norm_(p.programa);
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var actores = {};
  var advertencias = [];

  Object.keys(PESTANAS).forEach(function (actor) {
    var hoja = ss.getSheetByName(PESTANAS[actor]);
    if (!hoja) { advertencias.push('No existe la pestaña "' + PESTANAS[actor] + '"'); return; }

    var datos = hoja.getDataRange().getDisplayValues();
    if (datos.length < 2) { actores[actor] = { n: 0, items: {} }; return; }

    var enc = datos[0].map(norm_);
    var iEsc = enc.indexOf(COL_ESCUELA);
    var iProg = enc.indexOf(COL_PROGRAMA);
    if (iEsc < 0 || iProg < 0) {
      advertencias.push(actor + ': faltan columnas "Escuela" o "Programa académico"');
      return;
    }

    // columnas con código [Cxx]
    var cols = [];
    datos[0].forEach(function (titulo, i) {
      var m = String(titulo).match(RE_CODIGO);
      if (m) cols.push({ i: i, code: 'C' + m[1] });
    });

    var items = {};
    var n = 0;
    for (var r = 1; r < datos.length; r++) {
      var fila = datos[r];
      if (norm_(fila[iEsc]) !== escuela || norm_(fila[iProg]) !== programa) continue;
      n++;
      cols.forEach(function (c) {
        var clave = ESCALA[norm_(fila[c.i])];
        if (!clave) return; // vacío o valor no reconocido
        if (!items[c.code]) items[c.code] = { mf: 0, f: 0, d: 0, md: 0, na: 0 };
        items[c.code][clave]++;
      });
    }
    actores[actor] = { n: n, items: items };
  });

  return json_({
    generadoEn: new Date().toISOString(),
    escuela: p.escuela,
    programa: p.programa,
    actores: actores,
    advertencias: advertencias
  });
}

function norm_(s) {
  return String(s == null ? '' : s)
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ').trim().toLowerCase();
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
