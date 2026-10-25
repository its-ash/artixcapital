<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'

const FS = 100
const QUIET = 'Quiet money.'
const LOUD = 'Loud success'
const Y1 = FS * 0.92
const Y2 = FS * 1.9
const QUIET_GAP = 0.06
const LOUD_START = 0.75
const LOUD_GAP = 0.05

type Glyph = { ch: string; x: number; d: number }

const root = ref<HTMLElement | null>(null)
const mq = ref<SVGTextElement | null>(null)
const ml = ref<SVGTextElement | null>(null)
const quiet = ref<Glyph[]>([])
const loud = ref<Glyph[]>([])
const size = ref({ w: 700, lw: 640 })

const glyphs = (el: SVGTextElement, text: string, start: number, gap: number) =>
  Array.from(text).flatMap((ch, i) => (ch.trim() ? [{ ch, x: el.getStartPositionOfChar(i).x, d: start + i * gap }] : []))

onMounted(async () => {
  await document.fonts.ready.catch(() => {})
  const q = mq.value
  const l = ml.value
  if (!q || !l) return
  quiet.value = glyphs(q, QUIET, 0, QUIET_GAP)
  loud.value = glyphs(l, LOUD, LOUD_START, LOUD_GAP)
  const lw = l.getComputedTextLength()
  size.value = { w: Math.ceil(Math.max(q.getComputedTextLength(), lw + FS * 0.3)), lw }
})

const tail = computed(() => LOUD_START + LOUD.length * LOUD_GAP)
const vb = computed(() => `0 0 ${size.value.w} ${FS * 2.15}`)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const scrub = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(q('.h-label'), { y: 12, opacity: 0, duration: 0.7 })
    .from(q('.h-sub'), { y: 16, opacity: 0, duration: 0.9 }, 1)
    .from(q('.h-cta'), { y: 16, opacity: 0, stagger: 0.06, duration: 0.8 }, 1.1)
    .fromTo(q('.h-globe'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.8 }, 0.1)
  gsap.fromTo(q('.h-globe-inner'), { yPercent: 0, opacity: 1 }, { yPercent: 8, opacity: 0.4, ease: 'none', immediateRender: false, scrollTrigger: scrub })
  gsap.to(q('.h-quiet'), { x: -FS * 0.4, opacity: 0.25, ease: 'none', scrollTrigger: scrub })
  gsap.to(q('.h-loud-wrap'), { x: FS * 0.3, ease: 'none', scrollTrigger: scrub })
})
</script>

<template>
  <section id="top" ref="root" class="relative overflow-hidden" aria-labelledby="hero-title">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_85%_10%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%),radial-gradient(35%_40%_at_0%_100%,rgb(255_255_255/0.03),transparent_70%)]" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="h-globe absolute -bottom-[36vw] -right-[42vw] size-[130vw] opacity-60 md:right-auto md:bottom-auto md:left-[80vw] md:top-[62%] md:size-[min(119vw,92dvh)] md:-translate-x-1/2 md:-translate-y-1/2 md:opacity-100">
        <div class="h-globe-inner size-full">
          <GlobeGrid locate class="pointer-events-auto" />
        </div>
      </div>
      <div class="absolute inset-y-0 left-0 hidden w-1/2 bg-linear-to-r from-canvas via-canvas/80 to-transparent md:block" />
    </div>
    <div class="pointer-events-none relative z-1 wrap grid min-h-[calc(100dvh-4rem)] items-start pb-14 pt-16 *:pointer-events-auto md:items-center md:py-14 lg:grid-cols-12 lg:py-20">
      <div class="lg:col-span-8">
        <p class="h-label text-sm font-medium text-accent-soft">Forex and CFD brokerage</p>
        <h1 id="hero-title" class="h-display mt-6 text-[clamp(3rem,8.4vw,7.25rem)] leading-[0.95]! whitespace-nowrap" aria-label="Quiet money. Loud success.">
          <svg class="hw block h-[2.15em] w-auto max-w-none overflow-visible" :viewBox="vb" aria-hidden="true">
            <defs>
              <filter id="hw-blur" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur :stdDeviation="FS * 0.08" /></filter>
            </defs>
            <text ref="mq" class="hw-quiet hw-measure" x="0" :y="Y1" :font-size="FS * 1.08">{{ QUIET }}</text>
            <text ref="ml" class="hw-loud hw-measure" x="0" :y="Y2" :font-size="FS">{{ LOUD }}</text>
            <g class="h-quiet hw-quiet text-muted" :font-size="FS * 1.08">
              <text v-for="(g, i) in quiet" :key="i" class="hw-char" :x="g.x" :y="Y1" :style="{ '--d': g.d }">{{ g.ch }}</text>
            </g>
            <g class="h-loud-wrap hw-loud text-fg" :font-size="FS">
              <text v-for="(g, i) in loud" :key="i" class="hw-char" :x="g.x" :y="Y2" :style="{ '--d': g.d }">{{ g.ch }}</text>
              <template v-if="loud.length">
              <line class="hw-bar" x1="0" :x2="size.lw" :y1="Y2 + FS * 0.17" :y2="Y2 + FS * 0.17" :stroke-width="FS * 0.06" pathLength="1" :style="{ '--d': tail }" />
              <circle class="hw-glow" :cx="size.lw + FS * 0.13" :cy="Y2 - FS * 0.07" :r="FS * 0.09" filter="url(#hw-blur)" :style="{ '--d': tail + 0.5 }" />
              <circle class="hw-dot" :cx="size.lw + FS * 0.13" :cy="Y2 - FS * 0.07" :r="FS * 0.075" :style="{ '--d': tail + 0.5 }" />
              </template>
            </g>
          </svg>
        </h1>
        <p class="h-sub mt-8 max-w-lg text-lg leading-relaxed text-muted">
          Institutional pricing and a professional terminal across forex, stocks, indices, commodities and crypto.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a v-magnetic="0.2" :href="SIGNUP" class="h-cta btn btn-primary h-14 px-8 text-base">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
