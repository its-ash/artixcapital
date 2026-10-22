import tailwindcss from '@tailwindcss/vite'

const TITLE = 'Artix Capital | Trade forex, stocks, indices and crypto'
const DESC = 'Trade forex, stocks, indices, commodities and crypto from one account on nTrader, with spreads from 0.0 pips and 24/5 human support.'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [400, 500, 700] },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500] }
    ]
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: TITLE,
      meta: [
        { name: 'description', content: DESC },
        { name: 'theme-color', content: '#0f0f15' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESC },
        { name: 'twitter:card', content: 'summary' }
      ]
    }
  },
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: { routes: ['/'], crawlLinks: true, failOnError: true }
  }
})
