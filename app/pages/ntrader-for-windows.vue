<script setup lang="ts">
usePageSeo({
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

const spec = [
  ['Operating system', 'Windows 10 and later'],
  ['Chart types', 'Candlestick, line, bar, Heikin Ashi'],
  ['Workspaces', 'Save, reload, export across monitors'],
  ['Order types', 'Market, limit, stop, trailing'],
  ['Market data', 'Real-time quotes, Level 2 depth'],
  ['Account actions', 'Deposits, withdrawals, history, statements']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Platforms"
      title="nTrader for Windows"
      lead="The full workstation: unlimited charts across saved workspaces, one-click execution and Level 2 depth, shaped around the way you trade."
    >
      <a href="https://artixcapital.com/ntrader-for-windows/" class="btn btn-primary h-13 px-7">Download for Windows</a>
      <NuxtLink to="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</NuxtLink>
      <template #aside>
        <ChartPanel sym="EUR/USD" :seed="11" :base="1.1212" :dp="5" :vol="0.0009" />
      </template>
    </PageHero>

    <PageSection id="wd-ledger" title="What ships in the installer">
      <PageFeatures :items="features" />
    </PageSection>

    <PageSection id="wd-spec" title="Specifications">
      <PageSpecs :rows="spec" />
    </PageSection>

    <PageCta />
  </main>
</template>
