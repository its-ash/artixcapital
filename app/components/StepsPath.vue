<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const PATH = 'M0,100 C80,100 120,40 200,40 S320,160 400,160 S520,40 600,40 S720,160 800,160 S920,40 1000,40 S1120,100 1200,100'
const NODES = [200, 600, 1000]

const root = ref<HTMLElement | null>(null)
const reached = ref(-1)

useMotion(root, ({ motion, desktop }) => {
  const q = gsap.utils.selector(root.value)
  if (!motion) {
    reached.value = STEPS.length - 1
    return
  }
  const st = { trigger: q('.st-track')[0], start: 'top 75%', end: 'bottom 45%', scrub: 1 }
  const line = root.value?.querySelector<SVGPathElement>('.st-line')
  if (desktop && line) {
    gsap.timeline({ scrollTrigger: { ...st, onUpdate: self => { reached.value = NODES.findLastIndex(x => self.progress >= x / 1200 - 0.02) } } })
      .from(line, { drawSVG: 0, ease: 'none' }, 0)
      .to(q('.st-dot'), { motionPath: { path: line, align: line, alignOrigin: [0.5, 0.5] }, ease: 'none' }, 0)
  } else {
    gsap.from(q('.st-vline'), { scaleY: 0, ease: 'none', scrollTrigger: st })
    q('.st-step').forEach((el, i) => ScrollTrigger.create({ trigger: el, start: 'top 70%', onEnter: () => { reached.value = Math.max(reached.value, i) } }))
  }
  gsap.from(q('.st-step'), { y: 50, opacity: 0, stagger: 0.12, duration: 1.1, scrollTrigger: { trigger: q('.st-track')[0], start: 'top 80%' } })
})
</script>

<template>
  <section ref="root" class="relative py-28 md:py-36" aria-labelledby="steps-title">
    <div class="wrap">
      <h2 id="steps-title" v-reveal="'lines'" class="mx-auto max-w-3xl text-center text-4xl font-bold tracking-[-0.03em] md:text-6xl">From sign-up to first trade in <span class="grad-text">three steps.</span></h2>

      <div class="st-track relative mt-20">
        <div class="relative hidden aspect-6/1 lg:block" aria-hidden="true">
          <svg viewBox="0 0 1200 200" class="absolute inset-0 size-full overflow-visible">
            <defs>
              <linearGradient id="st-grad" x1="0" x2="1">
                <stop offset="0" stop-color="#8ea0bf" />
                <stop offset=".5" stop-color="#c9a75d" />
                <stop offset="1" stop-color="#e3cfa0" />
              </linearGradient>
            </defs>
            <path :d="PATH" fill="none" stroke="rgb(255 255 255 / .08)" stroke-width="2" stroke-dasharray="4 8" />
            <path class="st-line" :d="PATH" fill="none" stroke="url(#st-grad)" stroke-width="3" stroke-linecap="round" />
            <circle class="st-dot" r="7" fill="#eef0f6" />
          </svg>
          <span
            v-for="(x, i) in NODES"
            :key="x"
            class="absolute grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border transition-[background-color,border-color,color,scale] duration-500"
            :class="reached >= i ? 'scale-110 border-transparent text-ink shadow-[0_0_32px_-4px_var(--hue)]' : 'border-white/15 bg-surface text-muted'"
            :style="{ left: `${(x / 1200) * 100}%`, top: '20%', '--hue': STEPS[i]?.hue, ...(reached >= i ? { background: STEPS[i]?.hue } : {}) }"
          >
            <component :is="STEPS[i]?.icon" :size="26" />
          </span>
        </div>

        <span class="st-vline absolute bottom-0 left-8 top-0 w-px origin-top bg-accent lg:hidden" aria-hidden="true" />

        <ol class="grid gap-12 lg:mt-6 lg:grid-cols-3 lg:gap-8">
          <li v-for="(s, i) in STEPS" :key="s.title" class="st-step relative pl-24 lg:pl-0 lg:text-center">
            <span
              class="absolute left-0 top-0 grid size-16 place-items-center rounded-full border transition-[background-color,border-color,color] duration-500 lg:hidden"
              :class="reached >= i ? 'border-transparent text-ink' : 'border-white/15 bg-surface text-muted'" :style="reached >= i ? { background: s.hue } : {}"
              aria-hidden="true"
            >
              <component :is="s.icon" :size="26" />
            </span>
            <h3 class="pt-3 text-2xl font-bold lg:pt-0">{{ s.title }}</h3>
            <p class="mx-auto mt-2 max-w-xs text-muted">{{ s.desc }}</p>
          </li>
        </ol>
      </div>

      <div class="mt-16 flex justify-center">
        <a v-magnetic :href="SIGNUP" class="btn btn-primary h-14 px-8">Open account</a>
      </div>
    </div>
  </section>
</template>
