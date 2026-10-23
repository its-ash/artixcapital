<script setup lang="ts">
defineProps<{ head: readonly string[]; rows: readonly (readonly string[])[]; strong?: number; caption?: string }>()
</script>

<template>
  <div v-reveal="'fade'" class="overflow-x-auto rounded-2xl border border-line bg-surface">
    <table class="w-full min-w-120 text-left text-sm">
      <caption v-if="caption" class="sr-only">{{ caption }}</caption>
      <thead class="text-xs text-muted">
        <tr class="border-b border-line-strong">
          <th v-for="h in head" :key="h" scope="col" class="bg-elevated px-6 py-4 font-medium">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r[0]" class="pt-row transition-colors duration-200 even:bg-white/2 hover:bg-[color-mix(in_oklab,var(--color-accent)_8%,transparent)]">
          <template v-for="(c, j) in r" :key="j">
            <th v-if="!j" scope="row" class="relative px-6 py-4 font-mono font-medium text-fg">
              <span class="pt-bar absolute inset-y-2 left-0 w-0.5 origin-center scale-y-0 rounded-full bg-accent transition-transform duration-200" aria-hidden="true" />{{ c }}
            </th>
            <td v-else class="px-6 py-4 tabular-nums" :class="j === strong ? 'font-mono text-accent-soft' : 'text-muted'">{{ c }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pt-row:hover .pt-bar { scale: 1 1; }
@media (prefers-reduced-motion: reduce) { .pt-bar { transition: none; } }
</style>
