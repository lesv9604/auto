/**
 * Exportar resultados — Autoevaluación CESU 01/2025 (UNIPAZ)
 *
 * Agrega un menú en la hoja de respuestas para exportar UN archivo .csv con los
 * resultados AGREGADOS (conteos por característica y actor) de una escuela +
 * programa, dentro de un rango de fechas. No exporta respuestas individuales
 * ni observaciones.
 *
 * Instalación: en la hoja de respuestas → Extensiones → Apps Script → pegar
 * este archivo y ExportarDialogo.html → guardar → recargar la hoja.
 * Aparece el menú "Autoevaluación".
 */

// actor (como lo verá la app) → nombre exacto de la pestaña
var PESTANAS = {
  'Estudiantes':     'Estudiantes',
  'Profesores':      'Profesores',
  'Empleadores':     'Empleadores',
  'Directivos':      'Directivos',
  'Egresados':       'Egresados',
  'Administrativos': 'Personal Administrativos'
};

var COL_FECHA    = ['marca temporal', 'timestamp'];
var COL_ESCUELA  = 'escuela';
var COL_PROGRAMA = 'programa academico';
var RE_CODIGO    = /^\s*\[C(\d{2})\]/;
var ESCALA = {
  'muy favorable': 'mf', 'favorable': 'f', 'desfavorable': 'd',
  'muy desfavorable': 'md', 'no aplica': 'na'
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Autoevaluación')
    .addItem('Exportar resultados / plantilla (.csv)…', 'abrirDialogo')
    .addToUi();
}

function abrirDialogo() {
  var html = HtmlService.createHtmlOutputFromFile('ExportarDialogo')
    .setWidth(440).setHeight(500);
  SpreadsheetApp.getUi().showModalDialog(html, 'Exportar resultados para autoevaluación');
}

/** Escuelas y programas presentes en las respuestas (para las listas del diálogo). */
function obtenerOpciones() {
  var mapa = {};
  recorrerPestanas_(function (actor, fila, idx) {
    var esc = String(fila[idx.esc]).trim(), prog = String(fila[idx.prog]).trim();
    if (!esc || !prog) return;
    (mapa[esc] = mapa[esc] || {})[prog] = true;
  });
  var salida = {};
  Object.keys(mapa).sort().forEach(function (e) { salida[e] = Object.keys(mapa[e]).sort(); });
  return salida;
}

/**
 * Genera el CSV y lo guarda en Drive (misma carpeta de la hoja si es posible).
 * desde/hasta: 'YYYY-MM-DD' (inclusive). Devuelve { nombre, url, csv, resumen }.
 */
function exportarCSV(escuela, programa, desde, hasta) {
  if (!escuela || !programa || !desde || !hasta) throw new Error('Complete todos los campos.');
  var tz = Session.getScriptTimeZone();
  var ini = Utilities.parseDate(desde + ' 00:00:00', tz, 'yyyy-MM-dd HH:mm:ss');
  var fin = Utilities.parseDate(hasta + ' 23:59:59', tz, 'yyyy-MM-dd HH:mm:ss');
  if (ini > fin) throw new Error('La fecha inicial es posterior a la final.');

  var nEsc = norm_(escuela), nProg = norm_(programa);
  var res = {}; // actor → { n, items: { Cxx: {mf,f,d,md,na} } }
  Object.keys(PESTANAS).forEach(function (a) { res[a] = { n: 0, items: {} }; });

  recorrerPestanas_(function (actor, fila, idx) {
    if (norm_(fila[idx.esc]) !== nEsc || norm_(fila[idx.prog]) !== nProg) return;
    var f = fila[idx.fecha];
    if (!(f instanceof Date) || f < ini || f > fin) return;
    res[actor].n++;
    idx.cols.forEach(function (c) {
      var k = ESCALA[norm_(fila[c.i])];
      if (!k) return;
      var it = res[actor].items[c.code] = res[actor].items[c.code] || { mf: 0, f: 0, d: 0, md: 0, na: 0 };
      it[k]++;
    });
  });

  var generado = Utilities.formatDate(new Date(), tz, "yyyy-MM-dd'T'HH:mm:ss");
  var filas = [['Escuela', 'Programa', 'Desde', 'Hasta', 'Generado', 'Actor', 'Codigo',
                'Encuestados', 'MuyFavorable', 'Favorable', 'Desfavorable', 'MuyDesfavorable', 'NoAplica']];
  var resumen = [];
  Object.keys(res).forEach(function (actor) {
    var r = res[actor];
    resumen.push(actor + ': ' + r.n);
    Object.keys(r.items).sort().forEach(function (code) {
      var c = r.items[code];
      filas.push([escuela, programa, desde, hasta, generado, actor, code, r.n, c.mf, c.f, c.d, c.md, c.na]);
    });
  });
  var total = Object.keys(res).reduce(function (s, a) { return s + res[a].n; }, 0);
  if (total === 0) throw new Error('No hay respuestas para ese programa en el rango indicado.');

  var csv = filas.map(function (f) { return f.map(csvCell_).join(','); }).join('\r\n');
  var nombre = 'Resultados_' + slug_(programa) + '_' + desde + '_a_' + hasta + '.csv';
  var archivo = DriveApp.createFile(nombre, '﻿' + csv, MimeType.CSV);
  try {
    var padres = DriveApp.getFileById(SpreadsheetApp.getActive().getId()).getParents();
    if (padres.hasNext()) archivo.moveTo(padres.next());
  } catch (e) { /* queda en Mi unidad */ }

  return { nombre: nombre, url: archivo.getUrl(), csv: csv, resumen: resumen.join(' · ') + ' · Total: ' + total };
}

