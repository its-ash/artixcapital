<script setup lang="ts">
// Stocks: headline with inline ticker strip, long/short explainer columns, FAQ.

useSeoMeta({
  title: 'Stocks trading | Artix Capital',
  description: 'Speculate on Apple, NVIDIA, Tesla and more with stock CFDs. Go long or short, dividend-adjusted, from one USD account.'
})

const watch = ['AAPL', 'NVDA', 'TSLA', 'AMZN', 'MSFT', 'META'] as const
const faqs = [
  ['Do stock CFDs pay dividends?', 'Yes, CFD positions on shares are adjusted for dividends. Long positions receive an adjustment on the ex-dividend date, short positions pay it.'],
  ['Which companies are available?', 'The most traded US and European companies, including Apple, NVIDIA, Tesla and Amazon, all from one account.'],
  ['Can I trade out of market hours?', 'Quote coverage follows regular exchange sessions. Stops and limits protect your position overnight.'],
  ['What moves a stock CFD price?', 'Earnings reports, guidance changes, product announcements, analyst actions and broad index shifts.'],
  ['Do I get shareholder rights?', 'No. CFDs carry no voting rights, they track the price only.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pt-32 pb-14 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Markets</p>
      <h1 class="mt-4 text-5xl font-bold tracking-[-0.035em] md:text-7xl">
        Trade the companies<br>you think matter.
      </h1>
      <ul class="mt-8 flex flex-wrap gap-x-7 gap-y-2 font-mono text-lg tabular-nums text-muted" aria-label="Featured stocks">
        <li v-for="t in watch" :key="t" class="transition-colors hover:text-fg">{{ t }}</li>
      </ul>
      <p class="mt-8 max-w-2xl text-lg leading-8 text-muted">
        With stock CFDs you speculate on the price of a listed company without owning the shares. Go long or short as earnings, news and sentiment move prices, with leverage and full risk tools from one USD account.
      </p>
      <div class="mt-9 flex flex-wrap gap-3">
        <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
        <a href="/indices-trading/" class="btn btn-ghost h-13 px-7">Prefer indices?</a>
      </div>
    </header>

    <section aria-labelledby="st-how">
      <div class="wrap grid gap-8 border-t border-white/8 py-14 md:grid-cols-2 md:py-16">
        <div class="panel rounded-3xl p-8">
          <h2 class="font-mono text-sm uppercase tracking-[0.18em] text-up">Go long</h2>
          <p class="mt-4 text-lg leading-8 text-muted">
            You expect the share price to rise. Buy the CFD, hold through earnings if you like, and take the gain in USD when you close. Dividend adjustments land on the ex-date.
          </p>
        </div>
        <div class="panel rounded-3xl p-8">
          <h2 class="font-mono text-sm uppercase tracking-[0.18em] text-down">Go short</h2>
          <p class="mt-4 text-lg leading-8 text-muted">
            You expect the share price to fall. Sell the CFD instead: the same ease, the same tools, no borrow desk. A down-market becomes a tradable market.
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="st-cta">
      <div class="wrap border-t border-white/8 py-14 text-center md:py-16">
        <h2 id="st-cta" class="mx-auto max-w-xl text-3xl font-bold tracking-tight">Earnings season is where stock CFDs earn their keep</h2>
        <p class="mx-auto mt-4 max-w-xl text-muted">Pre-position with orders, trade the release, manage the gap with stops.</p>
        <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary mt-8 h-13 px-8">Open live account</a>
      </div>
    </section>

    <section aria-labelledby="st-faq">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="st-faq" class="text-2xl font-bold tracking-tight md:col-span-4">Stock questions</h2>
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