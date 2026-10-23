<script setup lang="ts">
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
  <main id="main">
    <PageHero
      group="Trading tools"
      title="Futures contract expiry dates"
      lead="Futures-linked CFDs track a contract month behind the symbol. Know the cycle, mark the date, and roll on your schedule instead of the market's."
    />

    <PageSection id="ex-cycles" title="The three cycles">
      <div class="grid gap-4 lg:grid-cols-3">
        <div v-for="c in cycles" :key="c.label" class="rounded-2xl border border-line bg-surface p-7">
          <h3 class="text-xl font-semibold tracking-tight">{{ c.label }}</h3>
          <p class="mt-1 font-mono text-xs text-accent-soft">{{ c.desc }}</p>
          <ul class="mt-6 flex flex-wrap gap-2 text-sm">
            <li v-for="it in c.items" :key="it" class="rounded-full border border-line px-3 py-1.5 text-muted">{{ it }}</li>
          </ul>
        </div>
      </div>
    </PageSection>

    <PageSection id="ex-protocol" title="Your rollover protocol">
      <PageSteps :items="protocol" />
      <p class="mt-10 text-xs text-muted">Verify exact last trading days in the platform before trading near expiry.</p>
    </PageSection>
  </main>
</template>
