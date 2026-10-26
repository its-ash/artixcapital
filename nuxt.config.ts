import tailwindcss from '@tailwindcss/vite'
import { SLUGS } from './shared/routes'

const GA_ID = 'G-6K5MFRNFYS'
const GA_BOOT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`
const DESC = 'Trade forex, stocks, indices, commodities, futures and crypto from one account on nTrader and MetaTrader 5, with 24/5 human support.'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['lenis/dist/lenis.css', '~/assets/css/main.css'],
  vite: { plugins: [tailwindcss()] },
  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500, 600, 800] },
      { name: 'Instrument Serif', provider: 'google', weights: [400], styles: ['italic'] },
      { name: 'Roboto', provider: 'google', weights: [500, 600] },
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
        { property: 'og:locale', content: 'en_US' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      script: [
        { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true, tagPosition: 'head' },
        { innerHTML: GA_BOOT, tagPosition: 'head' }
      ]
    }
  },
  ssr: true,
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/', ...SLUGS.map(s => `/${s}/`), '/sitemap.xml', '/robots.txt'],
      crawlLinks: true,
      failOnError: true
    }
  }
})
