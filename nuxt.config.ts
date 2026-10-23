import tailwindcss from '@tailwindcss/vite'
const SLUGS = ['forex-trading','commodities-trading','stocks-trading','indices-trading','crypto-trading','artix-core','artix-edge','artix-elite','artix-coverage-account','artix-demo-account','ntrader-for-windows','ntrader-for-mobile','meta-trader-5','introducing-broker','white-label-solution','economic-calendar','spread-table','expiry-dates-of-futures-contracts','about','contact-us']

const TITLE = 'Artix Capital | Trade forex, stocks, indices and crypto'
const DESC = 'Trade forex, stocks, indices, commodities and crypto from one account on nTrader, with spreads from 0.0 pips and 24/5 human support.'
const SITE = 'https://artixcapital.com'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] }
    ]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: DESC },
        { name: 'theme-color', content: '#0b0c0e' },
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
        { property: 'og:site_name', content: 'Artix Capital' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESC },
        { property: 'og:url', content: SITE },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:title', content: TITLE },
        { name: 'twitter:description', content: DESC }
      ],
      link: [{ rel: 'canonical', href: SITE }]
    }
  },
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', ...SLUGS.map(s => `/${s}`), '/sitemap.xml', '/robots.txt'],
      crawlLinks: true,
      failOnError: true
    }
  }
})
