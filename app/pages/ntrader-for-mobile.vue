<script setup lang="ts">
usePageSeo({
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

const spec = [
  ['Devices', 'iOS and Android phones and tablets'],
  ['Chart types', 'Candlestick, line, area'],
  ['Order types', 'Market, limit, stop'],
  ['Risk tools', 'Stop-loss, take-profit, price alerts'],
  ['Account view', 'Balance, equity, positions, history'],
  ['Sync', 'Linked to desktop and web in real time']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Platforms"
      title="nTrader for Mobile"
      lead="The market, in your pocket: real-time quotes, complete order entry and full account control on iOS and Android, synced with your desktop session."
    >
      <a href="https://artixcapital.com/ntrader-for-mobile/" class="btn btn-primary h-13 px-7">Get the mobile app</a>
      <NuxtLink to="/ntrader-for-windows/" class="btn btn-ghost h-13 px-7">Desktop version</NuxtLink>
      <template #aside>
        <ChartPanel sym="BTC/USD" :seed="37" :base="64210" :dp="0" :vol="0.0016" tall class="mx-auto max-w-72" />
      </template>
    </PageHero>

    <PageSection id="mb-caps" title="Built for away-from-desk trading">
      <PageFeatures :items="caps" />
    </PageSection>

    <PageSection id="mb-spec" title="Specifications">
      <PageSpecs :rows="spec" />
    </PageSection>

    <PageCta />
  </main>
</template>
