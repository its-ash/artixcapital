<script setup lang="ts">
// Commodities: narrative-first hero with offset stat rail, metals/energy split, FAQ band.

useSeoMeta({
  title: 'Commodities trading | Artix Capital',
  description: 'Trade gold, silver, oil and gas with CFDs on nTrader. No storage, no delivery, both directions, leverage to 1:200.'
})

const metals = [
  ['XAU/USD', 'Gold', 'The benchmark store of value, moved by real rates, central bank demand and risk sentiment.'],
  ['XAG/USD', 'Silver', 'Half precious, half industrial. Solar, electronics and jewelry demand shape the price.'],
  ['XPT/USD', 'Platinum', 'Rarer than gold, driven by automotive catalyst demand and mine supply.'],
  ['XPD/USD', 'Palladium', 'Auto-industry tightrope, subject to sharp squeezes on supply disruptions.']
] as const
const energy = [
  ['WTI', 'US crude', 'The American benchmark, set by inventories, OPEC discipline and shale output.'],
  ['BRENT', 'Brent crude', 'The global benchmark for Atlantic basin oil, sensitive to geopolitics.'],
  ['NGAS', 'Natural gas', 'A seasonal, storage-driven market with violent winter swings.']
] as const

const faqs = [
  ['Do I take delivery of anything?', 'No. Commodity CFDs settle in cash on exit. There is no storage, transport or physical delivery involved.'],
  ['What moves commodity prices?', 'Supply and demand fundamentals, inventory data, central bank policy, currency strength and geopolitical events all feed into spot prices.'],
  ['When is gold most liquid?', 'London and New York hours, roughly from early European morning through mid-American afternoon.'],
  ['Can I short commodities?', 'Yes, both directions are equal citizens through the CFD structure.'],
  ['What spreads apply?', 'From 0.0 pips on Edge and Elite with per-lot commission, or spread-only pricing with no commission on Core.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="relative overflow-hidden">
      <div class="wrap grid min-h-[58svh] items-center gap-10 pt-32 pb-12 md:grid-cols-12 md:pt-40">
        <div class="md:col-span-7">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Markets</p>
          <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Commodities trading</h1>
          <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
            Trade the assets that power economies: gold, silver and the energy benchmarks. Speculate on price movement with CFDs, without ever touching a barrel or a bullion bar.
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
            <a href="/spread-table/" class="btn btn-ghost h-13 px-7">Check spreads</a>
          </div>
        </div>
        <div class="md:col-span-5 lg:-mt-20">
          <dl class="panel rotate-1 space-y-6 rounded-3xl p-7" aria-label="Commodity conditions">
            <div v-for="s in [['Instruments', '7'], ['Settlement', 'Cash only'], ['Leverage', '1:200'], ['Weekend risk', 'None']]" :key="s[0]">
              <dt class="text-sm text-muted">{{ s[0] }}</dt>
              <dd class="font-mono text-xl tabular-nums">{{ s[1] }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </header>

    <section aria-labelledby="cm-how">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="cm-how" class="max-w-2xl text-3xl font-bold tracking-tight">How commodities trading works</h2>
        <p class="mt-5 max-w-[65ch] text-lg leading-8 text-muted">
          Rather than buying the commodity itself, you trade Contracts for Difference. Go long or short with flexible leverage and close at any time for the cash difference. No vault, no pipeline, no delivery month pressure: your only exposure is price.
        </p>
      </div>
    </section>

    <section aria-labelledby="cm-metals">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <div class="md:col-span-4">
            <h2 id="cm-metals" class="text-2xl font-bold tracking-tight">Precious metals</h2>
            <p class="mt-3 max-w-xs text-muted">Quoted all session, in US dollars.</p>
          </div>
          <ul class="grid gap-4 md:col-span-8">
            <li v-for="m in metals" :key="m[0]" class="panel flex items-center gap-5 rounded-3xl p-5">
              <span class="font-mono text-sm text-accent-soft">{{ m[0] }}</span>
              <span class="min-w-0">
                <span class="block font-bold">{{ m[1] }}</span>
                <span class="block text-sm leading-6 text-muted">{{ m[2] }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section aria-labelledby="cm-energy">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <div class="md:col-span-4">
            <h2 id="cm-energy" class="text-2xl font-bold tracking-tight">Energy</h2>
            <p class="mt-3 max-w-xs text-muted">The benchmarks that follow OPEC and the weather.</p>
          </div>
          <ul class="grid gap-4 md:col-span-8">
            <li v-for="m in energy" :key="m[0]" class="panel flex items-center gap-5 rounded-3xl p-5">
              <span class="font-mono text-sm text-accent-soft">{{ m[0] }}</span>
              <span class="min-w-0">
                <span class="block font-bold">{{ m[1] }}</span>
                <span class="block text-sm leading-6 text-muted">{{ m[2] }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section aria-labelledby="cm-faq">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="cm-faq" class="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight">Commodity questions</h2>
        <div class="glass mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl">
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