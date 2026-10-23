import { SITE_URL } from '#shared/routes'

export default defineEventHandler(event => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `User-agent: *\nAllow: /\nDisallow: /200.html\nDisallow: /404.html\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
})
