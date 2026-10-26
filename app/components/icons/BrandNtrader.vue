<script setup lang="ts">
const SRC = 'https://play-lh.googleusercontent.com/6mv_NULxcOzgNQAostl74PT2I_5xRwNUDU28lrhd5U9XSATUQ9e9si8xL3ZMRu16TYD_vl7b4HPmKysBoW3l3cY'

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
