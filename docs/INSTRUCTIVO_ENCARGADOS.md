# Instructivo para encargados de programa — Cargar resultados de encuestas

No se requiere instalar scripts. La herramienta lee directamente el libro de
respuestas y **todo se procesa en el navegador**: el archivo no se sube a
ningún servidor y solo se guardan conteos agregados (no nombres ni observaciones).

## Opción A · Libro de respuestas (.xlsx) — recomendada

1. Abra la hoja **Encuesta Autoevaluación UNIPAZ - CESU 01/25**.
2. **Archivo → Descargar → Microsoft Excel (.xlsx)**. Se descargan las seis
   pestañas (Estudiantes, Profesores, Empleadores, Directivos, Egresados,
   Personal Administrativos).
3. En la herramienta, abra la sesión del programa y pulse
   **⬆ Cargar resultados de encuestas** → seleccione el .xlsx.
4. **Respuestas del programa**: marque los valores de Escuela/Programa que
   corresponden a su programa. La herramienta pre-marca los que coinciden;
   revise variantes mal escritas (ej. "licencitura en artes").
5. **Periodo del ciclo**: indique Desde / Hasta. Solo se cuentan las respuestas
   enviadas en ese rango; las de ciclos anteriores quedan fuera.
6. Revise la **vista previa** (encuestados por actor; en ámbar los actores con
   menos de 5) y pulse **Aplicar resultados**.
7. Borre el .xlsx descargado de su equipo: contiene nombres de encuestados.

## Opción B · Plantilla de conteos (.csv) — sin acceso a la hoja

1. Use `docs/plantilla_conteos.csv` (una fila por actor × característica).
2. Reemplace `ESCRIBA_LA_ESCUELA`, `ESCRIBA_EL_PROGRAMA` y las fechas
   (`AAAA-MM-DD`) en todas las filas. Escuela y programa deben escribirse
   exactamente como en la herramienta.
3. Diligencie:

| Columna | Qué poner |
|---|---|
| Encuestados | Personas de ese actor que respondieron (igual en todas las filas del actor) |
| MuyFavorable … NoAplica | Cantidad de respuestas en cada opción, sumando todas las preguntas de esa característica |

4. No modifique encabezados ni las columnas Actor y Codigo. Guarde como **CSV UTF-8**
   y cárguelo con el mismo botón.

## Cálculo

Muy favorable = 4 · Favorable = 3 · Desfavorable = 2 · Muy desfavorable = 1 ·
No aplica = excluido. Se promedia por actor, luego entre actores (cada actor
pesa igual) y se convierte a la escala 1–5: `1 + (promedio − 1) × 4/3`.
