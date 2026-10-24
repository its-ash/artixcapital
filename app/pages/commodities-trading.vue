<script setup lang="ts">
usePageSeo({
  title: 'Trade gold, oil and commodity CFDs | Artix Capital',
  description: 'Trade gold, silver, oil and gas with CFDs on nTrader. No storage, no delivery, both directions, leverage to 1:200.'
})

const stats = [['Instruments', '7'], ['Settlement', 'Cash only'], ['Leverage', '1:200'], ['Weekend risk', 'None']] as const
const metals = [
  ['XAU/USD', 'Gold', 'The benchmark store of value, moved by real rates, central bank demand and risk sentiment.'],
  ['XAG/USD', 'Silver', 'Half precious, half industrial. Solar, electronics and jewelry demand shape the price.'],
  ['XPT/USD', 'Platinum', 'Rarer than gold, driven by automotive catalyst demand and mine supply.'],
  ['XPD/USD', 'Palladium', 'Auto-industry tightrope, subject to sharp squeezes on supply disruptions.']
] as const
const energy = [
  ['WTI', 'US crude', 'The American benchmark, set by inventories, OPEC discipline and shale output.'],
  ['BRENT', 'Brent crude', 'The global benchmark for Atlantic basin oil, sensitive to geopolitics.'],
  ['NGAS', 'Natural gas', 'A seasonal, storage-driven market with violent winter swings.']
] as const
const groups = [
  { id: 'cm-metals', title: 'Precious metals', lead: 'Quoted all session, in US dollars.', rows: metals },
  { id: 'cm-energy', title: 'Energy', lead: 'The benchmarks that follow OPEC and the weather.', rows: energy }
]
const faqs = [
  ['Do I take delivery of anything?', 'No. Commodity CFDs settle in cash on exit. There is no storage, transport or physical delivery involved.'],
  ['What moves commodity prices?', 'Supply and demand fundamentals, inventory data, central bank policy, currency strength and geopolitical events all feed into spot prices.'],
  ['When is gold most liquid?', 'London and New York hours, roughly from early European morning through mid-American afternoon.'],
  ['Can I short commodities?', 'Yes, both directions are equal citizens through the CFD structure.'],
  ['What spreads apply?', 'From 0.0 pips on Edge and Elite with per-lot commission, or spread-only pricing with no commission on Core.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Markets"
      title="Commodities trading"
      lead="Trade the assets that power economies: gold, silver and the energy benchmarks. Speculate on price movement with CFDs, without ever touching a barrel or a bullion bar."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/spread-table/" class="btn btn-ghost h-13 px-7">Check spreads</NuxtLink>
      <template #aside>
        <Mql5Widget type="chart" :symbols="['XAUUSD']" :height="320" />
      </template>
    </PageHero>

    <section class="wrap pt-12 pb-16 md:pt-16" aria-label="Commodity conditions">
      <PageStats :items="stats" />
    </section>

    <PageSection id="cm-how" title="How commodities trading works">
      <div class="prose-muted">
        <p>Rather than buying the commodity itself, you trade Contracts for Difference. Go long or short with flexible leverage and close at any time for the cash difference. No vault, no pipeline, no delivery month pressure: your only exposure is price.</p>
      </div>
    </PageSection>

    <PageSection v-for="g in groups" :id="g.id" :key="g.id" :title="g.title" :lead="g.lead">
      <ul class="grid gap-4 sm:grid-cols-2" :class="g.rows.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'">
        <li v-for="m in g.rows" :key="m[0]" v-spot class="card p-6">
          <span class="font-mono text-sm text-accent-soft">{{ m[0] }}</span>
          <h3 class="mt-4 text-lg font-semibold tracking-tight">{{ m[1] }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ m[2] }}</p>
        </li>
      </ul>
    </PageSection>

    <PageSection id="cm-live" title="Live commodity prices">
      <Mql5Widget type="overview" :symbols="['XAUUSD', 'XAGUSD', 'XPTUSD', 'XPDUSD', 'XTIUSD', 'XBRUSD', 'XNGUSD']" />
    </PageSection>

    <PageFaqSection id="cm-faq" title="Commodity questions" :items="faqs" />

    <PageCta />
  </main>
</template>
