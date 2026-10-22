<script setup lang="ts">
// Crypto: dark-terminal hero with live BTC price, 24/7 pitch, commission table, FAQ.

useSeoMeta({
  title: 'Crypto trading | Artix Capital',
  description: 'Trade Bitcoin, Ethereum and major crypto CFDs in USD. 24/7 access, no wallet needed, 0.10% commission, leverage and full risk tools.'
})

const { get } = useMarketFeed()
const btc = get('BTC/USD')
const eth = get('ETH/USD')
const fmt = (v: number | undefined, dp: number) => (v ?? 0).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })

const pairs = [
  ['BTC/USD', 'Bitcoin', 'The original, and still the leader'],
  ['ETH/USD', 'Ethereum', 'The settlement layer of crypto'],
  ['SOL/USD', 'Solana', 'High throughput networks'],
  ['XRP/USD', 'XRP', 'Payments-focused ledger'],
  ['ADA/USD', 'Cardano', 'Proof of stake platform'],
  ['DOGE/USD', 'Dogecoin', 'Sentiment-driven major']
] as const

const faqs = [
  ['Can I trade crypto at weekends?', 'Weekend trading is available on selected crypto pairs. Check the platform for symbols open outside normal market hours.'],
  ['Do I need a wallet?', 'No. Crypto CFDs are traded in USD without custody, storage or wallet management.'],
  ['Are crypto commissions different?', 'Yes. Crypto trades are charged 0.10% of notional value with a minimum ticket fee of $0.05, applied on open and close.'],
  ['What moves crypto prices?', 'Global liquidity conditions, ETF flows, exchange supply, regulation headlines and sentiment cycles.'],
  ['Can I short crypto?', 'Yes, going short works the same as going long through the CFD structure.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap grid min-h-[58svh] items-center gap-10 pt-32 pb-12 md:grid-cols-12 md:pt-40">
      <div class="md:col-span-7">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Markets</p>
        <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Crypto, without the custody</h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
          Trade the major digital currencies as CFDs in USD. Take either side of 24/7 volatility with real risk tools, and never touch a seed phrase.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
          <a href="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</a>
        </div>
      </div>
      <div class="md:col-span-5">
        <div class="panel relative mx-auto max-w-sm rounded-3xl p-7">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-muted">BTC / USD</p>
          <p class="mt-1 font-mono text-4xl tabular-nums">{{ fmt(btc?.price, 1) }}</p>
          <p class="mt-1 font-mono text-sm" :class="(btc?.chg ?? 0) >= 0 ? 'text-up' : 'text-down'">
            {{ (btc?.chg ?? 0) >= 0 ? '+' : '' }}{{ (btc?.chg ?? 0).toFixed(2) }}%
          </p>
          <div class="mt-4 h-20"><SparkLine :hist="btc?.hist ?? []" :up="(btc?.chg ?? 0) >= 0" /></div>
          <div class="mt-5 border-t border-white/8 pt-4">
            <div class="flex items-baseline justify-between font-mono tabular-nums">
              <span class="text-xs text-muted">ETH / USD</span>
              <span class="text-lg">{{ fmt(eth?.price, 2) }}</span>
              <span class="text-sm" :class="(eth?.chg ?? 0) >= 0 ? 'text-up' : 'text-down'">{{ (eth?.chg ?? 0) >= 0 ? '+' : '' }}{{ (eth?.chg ?? 0).toFixed(2) }}%</span>
            </div>
          </div>
          <p class="mt-4 text-xs text-muted">Indicative feed, simulated for demonstration.</p>
        </div>
      </div>
    </header>

    <section aria-labelledby="cr-pairs">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="cr-pairs" class="text-2xl font-bold tracking-tight">The pairs on offer</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(p, i) in pairs" :key="p[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted"><span class="font-mono">{{ p[0] }}</span> {{ p[1] }}</th>
                <td class="px-6 py-4 text-fg">{{ p[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-xs text-muted">Pair availability may vary. Check the platform market watch for the live roster.</p>
      </div>
    </section>

    <section aria-labelledby="cr-cost">
      <div class="wrap grid items-center gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <div class="md:col-span-5">
          <h2 id="cr-cost" class="text-3xl font-bold tracking-tight">One honest number</h2>
          <p class="mt-4 max-w-md text-lg leading-8 text-muted">Crypto pricing stays simple on every account: raw spreads plus a single notional commission.</p>
        </div>
        <div class="panel md:col-span-7 rounded-3xl p-7">
          <dl class="grid gap-4 sm:grid-cols-3">
            <div>
              <dt class="text-xs text-muted">Commission</dt>
              <dd class="font-mono text-2xl tabular-nums">0.10%</dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Min ticket</dt>
              <dd class="font-mono text-2xl tabular-nums">$0.05</dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Applied</dt>
              <dd class="font-mono text-2xl">Per side</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section aria-labelledby="cr-faq">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="cr-faq" class="text-2xl font-bold tracking-tight md:col-span-4">Crypto questions</h2>
          <div class="glass mt-6 overflow-hidden rounded-3xl">
            <details v-for="(f, i) in faqs" :key="f[0]" class="group border-t border-white/6 first:border-t-0">
              <summary class="relative flex cursor-pointer items-center justify-between gap-6 px-7 py-5 transition-colors duration-200 hover:bg-white/3 [&::-webkit-details-marker]:hidden">
                <span class="text-[15px] font-bold text-fg/95">{{ f[0] }}</span>
                <span class="relative grid size-7 shrink-0 place-items-center rounded-full border border-white/12 text-steel transition-colors duration-300 group-open:border-accent group-open:bg-accent group-open:text-ink" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 10 10" class="transition-transform duration-300 group-open:rotate-45"><path d="M5 1v8M1 5h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                </span>
              </summary>
              <p class="px-7 pb-6 pt-2 text-sm leading-7 text-muted">{{ f[1] }}</p>
            </details>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>