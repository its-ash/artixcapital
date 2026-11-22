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
const VIDEO_RATE = 1.5

type Glyph = { ch: string; x: number; d: number }

const root = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const loopEl = ref<HTMLVideoElement | null>(null)
const looping = ref(false)
const runSrc = ref('')
const loopSrc = ref('')
const mq = ref<SVGTextElement | null>(null)
const ml = ref<SVGTextElement | null>(null)
const quiet = ref<Glyph[]>([])
const loud = ref<Glyph[]>([])
const size = ref({ w: 700, lw: 640 })
const paused = ref(false)

const glyphs = (el: SVGTextElement, text: string, start: number, gap: number) =>
  Array.from(text).flatMap((ch, i) => (ch.trim() ? [{ ch, x: el.getStartPositionOfChar(i).x, d: start + i * gap }] : []))

const setRate = (el: HTMLVideoElement | null) => {
  if (!el) return
  el.defaultPlaybackRate = VIDEO_RATE
  el.playbackRate = VIDEO_RATE
}

const safePlay = (el: HTMLVideoElement | null) => {
  if (!el) return
  el.defaultMuted = true
  el.muted = true
  el.playsInline = true
  setRate(el)
  el.play().catch(() => {})
}

const onRunPlaying = () => {
  setRate(videoEl.value)
  if (loopSrc.value) return
  const mobile = window.matchMedia('(max-width: 767px)').matches
  const vp9 = !mobile && Boolean(loopEl.value?.canPlayType('video/webm; codecs="vp9"'))
  loopSrc.value = mobile ? '/video/hero-forex-loop-mobile.mp4' : vp9 ? '/video/hero-forex-loop.webm' : '/video/hero-forex-loop.mp4'
}

const onRunEnded = () => {
  if (looping.value) return
  if (!loopSrc.value) onRunPlaying()
  looping.value = true
  nextTick(() => {
    const lv = loopEl.value
    if (!lv || paused.value) return
    lv.currentTime = 0
    safePlay(lv)
  })
}

let io: IntersectionObserver | undefined
let unlock: (() => void) | undefined

onMounted(async () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobile = window.matchMedia('(max-width: 767px)').matches
  if (!reduced) {
    runSrc.value = mobile ? '/video/hero-forex-run-mobile.mp4' : '/video/hero-forex-run.mp4'
    await nextTick()
    const v = videoEl.value
    if (v) {
      v.defaultMuted = true
      v.muted = true
      v.playsInline = true
      setRate(v)
      v.load()
      setRate(v)
      v.play().catch(() => {
        unlock = () => {
          safePlay(looping.value ? loopEl.value : videoEl.value)
          if (unlock) {
            window.removeEventListener('touchstart', unlock)
            window.removeEventListener('pointerdown', unlock)
            unlock = undefined
          }
        }
        window.addEventListener('touchstart', unlock, { passive: true, once: true })
        window.addEventListener('pointerdown', unlock, { passive: true, once: true })
      })
    }
  }
  if (root.value) {
    io = new IntersectionObserver(([e]) => {
      const visible = Boolean(e?.isIntersecting)
      paused.value = !visible
      if (reduced) return
      const active = looping.value ? loopEl.value : videoEl.value
      if (!active) return
      if (visible && (looping.value || !active.ended)) safePlay(active)
      else active.pause()
    }, { rootMargin: '100px' })
    io.observe(root.value)
  }
  await document.fonts.ready.catch(() => {})
  const q = mq.value
  const l = ml.value
  if (!q || !l) return
  quiet.value = glyphs(q, QUIET, 0, QUIET_GAP)
  loud.value = glyphs(l, LOUD, LOUD_START, LOUD_GAP)
  const lw = l.getComputedTextLength()
  size.value = { w: Math.ceil(Math.max(q.getComputedTextLength(), lw + FS * 0.3)), lw }
})
onBeforeUnmount(() => {
  io?.disconnect()
  if (unlock) {
    window.removeEventListener('touchstart', unlock)
    window.removeEventListener('pointerdown', unlock)
  }
})

const tail = computed(() => LOUD_START + LOUD.length * LOUD_GAP)
const vb = computed(() => `0 0 ${size.value.w} ${FS * 2.15}`)

