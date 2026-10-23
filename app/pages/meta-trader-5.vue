<script setup lang="ts">
usePageSeo({
  title: 'MetaTrader 5 trading platform | Artix Capital',
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

const styles = [
  ['Manual traders', 'Deep charting, one-click trading and full order control make MT5 comfortable for hands-on trading, with the familiarity of two decades of muscle memory.'],
  ['System builders', 'MQL5, the tester and the optimization engine turn ideas into rules, run on historical data, then live on the Artix server.']
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
  <main id="main">
    <PageHero
      group="Platforms"
      title="If your edge lives in automation, MT5 is the road."
      lead="MetaTrader 5 connects to your Artix account with the same institutional feeds and pure agency execution: full multi-asset coverage, expert advisors and the strategy tester."
    >
      <a href="https://artixcapital.com/meta-trader-5/" class="btn btn-primary h-13 px-7">Learn about MT5</a>
      <NuxtLink to="/ntrader-for-windows/" class="btn btn-ghost h-13 px-7">Prefer nTrader?</NuxtLink>
    </PageHero>

    <PageSection id="mt-strengths" title="Why traders keep choosing it">
      <PageFeatures :items="strengths" />
    </PageSection>

    <PageSection id="mt-two" title="Two ways to use it">
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="s in styles" :key="s[0]" v-spot class="card p-8">
          <h3 class="text-xl font-semibold tracking-tight">{{ s[0] }}</h3>
          <p class="mt-3 leading-relaxed text-muted">{{ s[1] }}</p>
        </div>
      </div>
    </PageSection>

    <PageSection id="mt-spec" title="Specifications">
      <PageSpecs :rows="spec" />
    </PageSection>

    <PageCta />
  </main>
</template>
