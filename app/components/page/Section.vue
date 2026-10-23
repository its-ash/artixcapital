<script setup lang="ts">
defineProps<{ id: string; title: string; lead?: string; hidden?: boolean }>()
</script>

<template>
  <section :aria-labelledby="id" class="wrap">
    <div class="border-t border-line py-16 md:py-24">
      <h2 :id="id" class="h-section max-w-3xl text-3xl md:text-4xl" :class="hidden ? 'sr-only' : ''">{{ title }}</h2>
      <p v-if="lead" class="mt-4 max-w-[65ch] text-lg leading-relaxed text-muted">{{ lead }}</p>
      <div :class="hidden ? '' : 'mt-10 md:mt-12'"><slot /></div>
    </div>
  </section>
</template>
