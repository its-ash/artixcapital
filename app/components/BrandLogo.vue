<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: 'Artix Capital' })
</script>

<template>
  <img
    src="/assets/logo.svg"
    width="222"
    height="100"
    :alt="label"
    class="h-10 w-auto"
    decoding="async"
  />
</template>
