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
</script>

<template>
  <div class="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 relative">
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
