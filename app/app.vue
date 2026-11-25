<script setup lang="ts">
import { SITE_URL } from '#shared/routes'

const pageTransition = { name: 'page', mode: 'out-in' as const }

const SITELINKS = [
  { name: 'Forex Trading', description: 'Trade major, minor and exotic currency pairs with spreads from 0.0 pips.', url: `${SITE_URL}/forex-trading/` },
  { name: 'Stocks & Indices', description: 'Access global equity CFDs and benchmark stock indices from one account.', url: `${SITE_URL}/stocks-trading/` },
  { name: 'Crypto & Commodities', description: 'Trade cryptocurrencies, gold, oil and commodities with tight spreads.', url: `${SITE_URL}/crypto-trading/` },
  { name: 'Trading Accounts', description: 'Compare Artix Core, Artix Edge, Artix Elite and Demo trading accounts.', url: `${SITE_URL}/artix-elite/` },
  { name: 'nTrader Platform', description: 'Download nTrader for Windows and mobile with institutional execution.', url: `${SITE_URL}/ntrader-for-windows/` },
  { name: 'MetaTrader 5', description: 'Trade on MetaTrader 5 desktop and mobile with automated EAs.', url: `${SITE_URL}/meta-trader-5/` },
  { name: 'Spread Table', description: 'Live indicative spreads and trading conditions across all instruments.', url: `${SITE_URL}/spread-table/` },
  { name: 'Contact Support', description: '24/5 human support for accounts, funding and partner inquiries.', url: `${SITE_URL}/contact-us/` }
]

useJsonLd('ld-org', {
  '@graph': [
    {
      '@type': 'FinancialService',
      '@id': `${SITE_URL}/#org`,
      name: 'Artix Capital',
      alternateName: ['Artix Capital Ltd', 'Artix'],
      legalName: COMPANY,
      url: `${SITE_URL}/`,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/logo.png` },
      image: { '@type': 'ImageObject', url: `${SITE_URL}/og/artix-capital.jpg?v=2`, width: 1200, height: 630 },
      email: EMAIL,
      telephone: PHONE.replace(/\s/g, ''),
      sameAs: ['https://artixglobal.com/', 'https://prop.itsash.in/'],
      identifier: { '@type': 'PropertyValue', name: 'Saint Lucia IBC registration number', value: REG_NO },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Unit 1, La Place Creole Building, Rodney Village',
        addressLocality: 'Rodney Bay, Gros-Islet',
        addressCountry: 'LC'
      },
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: EMAIL, telephone: PHONE.replace(/\s/g, ''), availableLanguage: 'English' }
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Artix Capital',
      description: 'Trade forex, stocks, indices, commodities and crypto from one account on nTrader and MetaTrader 5, with spreads from 0.0 pips.',
      inLanguage: 'en',
      publisher: { '@id': `${SITE_URL}/#org` }
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#sitelinks`,
      name: 'Artix Capital Key Categories',
      itemListElement: SITELINKS.map((s, i) => ({
        '@type': 'SiteNavigationElement',
        position: i + 1,
        name: s.name,
        description: s.description,
        url: s.url
      }))
    }
  ]
})

onMounted(() => {
  const html = document.documentElement
  const dismiss = () => {
    requestAnimationFrame(() => {
      html.classList.add('artix-ready')
      setTimeout(() => html.classList.add('artix-done'), 460)
    })
  }
  const fonts = document.fonts?.ready ?? Promise.resolve()
  Promise.race([fonts.catch(() => {}), new Promise(r => setTimeout(r, 700))]).then(dismiss)
})
</script>

<template>
  <div class="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 relative">
    <div id="artix-boot" aria-hidden="true">
      <div class="ab-box">
        <svg class="ab-mark" viewBox="830 8 252 330" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline fill="#ffffff" points="1074.6,329.8 1037.7,329.8 837.3,15.7 874.3,15.7 1074.6,329.8" />
          <polyline fill="#851c23" points="1074.6,15.7 985.7,144.5 907.8,15.7 1074.6,15.7" />
          <polygon fill="#ec2026" points="907.8,15.7 966.5,113.4 1011,83.7" />
          <polyline fill="#d71f29" points="1074.6,15.7 1041.4,15.7 994.5,15.7 1011,83.7 1074.6,15.7" />
          <polygon fill="#47b549" points="926.2,200.9 1004.1,329.8 837.3,329.8" />
          <polygon fill="#8dc582" points="1003.8,329.3 944.1,230.5 901.3,259.7" />
          <polygon fill="#30a150" points="918.6,329.8 901.3,259.7 837.3,329.8" />
          <polygon fill="#1b713b" points="944.1,230.5 871.6,280.1 911.3,222.5" />
        </svg>
        <div class="ab-track"><span class="ab-bar" /></div>
      </div>
    </div>
    <span id="nav-sentinel" class="pointer-events-none absolute top-0 left-0 h-2 w-px" aria-hidden="true" />
    <SiteNav />
    <NuxtPage :transition="pageTransition" />
    <SiteFooter />
    <MobileTabBar />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active { transition: opacity 280ms ease, translate 420ms var(--ease-out-expo); }
.page-enter-from { opacity: 0; translate: 0 14px; }
.page-leave-to { opacity: 0; translate: 0 -8px; }

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active { transition: opacity 200ms ease; }
  .page-enter-from,
  .page-leave-to { translate: none; }
}
</style>
