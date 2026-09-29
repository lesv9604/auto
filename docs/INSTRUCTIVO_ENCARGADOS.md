# Instructivo para encargados de programa — Resultados de encuestas

## Opción A · Exportar desde la hoja de respuestas (recomendada)

1. Abra la hoja **Encuesta Autoevaluación UNIPAZ - CESU 01/25**.
2. Menú **Autoevaluación → Exportar resultados / plantilla (.csv)…**
   (la primera vez Google pide autorización).
3. Seleccione **Escuela**, **Programa académico** y el rango de fechas del
   ciclo actual (**Desde / Hasta**). Solo se cuentan las respuestas enviadas en
   ese rango: las de ciclos anteriores quedan fuera.
4. Clic en **Exportar resultados (.csv)**. El archivo se descarga y queda
   guardado en Drive junto a la hoja.
5. En la herramienta de autoevaluación, abra la sesión del programa y use
   **⬆ Cargar resultados (.csv)**.

El archivo contiene solo **conteos agregados** por característica y actor. No
incluye nombres, respuestas individuales ni observaciones.

## Opción B · Plantilla manual (sin acceso a la hoja)

1. En el mismo menú, clic en **Descargar plantilla vacía (.csv)**, o pida la
   plantilla a la oficina de autoevaluación.
2. Diligencie por cada fila (actor × característica):

| Columna | Qué poner |
|---|---|
| Desde / Hasta | Fechas del ciclo, formato `AAAA-MM-DD` |
| Encuestados | Número de personas de ese actor que respondieron (igual en todas las filas del actor) |
| MuyFavorable … NoAplica | Cantidad de respuestas en cada opción, sumando todas las preguntas de esa característica |

3. **No** modifique las columnas Escuela, Programa, Actor ni Codigo, ni los
   encabezados. Guarde como **CSV UTF-8**.
4. Cárguelo en la herramienta con **⬆ Cargar resultados (.csv)**.

## Reglas del formato

- Encabezados exactos:
  `Escuela,Programa,Desde,Hasta,Generado,Actor,Codigo,Encuestados,MuyFavorable,Favorable,Desfavorable,MuyDesfavorable,NoAplica`
- `Codigo`: `C01` … `C51`.
- `Actor`: Estudiantes, Profesores, Empleadores, Directivos, Egresados, Administrativos.
- La herramienta rechaza el archivo si es de otro programa o si hay valores no numéricos.

## Cálculo en la herramienta

Muy favorable = 4 · Favorable = 3 · Desfavorable = 2 · Muy desfavorable = 1 ·
No aplica = excluido. Se promedia por actor, luego entre actores (cada actor
pesa igual) y se convierte a la escala 1–5: `1 + (promedio − 1) × 4/3`.
