import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

const url = process.argv[2] ?? 'http://127.0.0.1:4321';
const label = process.argv[3] ?? 'local';
if (!/^[a-z0-9-]+$/.test(label))
  throw new Error('Report label must contain letters, digits or hyphens.');
const output = resolve('output');
const browserProfile = resolve(output, `lighthouse-profile-${label}`);
await mkdir(browserProfile, { recursive: true });
// Keep the explicitly scoped browser profile: avoids Windows temporary-file locks.
const chrome = await launch({
  chromePath: process.env.CHROME_PATH,
  chromeFlags: ['--headless'],
  userDataDir: browserProfile,
});
try {
  const result = await lighthouse(url, {
    port: chrome.port,
    output: ['json', 'html'],
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    logLevel: 'error',
  });
  if (!result || result.lhr.runtimeError)
    throw new Error(result?.lhr.runtimeError?.message ?? 'Audit failed');
  await writeFile(resolve(output, `lighthouse-${label}.json`), result.report[0]);
  await writeFile(resolve(output, `lighthouse-${label}.html`), result.report[1]);
  console.log(
    JSON.stringify(
      {
        scores: Object.fromEntries(
          Object.entries(result.lhr.categories).map(([name, value]) => [
            name,
            Math.round(value.score * 100),
          ]),
        ),
        LCP: result.lhr.audits['largest-contentful-paint'].displayValue,
        CLS: result.lhr.audits['cumulative-layout-shift'].displayValue,
        issues: Object.values(result.lhr.audits)
          .filter((audit) => audit.score === 0)
          .map((audit) => audit.id),
      },
      null,
      2,
    ),
  );
} finally {
  chrome.kill();
}
