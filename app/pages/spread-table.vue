<script setup lang="ts">
// Spread table: cost-ledger hero, wide instrument table with account columns, cost math explainer.

useSeoMeta({
  title: 'Spread table | Artix Capital',
  description: 'Typical spreads by instrument and account type: FX from 0.0 pips, raw metals and indices, crypto at 0.10% of notional.'
})

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
  <main id="main" class="relative">
    <header class="wrap pt-32 pb-10 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Trading tools</p>
      <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Spread table</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
        The visible raw cost of every trade, by instrument and account. Price your strategy honestly before the ticket, not after the fill.
      </p>
    </header>

    <section aria-labelledby="sp-table">
      <div class="wrap pb-14 md:pb-16">
        <h2 id="sp-table" class="sr-only">Typical spreads by instrument and account</h2>
        <div class="panel overflow-x-auto rounded-3xl">
          <table class="w-full min-w-125 text-left text-sm">
            <thead>
              <tr class="border-b border-white/10 font-mono text-xs uppercase tracking-wider text-muted">
                <th scope="col" class="px-6 py-3.5 font-medium">Instrument</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Core</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Edge</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Elite</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r[0]" class="border-b border-white/8 last:border-0">
                <td class="px-6 py-3.5 font-mono text-fg">{{ r[0] }}</td>
                <td class="px-6 py-3.5 font-mono tabular-nums text-muted">{{ r[1] }}</td>
                <td class="px-6 py-3.5 font-mono tabular-nums text-muted">{{ r[2] }}</td>
                <td class="px-6 py-3.5 font-mono tabular-nums text-fg">{{ r[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 max-w-3xl text-xs leading-5 text-muted">{{ note }}</p>
      </div>
    </section>

    <section aria-labelledby="sp-math">
      <div class="wrap grid gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <h2 id="sp-math" class="text-3xl font-bold tracking-tight md:col-span-4">Raw or spread, which is cheaper?</h2>
        <div class="max-w-[60ch] text-lg leading-8 text-muted md:col-span-8">
          <p>
            Spread pricing wins on light volume: wide-but-commission-free tickets. Raw pricing wins as volume grows, because a fixed per-lot charge beats a marked-up spread quickly.
          </p>
          <p class="mt-4">Rough crossover: a few dozen lots per month. Beyond it, Edge and Elite pay for themselves, then keep paying you back.</p>
          <a href="/spread-table/" class="hidden">Spread reference</a>
        </div>
      </div>
    </section>
  </main>
</template>