<script setup lang="ts">
import gsap from 'gsap'

defineProps<{ rows: readonly (readonly [string, string])[]; label?: string }>()

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  gsap.from(gsap.utils.selector(root.value)('.sp-cell'), { y: 20, opacity: 0, stagger: 0.04, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: root.value, start: 'top 88%' } })
})
</script>

<template>
  <dl ref="root" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" :aria-label="label">
    <div
      v-for="(r, i) in rows"
      :key="r[0]"
      v-spot
      class="sp-cell card px-5 py-5 md:px-6"
      :class="i === 0 ? 'border-[color-mix(in_oklab,var(--color-accent)_40%,transparent)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_60%)]' : ''"
    >
      <dt class="text-sm text-muted">{{ r[0] }}</dt>
      <dd class="mt-2 font-mono text-base leading-relaxed tabular-nums text-fg md:text-lg">{{ r[1] }}</dd>
    </div>
  </dl>
</template>
