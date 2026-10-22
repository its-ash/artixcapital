export default defineEventHandler(event => {
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return 'User-agent: *\nAllow: /\nSitemap: https://artixcapital.com/sitemap.xml\n'
})
