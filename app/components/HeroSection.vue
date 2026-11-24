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
const INTRO_DELAY_MS = 2200
const OUTRO_LEAD_S = 0.65

type Glyph = { ch: string; x: number; d: number }
type Phase = 'globe-intro' | 'video' | 'globe-final'

const root = ref<HTMLElement | null>(null)
const videoEl = ref<HTMLVideoElement | null>(null)
const videoSrc = ref('')
const phase = ref<Phase>('globe-intro')
const mq = ref<SVGTextElement | null>(null)
const ml = ref<SVGTextElement | null>(null)
const quiet = ref<Glyph[]>([])
const loud = ref<Glyph[]>([])
const size = ref({ w: 700, lw: 640 })
const paused = ref(false)

const glyphs = (el: SVGTextElement, text: string, start: number, gap: number) =>
  Array.from(text).flatMap((ch, i) => (ch.trim() ? [{ ch, x: el.getStartPositionOfChar(i).x, d: start + i * gap }] : []))

let io: IntersectionObserver | undefined
let unlock: (() => void) | undefined
let onPageLoad: (() => void) | undefined
let ac: AbortController | undefined
let introTimer: ReturnType<typeof setTimeout> | undefined
const blobUrls: string[] = []
let mounted = false
let videoReady = false
let introDone = false

const finishVideo = () => {
  if (phase.value === 'globe-final') return
  phase.value = 'globe-final'
}

