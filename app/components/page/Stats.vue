<script setup lang="ts">
defineProps<{ items: readonly (readonly [string, string])[] }>()
</script>

<template>
  <dl class="grid grid-cols-2 gap-y-8 sm:grid-cols-4">
    <div v-for="(s, i) in items" :key="s[0]" class="pr-6" :class="i ? 'sm:border-l sm:border-line sm:pl-6' : ''">
      <dt class="text-sm text-muted">{{ s[0] }}</dt>
      <dd class="mt-2 font-mono text-2xl tabular-nums tracking-tight md:text-3xl">{{ s[1] }}</dd>
    </div>
  </dl>
</template>
