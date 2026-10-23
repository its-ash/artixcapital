<script setup lang="ts">
const props = withDefaults(defineProps<{ items: readonly (readonly [string, string])[]; cols?: 2 | 3 }>(), { cols: 3 })

const wide = (i: number) => {
  const n = props.items.length
  if (props.cols === 2) return n % 2 === 1 && i === n - 1
  return (n % 3 === 2 && i === 0) || (n % 3 === 1 && (i === 0 || i === n - 1))
}
</script>

<template>
  <ul class="grid gap-3 sm:grid-cols-2" :class="cols === 3 ? 'lg:grid-cols-3' : ''">
    <li v-for="(f, i) in items" :key="f[0]" class="min-w-0" :class="wide(i) ? (cols === 3 ? 'lg:col-span-2' : 'sm:col-span-2') : ''">
      <article
        v-spot
        class="card flex h-full flex-col p-6 md:p-7"
        :class="i === 0 ? 'bg-[radial-gradient(80%_90%_at_0%_0%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_70%)]' : ''"
      >
        <span class="card-icon font-mono text-xs" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <h3 class="mt-6 text-lg font-semibold tracking-tight md:text-xl">{{ f[0] }}</h3>
        <p class="mt-2 max-w-[48ch] text-pretty leading-relaxed text-muted">{{ f[1] }}</p>
      </article>
    </li>
  </ul>
</template>
