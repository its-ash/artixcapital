<script setup lang="ts">
const props = withDefaults(defineProps<{ hist: number[]; up: boolean; w?: number; h?: number }>(), { w: 240, h: 72 })
const uid = useId()
const p = computed(() => sparkPath(props.hist, props.w, props.h, 6))
const color = computed(() => (props.up ? '#2fbf6d' : '#e2555f'))
</script>

<template>
  <svg :viewBox="`0 0 ${w} ${h}`" preserveAspectRatio="none" class="size-full overflow-visible" aria-hidden="true">
    <defs>
      <linearGradient :id="`sg-${uid}`" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" :stop-color="color" stop-opacity=".3" />
        <stop offset="1" :stop-color="color" stop-opacity="0" />
      </linearGradient>
    </defs>
    <path :d="p.area" :fill="`url(#sg-${uid})`" class="transition-[d] duration-700 ease-out" />
    <path :d="p.line" fill="none" :stroke="color" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke" class="transition-[d,stroke] duration-700 ease-out" />
  </svg>
</template>
