<script setup lang="ts">
useSeoMeta({
  title: 'Introducing broker program | Artix Capital',
  description: 'Turn your network into revenue: competitive per-lot commissions, real-time referral reporting, marketing materials and a dedicated partner team.'
})

const benefits = [
  ['Trusted brand', 'A globally recognized broker built on credibility and industry reputation.'],
  ['High earnings', 'Competitive commissions and tiered rewards that grow with your client base.'],
  ['Marketing tools', 'Campaigns, landing assets and professional materials to attract clients.'],
  ['Clear tracking', 'Transparent reporting on every referral and commission.'],
  ['Dedicated support', 'A partner team focused on helping you scale.'],
  ['Global reach', 'Multiple markets, diverse instruments and worldwide opportunity.']
] as const

const loop = [
  ['Refer', 'Share your link or materials with traders who need a broker.'],
  ['They trade', 'Clients open accounts, fund up, and trade on nTrader.'],
  ['You earn', 'Commission accrues per lot on qualifying trades, credited to your partner account.']
] as const

const program = [
  ['Commission basis', 'Per lot, per side, by instrument'],
  ['Tiers', 'Volume-based growth tiers'],
  ['Reporting', 'Clients, volume and earnings dashboard'],
  ['Materials', 'Campaigns, banners, landing assets'],
  ['Tracking', 'Referral links with client attribution'],
  ['Support', 'Dedicated partner helpdesk']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Partners"
      title="Partner. Earn. Succeed."
      lead="Turn your audience, network or firm into a revenue stream on every lot your traders execute. Full sales support, real reporting, no ceiling."
    >
      <a href="https://artixcapital.com/introducing-broker/" class="btn btn-primary h-13 px-7">Become a partner</a>
    </PageHero>

    <PageSection id="ib-benefits" title="Six advantages for partners">
      <PageFeatures :items="benefits" />
    </PageSection>

    <PageSection id="ib-loop" title="How the earning loop runs">
      <PageSteps :items="loop" />
    </PageSection>

    <PageSection id="ib-program" title="Program details">
      <PageSpecs :rows="program" />
    </PageSection>
  </main>
</template>
