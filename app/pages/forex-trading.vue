<script setup lang="ts">
usePageSeo({
  title: 'Forex trading: 60+ currency pairs | Artix Capital',
  description: 'Trade the most liquid market in the world. 60+ currency pairs, 24/5 sessions, spreads from 0.0 pips and leverage to 1:200 on nTrader.'
})

const stats = [['Sessions', '24/5'], ['Pairs', '60+'], ['Spreads from', '0.0 pips'], ['Leverage', '1:200']] as const
const features = [
  ['Majors, minors and exotics', 'The full majors roster plus Scandinavians, Eastern Europeans and crosses, priceable every session.'],
  ['Every session covered', 'Sydney opens Sunday evening, New York closes Friday. Liquidity follows the sun.'],
  ['Trade both directions', 'Go long when a currency strengthens, short when it weakens. News, rates or sentiment all play.'],
  ['Risk control built in', 'Stop-loss, take-profit and trailing stops on every ticket, stop out at 30% margin.'],
  ['Pure agency execution', 'Orders route to institutional liquidity providers. No dealing desk in the middle.'],
  ['One account, all pairs', 'Every currency instrument lives in every account type, Core to Coverage.']
] as const
const faqs = [
  ['When can I trade forex?', 'The forex market is open 24 hours a day, five days a week, from Sunday evening to Friday evening, covering every major session in Asia, Europe and North America.'],
  ['What moves currency prices?', 'Interest rate decisions, inflation data, employment reports, central bank policy and global sentiment all move currency pairs, sometimes sharply during news releases.'],
  ['Do I own the currency I buy?', 'No. Forex CFDs are derivatives. You speculate on the price difference between the two currencies without taking delivery.'],
  ['What leverage is available?', 'Up to 1:200 on FX and metals, applied per asset class. Higher leverage amplifies both gains and losses.'],
  ['Is there a commission on FX?', 'On Artix Core there is none. Edge and Elite charge $5 and $3.5 per lot per side respectively, paired with zero spreads.'],
  ['Can I trade during news releases?', 'Yes. Prices remain tradable, though spreads may widen for a short window around high-impact data.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Markets"
      title="Forex trading"
      lead="Forex is the global marketplace for buying and selling currencies. Traded 24 hours a day, five days a week, it is the most liquid market in the world, with trillions exchanged daily across major, minor and exotic pairs."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</NuxtLink>
      <template #aside>
        <Mql5Widget type="chart" :symbols="['EURUSD']" :height="320" />
      </template>
    </PageHero>

    <section class="wrap pb-16" aria-label="Forex conditions">
      <PageStats :items="stats" />
    </section>

    <PageSection id="fx-how" title="How forex trading works">
      <div class="prose-muted">
        <p>Forex trading involves speculating on the price movement between two currencies, traded as pairs. When you believe one currency will strengthen against another, you go long. If you expect it to weaken, you go short.</p>
        <p>With CFD trading you never own the currencies themselves, you trade their price movement with leverage. Profit and loss settle in your USD account at close.</p>
      </div>
    </PageSection>

    <PageSection id="fx-why" title="Why trade forex here">
      <PageFeatures :items="features" />
    </PageSection>

    <PageSection id="fx-live" title="Live FX rates">
      <Mql5Widget type="overview" :symbols="['EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'USDCHF', 'NZDUSD', 'EURGBP', 'EURJPY', 'GBPJPY']" />
    </PageSection>

    <PageFaqSection id="fx-faq" title="Common questions" :items="faqs">
      <p class="mt-6 text-xs text-muted">Prices shown on this page are indicative only. Check individual account types for full trading conditions.</p>
    </PageFaqSection>

    <PageCta />
  </main>
</template>
