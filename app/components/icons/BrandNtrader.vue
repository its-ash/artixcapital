<script setup lang="ts">
const SRC = '/logo/ntradeLogo.png'

withDefaults(defineProps<{ size?: number | string }>(), { size: 24 })
</script>

<template>
  <img
    :src="SRC"
    :width="size"
    :height="size"
    :style="{ width: typeof size === 'number' ? `${size}px` : size, height: typeof size === 'number' ? `${size}px` : size }"
    alt=""
    class="rounded-full border border-line-strong object-cover"
    decoding="async"
    loading="lazy"
  />
</template>
