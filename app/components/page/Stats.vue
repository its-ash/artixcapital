<script setup lang="ts">
defineProps<{ items: readonly (readonly [string, string])[] }>()
</script>

<template>
  <dl class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <div v-for="s in items" :key="s[0]" v-spot class="st-cell card flex min-h-36 flex-col justify-between gap-8 p-5 md:min-h-44 md:p-7">
      <component :is="themeIcon(s[0])" :size="140" weight="thin" class="card-bg pointer-events-none absolute -bottom-8 -right-8 -z-1 text-fg" aria-hidden="true" />
      <span class="st-bar absolute left-5 top-0 h-0.5 w-8 bg-accent md:left-7" aria-hidden="true" />
      <dt class="text-sm text-muted">{{ s[0] }}</dt>
      <dd class="font-mono text-3xl font-semibold tabular-nums tracking-tight md:text-5xl">{{ s[1] }}</dd>
    </div>
  </dl>
</template>

<style scoped>
.card-bg { opacity: 0.05; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo); }
@media (hover: hover) and (pointer: fine) {
  .card:hover .card-bg { opacity: 0.1; rotate: -8deg; }
}
@media (prefers-reduced-motion: reduce) {
  .card-bg { transition: opacity 500ms ease; }
  .card:hover .card-bg { rotate: none; }
}
</style>
