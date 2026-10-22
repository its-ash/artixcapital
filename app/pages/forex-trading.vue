<script setup lang="ts">
// Forex trading: stats-led hero, screener, 6-card features, FAQ split.

useSeoMeta({
  title: 'Forex trading | Artix Capital',
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
  <main id="main" class="relative">
    <header class="wrap flex min-h-[58svh] flex-col justify-center pt-32 pb-12 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Markets</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-6xl">Forex trading</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Forex is the global marketplace for buying and selling currencies. Traded 24 hours a day, five days a week, it is the most liquid market in the world, with trillions exchanged daily across major, minor and exotic pairs.
      </p>
      <dl class="mt-10 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
        <div v-for="s in stats" :key="s[0]">
          <dt class="text-sm text-muted">{{ s[0] }}</dt>
          <dd class="font-mono text-2xl tabular-nums text-fg">{{ s[1] }}</dd>
        </div>
      </dl>
      <div class="mt-9 flex flex-wrap gap-3">
        <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
        <a href="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</a>
      </div>
    </header>

    <section aria-labelledby="fx-how">
      <div class="wrap grid gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <h2 id="fx-how" class="text-3xl font-bold tracking-tight md:col-span-4">How forex trading works</h2>
        <div class="max-w-[60ch] text-lg leading-8 text-muted md:col-span-8">
          <p>
            Forex trading involves speculating on the price movement between two currencies, traded as pairs. When you believe one currency will strengthen against another, you go long. If you expect it to weaken, you go short.
          </p>
          <p class="mt-4">
            With CFD trading you never own the currencies themselves, you trade their price movement with leverage. Profit and loss settle in your USD account at close.
          </p>
        </div>
      </div>
    </section>

    <section aria-labelledby="fx-why">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="fx-why" class="text-2xl font-bold tracking-tight">Why trade forex here</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(f, i) in features" :key="f[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted">{{ f[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ f[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="fx-live">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="fx-live" class="text-2xl font-bold tracking-tight">Live FX rates</h2>
        <div class="panel mt-6 overflow-hidden rounded-3xl">
          <div class="tradingview-widget-container" style="min-height: 420px">
            <div class="tradingview-widget-container__widget" style="min-height: 420px" />
          </div>
        </div>
        <p class="mt-4 text-xs text-muted">Pricing is indicative only from the screener. Check individual account types for full trading conditions.</p>
      </div>
    </section>

    <section aria-labelledby="fx-faq">
      <div class="wrap grid gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <h2 id="fx-faq" class="text-2xl font-bold tracking-tight md:col-span-4">Common questions</h2>
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
    </section>
  </main>
</template>