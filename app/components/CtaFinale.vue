<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'

const RINGS = 4

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const split = SplitText.create(q('.cta-title'), { type: 'words,chars', mask: 'words' })
  const hue = gsap.utils.interpolate(['#22d3ee', '#9ab6ff', '#a78bfa', '#ff7aea', '#fbbf24'])
  split.chars.forEach((ch, i) => gsap.set(ch, { color: hue(i / Math.max(1, split.chars.length - 1)) }))
  gsap.from(split.chars, {
    yPercent: i => 110 + (i % 4) * 25,
    rotate: i => (i % 2 ? 12 : -12),
    opacity: 0,
    stagger: { each: 0.015, from: 'random' },
    ease: 'none',
    scrollTrigger: { trigger: root.value, start: 'top 80%', end: 'top 25%', scrub: 1 }
  })
  gsap.fromTo(q('.cta-glow'), { scale: 0.5, opacity: 0 }, { scale: 1.2, opacity: 1, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'center center', scrub: true } })
  gsap.from(q('.cta-btn'), { y: 40, opacity: 0, scale: 0.9, duration: 1.2, ease: 'back.out(1.8)', scrollTrigger: { trigger: q('.cta-btn')[0], start: 'top 95%' } })
  return () => split.revert()
})
</script>

<template>
  <section ref="root" class="relative grid min-h-[90dvh] place-items-center overflow-hidden py-28" aria-labelledby="cta-title">
    <div class="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
      <span class="cta-glow absolute size-240 rounded-full bg-[radial-gradient(circle,rgb(81_132_255/0.35),rgb(255_122_234/0.08)_40%,transparent_65%)]" />
      <span
        v-for="r in RINGS"
        :key="r"
        class="absolute size-112 rounded-full border border-accent/30 motion-safe:animate-[ripple_6s_var(--ease-out-strong)_infinite]"
        :style="{ animationDelay: `${(r - 1) * 1.5}s` }"
      />
    </div>
    <div class="wrap relative text-center">
      <h2 id="cta-title" class="cta-title mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-8xl">
        Trade forex, indices, stocks and more with us.
      </h2>
      <div class="cta-btn mt-12 flex justify-center">
        <a v-magnetic="0.45" :href="SIGNUP" class="btn btn-primary h-16 px-10 text-lg">
          Open account
          <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="20" weight="bold" /><PhArrowRight :size="20" weight="bold" /></span>
        </a>
      </div>
    </div>
  </section>
</template>
