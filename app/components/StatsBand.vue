<script setup lang="ts">
type Stat = { label: string; text: string; count?: { to: number; pre?: string; suf?: string } }

const STATS: Stat[] = [
  { label: 'Spreads from', text: '0.0 pips' },
  { label: 'Maximum leverage', text: '1:200', count: { to: 200, pre: '1:' } },
  { label: 'Commission on Core FX', text: '0%' },
  { label: 'Global instruments', text: '150+', count: { to: 150, suf: '+' } },
  { label: 'Human support', text: '24/5' }
]
</script>

<template>
  <section class="wrap" aria-label="Trading conditions">
    <dl class="grid grid-cols-2 gap-y-10 py-12 md:grid-cols-5 md:py-14">
      <div v-for="(s, i) in STATS" :key="s.label" class="s-cell pr-4" :class="[i ? 'md:border-l md:border-line md:pl-6' : '', i === STATS.length - 1 ? 'col-span-2 md:col-span-1' : '']">
        <dt class="text-sm text-muted">{{ s.label }}</dt>
        <dd class="s-val mt-2 whitespace-nowrap font-mono text-3xl tabular-nums tracking-tight lg:text-4xl">{{ s.text }}</dd>
      </div>
    </dl>
  </section>
</template>
