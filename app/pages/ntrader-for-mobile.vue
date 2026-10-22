<script setup lang="ts">
// nTrader Mobile: phone mockup hero, alert-on-the-go pitch, spec grid.

useSeoMeta({
  title: 'nTrader for Mobile | Artix Capital',
  description: 'Real-time trading on iOS and Android: live quotes, full order entry, charts, alerts and synced sessions with desktop.'
})

const caps = [
  ['Live on tick', 'Quotes and market watch refresh on every tick, not on pull-to-refresh.'],
  ['Full ticket stack', 'Market, limit and stop orders, stop-loss and take-profit on every one.'],
  ['Charts in hand', 'Candlestick charts with zoom and the core drawing tools.'],
  ['Alerts, not staring', 'Price and margin alerts keep you ahead without watching.'],
  ['Whole account', 'Balance, equity, positions, history and deposits from anywhere.'],
  ['One session', 'Mobile, desktop and web share the same synced state.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap grid min-h-[58svh] items-center gap-10 pt-32 pb-12 md:grid-cols-12 md:pt-40">
      <div class="md:col-span-7">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Platforms</p>
        <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">nTrader for Mobile</h1>
        <p class="mt-6 max-w-lg text-lg leading-8 text-muted">
          The market, in your pocket: real-time quotes, complete order entry and full account control on iOS and Android, synced with your desktop session.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="https://artixcapital.com/ntrader-for-mobile/" class="btn btn-primary h-13 px-7">Get the mobile app</a>
          <a href="/ntrader-for-windows/" class="btn btn-ghost h-13 px-7">Desktop version</a>
        </div>
      </div>
      <div class="md:col-span-5">
        <div class="panel mx-auto flex h-105 w-59 flex-col rounded-[2.5rem] border-[6px] border-white/10 p-3">
          <div class="mx-auto h-5 w-20 rounded-full bg-canvas" aria-hidden="true" />
          <div class="mt-4 px-2 font-mono">
            <p class="text-[11px] text-muted">BTC/USD</p>
            <p class="text-2xl tabular-nums">64,073.4</p>
          </div>
          <div class="mt-2 min-h-0 flex-1 p-1"><CandleChart :seed="37" :base="64210" :dp="0" :vol="0.0016" /></div>
          <div class="mt-3 grid grid-cols-2 gap-2" aria-hidden="true">
            <span class="grid h-10 place-items-center rounded-xl bg-up/90 text-xs font-bold text-ink">BUY</span>
            <span class="grid h-10 place-items-center rounded-xl bg-down/90 text-xs font-bold text-ink">SELL</span>
          </div>
        </div>
      </div>
    </header>

    <section aria-labelledby="mb-caps">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="mb-caps" class="text-2xl font-bold tracking-tight">Built for away-from-desk trading</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(c, i) in caps" :key="c[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted">{{ c[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ c[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="mb-spec">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="mb-spec" class="text-2xl font-bold tracking-tight">Specifications</h2>
        <div class="mt-6 grid max-w-4xl gap-x-10 gap-y-5 sm:grid-cols-2">
          <div v-for="c in [
            ['Devices', 'iOS and Android phones and tablets'],
            ['Chart types', 'Candlestick, line, area'],
            ['Order types', 'Market, limit, stop'],
            ['Risk tools', 'Stop-loss, take-profit, price alerts'],
            ['Account view', 'Balance, equity, positions, history'],
            ['Sync', 'Linked to desktop and web in real time']
          ] as const" :key="c[0]" class="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
            <span class="text-sm text-muted">{{ c[0] }}</span>
            <span class="whitespace-nowrap font-mono text-sm tabular-nums">{{ c[1] }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>