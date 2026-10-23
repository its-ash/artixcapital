<script setup lang="ts">
useSeoMeta({
  title: 'Economic calendar | Artix Capital',
  description: 'Track the data releases that move markets: rate decisions, inflation, employment and growth prints with impact ratings in your own time zone.'
})

const tips = [
  ['Read impact ratings first', 'High-impact labels tell you instantly which releases deserve a plan.'],
  ['Mark your instruments', 'Cross-reference every red-flag event against your open pairs.'],
  ['Reduce, do not react', 'Size down or pre-hedge ahead of releases; chasing after the fact pays worse.'],
  ['Trade the reaction', 'Some of the best setups form on the first retrace after high-impact data.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Trading tools"
      title="The week, before it moves you"
      lead="Rate decisions, inflation prints, employment reports: every release that moves your pairs and indices, on one screen, in your own time zone."
    />

    <PageSection id="ev-cal" title="Live economic calendar">
      <Mql5Widget type="calendar" :height="640" />
      <p class="mt-4 text-xs text-muted">Times shown in your local time zone. Trading conditions subject to change around events.</p>
    </PageSection>

    <PageSection id="ev-discipline" title="Trading event days well">
      <PageFeatures :items="tips" :cols="2" />
    </PageSection>
  </main>
</template>
