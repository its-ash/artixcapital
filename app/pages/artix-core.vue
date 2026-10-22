<script setup lang="ts">
// Artix Core: split spec-card hero, beginner-focused, who-it-fits, full conditions table.

useSeoMeta({
  title: 'Artix Core account | Artix Capital',
  description: 'The beginner-friendly account: $500 minimum deposit, spreads from 1.5 pips, no FX or metals commission, all six asset classes on nTrader.'
})

const spec = [
  ['Minimum deposit', '$500'],
  ['Typical spreads from', '1.5 pips'],
  ['FX commission', 'None'],
  ['Crypto commission', '0.10% of notional'],
  ['Max leverage', '1:200'],
  ['Stop out level', '30%'],
  ['Account currency', 'USD'],
  ['Platform', 'nTrader']
] as const

const fits = [
  ['First live account', 'Cost stays transparent while you learn position sizing and risk.'],
  ['Swing trading', 'Wider spreads matter less over multi-day holds than raw pips do intraday.'],
  ['Cost predictability', 'One clear pricing structure, no per-lot math at the ticket.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap grid min-h-[58svh] items-center gap-12 pt-32 pb-12 md:grid-cols-12 md:pt-40">
      <div class="md:col-span-6">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Accounts</p>
        <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Artix Core</h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
          Enter global markets with low costs, powerful tools and seamless trading. Ideal for beginners and growing traders alike.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
          <a href="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo first</a>
        </div>
      </div>
      <div class="md:col-span-6">
        <div class="glass relative overflow-hidden rounded-3xl">
          <span class="pointer-events-none absolute inset-x-0 top-0 h-px rule" aria-hidden="true" />
          <div class="relative px-7 pt-6">
            <h2 class="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Core conditions</h2>
          </div>
          <dl class="relative mt-4 grid grid-cols-2 gap-px bg-white/8">
            <div v-for="s in spec" :key="s[0]" class="bg-[rgb(15_17_25/0.94)] px-6 py-4">
              <dt class="text-[11px] text-muted">{{ s[0] }}</dt>
              <dd class="mt-0.5 font-mono text-base tabular-nums">{{ s[1] }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>

    <section aria-labelledby="co-fits">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="co-fits" class="max-w-2xl text-3xl font-bold tracking-tight">Core fits when</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div v-for="(f, i) in fits" :key="f[0]" class="glass group relative overflow-hidden rounded-3xl p-6" :class="i === 1 ? 'md:translate-y-3' : ''">
            <span class="pointer-events-none absolute inset-x-0 top-0 h-px rule" aria-hidden="true" />
            <h3 class="flex items-baseline justify-between gap-3 text-lg font-bold">
              {{ f[0] }}
              <span class="font-mono text-xs text-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
            </h3>
            <p class="mt-2.5 text-sm leading-6 text-muted">{{ f[1] }}</p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="co-costa">
      <div class="wrap grid items-center gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <div class="md:col-span-5">
          <h2 class="text-3xl font-bold tracking-tight">The cost model, in one line</h2>
          <p class="mt-4 max-w-md text-lg leading-8 text-muted">You pay the spread, nothing per lot on FX and metals. Crypto carries a notional charge with a tiny floor.</p>
        </div>
        <div class="glass md:col-span-7 rounded-3xl px-2 py-2">
          <ul class="grid">
            <li v-for="(row, i) in [
              ['FX and metals', 'Spread only'],
              ['Crypto', '0.10% + $0.05 min, per side'],
              ['Deposit / withdrawal fees', 'Per payment provider']
            ] as const" :key="row[0]" class="flex items-baseline justify-between gap-6 px-6 py-3.5" :class="i ? 'border-t border-white/6' : ''">
              <span class="text-sm text-muted">{{ row[0] }}</span>
              <span class="whitespace-nowrap text-right font-mono text-sm tabular-nums">{{ row[1] }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section aria-labelledby="co-table">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="co-table" class="text-2xl font-bold tracking-tight">Full trading conditions</h2>
        <div class="glass mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <span class="pointer-events-none absolute inset-x-0 top-0 h-px rule" aria-hidden="true" />
          <dl class="relative grid">
            <div
              v-for="(r, i) in [
                ['Platform', 'nTrader'],
                ['Minimum deposit', '$500'],
                ['Typical spreads from', '1.5 pips'],
                ['Instruments', 'FX, Metals, Indices, Commodities, Equities, Crypto'],
                ['Max leverage', '1:200'],
                ['Fixed leverage', 'For FX, precious metals, CFDs, equities and crypto'],
                ['Dynamic leverage', 'For FX, precious metals, CFDs and equities'],
                ['Stop out level', '30%'],
                ['Account currency', 'USD'],
                ['Commission', 'None on FX and Metals. Crypto: 0.10% of notional, min ticket $0.05, applied on open and close']
              ]" :key="r[0]" class="grid gap-1 px-7 py-4 sm:grid-cols-[13rem_1fr] sm:gap-8" :class="i ? 'border-t border-white/6' : ''"
            >
              <dt class="text-[13px] text-muted">{{ r[0] }}</dt>
              <dd class="font-mono text-sm leading-6 text-fg/95 sm:-mt-0.5">{{ r[1] }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  </main>
</template>