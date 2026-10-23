import tailwindcss from '@tailwindcss/vite'
import { SLUGS } from './shared/routes'

const GA_ID = 'G-6K5MFRNFYS'
const GA_BOOT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`
const DESC = 'Trade forex, stocks, indices, commodities, futures and crypto from one account on nTrader and MetaTrader 5, with 24/5 human support.'
const ACCENT_BOOT = `try{var c=localStorage.getItem('artix-accent');if(/^#[0-9a-f]{6}$/i.test(c||'')){var h=[1,3,5].map(function(i){return parseInt(c.slice(i,i+2),16)}),l=h.map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}),L=.2126*l[0]+.7152*l[1]+.0722*l[2],s=L<.2?'#'+h.map(function(v){return Math.round(v+(255-v)*.32).toString(16).padStart(2,'0')}).join(''):c,r=document.documentElement.style;r.setProperty('--color-accent',c);r.setProperty('--color-accent-soft',s);r.setProperty('--color-on-accent',1.05/(L+.05)>=(L+.05)/.05?'#ffffff':'#0b0c0e')}}catch(e){}`

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
        { property: 'og:locale', content: 'en_US' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      script: [
        { innerHTML: ACCENT_BOOT, tagPosition: 'head' },
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
