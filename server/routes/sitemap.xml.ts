import { SITE_URL, SLUGS } from '#shared/routes'

export default defineEventHandler(event => {
  const today = new Date().toISOString().slice(0, 10)
  const urls = ['/', ...SLUGS.map(s => `/${s}/`)]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls
    .map(u => `<url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`)
    .join('')}</urlset>`
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return body
})