useMotion(root, ({ motion, desktop }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(q('.h-label'), { y: 12, opacity: 0, duration: 0.7 })
    .from(q('.h-sub'), { y: 16, opacity: 0, duration: 0.9 }, 1)
    .from(q('.h-cta'), { y: 16, opacity: 0, stagger: 0.06, duration: 0.8 }, 1.1)
    .fromTo(q('.h-video'), { opacity: 0, scale: desktop ? 1.04 : 1 }, { opacity: 1, scale: 1, duration: 1.1 }, 0.05)
  if (desktop) {
    gsap.fromTo(q('.h-video-inner'), { yPercent: 0, opacity: 1 }, { yPercent: 6, opacity: 0.45, ease: 'none', immediateRender: false, scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
  }
})
</script>

<template>
  <section
    id="top"
    ref="root"
    class="relative flex min-h-[calc(100dvh-8rem-env(safe-area-inset-bottom))] flex-col overflow-hidden md:min-h-[calc(100dvh-4rem)] md:justify-center"
    :class="paused ? 'anim-paused' : ''"
    aria-labelledby="hero-title"
  >
    <div class="pointer-events-none relative h-[48dvh] min-h-64 w-full shrink-0 overflow-hidden sm:h-[52dvh] md:absolute md:inset-0 md:h-full md:min-h-0" aria-hidden="true">
      <div class="h-video size-full">
        <div class="h-video-inner relative size-full will-change-[transform,opacity]">
          <video
            ref="loopEl"
            class="absolute inset-0 size-full object-cover object-center opacity-100"
            :src="loopSrc || undefined"
            poster="/video/hero-poster.webp"
            muted
            loop
            playsinline
            webkit-playsinline
            disablepictureinpicture
            preload="auto"
            @loadedmetadata="setRate(loopEl)"
            @playing="setRate(loopEl)"
          />
          <video
            ref="videoEl"
            class="relative size-full object-cover object-center opacity-100 transition-opacity duration-300"
            :class="looping ? 'opacity-0!' : ''"
            :src="runSrc || undefined"
            poster="/video/hero-poster.webp"
            autoplay
            muted
            playsinline
            webkit-playsinline
            disablepictureinpicture
            preload="auto"
            @loadedmetadata="setRate(videoEl)"
            @playing="onRunPlaying"
            @ended="onRunEnded"
          />
        </div>
      </div>
      <div class="hidden md:block absolute inset-0 bg-[radial-gradient(50%_60%_at_82%_14%,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_70%)]" />
      <div class="hidden md:block absolute inset-0 w-3/4 bg-linear-to-r from-canvas via-canvas/75 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-canvas via-canvas/55 to-transparent md:h-32 md:via-transparent" />
    </div>
    <div class="pointer-events-none relative z-1 wrap -mt-6 flex flex-1 flex-col justify-center pb-6 *:pointer-events-auto md:mt-0 md:grid md:flex-none md:items-center md:py-12 lg:grid-cols-12 lg:py-14">
      <div class="min-w-0 lg:col-span-8">
        <p class="h-label eyebrow">Forex &amp; CFD Brokerage</p>
        <h1 id="hero-title" class="h-display mt-3 text-[clamp(2.25rem,8.4vw,7.25rem)] leading-[0.95]! whitespace-nowrap md:mt-4" aria-label="Quiet money. Loud success.">
          <svg class="hw block h-[2.15em] w-auto max-w-full overflow-visible" :viewBox="vb" preserveAspectRatio="xMinYMid meet" aria-hidden="true">
            <defs>
              <radialGradient id="hw-glow-grad">
                <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.95" />
                <stop offset="45%" stop-color="var(--color-accent)" stop-opacity="0.4" />
                <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0" />
              </radialGradient>
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
              <circle class="hw-glow" :cx="size.lw + FS * 0.13" :cy="Y2 - FS * 0.07" :r="FS * 0.24" fill="url(#hw-glow-grad)" :style="{ '--d': tail + 0.5 }" />
              <circle class="hw-dot" :cx="size.lw + FS * 0.13" :cy="Y2 - FS * 0.07" :r="FS * 0.075" :style="{ '--d': tail + 0.5 }" />
              </template>
            </g>
          </svg>
        </h1>
        <p class="h-sub mt-3 max-w-lg text-sm leading-relaxed text-muted sm:text-base md:mt-5 md:text-lg">
          Institutional pricing and precision execution across forex, stocks, indices, commodities and crypto.
        </p>
        <div class="mt-5 flex flex-wrap items-center gap-3 md:mt-7">
          <a v-magnetic="0.2" :href="SIGNUP" class="h-cta btn btn-primary h-11 px-6 text-sm sm:h-12 sm:px-7 sm:text-base">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
          <NuxtLink to="/artix-demo-account/" class="h-cta btn btn-ghost h-11 px-5 text-sm sm:h-12 sm:px-6 sm:text-base">Try demo</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
