import tailwindcss from '@tailwindcss/vite'
import { SLUGS } from './shared/routes'

const GA_ID = 'G-6K5MFRNFYS'
const GA_BOOT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`
const BOOT_CSS = `#artix-boot{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:radial-gradient(45% 40% at 50% 46%,rgba(214,20,28,.16),transparent 70%),#0b0c0e;transition:opacity .42s cubic-bezier(.16,1,.3,1),visibility .42s}#artix-boot .ab-box{display:flex;flex-direction:column;align-items:center;gap:1.25rem}#artix-boot .ab-mark{width:52px;height:68px;overflow:visible;filter:drop-shadow(0 0 24px rgba(214,20,28,.35));animation:ab-pulse 1.4s cubic-bezier(.3,0,.2,1) infinite}#artix-boot .ab-track{width:112px;height:2px;border-radius:999px;background:rgba(255,255,255,.1);overflow:hidden}#artix-boot .ab-bar{display:block;width:45%;height:100%;border-radius:999px;background:linear-gradient(90deg,transparent,#d6141c,#ff5d64,transparent);animation:ab-sweep 1.1s cubic-bezier(.4,0,.2,1) infinite}html.artix-ready #artix-boot{opacity:0;visibility:hidden;pointer-events:none}html.artix-done #artix-boot{display:none}@keyframes ab-pulse{0%,100%{transform:scale(1);opacity:.82}50%{transform:scale(1.06);opacity:1}}@keyframes ab-sweep{0%{transform:translateX(-120%)}100%{transform:translateX(320%)}}@media(prefers-reduced-motion:reduce){#artix-boot .ab-mark,#artix-boot .ab-bar{animation:none}#artix-boot .ab-bar{width:100%;background:#d6141c}}`
const BOOT_FAILSAFE = `setTimeout(function(){document.documentElement.classList.add('artix-ready','artix-done');},3500);`
const DESC = 'Trade forex, stocks, indices, commodities, futures and crypto from one account on nTrader and MetaTrader 5, with 24/5 human support.'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-01',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  devServer: { cors: { origin: '*' } },
  vite: {
    plugins: [tailwindcss()],
    server: { cors: { origin: '*' } }
  },
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
      style: [
        { innerHTML: BOOT_CSS }
      ],
      noscript: [
        { innerHTML: '<style>#artix-boot{display:none!important}</style>' }
      ],
      script: [
        { innerHTML: BOOT_FAILSAFE, tagPosition: 'head' },
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
