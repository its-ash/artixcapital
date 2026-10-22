<script setup lang="ts">
const { app } = useRuntimeConfig()

useHead({
  link: [{ rel: 'icon', type: 'image/svg+xml', href: `${app.baseURL}favicon.svg` }]
})
</script>

<template>
  <div>
    <BgCanvas />
    <BgCanvas />
    <SiteNav />
    <main id="main">
      <HeroSection />
      <StatsBand />
      <TickerTape />
      <IntroReveal />
      <MarketsScroller />
      <PlatformShowcase />
      <AccountsGrid />
      <StepsPath />
      <FundingWall />
      <FaqSection />
      <CtaFinale />
    </main>
    <SiteFooter />
  </div>
</template>
