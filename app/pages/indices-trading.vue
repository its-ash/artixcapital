<script setup lang="ts">
// Indices: centered manifesto hero, index roster table, macro explainer, FAQ.

useSeoMeta({
  title: 'Indices trading | Artix Capital',
  description: 'Trade whole economies with index CFDs: US500, NAS100, GER40, UK100, JPN225 and more, with raw pricing and leverage to 1:200.'
})

const indices = [
  ['US500', 'S&P 500', 'USA', 'The broadest read on American large-caps'],
  ['NAS100', 'US Tech 100', 'USA', 'The tech heavies, Nasdaq-listed'],
  ['GER40', 'Germany 40', 'Germany', 'Frankfurt blue chips, continental growth'],
  ['UK100', 'UK 100', 'UK', 'London large-caps, dividend heavy'],
  ['JPN225', 'Japan 225', 'Japan', 'Nikkei classics and exporters'],
  ['HK50', 'Hong Kong 50', 'Hong Kong', 'China exposure through listed giants'],
  ['AUS200', 'Australia 200', 'Australia', 'Miners, banks and the terms of trade'],
  ['EU50', 'Euro 50', 'Eurozone', 'The cross-border euro large-cap read']
] as const

const faqs = [
  ['Why trade an index instead of single stocks?', 'One position spreads exposure across an entire market, reducing single-company risk while keeping full participation in the trend.'],
  ['How is an index price built?', 'From the weighted performance of its member companies, quoted continuously against the cash market.'],
  ['Can I trade indices outside equity hours?', 'Yes, index CFDs quote for longer sessions than the underlying exchanges.'],
  ['What moves an index?', 'Macro data, central bank policy, sector rotation and the heavyweight members inside the basket.'],
  ['Can I hedge a stock portfolio with an index?', 'Yes, shorting the relevant index CFD in one ticket replaces a dozen individual short positions.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap flex min-h-[58svh] flex-col justify-center pt-32 pb-12 text-center md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Markets</p>
      <h1 class="mx-auto mt-4 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-6xl">One ticket. The whole market.</h1>
      <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
        An index is hundreds of companies in a single number. With index CFDs you trade the direction of entire economies, long or short, without buying a single share.
      </p>
      <div class="mt-9 flex justify-center gap-3">
        <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
      </div>
    </header>

    <section aria-labelledby="ix-roster">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ix-roster" class="text-2xl font-bold tracking-tight">The index roster</h2>
        <div class="panel mt-6 overflow-x-auto rounded-3xl">
          <table class="w-full min-w-125 text-left text-sm">
            <thead>
              <tr class="border-b border-white/10 font-mono text-xs uppercase tracking-wider text-muted">
                <th scope="col" class="px-6 py-3.5 font-medium">Symbol</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Name</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Region</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Character</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in indices" :key="i[0]" class="border-b border-white/8 last:border-0">
                <td class="px-6 py-3.5 font-mono text-fg">{{ i[0] }}</td>
                <td class="px-6 py-3.5 font-medium text-muted">{{ i[1] }}</td>
                <td class="px-6 py-3.5 text-muted">{{ i[2] }}</td>
                <td class="px-6 py-3.5 text-muted">{{ i[3] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="ix-macro">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="ix-macro" class="text-3xl font-bold tracking-tight md:col-span-5">Macro trends, in one line</h2>
          <div class="max-w-[60ch] text-lg leading-8 text-muted md:col-span-7">
            <p>Rates, inflation, growth surprises, the whole picture at once. Indices respond to macro before single stocks show it, and they move with the tide rather than any single boat.</p>
            <p class="mt-4">They also soften single-company shocks: one member melts down, the basket shrugs. Lower noise, same participation.</p>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="ix-faq">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="ix-faq" class="text-2xl font-bold tracking-tight md:col-span-4">Index questions</h2>
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