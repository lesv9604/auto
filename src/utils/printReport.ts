/**
 * Imprime un elemento en un iframe aislado (solo el informe + estilos de la app).
 * Evita que el layout de la app (flex, sticky, min-h-screen) interfiera con la
 * paginación, y funciona igual en Chrome, Edge, Safari y Firefox.
 */
export function buildPrintHtml(el: HTMLElement, title: string, footer: string[] = []): string {
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], style'))
    .map((n) => n.outerHTML)
    .join('\n');
  const safeTitle = title.replace(/[<>&"]/g, '');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8">
<title>${safeTitle}</title><base href="${location.origin}/">${styles}
<style>html,body{margin:0;background:#fff}${footer.length ? `@page{@bottom-left{content:${footer.map((l) => JSON.stringify(l)).join(' "\\A" ')};width:78%;font-family:"Palatino Linotype","Book Antiqua",Palatino,serif;font-size:7.5pt;color:#4b5563;vertical-align:top;padding-top:3mm;border-top:3px double #00963F;white-space:pre}}` : ''}</style></head>
<body>${el.outerHTML}</body></html>`;
}

export function printReport(el: HTMLElement, title: string, footer: string[] = []) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  Object.assign(iframe.style, { position: 'fixed', right: '0', bottom: '0', width: '0', height: '0', border: '0' });
  document.body.appendChild(iframe);

  const win = iframe.contentWindow!;
  const doc = win.document;
  doc.open();
  doc.write(buildPrintHtml(el, title, footer));
  doc.close();

  const cleanup = () => setTimeout(() => iframe.remove(), 500);
  win.addEventListener('afterprint', cleanup);
  setTimeout(() => iframe.isConnected && iframe.remove(), 120_000); // respaldo

  const ready = () => {
    const pending = Array.from(doc.images).filter((i) => !i.complete)
      .map((i) => new Promise((r) => { i.onload = i.onerror = r; }));
    const fonts = (doc as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve();
    Promise.all([...pending, fonts]).then(() => { win.focus(); win.print(); });
  };
  if (doc.readyState === 'complete') setTimeout(ready, 50);
  else win.addEventListener('load', ready);
}
