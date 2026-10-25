<script setup lang="ts">
import { SITE_URL } from '#shared/routes'

const pageTransition = { name: 'page', mode: 'out-in' as const }

useJsonLd('ld-org', {
  '@graph': [
    {
      '@type': 'FinancialService',
      '@id': `${SITE_URL}/#org`,
      name: COMPANY,
      legalName: COMPANY,
      url: SITE_URL,
      logo: `${SITE_URL}/assets/logo.png`,
      image: `${SITE_URL}/og.png`,
      email: EMAIL,
      telephone: PHONE.replace(/\s/g, ''),
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
      url: SITE_URL,
      name: 'Artix Capital',
      publisher: { '@id': `${SITE_URL}/#org` }
    }
  ]
})
</script>

<template>
  <div class="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0 relative">
    <ClassicParticleBg class="absolute inset-0 -z-10" />
    <SiteNav />
    <NuxtPage :transition="pageTransition" />
    <SiteFooter />
    <ThemePicker />
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
