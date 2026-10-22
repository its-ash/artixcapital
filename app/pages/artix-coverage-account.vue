<script setup lang="ts">
// Artix Coverage: shield concept, hedging explainer, two-column conditions.

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
  <main id="main" class="relative">
    <header class="wrap pt-32 md:pt-40 pb-14">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Accounts</p>
      <div class="mt-8 grid gap-10 md:grid-cols-12">
        <h1 class="max-w-xl text-4xl font-bold tracking-[-0.03em] md:col-span-7 md:text-6xl">
          Some strategies defend first.<br><span class="grad-text">Coverage exists for them.</span>
        </h1>
        <div class="md:col-span-5 md:pt-4">
          <p class="text-lg leading-8 text-muted">
            A specialized account for advanced hedging, deep liquidity access and institutional-style conditions. For traders whose first question is how the position survives, not how big it can get.
          </p>
          <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary mt-7 h-13 px-7">Open live account</a>
        </div>
      </div>
    </header>

    <section aria-labelledby="cv-pillars">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="cv-pillars" class="sr-only">Coverage pillars</h2>
        <div class="grid gap-6 lg:grid-cols-3">
          <div v-for="(p, i) in pillars" :key="p[0]" class="panel rounded-3xl p-8" :class="i === 1 ? 'md:-translate-y-4' : ''">
            <h3 class="text-xl font-bold">{{ p[0] }}</h3>
            <p class="mt-3 text-sm leading-7 text-muted">{{ p[1] }}</p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="cv-who">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 class="text-2xl font-bold tracking-tight md:col-span-4">Who runs Coverage</h2>
          <div class="max-w-[60ch] text-lg leading-8 text-muted md:col-span-8">
            <p>Portfolio managers hedging concentrated books. Systematic traders running long-short baskets. Serious discretionary traders who deploy big and hold both sides of a market.</p>
            <p class="mt-4">If flat is a position in your playbook, this account was built for it.</p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="cv-conditions">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="cv-conditions" class="text-2xl font-bold tracking-tight">Coverage conditions</h2>
        <div class="mt-6 grid max-w-4xl gap-x-10 gap-y-5 sm:grid-cols-2">
          <div v-for="c in conditions" :key="c[0]" class="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
            <span class="text-sm text-muted">{{ c[0] }}</span>
            <span class="whitespace-nowrap font-mono tabular-nums">{{ c[1] }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>