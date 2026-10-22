<script setup lang="ts">
// nTrader Windows: terminal mockup hero (real chart component), feature ledger, spec table.

useSeoMeta({
  title: 'nTrader for Windows | Artix Capital',
  description: 'The desktop workstation: unlimited charts, one-click trading, Level 2 depth, Fibonacci and Elliott tools. For Windows 10 and later.'
})

const features = [
  ['Multi-chart layouts', 'Arrange charts across saved workspaces and monitors. Reload the desk you left.'],
  ['One-click trading', 'Execute from the chart or market watch. Instant fills, optional confirm.'],
  ['Depth of market', 'Level 2 pricing with tick volume for precise entries.'],
  ['Professional drawing tools', 'Trend lines, channels, Fibonacci, Gann, Elliott waves, harmonic patterns.'],
  ['Full account management', 'Deposits, withdrawals, balances, positions, history, in the terminal.'],
  ['Statements on demand', 'Export reports for records, tax or performance review.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap grid min-h-[58svh] items-center gap-10 pt-32 pb-12 md:grid-cols-12 md:pt-40">
      <div class="md:col-span-5">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Platforms</p>
        <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">nTrader for Windows</h1>
        <p class="mt-6 max-w-md text-lg leading-8 text-muted">
          The full workstation: unlimited charts across saved workspaces, one-click execution and Level 2 depth, shaped around the way you trade.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="https://artixcapital.com/ntrader-for-windows/" class="btn btn-primary h-13 px-7">Download for Windows</a>
          <a href="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Pair with demo</a>
        </div>
      </div>
      <div class="md:col-span-7">
        <div class="panel overflow-hidden rounded-2xl">
          <div class="flex h-9 items-center justify-between border-b border-white/8 px-4 font-mono text-[11px] text-muted">
            <span>nTrader for Windows</span><span>EUR/USD  15m</span>
          </div>
          <div class="flex h-64">
            <ul class="hidden w-36 shrink-0 border-r border-white/8 py-2 font-mono text-[11px] sm:block">
              <li class="flex justify-between px-3 py-1.5"><span class="text-fg/85">EUR/USD</span><span class="text-up">+0.34</span></li>
              <li class="flex justify-between px-3 py-1.5"><span class="text-fg/85">GBP/USD</span><span class="text-down">-0.12</span></li>
              <li class="flex justify-between px-3 py-1.5"><span class="text-fg/85">USD/JPY</span><span class="text-up">+0.19</span></li>
              <li class="flex justify-between px-3 py-1.5"><span class="text-fg/85">XAU/USD</span><span class="text-up">+0.09</span></li>
              <li class="flex justify-between px-3 py-1.5"><span class="text-fg/85">US500</span><span class="text-up">+0.03</span></li>
              <li class="flex justify-between px-3 py-1.5"><span class="text-fg/85">BTC/USD</span><span class="text-down">-0.41</span></li>
            </ul>
            <div class="flex-1 p-2"><CandleChart :seed="11" :base="1.0864" :dp="5" :vol="0.0009" /></div>
          </div>
        </div>
      </div>
    </header>

    <section aria-labelledby="wd-ledger">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="wd-ledger" class="text-2xl font-bold tracking-tight">What ships in the installer</h2>
        <ul class="mt-8 max-w-3xl">
          <li v-for="(f, i) in features" :key="f[0]" class="flex flex-col gap-2 border-b border-white/8 py-5 sm:flex-row sm:items-baseline sm:gap-8" :class="i === 0 ? 'border-t border-white/8' : ''">
            <h3 class="w-56 shrink-0 text-lg font-bold">{{ f[0] }}</h3>
            <p class="text-sm leading-6 text-muted">{{ f[1] }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section aria-labelledby="wd-spec">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="wd-spec" class="text-2xl font-bold tracking-tight">Specifications</h2>
        <div class="mt-6 grid max-w-4xl gap-x-10 gap-y-5 sm:grid-cols-2">
          <div v-for="c in [
            ['Operating system', 'Windows 10 and later'],
            ['Chart types', 'Candlestick, line, bar, Heikin Ashi'],
            ['Workspaces', 'Save, reload, export across monitors'],
            ['Order types', 'Market, limit, stop, trailing'],
            ['Market data', 'Real-time quotes, Level 2 depth'],
            ['Account actions', 'Deposits, withdrawals, history, statements']
          ] as const" :key="c[0]" class="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
            <span class="text-sm text-muted">{{ c[0] }}</span>
            <span class="whitespace-nowrap font-mono text-sm tabular-nums">{{ c[1] }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>