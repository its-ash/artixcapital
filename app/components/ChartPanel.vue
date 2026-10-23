<script setup lang="ts">
const props = withDefaults(defineProps<{ sym: string; seed: number; base: number; dp: number; vol?: number; tall?: boolean; active?: boolean }>(), { vol: 0.001, active: true })

const { get } = useMarketFeed()
const q = get(props.sym)
</script>

<template>
  <figure class="flex flex-col overflow-hidden rounded-2xl border border-line bg-elevated">
    <figcaption class="flex items-baseline justify-between gap-4 px-5 pb-2 pt-4">
      <span>
        <span class="block font-mono text-sm font-medium">{{ sym }}</span>
        <span class="block text-xs text-muted">{{ q?.name ?? sym }}, indicative</span>
      </span>
      <span v-if="q" class="text-right font-mono tabular-nums">
        <span class="block">{{ fmt(q.price, q.dp) }}</span>
        <span class="block text-xs" :class="q.chg >= 0 ? 'text-up' : 'text-down'">{{ q.chg >= 0 ? '+' : '' }}{{ q.chg.toFixed(2) }}%</span>
      </span>
    </figcaption>
    <div class="px-2 pb-2" :class="tall ? 'h-96' : 'h-64 md:h-72'">
      <CandleChart :seed="seed" :base="base" :dp="dp" :vol="vol" :active="active" />
    </div>
  </figure>
</template>
