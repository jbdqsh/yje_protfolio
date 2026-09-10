import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects } from '../data/projects';
export const GET: APIRoute = async ({ site }) => {
  const paths = [
    '/',
    ...projects.map((project) => `/projects/${project.slug}/`),
    ...(await getCollection('notes')).map((note) => `/notes/${note.id}/`),
  ];
  const escapeXml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const urls = site
    ? paths.map((path) => `<url><loc>${escapeXml(new URL(path, site).href)}</loc></url>`).join('')
    : '';
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};
