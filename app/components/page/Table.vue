<script setup lang="ts">
defineProps<{ head: readonly string[]; rows: readonly (readonly string[])[]; strong?: number; caption?: string }>()
</script>

<template>
  <div class="overflow-x-auto rounded-2xl border border-line">
    <table class="w-full min-w-120 text-left text-sm">
      <caption v-if="caption" class="sr-only">{{ caption }}</caption>
      <thead class="bg-surface text-muted">
        <tr>
          <th v-for="h in head" :key="h" scope="col" class="px-6 py-4 font-medium">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in rows" :key="r[0]" class="even:bg-white/[0.02]">
          <template v-for="(c, j) in r" :key="j">
            <th v-if="!j" scope="row" class="px-6 py-4 font-mono font-medium text-fg">{{ c }}</th>
            <td v-else class="px-6 py-4 tabular-nums" :class="j === strong ? 'font-mono text-fg' : 'text-muted'">{{ c }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>
