<script setup lang="ts">
defineProps<{ id: string; title: string; lead?: string; hidden?: boolean }>()
</script>

<template>
  <section :aria-labelledby="id" class="wrap">
    <div class="section-rule py-10 md:py-14">
      <h2 :id="id" class="h-section max-w-3xl text-3xl md:text-4xl" :class="hidden ? 'sr-only' : ''">{{ title }}</h2>
      <p v-if="lead" class="mt-3 max-w-[65ch] text-base leading-relaxed text-muted md:text-lg">{{ lead }}</p>
      <div :class="hidden ? '' : 'mt-6 md:mt-8'"><slot /></div>
    </div>
  </section>
</template>
