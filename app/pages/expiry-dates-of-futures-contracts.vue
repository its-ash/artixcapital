<script setup lang="ts">
// Futures expiry: cycle-calendar hero, grouped contract lists, rollover protocol.

useSeoMeta({
  title: 'Futures contract expiry dates | Artix Capital',
  description: 'Expiration and last trading days for futures-linked CFDs: quarterly currencies, monthly crypto micros, energies and metals.'
})

const cycles = [
  {
    label: 'Quarterly cycle',
    desc: 'Mar Jun Sep Dec',
    items: ['US Dollar Index', 'Euro FX', 'British Pound', 'Canadian Dollar', 'Japanese Yen', 'Swiss Franc', 'Australian Dollar', 'New Zealand Dollar']
  },
  {
    label: 'Monthly cycle',
    desc: 'Every month',
    items: ['Bitcoin Micro', 'Ether Micro', 'Mexican Peso', 'South African Rand', 'Crude Oil WTI']
  },
  {
    label: 'Metals',
    desc: 'Active delivery months',
    items: ['Gold (Feb Apr Jun Aug Sep Dec)', 'Silver', 'Platinum', 'Palladium']
  }
] as const

const protocol = [
  ['Check', 'Find your symbol and the current contract month in the platform.'],
  ['Mark', 'Set the reminder ahead of the published last trading day.'],
  ['Roll', 'Close, reduce or re-enter the next contract before expiry.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pt-32 pb-12 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Trading tools</p>
      <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Futures contract expiry dates</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Futures-linked CFDs track a contract month behind the symbol. Know the cycle, mark the date, and roll on your schedule instead of the market's.
      </p>
    </header>

    <section aria-labelledby="ex-cycles">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ex-cycles" class="text-2xl font-bold tracking-tight">The three cycles</h2>
        <div class="mt-8 grid gap-6 lg:grid-cols-3">
          <div v-for="c in cycles" :key="c.label" class="panel h-full rounded-3xl p-7">
            <h3 class="text-xl font-bold">{{ c.label }}</h3>
            <p class="mt-1 font-mono text-xs text-accent-soft">{{ c.desc }}</p>
            <ul class="mt-5 grid gap-2 text-sm text-muted">
              <li v-for="it in c.items" :key="it" class="border-b border-white/6 pb-2 last:border-0">{{ it }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section aria-labelledby="ex-protocol">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 id="ex-protocol" class="text-3xl font-bold tracking-tight md:col-span-4">Your rollover protocol</h2>
          <ol class="grid gap-4 md:col-span-8 lg:grid-cols-3">
            <li v-for="(p, i) in protocol" :key="p[0]" class="panel rounded-3xl p-6">
              <span class="font-mono text-sm text-accent-soft">{{ String(i + 1).padStart(2, '0') }}</span>
              <h3 class="mt-3 text-lg font-bold">{{ p[0] }}</h3>
              <p class="mt-2 text-sm leading-6 text-muted">{{ p[1] }}</p>
            </li>
          </ol>
        </div>
        <p class="mt-6 text-xs text-muted">Verify exact last trading days in the platform before trading near expiry.</p>
      </div>
    </section>
  </main>
</template>