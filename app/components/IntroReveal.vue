<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

const RING = 'AXIS TO SUCCESS  ARTIX CAPITAL  '

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const split = SplitText.create(q('.i-text'), { type: 'words', wordsClass: 'w' })
  gsap.fromTo(split.words, { opacity: 0.12 }, {
    opacity: 1, stagger: 0.1, ease: 'none',
    scrollTrigger: { trigger: q('.i-text'), start: 'top 78%', end: 'bottom 45%', scrub: 0.6 }
  })
  gsap.from(q('.i-pill'), {
    y: 80, opacity: 0, rotate: () => gsap.utils.random(-18, 18), scale: 0.85,
    stagger: { each: 0.07, from: 'random' }, duration: 1.2, ease: 'back.out(1.6)',
    scrollTrigger: { trigger: q('.i-pills'), start: 'top 90%' }
  })
  gsap.to(q('.i-ring'), { rotate: 360, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1 } })
  return () => split.revert()
})
</script>

<template>
  <section ref="root" class="relative py-28 md:py-40" aria-labelledby="intro-title">
    <div class="wrap relative">
      <svg class="i-ring pointer-events-none absolute -top-16 right-4 hidden size-40 text-muted md:block lg:right-10" viewBox="0 0 200 200" aria-hidden="true">
        <defs><path id="ring-path" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
        <text class="font-mono text-[13px] tracking-[0.32em]" fill="currentColor"><textPath href="#ring-path">{{ RING }}</textPath></text>
      </svg>
      <span class="pointer-events-none absolute -top-13 right-13 hidden size-14 rounded-full bg-accent/20 blur-xl md:block lg:right-19" aria-hidden="true" />

      <h2 id="intro-title" class="sr-only">About Artix Capital</h2>
      <p class="i-text max-w-5xl text-3xl font-medium leading-[1.2] tracking-[-0.02em] md:text-5xl">
        Artix brings you the tools, the experience and direct access to
        <span class="hl grad-text">global markets</span>
        on a platform built for what comes next.
        <span class="hl grad-text">nTrader</span>
        sits at the center of it: simple enough for a first trade, deep enough for a tenth year.
      </p>

      <ul class="i-pills mt-14 flex flex-wrap gap-3">
        <li v-for="a in ASSET_CLASSES" :key="a.label" class="i-pill" :style="{ '--hue': a.hue }">
          <span class="glass inline-flex h-12 items-center gap-2.5 rounded-full pl-2 pr-5 text-base font-medium transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-(--hue)">
            <span class="chip grid size-8 place-items-center rounded-full"><component :is="a.icon" :size="16" /></span>
            {{ a.label }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
