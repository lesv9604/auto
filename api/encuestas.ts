/**
 * Vercel Function: proxy hacia el endpoint de Apps Script.
 * Mantiene APPS_SCRIPT_URL y APPS_SCRIPT_TOKEN en el servidor (no llegan al navegador).
 * GET /api/encuestas?escuela=...&programa=...
 */
import { UNIPAZ_SCHOOLS } from '../src/data/unipazPrograms';

const json = (body: unknown, status = 200, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra },
  });

export async function GET(request: Request): Promise<Response> {
  const url = process.env.APPS_SCRIPT_URL;
  const token = process.env.APPS_SCRIPT_TOKEN;
  if (!url || !token) return json({ error: 'Conexión con encuestas no configurada' }, 503);

  const params = new URL(request.url).searchParams;
  const escuela = params.get('escuela') ?? '';
  const programa = params.get('programa') ?? '';

  // Solo se aceptan escuela/programa existentes (evita consultas arbitrarias)
  const valido = UNIPAZ_SCHOOLS.some(
    (s) => s.name === escuela && s.programs.some((p) => p.name === programa)
  );
  if (!valido) return json({ error: 'Escuela o programa no válido' }, 400);

  const target = new URL(url);
  target.searchParams.set('escuela', escuela);
  target.searchParams.set('programa', programa);
  target.searchParams.set('token', token);

  try {
    const res = await fetch(target, { redirect: 'follow' });
    const data = await res.json();
    if (data?.error) return json({ error: data.error }, 502);
    return json(data, 200, { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' });
  } catch {
    return json({ error: 'No se pudo consultar la hoja de respuestas' }, 502);
  }
}
