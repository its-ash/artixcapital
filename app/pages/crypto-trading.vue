<script setup lang="ts">
useSeoMeta({
  title: 'Crypto trading | Artix Capital',
  description: 'Trade Bitcoin, Ethereum and major crypto CFDs in USD. 24/7 access, no wallet needed, 0.10% commission, leverage and full risk tools.'
})

const pairs = [
  ['BTC/USD Bitcoin', 'The original, and still the leader'],
  ['ETH/USD Ethereum', 'The settlement layer of crypto'],
  ['SOL/USD Solana', 'High throughput networks'],
  ['XRP/USD XRP', 'Payments-focused ledger'],
  ['ADA/USD Cardano', 'Proof of stake platform'],
  ['DOGE/USD Dogecoin', 'Sentiment-driven major']
] as const
const cost = [['Commission', '0.10%'], ['Min ticket', '$0.05'], ['Applied', 'Per side'], ['Wallet needed', 'None']] as const

const faqs = [
  ['Can I trade crypto at weekends?', 'Weekend trading is available on selected crypto pairs. Check the platform for symbols open outside normal market hours.'],
  ['Do I need a wallet?', 'No. Crypto CFDs are traded in USD without custody, storage or wallet management.'],
  ['Are crypto commissions different?', 'Yes. Crypto trades are charged 0.10% of notional value with a minimum ticket fee of $0.05, applied on open and close.'],
  ['What moves crypto prices?', 'Global liquidity conditions, ETF flows, exchange supply, regulation headlines and sentiment cycles.'],
  ['Can I short crypto?', 'Yes, going short works the same as going long through the CFD structure.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Markets"
      title="Crypto, without the custody"
      lead="Trade the major digital currencies as CFDs in USD. Take either side of 24/7 volatility with real risk tools, and never touch a seed phrase."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</NuxtLink>
      <template #aside>
        <Mql5Widget type="chart" :symbols="['BTCUSD']" :height="320" />
      </template>
    </PageHero>

    <PageSection id="cr-pairs" title="The pairs on offer">
      <PageFeatures :items="pairs" />
      <p class="mt-10 text-xs text-muted">Pair availability may vary. Check the platform market watch for the live roster.</p>
    </PageSection>

    <PageSection id="cr-live" title="Live crypto prices">
      <Mql5Widget type="overview" :symbols="['BTCUSD', 'ETHUSD', 'SOLUSD', 'XRPUSD']" />
    </PageSection>

    <PageSection id="cr-cost" title="One honest number" lead="Crypto pricing stays simple on every account: raw spreads plus a single notional commission.">
      <PageStats :items="cost" />
    </PageSection>

    <PageSection id="cr-faq" title="Crypto questions">
      <PageFaq :items="faqs" name="cr-faq" />
    </PageSection>

    <PageCta />
  </main>
</template>
