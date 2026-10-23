<script setup lang="ts">
useSeoMeta({
  title: 'Indices trading | Artix Capital',
  description: 'Trade whole economies with index CFDs: US500, NAS100, GER40, UK100, JPN225 and more, with raw pricing and leverage to 1:200.'
})

const head = ['Symbol', 'Name', 'Region', 'Character'] as const
const indices = [
  ['US500', 'S&P 500', 'USA', 'The broadest read on American large-caps'],
  ['NAS100', 'US Tech 100', 'USA', 'The tech heavies, Nasdaq-listed'],
  ['GER40', 'Germany 40', 'Germany', 'Frankfurt blue chips, continental growth'],
  ['UK100', 'UK 100', 'UK', 'London large-caps, dividend heavy'],
  ['JPN225', 'Japan 225', 'Japan', 'Nikkei classics and exporters'],
  ['HK50', 'Hong Kong 50', 'Hong Kong', 'China exposure through listed giants'],
  ['AUS200', 'Australia 200', 'Australia', 'Miners, banks and the terms of trade'],
  ['EU50', 'Euro 50', 'Eurozone', 'The cross-border euro large-cap read']
] as const

const faqs = [
  ['Why trade an index instead of single stocks?', 'One position spreads exposure across an entire market, reducing single-company risk while keeping full participation in the trend.'],
  ['How is an index price built?', 'From the weighted performance of its member companies, quoted continuously against the cash market.'],
  ['Can I trade indices outside equity hours?', 'Yes, index CFDs quote for longer sessions than the underlying exchanges.'],
  ['What moves an index?', 'Macro data, central bank policy, sector rotation and the heavyweight members inside the basket.'],
  ['Can I hedge a stock portfolio with an index?', 'Yes, shorting the relevant index CFD in one ticket replaces a dozen individual short positions.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Markets"
      title="One ticket. The whole market."
      lead="An index is hundreds of companies in a single number. With index CFDs you trade the direction of entire economies, long or short, without buying a single share."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <template #aside>
        <Mql5Widget type="chart" :symbols="['US500']" :height="320" />
      </template>
    </PageHero>

    <PageSection id="ix-roster" title="The index roster">
      <PageTable :head="head" :rows="indices" caption="Available index CFDs" />
      <div class="mt-10">
        <Mql5Widget type="overview" :symbols="['US500', 'USTEC', 'US30', 'DE40', 'UK100', 'HK50', 'AUS200']" />
      </div>
    </PageSection>

    <PageSection id="ix-macro" title="Macro trends, in one line">
      <div class="prose-muted">
        <p>Rates, inflation, growth surprises, the whole picture at once. Indices respond to macro before single stocks show it, and they move with the tide rather than any single boat.</p>
        <p>They also soften single-company shocks: one member melts down, the basket shrugs. Lower noise, same participation.</p>
      </div>
    </PageSection>

    <PageSection id="ix-faq" title="Index questions">
      <PageFaq :items="faqs" name="ix-faq" />
    </PageSection>

    <PageCta />
  </main>
</template>
