<script setup lang="ts">
usePageSeo({
  title: 'Spread table: typical spreads by symbol | Artix Capital',
  description: 'Typical spreads by instrument and account type: FX from 0.0 pips, raw metals and indices, crypto at 0.10% of notional.'
})

const head = ['Instrument', 'Core', 'Edge', 'Elite'] as const
const rows = [
  ['EUR/USD', '1.5 pips', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['GBP/USD', '1.7 pips', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['USD/JPY', '1.6 pips', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['AUD/USD', '1.8 pips', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['XAU/USD', '20 cents', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['XAG/USD', '3 cents', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['US500', '0.5 points', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['NAS100', '1.0 points', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['GER40', '1.2 points', '0.0 + $5/lot', '0.0 + $3.5/lot'],
  ['BTC/USD', '0.0 + 0.10%', '0.0 + 0.10%', '0.0 + 0.10%']
] as const

const note = 'Typical values, not guaranteed. Spreads widen at rollover, news and low-liquidity windows. Crypto carries 0.10% of notional with a $0.05 minimum ticket, per side, on every account.'
</script>

<template>
  <main id="main">
    <PageHero
      group="Trading tools"
      title="Spread table"
      lead="The visible raw cost of every trade, by instrument and account. Price your strategy honestly before the ticket, not after the fill."
    />

    <PageSection id="sp-table" title="Typical spreads by instrument and account" hidden>
      <PageTable :head="head" :rows="rows" :strong="3" caption="Typical spreads by instrument and account" />
      <p class="mt-4 max-w-3xl text-xs leading-relaxed text-muted">{{ note }}</p>
    </PageSection>

    <PageSection id="sp-math" title="Raw or spread, which is cheaper?">
      <div class="prose-muted">
        <p>Spread pricing wins on light volume: wide-but-commission-free tickets. Raw pricing wins as volume grows, because a fixed per-lot charge beats a marked-up spread quickly.</p>
        <p>Rough crossover: a few dozen lots per month. Beyond it, Edge and Elite pay for themselves, then keep paying you back.</p>
      </div>
    </PageSection>

    <PageCta />
  </main>
</template>
