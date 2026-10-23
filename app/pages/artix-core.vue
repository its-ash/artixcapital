<script setup lang="ts">
useSeoMeta({
  title: 'Artix Core account | Artix Capital',
  description: 'The beginner-friendly account: $500 minimum deposit, spreads from 1.5 pips, no FX or metals commission, all six asset classes on nTrader.'
})

const spec = [
  ['Minimum deposit', '$500'],
  ['Typical spreads from', '1.5 pips'],
  ['FX commission', 'None'],
  ['Crypto commission', '0.10% of notional'],
  ['Max leverage', '1:200'],
  ['Stop out level', '30%'],
  ['Account currency', 'USD'],
  ['Platform', 'nTrader']
] as const

const fits = [
  ['First live account', 'Cost stays transparent while you learn position sizing and risk.'],
  ['Swing trading', 'Wider spreads matter less over multi-day holds than raw pips do intraday.'],
  ['Cost predictability', 'One clear pricing structure, no per-lot math at the ticket.']
] as const

const costs = [
  ['FX and metals', 'Spread only'],
  ['Crypto', '0.10% + $0.05 min, per side'],
  ['Deposit and withdrawal fees', 'Per payment provider']
] as const

const full = [
  ['Platform', 'nTrader'],
  ['Minimum deposit', '$500'],
  ['Typical spreads from', '1.5 pips'],
  ['Instruments', 'FX, Metals, Indices, Commodities, Equities, Crypto'],
  ['Max leverage', '1:200'],
  ['Fixed leverage', 'For FX, precious metals, CFDs, equities and crypto'],
  ['Dynamic leverage', 'For FX, precious metals, CFDs and equities'],
  ['Stop out level', '30%'],
  ['Account currency', 'USD'],
  ['Commission', 'None on FX and Metals. Crypto: 0.10% of notional, min ticket $0.05, applied on open and close']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Accounts"
      title="Artix Core"
      lead="Enter global markets with low costs, powerful tools and simple pricing. Ideal for beginners and growing traders alike."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</NuxtLink>
      <template #aside>
        <PageSpecs :rows="spec" label="Core conditions" />
      </template>
    </PageHero>

    <PageSection id="co-fits" title="Core fits when">
      <PageFeatures :items="fits" />
    </PageSection>

    <PageSection id="co-cost" title="The cost model, in one line" lead="You pay the spread, nothing per lot on FX and metals. Crypto carries a notional charge with a tiny floor.">
      <PageSpecs :rows="costs" />
    </PageSection>

    <PageSection id="co-table" title="Full trading conditions">
      <PageSpecs :rows="full" />
    </PageSection>

    <PageCta />
  </main>
</template>
