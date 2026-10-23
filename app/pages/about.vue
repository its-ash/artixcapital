<script setup lang="ts">
useSeoMeta({
  title: 'About Artix Capital',
  description: 'A pure agency multi-asset broker: FX, CFDs, commodities, indices and global markets, executed institutionally with no proprietary book.'
})

const model = [
  ['Pure agency', 'Client orders route to institutional liquidity providers. The desk never trades against you.'],
  ['No market risk', 'No exposure is maintained on the company’s own books. We profit when you trade well, not when you lose.'],
  ['Neutral by design', 'No rebates that reward order flow against you, no dealing desk interference on tickets.']
] as const

const facts = [
  ['Legal name', 'Artix Capital Ltd'],
  ['Registration number', '2023-00122'],
  ['Incorporation', 'International Business Company, Saint Lucia'],
  ['Registered office', 'The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia'],
  ['Support', 'support@artixcapital.com, +44 7822 018441, 24/5'],
  ['Platforms', 'nTrader and MetaTrader 5'],
  ['Instruments', 'FX, metals, indices, commodities, equities, crypto'],
  ['Model', 'Pure agency execution']
] as const

const principles = [
  ['Execution first', 'Everything serves the fill: pricing, routing, tools.'],
  ['Plain costs', 'Spread or raw plus commission. Visible before, identical after.'],
  ['Human support', 'A person answers, 24 hours a day, five days a week.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Company"
      title="We win when you trade well."
      lead="A multi-asset brokerage built on proven industry experience: direct market access, an execution-only desk and pricing that says what it costs."
    >
      <NuxtLink to="/contact-us/" class="btn btn-primary h-13 px-7">Contact us</NuxtLink>
      <NuxtLink to="/forex-trading/" class="btn btn-ghost h-13 px-7">See the markets</NuxtLink>
    </PageHero>

    <PageSection id="ab-model" title="The agency model, without the jargon">
      <PageFeatures :items="model" />
    </PageSection>

    <PageSection id="ab-principles" title="Three rules we keep">
      <div class="grid gap-4 md:grid-cols-3">
        <div v-for="p in principles" :key="p[0]" class="rounded-2xl border border-line bg-surface p-7">
          <h3 class="text-xl font-semibold tracking-tight">{{ p[0] }}</h3>
          <p class="mt-2 leading-relaxed text-muted">{{ p[1] }}</p>
        </div>
      </div>
    </PageSection>

    <PageSection id="ab-facts" title="Company facts">
      <PageSpecs :rows="facts" />
    </PageSection>
  </main>
</template>
