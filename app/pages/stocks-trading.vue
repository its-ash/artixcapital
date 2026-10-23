<script setup lang="ts">
usePageSeo({
  title: 'Stock CFD trading on global shares | Artix Capital',
  description: 'Speculate on Apple, NVIDIA, Tesla and more with stock CFDs. Go long or short, dividend-adjusted, from one USD account.'
})

const watch = ['AAPL', 'NVDA', 'TSLA', 'AMZN', 'MSFT', 'META'] as const
const sides = [
  { title: 'Go long', tone: 'text-up', text: 'You expect the share price to rise. Buy the CFD, hold through earnings if you like, and take the gain in USD when you close. Dividend adjustments land on the ex-date.' },
  { title: 'Go short', tone: 'text-down', text: 'You expect the share price to fall. Sell the CFD instead: the same ease, the same tools, no borrow desk. A down-market becomes a tradable market.' }
]
const faqs = [
  ['Do stock CFDs pay dividends?', 'Yes, CFD positions on shares are adjusted for dividends. Long positions receive an adjustment on the ex-dividend date, short positions pay it.'],
  ['Which companies are available?', 'The most traded US and European companies, including Apple, NVIDIA, Tesla and Amazon, all from one account.'],
  ['Can I trade out of market hours?', 'Quote coverage follows regular exchange sessions. Stops and limits protect your position overnight.'],
  ['What moves a stock CFD price?', 'Earnings reports, guidance changes, product announcements, analyst actions and broad index shifts.'],
  ['Do I get shareholder rights?', 'No. CFDs carry no voting rights, they track the price only.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Markets"
      title="Trade the companies you think matter."
      lead="With stock CFDs you speculate on the price of a listed company without owning the shares. Go long or short as earnings, news and sentiment move prices, with leverage and full risk tools from one USD account."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/indices-trading/" class="btn btn-ghost h-13 px-7">Prefer indices?</NuxtLink>
      <template #aside>
        <Mql5Widget type="chart" :symbols="['AAPL']" :height="320" />
      </template>
      <template #below>
        <ul class="flex flex-wrap gap-x-6 gap-y-2 font-mono text-muted" aria-label="Popular stocks">
          <li v-for="t in watch" :key="t">{{ t }}</li>
        </ul>
      </template>
    </PageHero>

    <PageSection id="st-live" title="Featured stocks">
      <Mql5Widget type="overview" :symbols="watch" />
    </PageSection>

    <PageSection id="st-how" title="Both directions, one ticket">
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="s in sides" :key="s.title" v-spot class="card p-8">
          <h3 class="text-xl font-semibold tracking-tight" :class="s.tone">{{ s.title }}</h3>
          <p class="mt-4 text-lg leading-relaxed text-muted">{{ s.text }}</p>
        </div>
      </div>
    </PageSection>

    <PageFaqSection id="st-faq" title="Stock questions" :items="faqs" />

    <PageCta title="Earnings season is where stock CFDs earn their keep." />
  </main>
</template>
