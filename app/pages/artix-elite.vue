<script setup lang="ts">
usePageSeo({
  title: 'Artix Elite account | Artix Capital',
  description: 'The professional tier: zero spreads, $3.5 per lot per side, priority liquidity and a dedicated service lane for high-volume trading.'
})

const ladder = [
  { name: 'Coverage', deposit: '$50,000', rate: '$3.5 / lot', note: 'Hedging and institutional-style risk control' },
  { name: 'Elite', deposit: '$25,000', rate: '$3.5 / lot', note: 'Priority execution, lowest active-trader cost', best: true },
  { name: 'Edge', deposit: '$10,000', rate: '$5 / lot', note: 'Raw spreads for active traders' },
  { name: 'Core', deposit: '$500', rate: 'Spread only', note: 'Beginner-friendly, no FX commission' }
]

const perks = [
  ['Priority liquidity', 'Deeper book and priority routing for large tickets in fast markets.'],
  ['Lowest per-lot cost', '$3.5 per side, the best trade economics in the roster.'],
  ['Professional service lane', 'A dedicated help path, staffed 24/5, for account and execution questions.'],
  ['Scale without ceilings', 'Position sizing built for serious capital, no artificial caps.']
] as const

const full = [
  ['Platform', 'nTrader'],
  ['Minimum deposit', '$25,000'],
  ['Typical spreads from', '0.0 pips'],
  ['Instruments', 'FX, Metals, Indices, Commodities, Equities, Crypto'],
  ['Max leverage', '1:200'],
  ['Fixed leverage', 'For FX, precious metals, CFDs, equities and crypto'],
  ['Dynamic leverage', 'For FX, precious metals, CFDs and equities'],
  ['Stop out level', '30%'],
  ['Account currency', 'USD'],
  ['Commission', '$3.5 per lot per side on FX and Metals. Crypto: 0.10% of notional, min ticket $0.05']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Accounts"
      title="Artix Elite"
      lead="Premium trading conditions for professionals: zero spreads, priority liquidity and the lowest per-lot cost on the roster, with a dedicated service lane."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/artix-coverage-account/" class="btn btn-ghost h-13 px-7">Institutional tier</NuxtLink>
      <template #aside>
        <ol class="grid gap-2" aria-label="Account tiers from institutional to retail">
          <li
            v-for="t in ladder"
            :key="t.name"
            class="flex items-center gap-5 rounded-2xl border px-5 py-4"
            :class="t.best ? 'border-accent/60 bg-accent/10' : 'border-line bg-surface'"
          >
            <span class="min-w-0 flex-1">
              <span class="block font-semibold" :class="t.best ? 'text-accent-soft' : ''">{{ t.name }}</span>
              <span class="block truncate text-xs text-muted">{{ t.note }}</span>
            </span>
            <span class="text-right font-mono tabular-nums">
              <span class="block text-sm">{{ t.rate }}</span>
              <span class="block text-xs text-muted">from {{ t.deposit }}</span>
            </span>
          </li>
        </ol>
      </template>
    </PageHero>

    <PageSection id="el-perks" title="What priority actually means">
      <PageFeatures :items="perks" :cols="2" />
    </PageSection>

    <PageSection id="el-conditions" title="Full trading conditions">
      <PageSpecs :rows="full" />
    </PageSection>

    <PageCta />
  </main>
</template>
