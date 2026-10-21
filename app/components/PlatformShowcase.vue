<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowRight } from '@phosphor-icons/vue'

const WATCH = ['EUR/USD', 'GBP/USD', 'XAU/USD', 'US500', 'BTC/USD']

const root = ref<HTMLElement | null>(null)
const idx = ref(0)
const pinned = ref(false)
const { quotes, get } = useMarketFeed()
const gold = get('XAU/USD')
const btc = get('BTC/USD')
const watchlist = computed(() => WATCH.map(s => quotes.value.find(q => q.sym === s)).filter(q => !!q))
const { $lenis } = useNuxtApp()
let st: ScrollTrigger | undefined

const select = (i: number) => {
  if (!pinned.value || !st) return (idx.value = i)
  const y = st.start + ((st.end - st.start) * (i + 0.5)) / PLATFORMS.length
  $lenis ? $lenis.scrollTo(y, { duration: 1.2 }) : scrollTo({ top: y })
}

useMotion(root, ({ motion, desktop }) => {
  const q = gsap.utils.selector(root.value)
  if (!motion || !desktop) {
    pinned.value = false
    if (motion) gsap.from(q('.p-stage'), { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: q('.p-stage')[0], start: 'top 85%' } })
    return
  }
  pinned.value = true
  const n = PLATFORMS.length
  const frames = q('.p-frame')
  gsap.set(frames.slice(1), { opacity: 0, rotateY: 35, xPercent: 25, scale: 0.85, transformPerspective: 1600 })
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut', duration: 1 } })
  frames.forEach((f, i) => {
    const nx = frames[i + 1]
    if (!nx) return
    tl.to(f, { opacity: 0, rotateY: -35, xPercent: -25, scale: 0.85, transformPerspective: 1600 }, i * 1.4 + 0.4)
      .to(nx, { opacity: 1, rotateY: 0, xPercent: 0, scale: 1 }, i * 1.4 + 0.4)
  })
  tl.to({}, { duration: 0.4 })
  st = ScrollTrigger.create({
    trigger: q('.p-pin')[0],
    start: 'top top',
    end: () => `+=${innerHeight * n}`,
    pin: true,
    scrub: 1,
    animation: tl,
    anticipatePin: 1,
    onUpdate: self => {
      idx.value = Math.min(n - 1, Math.floor(self.progress * n))
      q('.p-fill').forEach((el, i) => gsap.set(el, { scaleY: gsap.utils.clamp(0, 1, self.progress * n - i) }))
    }
  })
  return () => {
    st?.kill()
    st = undefined
    pinned.value = false
  }
})
</script>

