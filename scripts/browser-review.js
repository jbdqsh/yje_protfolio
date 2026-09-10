// Run through playwright-cli run-code --filename scripts/browser-review.js.
// Uses the existing browser session; captures every built HTML page at 3 widths.
async (page) => {
  const root = 'http://127.0.0.1:4321';
  const routes = ['/', '/projects/care-operations/', '/projects/teaching-quality/', '/projects/knowledge-studio/', '/notes/service-state/', '/notes/async-events/', '/notes/file-transfer/', '/404.html'];
  const results = [];
  const errors = [];
  const localLinks = new Set();
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      const response = await page.goto(root + route);
      await page.evaluate(() => document.fonts.ready);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        h1: document.querySelectorAll('h1').length,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
        links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(href => href?.startsWith('/') || href?.startsWith('#')),
        overflow: [...document.querySelectorAll('main *')].filter(el => { const r = el.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).slice(0, 8).map(el => el.tagName + '.' + el.className),
      }));
      for (const href of layout.links) localLinks.add(href.startsWith('#') ? route + href : href);
      const name = route === '/' ? 'home' : route.replaceAll('/', '-').replace(/^-|-$/g, '').replace('.html', '');
      await page.screenshot({ path: `output/playwright/${name}-${width}.png`, fullPage: true });
      results.push({ route, viewport: width, status: response?.status(), ...layout, links: undefined });
    }
  }
  const linkErrors = [];
  for (const href of localLinks) {
    const [path, hash] = href.split('#');
    const response = await page.request.get(root + path);
    if (!response.ok()) linkErrors.push({ href, status: response.status() });
    if (hash && response.headers()['content-type']?.includes('text/html')) {
      const html = await response.text();
      if (!html.includes(`id="${hash}"`)) linkErrors.push({ href, error: 'anchor missing' });
    }
  }
  const pdf = await page.request.get(root + '/resume-jiaen-yan.pdf');
  const og = await page.request.get(root + '/og-cover.png');
  const missing = await page.request.get(root + '/this-page-does-not-exist/');
  await page.goto(root);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: 'output/playwright/hero-1440.png' });
  return { pages: results, linkErrors, browserErrors: errors, verifiedLinks: localLinks.size, resume: { status: pdf.status(), type: pdf.headers()['content-type'], bytes: (await pdf.body()).length }, og: { status: og.status(), bytes: (await og.body()).length }, missingPageStatus: missing.status() };
}
