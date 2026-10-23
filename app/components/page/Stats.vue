<script setup lang="ts">
defineProps<{ items: readonly (readonly [string, string])[] }>()
</script>

<template>
  <dl class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <div v-for="s in items" :key="s[0]" v-spot class="st-cell card p-5 md:p-6">
      <span class="st-bar absolute inset-x-0 top-0 h-0.5 origin-left bg-accent" aria-hidden="true" />
      <dt class="text-sm text-muted">{{ s[0] }}</dt>
      <dd class="mt-3 font-mono text-2xl tabular-nums tracking-tight md:text-4xl">{{ s[1] }}</dd>
    </div>
  </dl>
</template>
