<script setup lang="ts">
withDefaults(defineProps<{ size?: number | string }>(), { size: 24 })
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M0,0H11.377V11.372H0Z" fill="#F25022" />
    <path d="M12.623,0H24V11.372H12.623Z" fill="#7FBA00" />
    <path d="M0,12.623H11.377V24H0Z" fill="#00A4EF" />
    <path d="M12.623,12.623H24V24H12.623Z" fill="#FFB900" />
  </svg>
</template>
