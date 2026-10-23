<script setup lang="ts">
useSeoMeta({
  title: 'Artix Coverage account | Artix Capital',
  description: 'The account for capital preservation: hedging without restrictions, deep liquidity, professional pricing from $50,000.'
})

const pillars = [
  ['Hedge freely', 'Hold long and short exposure across pairs. No artificial restrictions on opposite positions.'],
  ['Defend first', 'Conditions engineered for strategies where protecting capital outranks growing it.'],
  ['Trade big calmly', 'Institutional-grade depth keeps large positions filled without visible slippage.']
] as const

const conditions = [
  ['Minimum deposit', '$50,000'],
  ['Typical spreads from', '0.0 pips'],
  ['Commission (FX, metals)', '$3.5 per lot per side'],
  ['Crypto commission', '0.10% of notional'],
  ['Max leverage', '1:200'],
  ['Stop out level', '30%'],
  ['Account currency', 'USD'],
  ['Platform', 'nTrader']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Accounts"
      title="Some strategies defend first. Coverage exists for them."
      lead="A specialized account for advanced hedging, deep liquidity access and institutional-style conditions. For traders whose first question is how the position survives, not how big it can get."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
    </PageHero>

    <PageSection id="cv-pillars" title="Coverage pillars" hidden>
      <PageFeatures :items="pillars" />
    </PageSection>

    <PageSection id="cv-who" title="Who runs Coverage">
      <div class="prose-muted">
        <p>Portfolio managers hedging concentrated books. Systematic traders running long-short baskets. Serious discretionary traders who deploy big and hold both sides of a market.</p>
        <p>If flat is a position in your playbook, this account was built for it.</p>
      </div>
    </PageSection>

    <PageSection id="cv-conditions" title="Coverage conditions">
      <PageSpecs :rows="conditions" />
    </PageSection>

    <PageCta />
  </main>
</template>