const safePlay = (v: HTMLVideoElement | null) => {
  if (!v || phase.value === 'globe-final') return
  v.defaultMuted = true
  v.muted = true
  v.playsInline = true
  v.play().catch(() => {
    if (unlock) return
    unlock = () => {
      if (phase.value !== 'globe-final') safePlay(videoEl.value)
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

const tryStartVideo = () => {
  if (!mounted || !videoReady || !introDone || phase.value !== 'globe-intro' || paused.value) return
  safePlay(videoEl.value)
}

const onVideoPlaying = () => {
  if (phase.value === 'globe-intro') phase.value = 'video'
}

const onVideoTimeUpdate = () => {
  const v = videoEl.value
  if (!v || phase.value !== 'video' || !Number.isFinite(v.duration) || v.duration <= 0) return
  if (v.duration - v.currentTime <= OUTRO_LEAD_S) finishVideo()
}

const fetchBlob = async (url: string, signal: AbortSignal) => {
  try {
    const res = await fetch(url, { signal })
    if (!res.ok) return null
    const blob = await res.blob()
    if (signal.aborted) return null
    const objUrl = URL.createObjectURL(blob)
    blobUrls.push(objUrl)
    return objUrl
  } catch {
    return null
  }
}

const preloadVideo = async () => {
  if (!mounted || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ac = new AbortController()
  const mobile = window.matchMedia('(max-width: 767px)').matches
  const probe = videoEl.value
  const vp9 = Boolean(probe?.canPlayType('video/webm; codecs="vp9"') === 'probably')
  const url = mobile
    ? (vp9 ? '/video/hero-globe-run-mobile.webm' : '/video/hero-globe-run-mobile.mp4')
    : (vp9 ? '/video/hero-globe-run.webm' : '/video/hero-globe-run.mp4')
  const src = await fetchBlob(url, ac.signal)
  if (!src || !mounted) return
  videoSrc.value = src
  await nextTick()
  const v = videoEl.value
  if (!v) return
  v.defaultMuted = true
  v.muted = true
  v.playsInline = true
  v.load()
  const markReady = () => {
    if (videoReady) return
    videoReady = true
    tryStartVideo()
  }
  if (v.readyState >= 4) {
    markReady()
  } else {
    v.addEventListener('canplaythrough', markReady, { once: true })
  }
}

onMounted(async () => {
  mounted = true
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (root.value) {
    io = new IntersectionObserver(([e]) => {
      const visible = Boolean(e?.isIntersecting)
      paused.value = !visible
      if (reduced) return
      const v = videoEl.value
      if (phase.value === 'globe-intro' && visible) {
        tryStartVideo()
      } else if (phase.value === 'video' && v) {
        if (visible && !v.ended) safePlay(v)
        else v.pause()
      }
    }, { rootMargin: '100px' })
    io.observe(root.value)
  }
  if (!reduced) {
    const startAfterLoad = () => {
      if (!mounted) return
      introTimer = setTimeout(() => {
        introDone = true
        tryStartVideo()
      }, INTRO_DELAY_MS)
      preloadVideo()
    }
    if (document.readyState === 'complete') {
      startAfterLoad()
    } else {
      onPageLoad = () => {
        onPageLoad = undefined
        startAfterLoad()
      }
      window.addEventListener('load', onPageLoad, { once: true })
    }
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
  mounted = false
  if (onPageLoad) {
    window.removeEventListener('load', onPageLoad)
    onPageLoad = undefined
  }
  if (introTimer) clearTimeout(introTimer)
  ac?.abort()
  blobUrls.forEach(u => URL.revokeObjectURL(u))
  blobUrls.length = 0
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
    .fromTo(q('.h-globe-entry'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.8 }, 0.1)
  if (desktop) {
    gsap.fromTo(q('.h-stage-parallax'), { yPercent: 0, opacity: 1 }, { yPercent: 6, opacity: 0.45, ease: 'none', immediateRender: false, scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
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
    <div
      class="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side_at_85%_14%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_100%),radial-gradient(closest-side_at_6%_92%,rgb(255_255_255/0.03),transparent_100%)]"
      aria-hidden="true"
    />
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="h-stage-parallax relative size-full will-change-[transform,opacity]">
        <div
          class="h-globe absolute -bottom-[8vw] -right-[18vw] size-[106vw] transition-opacity duration-700 ease-out md:right-auto md:bottom-auto md:left-[76vw] md:top-[52%] md:size-[min(92vw,88dvh)] md:-translate-x-1/2 md:-translate-y-1/2"
          :class="phase === 'video' ? 'opacity-0 pointer-events-none' : 'opacity-90 md:opacity-100'"
        >
          <div class="h-globe-entry size-full">
            <GlobeGrid locate :class="phase === 'video' ? 'pointer-events-none' : 'pointer-events-auto'" />
          </div>
        </div>
        <video
          ref="videoEl"
          class="pointer-events-none absolute inset-0 size-full object-cover object-center transition-opacity duration-700 ease-out"
          :class="phase === 'video' ? 'opacity-100' : 'opacity-0'"
          :src="videoSrc || undefined"
          muted
          playsinline
          webkit-playsinline
          disablepictureinpicture
          :preload="videoSrc ? 'auto' : 'none'"
          @playing="onVideoPlaying"
          @timeupdate="onVideoTimeUpdate"
          @ended="finishVideo"
          @error="finishVideo"
        />
      </div>
      <div class="pointer-events-none absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r from-canvas via-canvas/75 to-transparent md:block" />
      <div class="pointer-events-none absolute inset-x-0 top-0 h-[48%] bg-linear-to-b from-canvas via-canvas/65 to-transparent md:hidden" />
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-canvas via-canvas/75 to-transparent md:h-28 md:via-canvas/45" />
    </div>
    <div class="pointer-events-none relative z-1 wrap flex min-h-[calc(100dvh-8rem-env(safe-area-inset-bottom))] flex-1 flex-col pb-6 pt-8 md:grid md:min-h-[calc(100dvh-4rem)] md:flex-none md:items-center md:py-14 lg:grid-cols-12 lg:py-20">
      <div class="pointer-events-none flex min-w-0 flex-1 flex-col md:block lg:col-span-7">
        <div class="pointer-events-auto">
          <p class="h-label eyebrow">Forex &amp; CFD Brokerage</p>
          <h1 id="hero-title" class="h-display mt-4 text-[clamp(2.25rem,8.4vw,6.75rem)] leading-[0.95]! whitespace-nowrap md:mt-5" aria-label="Quiet money. Loud success.">
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
          <p class="h-sub mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base md:mt-6 md:text-lg">
            Institutional pricing and precision execution across forex, stocks, indices, commodities and crypto.
          </p>
        </div>
        <div class="pointer-events-auto mt-auto flex flex-wrap items-center gap-3 pt-6 md:mt-8 md:pt-0">
          <a v-magnetic="0.2" :href="SIGNUP" class="h-cta btn btn-primary h-11 flex-1 px-6 text-sm sm:h-12 sm:flex-none sm:px-7 sm:text-base">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
          <NuxtLink to="/artix-demo-account/" class="h-cta btn btn-ghost h-11 flex-1 px-5 text-sm sm:h-12 sm:flex-none sm:px-6 sm:text-base">Try demo</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
