import { defineConfig } from 'astro/config';

// A production origin is optional for local previews, required when publishing.
const site = process.env.SITE_URL?.replace(/\/$/, '');
if (site) {
  const url = new URL(site);
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('SITE_URL must be an HTTPS origin, e.g. https://your-domain.com');
  }
}

export default defineConfig({ site, output: 'static', trailingSlash: 'always' });