<template>
  <section id="platform" ref="root" class="relative" aria-labelledby="platform-title">
    <div class="p-pin flex min-h-dvh items-center py-24">
      <div class="wrap grid items-center gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">nTrader platform</p>
          <h2 id="platform-title" v-reveal="'lines'" class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">Built for <span class="grad-text">precision</span>, speed and simplicity.</h2>
          <p v-reveal="'fade'" class="mt-5 max-w-md text-lg text-muted">Real-time data and a clean, modern interface, on whichever screen you trade from.</p>

          <div class="mt-10 grid gap-2" role="tablist" aria-label="Platform">
            <div
              v-for="(p, i) in PLATFORMS"
              :key="p.id"
              class="relative flex gap-4 rounded-2xl p-4 transition-colors duration-300"
              :class="idx === i ? 'bg-white/6' : 'hover:bg-white/3'"
            >
              <span class="relative w-px shrink-0 self-stretch bg-white/10" aria-hidden="true">
                <span class="p-fill absolute inset-0 origin-top bg-accent" :class="pinned ? 'scale-y-0' : idx === i ? 'scale-y-100' : 'scale-y-0'" />
              </span>
              <span class="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 transition-colors duration-300" :class="idx === i ? 'border-transparent text-ink' : 'text-muted'" :style="idx === i ? { background: p.hue } : {}" aria-hidden="true">
                <component :is="p.icon" :size="20" />
              </span>
              <div class="min-w-0">
                <button
                  :id="`ptab-${p.id}`"
                  type="button"
                  role="tab"
                  :aria-selected="idx === i"
                  :aria-controls="`ppanel-${p.id}`"
                  class="block text-left font-bold after:absolute after:inset-0 after:rounded-2xl"
                  :class="idx === i ? 'text-fg' : 'text-muted'"
                  @click="select(i)"
                >
                  {{ p.label }}
                </button>
                <div class="grid transition-[grid-template-rows,opacity] duration-500" :class="idx === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
                  <div :id="`ppanel-${p.id}`" class="overflow-hidden" role="tabpanel" :aria-labelledby="`ptab-${p.id}`">
                    <p class="mt-1 text-lg font-medium text-fg">{{ p.title }}</p>
                    <p class="mt-1 text-sm text-muted">{{ p.desc }}</p>
                    <a :href="p.href" class="relative z-10 mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-accent-soft hover:underline" :tabindex="idx === i ? 0 : -1">
                      {{ p.cta }} <PhArrowRight :size="14" weight="bold" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p class="mt-8 text-sm text-muted">
            Prefer MetaTrader 5? <a :href="NAV[1]?.items[0]?.href" class="font-bold text-fg underline decoration-accent underline-offset-4">It is supported too.</a>
          </p>
        </div>

        <div class="p-stage relative aspect-4/3 lg:col-span-7 perspective-[1600px]">
          <div class="absolute inset-[8%] rounded-full bg-accent/25 blur-[90px]" aria-hidden="true" />

          <div class="p-frame absolute inset-0 flex flex-col" :class="!pinned && idx !== 0 ? 'invisible opacity-0' : ''">
            <div class="panel flex flex-1 flex-col overflow-hidden rounded-2xl">
              <div class="flex h-9 items-center justify-between border-b border-white/10 px-4 font-mono text-[11px] text-muted">
                <span>nTrader for Windows</span><span>EUR/USD  15m</span>
              </div>
              <div class="flex flex-1">
                <ul class="hidden w-40 shrink-0 border-r border-white/10 py-2 font-mono text-[11px] sm:block">
                  <li v-for="w in watchlist" :key="w.sym" class="flex justify-between px-3 py-1.5">
                    <span class="text-fg/85">{{ w.sym }}</span>
                    <span class="tabular-nums" :class="w.chg >= 0 ? 'text-up' : 'text-down'">{{ w.chg >= 0 ? '+' : '' }}{{ w.chg.toFixed(2) }}</span>
                  </li>
                </ul>
                <div class="flex-1 p-3"><CandleChart :seed="11" :base="1.0864" :dp="5" :vol="0.0009" :active="idx === 0" /></div>
              </div>
            </div>
            <div class="mx-auto h-6 w-24 bg-linear-to-b from-white/15 to-transparent [clip-path:polygon(20%_0,80%_0,100%_100%,0_100%)]" aria-hidden="true" />
          </div>

          <div class="p-frame absolute inset-[4%_2%] flex flex-col" :class="!pinned && idx !== 1 ? 'invisible opacity-0' : ''">
            <div class="panel flex flex-1 flex-col overflow-hidden rounded-2xl">
              <div class="flex h-10 items-center gap-3 border-b border-white/10 px-4">
                <span class="flex-1 truncate rounded-full bg-white/6 px-4 py-1 text-center font-mono text-[11px] text-muted">my.artixcapital.com</span>
              </div>
              <div class="flex items-baseline justify-between px-5 pt-4">
                <span class="font-bold">Gold</span>
                <span class="font-mono text-lg tabular-nums">{{ fmt(gold?.price ?? 0, 2) }}</span>
              </div>
              <div class="flex-1 p-3"><CandleChart :seed="23" :base="2341.5" :dp="2" :vol="0.0011" :active="idx === 1" /></div>
            </div>
          </div>

          <div class="p-frame absolute inset-0 grid place-items-center" :class="!pinned && idx !== 2 ? 'invisible opacity-0' : ''">
            <div class="panel flex h-full max-h-136 w-[min(16rem,60%)] flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-white/10 p-3">
              <div class="mx-auto h-5 w-20 rounded-full bg-canvas" aria-hidden="true" />
              <div class="mt-4 px-2">
                <p class="font-mono text-[11px] text-muted">BTC/USD</p>
                <p class="font-mono text-2xl tabular-nums">{{ fmt(btc?.price ?? 0, 1) }}</p>
              </div>
              <div class="mt-2 min-h-0 flex-1"><CandleChart :seed="37" :base="64210" :dp="0" :vol="0.0016" :active="idx === 2" /></div>
              <div class="mt-3 grid grid-cols-2 gap-2" aria-hidden="true">
                <span class="grid h-10 place-items-center rounded-xl bg-up/90 text-xs font-bold text-ink">BUY</span>
                <span class="grid h-10 place-items-center rounded-xl bg-down/90 text-xs font-bold text-ink">SELL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
