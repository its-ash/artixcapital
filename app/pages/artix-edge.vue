<script setup lang="ts">
// Artix Edge: raw-scalar hero (big numbers), comparison strip vs Core, conditions table.

useSeoMeta({
  title: 'Artix Edge account | Artix Capital',
  description: 'Raw interbank pricing: 0.0 spreads, $5 per lot per side, sub-second execution. The account for active and scalping strategies.'
})

const scalars = [
  ['0.0', 'pips, FX and metals'],
  ['$5', 'per lot, per side'],
  ['10K', 'min. deposit'],
  ['30%', 'stop out']
] as const

const compare = [
  ['Entry', '$10,000', '$500'],
  ['FX pricing', '0.0 + $5/lot', '1.5 pips, no commission'],
  ['Best for', 'Intraday, scalps, systems', 'Swings, learning']
] as const

const faqs = [
  ['Who is Edge for?', 'Active traders and scalpers who want zero spreads and pay a straightforward per-lot commission.'],
  ['What does it cost per trade?', '$5 per lot per side on FX and metals. Crypto is 0.10% of notional.'],
  ['How much do I need to start?', '$10,000 minimum deposit.'],
  ['Does execution differ from Core?', 'Core uses spread pricing. Edge routes raw spreads with commission, on the same liquidity stack.'],
  ['Can I hold automated strategies?', 'Yes, algorithmic and rules-based trading on nTrader is fully supported.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pt-32 md:pt-40 pb-12">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Accounts</p>
      <h1 class="mt-4 flex flex-wrap items-baseline gap-x-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">
        Artix Edge
        <span class="font-mono text-lg font-medium text-muted md:text-2xl">raw pricing engine</span>
      </h1>
      <dl class="mt-12 grid grid-cols-2 gap-y-10 border-y border-white/8 py-10 lg:grid-cols-4">
        <div v-for="(s, i) in scalars" :key="s[1]">
          <dd class="font-mono text-5xl font-bold tabular-nums tracking-tight md:text-6xl" :class="i === 0 ? 'text-accent' : ''">{{ s[0] }}</dd>
          <dt class="mt-2 text-sm text-muted">{{ s[1] }}</dt>
        </div>
      </dl>
      <div class="mt-10 flex flex-wrap gap-3">
        <a href="https://my.artixcapital.com/#/client/signup" class="btn btn-primary h-13 px-7">Open live account</a>
        <a href="/artix-core/" class="btn btn-ghost h-13 px-7">Compare with Core</a>
      </div>
    </header>

    <section aria-labelledby="ed-when">
      <div class="wrap grid gap-8 border-t border-white/8 py-14 md:grid-cols-12 md:py-16">
        <h2 id="ed-when" class="text-3xl font-bold tracking-tight md:col-span-4">When Edge wins</h2>
        <div class="max-w-[60ch] text-lg leading-8 text-muted md:col-span-8">
          <p>
            Every pip you pay is a real cost on a fast strategy. Edge removes the spread markup and charges one visible number per lot instead: $5 per side on FX and metals, nothing hidden in the quote.
          </p>
          <p class="mt-4">If you trade intraday, run systems, or care about fill quality more than ticket elegance, this is the account that prices like a professional desk.</p>
        </div>
      </div>
    </section>

    <section aria-labelledby="ed-compare">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ed-compare" class="text-2xl font-bold tracking-tight">Edge vs Core</h2>
        <div class="panel mt-6 overflow-x-auto rounded-3xl">
          <table class="w-full min-w-100 text-left text-sm">
            <thead>
              <tr class="border-b border-white/10 font-mono text-xs uppercase tracking-wider text-muted">
                <th scope="col" class="px-6 py-3.5 font-medium">Item</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Artix Edge</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Artix Core</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in compare" :key="c[0]" class="border-b border-white/8 last:border-0">
                <td class="px-6 py-3.5 font-medium text-muted">{{ c[0] }}</td>
                <td class="px-6 py-3.5 font-mono tabular-nums text-fg">{{ c[1] }}</td>
                <td class="px-6 py-3.5 font-mono tabular-nums text-muted">{{ c[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="ed-faq">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="ed-faq" class="text-2xl font-bold tracking-tight md:col-span-4">Edge questions</h2>
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