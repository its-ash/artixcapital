<script setup lang="ts">
// MetaTrader 5: two-platform comparison, automation focus, spec table.

useSeoMeta({
  title: 'MetaTrader 5 | Artix Capital',
  description: 'Run the industry-standard terminal with Artix pricing: MQL5 automation, strategy testing, Level 2 depth across five devices.'
})

const strengths = [
  ['Expert advisors', 'Automate strategies in MQL5 with the largest EA ecosystem in retail trading.'],
  ['Strategy tester', 'Back-test and optimize on historical data before risking a dollar.'],
  ['Depth of market', 'Level 2 pricing and time and sales for precise execution.'],
  ['Five devices', 'Windows, macOS, iOS, Android and web, one account, everything synced.'],
  ['21 timeframes', 'From one minute to monthly, with dozens of chart objects.'],
  ['MQL5 marketplace', 'Thousands of indicators, scripts and add-ons on tap.']
] as const

const spec = [
  ['Devices', 'Windows, macOS, iOS, Android, web'],
  ['Automation', 'MQL5 expert advisors and scripts'],
  ['Timeframes', '21, M1 to MN1'],
  ['Order types', 'Market, limit, stop, trailing, pending'],
  ['Depth', 'Level 2 where available'],
  ['Credentials', 'Request MT5 access in your client area']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pb-14 pt-32 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Platforms</p>
      <div class="mt-6 grid gap-8 md:grid-cols-12">
        <h1 class="max-w-xl text-4xl font-bold tracking-[-0.03em] md:col-span-7 md:text-6xl">
          If your edge lives in automation, <span class="grad-text">MT5 is the road.</span>
        </h1>
        <p class="md:col-span-5 md:pt-3 text-lg leading-8 text-muted">
          MetaTrader 5 connects to your Artix account with the same institutional feeds and pure agency execution: full multi-asset coverage, expert advisors and the strategy tester.
        </p>
      </div>
      <div class="mt-9 flex flex-wrap gap-3">
        <a href="https://artixcapital.com/meta-trader-5/" class="btn btn-primary h-13 px-7">Learn about MT5</a>
        <a href="/ntrader-for-windows/" class="btn btn-ghost h-13 px-7">Prefer nTrader?</a>
      </div>
    </header>

    <section aria-labelledby="mt-strengths">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="mt-strengths" class="text-2xl font-bold tracking-tight">Why traders keep choosing it</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(s, i) in strengths" :key="s[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted">{{ s[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ s[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="mt-two">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="panel rounded-3xl p-8">
            <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-muted">Manual traders</h3>
            <p class="mt-3 leading-7 text-muted">Deep charting, one-click trading and full order control make MT5 comfortable for hands-on trading, with the familiarity of two decades of muscle memory.</p>
          </div>
          <div class="panel rounded-3xl p-8">
            <h3 class="font-mono text-xs uppercase tracking-[0.18em] text-muted">System builders</h3>
            <p class="mt-3 leading-7 text-muted">MQL5, the tester and the optimization engine turn ideas into rules, run on historical data, then live on the Artix server.</p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="mt-spec">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="mt-spec" class="text-2xl font-bold tracking-tight">Specifications</h2>
        <div class="mt-6 grid max-w-4xl gap-x-10 gap-y-5 sm:grid-cols-2">
          <div v-for="c in spec" :key="c[0]" class="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
            <span class="text-sm text-muted">{{ c[0] }}</span>
            <span class="whitespace-nowrap text-right font-mono text-sm tabular-nums">{{ c[1] }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>