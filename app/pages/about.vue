<script setup lang="ts">
// About: statement hero, agency model ledger, facts table, principles row.

useSeoMeta({
  title: 'About Artix Capital',
  description: 'A pure agency multi-asset broker: FX, CFDs, commodities, indices and global markets, executed institutionally with no proprietary book.'
})

const model = [
  ['Pure agency', 'Client orders route to institutional liquidity providers. The desk never trades against you.'],
  ['No market risk', 'No exposure is maintained on the company\u2019s own books. We profit when you trade well, not when you lose.'],
  ['Neutral by design', 'No rebates that reward order flow against you, no dealing desk interference on tickets.']
] as const

const facts = [
  ['Legal name', 'Artix Capital Ltd'],
  ['Registration number', '2023-00122'],
  ['Incorporation', 'International Business Company, Saint Lucia'],
  ['Registered office', 'The Sotheby Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia'],
  ['Support', 'support@artixcapital.com, +44 7822 018441, 24/5'],
  ['Platforms', 'nTrader and MetaTrader 5'],
  ['Instruments', 'FX, metals, indices, commodities, equities, crypto'],
  ['Model', 'Pure agency execution']
] as const

const principles = [
  ['Execution first', 'Everything serves the fill: pricing, routing, tools.'],
  ['Plain costs', 'Spread or raw plus commission. Visible before, identical after.'],
  ['Human support', 'A person answers, 24 hours a day, five days a week.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap flex min-h-[58svh] flex-col justify-center pt-32 pb-12 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Company</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-6xl">
        We win when you trade well.
      </h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
        A multi-asset brokerage built on proven industry experience: direct market access, an execution-only desk and pricing that says what it costs.
      </p>
      <div class="mt-9 flex flex-wrap gap-3">
        <a href="/contact-us/" class="btn btn-primary h-13 px-7">Contact us</a>
        <a href="/forex-trading/" class="btn btn-ghost h-13 px-7">See the markets</a>
      </div>
    </header>

    <section aria-labelledby="ab-model">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ab-model" class="text-2xl font-bold tracking-tight">The agency model, without the jargon</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(m, i) in model" :key="m[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted">{{ m[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ m[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="ab-principles">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="ab-principles" class="text-2xl font-bold tracking-tight md:col-span-4">Three rules we keep</h2>
          <ol class="grid gap-4 md:col-span-8 lg:grid-cols-3">
            <li v-for="(p, i) in principles" :key="p[0]" class="panel rounded-3xl p-6">
              <span class="font-mono text-sm text-accent-soft">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-3 text-lg font-bold">{{ p[0] }}</h3>
              <p class="mt-2 text-sm leading-6 text-muted">{{ p[1] }}</p>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section aria-labelledby="ab-facts">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ab-facts" class="text-2xl font-bold tracking-tight">Company facts</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(f, i) in facts" :key="f[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-48 px-6 py-4 font-medium text-muted">{{ f[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ f[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  </main>
</template>