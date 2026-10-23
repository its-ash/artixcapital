<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

defineProps<{ items: readonly (readonly [string, string])[]; name: string }>()
</script>

<template>
  <div class="faq max-w-3xl divide-y divide-line border-y border-line">
    <details v-for="f in items" :key="f[0]" :name="name" class="group">
      <summary class="flex cursor-pointer items-center justify-between gap-6 py-6 text-lg font-medium transition-colors hover:text-accent-soft">
        {{ f[0] }}
        <span class="grid size-8 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-open:border-accent group-open:bg-accent group-open:text-white" aria-hidden="true">
          <PhPlus :size="14" weight="bold" class="faq-icon" />
        </span>
      </summary>
      <p class="max-w-[65ch] pb-6 leading-relaxed text-muted">{{ f[1] }}</p>
    </details>
  </div>
</template>