/**
 * Plantilla vacía con todas las combinaciones actor × característica que
 * existen en las pestañas (según los encabezados [Cxx]). Para diligenciar a
 * mano cuando no se usa la hoja de respuestas.
 */
function plantillaCSV(escuela, programa, desde, hasta) {
  if (!escuela || !programa) throw new Error('Seleccione escuela y programa.');
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var filas = [['Escuela', 'Programa', 'Desde', 'Hasta', 'Generado', 'Actor', 'Codigo',
                'Encuestados', 'MuyFavorable', 'Favorable', 'Desfavorable', 'MuyDesfavorable', 'NoAplica']];
  var generado = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd'T'HH:mm:ss");
  Object.keys(PESTANAS).forEach(function (actor) {
    var hoja = ss.getSheetByName(PESTANAS[actor]);
    if (!hoja) return;
    var enc = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
    var codigos = {};
    enc.forEach(function (t) { var m = String(t).match(RE_CODIGO); if (m) codigos['C' + m[1]] = true; });
    Object.keys(codigos).sort().forEach(function (code) {
      filas.push([escuela, programa, desde || '', hasta || '', generado, actor, code, 0, 0, 0, 0, 0, 0]);
    });
  });
  var csv = filas.map(function (f) { return f.map(csvCell_).join(','); }).join('\r\n');
  var nombre = 'Plantilla_' + slug_(programa) + '.csv';
  return { nombre: nombre, csv: csv, resumen: (filas.length - 1) + ' filas (actor × característica)' };
}

// ─── Utilidades ──────────────────────────────────────────────────────────────

function recorrerPestanas_(fn) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(PESTANAS).forEach(function (actor) {
    var hoja = ss.getSheetByName(PESTANAS[actor]);
    if (!hoja) return;
    var datos = hoja.getDataRange().getValues();
    if (datos.length < 2) return;
    var enc = datos[0].map(norm_);
    var idx = {
      fecha: indiceDe_(enc, COL_FECHA),
      esc: enc.indexOf(COL_ESCUELA),
      prog: enc.indexOf(COL_PROGRAMA),
      cols: []
    };
    if (idx.fecha < 0 || idx.esc < 0 || idx.prog < 0) {
      throw new Error('La pestaña "' + PESTANAS[actor] + '" no tiene las columnas Marca temporal, Escuela y Programa académico.');
    }
    datos[0].forEach(function (t, i) {
      var m = String(t).match(RE_CODIGO);
      if (m) idx.cols.push({ i: i, code: 'C' + m[1] });
    });
    for (var r = 1; r < datos.length; r++) fn(actor, datos[r], idx);
  });
}

function indiceDe_(enc, nombres) {
  for (var i = 0; i < nombres.length; i++) { var j = enc.indexOf(nombres[i]); if (j >= 0) return j; }
  return -1;
}
function norm_(s) {
  return String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ').trim().toLowerCase();
}
function csvCell_(v) {
  var s = String(v);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function slug_(s) { return norm_(s).replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''); }
