<script setup lang="ts">
import gsap from 'gsap'

withDefaults(defineProps<{ items: readonly (readonly [string, string])[]; cols?: 2 | 3 }>(), { cols: 3 })

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  gsap.from(gsap.utils.selector(root.value)('li'), { y: 24, opacity: 0, stagger: 0.06, duration: 0.8, scrollTrigger: { trigger: root.value, start: 'top 85%' } })
})
</script>

<template>
  <ul ref="root" class="grid gap-x-10 gap-y-12 sm:grid-cols-2" :class="cols === 3 ? 'lg:grid-cols-3' : ''">
    <li v-for="f in items" :key="f[0]" class="accent-rule pt-6">
      <h3 class="text-lg font-semibold tracking-tight">{{ f[0] }}</h3>
      <p class="mt-2 max-w-[42ch] leading-relaxed text-muted">{{ f[1] }}</p>
    </li>
  </ul>
</template>
