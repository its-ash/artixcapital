<script setup lang="ts">
import gsap from 'gsap'

defineProps<{ items: readonly (readonly [string, string])[] }>()

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: root.value, start: 'top 85%' }
  gsap.from(q('.sp-line'), { scaleX: 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: st })
  gsap.from(q('li'), { y: 24, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: st })
})
</script>

<template>
  <ol ref="root" class="relative grid gap-10 md:grid-cols-3 md:gap-8">
    <span class="sp-line absolute left-5 right-5 top-5 hidden h-px origin-left bg-line-strong md:block" aria-hidden="true" />
    <li v-for="(s, i) in items" :key="s[0]" class="relative">
      <span class="relative grid size-10 place-items-center rounded-full border border-line-strong bg-canvas font-mono text-sm">{{ i + 1 }}</span>
      <h3 class="mt-6 text-xl font-semibold tracking-tight">{{ s[0] }}</h3>
      <p class="mt-2 max-w-[38ch] leading-relaxed text-muted">{{ s[1] }}</p>
    </li>
  </ol>
</template>
