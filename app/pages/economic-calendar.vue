<script setup lang="ts">
// Economic calendar: event-workflow hero, calendar embed, usage discipline tips.

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
  <main id="main" class="relative">
    <header class="wrap pt-32 pb-12 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Trading tools</p>
      <div class="mt-6 grid gap-8 md:grid-cols-12">
        <h1 class="max-w-2xl text-4xl font-bold tracking-[-0.03em] md:col-span-7 md:text-6xl">
          The week, before it moves you
        </h1>
        <p class="md:col-span-5 md:pt-2 text-lg leading-8 text-muted">
          Rate decisions, inflation prints, employment reports: every release that moves your pairs and indices, on one screen, in your own time zone.
        </p>
      </div>
    </header>

    <section aria-labelledby="ev-cal">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ev-cal" class="text-2xl font-bold tracking-tight">Live economic calendar</h2>
        <div class="mt-6 overflow-hidden rounded-3xl border border-white/10">
          <iframe
            src="https://www.tradingview-widget.com/embed-widget/economic-calendar/?locale=en&amp;width=100%25"
            style="width: 100%; height: 600px; border: 0"
            title="Economic calendar by TradingView"
            loading="lazy"
          />
        </div>
        <p class="mt-4 text-xs text-muted">Times shown in your local time zone. Trading conditions subject to change around events.</p>
      </div>
    </section>

    <section aria-labelledby="ev-discipline">
      <div class="wrap grid gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <h2 id="ev-discipline" class="text-3xl font-bold tracking-tight md:col-span-4">Trading event days well</h2>
        <div class="grid gap-4 md:col-span-8 lg:grid-cols-2">
          <div v-for="t in tips" :key="t[0]" class="panel rounded-3xl p-6">
            <h3 class="text-lg font-bold">{{ t[0] }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted">{{ t[1] }}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>