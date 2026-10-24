<script setup lang="ts">
import { PhBarbell, PhChartBar, PhFlame } from '@phosphor-icons/vue'

usePageSeo({
  title: 'Futures trading: oil, gold and index futures | Artix Capital',
  description: 'Trade energy, metal and index futures: US oil, UK oil, natural gas, gold, silver, copper, Dow Jones, S&P 500, Nasdaq 100 and DAX.'
})

const stats = [['Instruments', '10'], ['Sectors', '3'], ['Settlement', 'Cash only'], ['Contract cycles', 'Monthly and quarterly']] as const

const groups = [
  {
    id: 'fu-energy',
    title: 'Future energies',
    lead: 'Crude and gas benchmarks that react to inventories, OPEC decisions and the weather.',
    icon: PhFlame,
    rows: [
      ['CL', 'US Oil', 'WTI crude futures, the American benchmark listed on NYMEX.'],
      ['BRN', 'UK Oil', 'Brent crude futures, the global benchmark for Atlantic basin oil, listed on ICE.'],
      ['NG', 'Natural Gas', 'Henry Hub natural gas futures, a seasonal market driven by storage and demand.']
    ]
  },
  {
    id: 'fu-metals',
    title: 'Future metals',
    lead: 'Precious and industrial metals traded on COMEX, quoted in US dollars.',
    icon: PhBarbell,
    rows: [
      ['GC', 'Gold', 'The benchmark gold contract, moved by real rates, central bank demand and risk sentiment.'],
      ['SI', 'Silver', 'Part precious, part industrial, with demand from solar, electronics and jewellery.'],
      ['HG', 'Copper', 'The industrial bellwether, closely tied to construction, power grids and global growth.']
    ]
  },
  {
    id: 'fu-indices',
    title: 'Future indices',
    lead: 'Equity index futures that let you take a view on a whole market in one position.',
    icon: PhChartBar,
    rows: [
      ['YM', 'Dow Jones', 'The Dow Jones Industrial Average, 30 large US blue-chip companies.'],
      ['ES', 'S&P 500', 'The broad US benchmark of 500 leading companies, listed on CME.'],
      ['NQ', 'Nasdaq 100', 'The 100 largest non-financial companies on Nasdaq, led by technology.'],
      ['FDAX', 'DAX Index', 'The 40 largest German companies, listed on Eurex.']
    ]
  }
] as const

const how = [
  ['Contract months', 'Each future is tied to a contract month. Prices include the cost of carry until that date, so they can differ from spot.'],
  ['Expiry and rollover', 'Positions close at the published last trading day. Roll to the next contract before expiry to keep your exposure.'],
  ['Cash settled', 'You trade the price only. There is no physical delivery of oil, gas or metal.'],
  ['Both directions', 'Go long when you expect a rise, or short when you expect a fall.']
] as const

const faqs = [
  ['What is the difference between futures and spot?', 'Spot prices are for immediate settlement. Futures prices are for a set date in the future and include financing and storage costs, so the two can trade at different levels.'],
  ['What happens when a contract expires?', 'Open positions close at the last trading day. Check the expiry calendar and roll to the next contract month if you want to stay in the trade.'],
  ['Do I take delivery of anything?', 'No. All futures trades settle in cash. There is no physical delivery.'],
  ['Where can I see expiry dates?', 'The futures expiry dates page lists the contract cycles and last trading days.'],
  ['Are futures suitable for everyone?', 'No. Futures are leveraged and prices can move fast, so losses can exceed your deposit. Read the risk disclosure before you trade.']
] as const

const LIVE = ['XTIUSD', 'XBRUSD', 'XNGUSD', 'XAUUSD', 'XAGUSD', 'US30', 'US500', 'USTEC', 'DE40']
</script>

<template>
  <main id="main">
    <PageHero
      group="Markets"
      title="Futures trading"
      lead="Trade futures on energies, metals and indices from one account. US oil, gold, the S&P 500 and more, with cash settlement and no physical delivery."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/expiry-dates-of-futures-contracts/" class="btn btn-ghost h-13 px-7">Expiry dates</NuxtLink>
      <template #aside>
        <Mql5Widget type="chart" :symbols="['US500']" :height="320" />
      </template>
    </PageHero>

    <section class="wrap pt-12 pb-16 md:pt-16" aria-label="Futures conditions">
      <PageStats :items="stats" />
    </section>

    <PageSection v-for="g in groups" :id="g.id" :key="g.id" :title="g.title" :lead="g.lead">
      <ul class="grid gap-3 sm:grid-cols-2" :class="g.rows.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'">
        <li v-for="m in g.rows" :key="m[0]" v-spot class="card flex flex-col p-6">
          <component :is="g.icon" :size="160" weight="thin" class="card-bg pointer-events-none absolute -bottom-8 -right-8 -z-1 text-fg" aria-hidden="true" />
          <div class="flex items-start justify-between gap-3">
            <span class="card-icon" aria-hidden="true"><component :is="g.icon" :size="20" weight="duotone" /></span>
            <span class="chip inline-flex h-7 items-center rounded-full px-2.5 font-mono text-xs text-accent-soft">{{ m[0] }}</span>
          </div>
          <h3 class="mt-6 text-xl font-semibold tracking-tight">{{ m[1] }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ m[2] }}</p>
        </li>
      </ul>
    </PageSection>

    <PageSection id="fu-how" title="How futures trading works">
      <PageFeatures :items="how" :cols="2" />
    </PageSection>

    <PageSection id="fu-live" title="Live underlying prices" lead="Spot and cash index prices of the underlying markets, shown for reference. Futures prices can differ from these.">
      <Mql5Widget type="overview" :symbols="LIVE" />
    </PageSection>

    <PageFaqSection id="fu-faq" title="Futures questions" :items="faqs" />

    <PageCta title="Trade the contracts the world watches." />
  </main>
</template>

<style scoped>
.card-bg { opacity: 0.05; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo); }
@media (hover: hover) and (pointer: fine) {
  .card:hover .card-bg { opacity: 0.1; rotate: -8deg; }
}
@media (prefers-reduced-motion: reduce) {
  .card-bg { transition: opacity 500ms ease; }
  .card:hover .card-bg { rotate: none; }
}
</style>
