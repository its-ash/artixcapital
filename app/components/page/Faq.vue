<script setup lang="ts">
import { PhPlus } from '@phosphor-icons/vue'

defineProps<{ items: readonly (readonly [string, string])[]; name: string }>()
</script>

<template>
  <div class="faq grid gap-3">
    <details
      v-for="(f, i) in items"
      :key="f[0]"
      v-spot
      :name="name"
      :open="i === 0"
      class="card group open:border-[color-mix(in_oklab,var(--color-accent)_45%,transparent)] open:bg-[radial-gradient(90%_120%_at_0%_0%,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_70%)]"
    >
      <summary class="flex cursor-pointer items-center gap-4 px-5 py-5 md:gap-5 md:px-6">
        <span class="font-mono text-xs text-muted transition-colors group-open:text-accent-soft" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="flex-1 text-base font-medium md:text-lg">{{ f[0] }}</span>
        <span class="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong transition-colors group-open:border-accent group-open:bg-accent group-open:text-on-accent" aria-hidden="true">
          <PhPlus :size="14" weight="bold" class="faq-icon" />
        </span>
      </summary>
      <p class="max-w-[65ch] pr-6 pb-6 pl-13 leading-relaxed text-muted md:pl-15">{{ f[1] }}</p>
    </details>
  </div>
</template>
