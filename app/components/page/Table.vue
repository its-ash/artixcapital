<script setup lang="ts">
defineProps<{ head: readonly string[]; rows: readonly (readonly string[])[]; strong?: number; caption?: string }>()
</script>

<template>
  <div class="surface-lux overflow-x-auto rounded-2xl">
    <table class="w-full min-w-120 text-left text-sm">
      <caption v-if="caption" class="sr-only">{{ caption }}</caption>
      <thead class="text-xs uppercase tracking-wider text-muted">
        <tr class="border-b border-line-strong">
          <th v-for="h in head" :key="h" scope="col" class="bg-elevated/90 px-5 py-3.5 font-medium">{{ h }}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-line">
        <tr v-for="r in rows" :key="r[0]" class="pt-row">
          <template v-for="(c, j) in r" :key="j">
            <th v-if="!j" scope="row" class="px-5 py-3.5 font-mono font-medium text-fg">{{ c }}</th>
            <td v-else class="px-5 py-3.5 tabular-nums" :class="j === strong ? 'font-mono font-medium text-accent-soft' : 'text-muted'">{{ c }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.pt-row { transition: background-color 200ms ease; }
.pt-row:hover { background-color: color-mix(in oklab, var(--color-accent) 8%, transparent); }
@media (prefers-reduced-motion: reduce) { .pt-row { transition: none; } }
</style>
