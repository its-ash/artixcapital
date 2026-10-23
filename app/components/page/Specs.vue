<script setup lang="ts">
defineProps<{ rows: readonly (readonly [string, string])[]; label?: string }>()
</script>

<template>
  <dl class="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2" :aria-label="label">
    <div
      v-for="(r, i) in rows"
      :key="r[0]"
      class="bg-surface px-6 py-5"
      :class="i === rows.length - 1 && rows.length % 2 ? 'sm:col-span-2' : ''"
    >
      <dt class="text-sm text-muted">{{ r[0] }}</dt>
      <dd class="mt-1.5 font-mono text-[15px] leading-relaxed tabular-nums text-fg">{{ r[1] }}</dd>
    </div>
  </dl>
</template>
