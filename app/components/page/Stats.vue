<script setup lang="ts">
import gsap from 'gsap'

defineProps<{ items: readonly (readonly [string, string])[] }>()

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: root.value, start: 'top 88%' }
  gsap.from(q('.st-cell'), { y: 24, opacity: 0, stagger: 0.07, duration: 0.9, ease: 'expo.out', scrollTrigger: st })
  gsap.from(q('.st-bar'), { scaleX: 0, stagger: 0.07, duration: 1.2, ease: 'expo.inOut', scrollTrigger: st })
})
</script>

<template>
  <dl ref="root" class="grid grid-cols-2 gap-3 lg:grid-cols-4">
    <div v-for="s in items" :key="s[0]" v-spot class="st-cell card p-5 md:p-6">
      <span class="st-bar absolute inset-x-0 top-0 h-0.5 origin-left bg-accent" aria-hidden="true" />
      <dt class="text-sm text-muted">{{ s[0] }}</dt>
      <dd class="mt-3 font-mono text-2xl tabular-nums tracking-tight md:text-4xl">{{ s[1] }}</dd>
    </div>
  </dl>
</template>
