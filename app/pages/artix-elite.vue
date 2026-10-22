<script setup lang="ts">
// Artix Elite: premium dark hero with gold-trim crown framing, tier ladder, conditions list.

useSeoMeta({
  title: 'Artix Elite account | Artix Capital',
  description: 'The professional tier: zero spreads, $3.5 per lot per side, priority liquidity and a dedicated service lane for high-volume trading.'
})

const ladder = [
  { name: 'Coverage', deposit: '$50,000', rate: '$3.5 / lot', note: 'Hedging and institutional-style risk control' },
  { name: 'Elite', deposit: '$25,000', rate: '$3.5 / lot', note: 'Priority execution, lowest active-trader cost', best: true },
  { name: 'Edge', deposit: '$10,000', rate: '$5 / lot', note: 'Raw spreads for active traders' },
  { name: 'Core', deposit: '$500', rate: 'Spread only', note: 'Beginner-friendly, no FX commission' }
] as const

const perks = [
  ['Priority liquidity', 'Deeper book and priority routing for large tickets in fast markets.'],
  ['Lowest per-lot cost', '$3.5 per side, the best trade economics in the roster.'],
  ['Professional service lane', 'A dedicated help path, staffed 24/5, for account and execution questions.'],
  ['Scale without ceilings', 'Position sizing built for serious capital, no artificial caps.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 -z-1" aria-hidden="true">
        <div class="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 rule" />
      </div>
      <div class="wrap grid min-h-[58svh] items-center gap-10 pt-32 pb-12 md:grid-cols-12 md:pt-40">
        <div class="md:col-span-6">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Accounts</p>
          <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Artix Elite</h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
            Premium trading conditions for professionals: zero spreads, priority liquidity and the lowest per-lot cost on the roster, with a dedicated service lane.
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
            <a href="/artix-coverage-account/" class="btn btn-ghost h-13 px-7">Institutional tier</a>
          </div>
        </div>
        <div class="md:col-span-6">
          <ol class="panel divide-y divide-white/8 rounded-3xl" aria-label="Account tiers from institutional to retail">
            <li v-for="t in ladder" :key="t.name" class="flex items-center gap-5 px-6 py-4" :class="t.best ? 'bg-accent/8' : ''">
              <span class="w-28 shrink-0 font-bold" :class="t.best ? 'text-accent' : ''">{{ t.name }}</span>
              <span class="hidden flex-1 text-xs text-muted sm:block">{{ t.note }}</span>
              <span class="ml-auto text-right">
                <span class="block font-mono text-sm tabular-nums">{{ t.rate }}</span>
                <span class="block font-mono text-xs text-muted">from {{ t.deposit }}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </header>

    <section aria-labelledby="el-perks">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="el-perks" class="max-w-2xl text-3xl font-bold tracking-tight">What priority actually means</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(p, i) in perks" :key="p[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted">{{ p[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ p[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="el-conditions">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="el-conditions" class="text-2xl font-bold tracking-tight">Full trading conditions</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(r, i) in [
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
              ]" :key="r[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="px-6 py-3.5 font-medium text-muted">{{ r[0] }}</th>
                <td class="px-6 py-3.5 font-mono tabular-nums text-fg">{{ r[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>