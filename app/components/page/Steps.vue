<script setup lang="ts">
import gsap from 'gsap'

const props = defineProps<{ items: readonly (readonly [string, string])[] }>()

const LAG = 0.2

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const steps = q('.sp-step')
  gsap.from(steps, { y: 24, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: root.value, start: 'top 85%' } })
  gsap.set(steps, { '--on': 0 })
  gsap.set(q('.sp-fill-x'), { scaleX: 0 })
  gsap.set(q('.sp-fill-y'), { scaleY: 0 })

  const tl = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: root.value, start: 'top 70%', end: 'bottom 55%', scrub: 0.6 } })
  steps.forEach((el, i) => {
    tl.to(el, { '--on': 1, duration: LAG }, i)
    if (i < props.items.length - 1) tl.to([el.querySelector('.sp-fill-x'), el.querySelector('.sp-fill-y')], { scaleX: 1, scaleY: 1, duration: 1 - LAG }, i + LAG)
  })
})
</script>

<template>
  <ol ref="root" class="relative grid gap-10 md:grid-cols-3 md:gap-8">
    <li v-for="(s, i) in items" :key="s[0]" class="sp-step relative grid grid-cols-[2.5rem_1fr] gap-x-5 md:block">
      <span
        v-if="i < items.length - 1"
        class="absolute left-5 top-5 h-[calc(100%+2.5rem)] w-px bg-line-strong md:h-px md:w-[calc(100%+2rem)]"
        aria-hidden="true"
      >
        <span class="sp-fill-y absolute inset-0 origin-top bg-accent md:hidden" />
        <span class="sp-fill-x absolute inset-0 hidden origin-left bg-accent md:block" />
      </span>
      <span class="sp-dot relative grid size-10 place-items-center rounded-full border font-mono text-sm">{{ i + 1 }}</span>
      <div class="sp-body md:mt-6">
        <h3 class="pt-2 text-xl font-semibold tracking-tight md:pt-0">{{ s[0] }}</h3>
        <p class="mt-2 max-w-[38ch] leading-relaxed text-muted">{{ s[1] }}</p>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.sp-step { --on: 1; }
.sp-dot {
  background: color-mix(in oklab, var(--color-accent) calc(var(--on) * 100%), var(--color-canvas));
  border-color: color-mix(in oklab, var(--color-accent) calc(var(--on) * 100%), var(--color-line-strong));
  color: color-mix(in oklab, var(--color-on-accent) calc(var(--on) * 100%), var(--color-fg));
  scale: calc(0.92 + var(--on) * 0.08);
}
.sp-body { opacity: calc(0.4 + var(--on) * 0.6); }
</style>
