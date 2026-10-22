<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'

const WATCH = ['EUR/USD', 'GBP/USD', 'XAU/USD', 'US500', 'BTC/USD']

const root = ref<HTMLElement | null>(null)
const stage = ref<HTMLElement | null>(null)
const idx = ref(0)
let stopped = false

const { quotes, get } = useMarketFeed()
const gold = get('XAU/USD')
const btc = get('BTC/USD')
const watchlist = computed(() => WATCH.map(s => quotes.value.find(q => q.sym === s)).filter(q => !!q))

const select = (i: number) => {
  if (i !== idx.value) idx.value = i
}

const onKey = (e: KeyboardEvent) => {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const { length } = PLATFORMS
  idx.value = e.key === 'ArrowDown' ? Math.min(length - 1, idx.value + 1)
    : e.key === 'ArrowUp' ? Math.max(0, idx.value - 1)
    : e.key === 'Home' ? 0 : length - 1
  nextTick(() => (root.value?.querySelector(`#ptab-${PLATFORMS[idx.value]?.id}`) as HTMLButtonElement | null)?.focus())
}

useMotion(root, ({ motion }) => {
  const q = gsap.utils.selector(root.value)
  if (!motion) {
    stopped = true
    return
  }
  const ease = 'power3.out'
  const swap = (i: number, first = false) => {
    const frame = q(`.p-frame[data-idx="${i}"]`)[0]
    if (!frame) return
    gsap.fromTo(frame,
      first ? { opacity: 0 } : { opacity: 0, rotateY: 14, xPercent: 5, scale: 0.96, transformPerspective: 1400 },
      { opacity: 1, rotateY: 0, xPercent: 0, scale: 1, duration: first ? 0.9 : 0.7, ease, overwrite: 'auto' })
  }

  gsap.from(q('.p-copy'), { y: 46, opacity: 0, stagger: 0.08, duration: 1.1, scrollTrigger: { trigger: root.value, start: 'top 82%' } })
  gsap.from(q('.p-stage'), { y: 60, opacity: 0, duration: 1.2, scrollTrigger: { trigger: root.value, start: 'top 82%' } })
  swap(0, true)

  const stopWatch = watch(idx, i => { if (!stopped) swap(i) })
  return () => { stopped = true; stopWatch() }
})
</script>

<template>
  <section id="platform" ref="root" class="relative py-24 md:py-32" aria-labelledby="platform-title">
    <div class="wrap grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
      <div class="p-copy lg:col-span-5">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Vaultex platform</p>
        <h2 id="platform-title" v-reveal="'lines'" class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-5xl">Built for <span class="grad-text pb-1">precision</span>, speed and simplicity.</h2>
        <p v-reveal="'fade'" class="mt-5 max-w-md text-lg text-muted">One terminal across desktop, browser and mobile. Pick a screen to see it.</p>

        <div class="mt-10 grid gap-2" role="tablist" aria-label="Platform" aria-orientation="vertical" @keydown="onKey">
          <button
            v-for="(p, i) in PLATFORMS"
            :id="`ptab-${p.id}`"
            :key="p.id"
            type="button"
            role="tab"
            class="group relative flex items-center gap-4 rounded-2xl border border-transparent p-4 text-left transition-[background-color,border-color] duration-300"
            :class="idx === i ? 'border-white/10 bg-white/6' : 'hover:bg-white/3'"
            :aria-selected="idx === i"
            :aria-controls="`ppanel-${p.id}`"
            :tabindex="idx === i ? 0 : -1"
            @click="select(i)"
          >
            <span class="relative w-px shrink-0 self-stretch bg-white/10" aria-hidden="true">
              <span class="absolute inset-0 origin-top bg-accent transition-transform duration-500" :class="idx === i ? 'scale-y-100' : 'scale-y-0'" />
            </span>
            <span
              class="grid size-10 shrink-0 place-items-center rounded-xl border transition-colors duration-300"
              :class="idx === i ? 'border-transparent text-ink' : 'border-white/8 text-muted group-hover:text-steel-soft'"
              :style="idx === i ? { background: p.hue } : {}"
              aria-hidden="true"
            >
              <component :is="p.icon" :size="20" />
            </span>
            <span class="min-w-0">
              <span class="block font-bold transition-colors duration-300" :class="idx === i ? 'text-fg' : 'text-muted group-hover:text-fg'">{{ p.label }}</span>
              <span class="mt-0.5 block truncate text-sm text-muted">{{ p.title }}</span>
            </span>
            <PhArrowRight :size="16" weight="bold" class="ml-auto -translate-x-1 text-accent-soft opacity-0 transition-[transform,opacity] duration-300" :class="idx === i ? 'translate-x-0 opacity-100' : ''" />
          </button>
        </div>

        <div class="mt-6" role="tabpanel" :id="`ppanel-${PLATFORMS[idx]?.id}`" :aria-labelledby="`ptab-${PLATFORMS[idx]?.id}`">
          <p class="max-w-md text-sm text-muted">{{ PLATFORMS[idx]?.desc }}</p>
          <a :href="PLATFORMS[idx]?.href" class="mt-4 inline-flex h-11 items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 text-sm font-bold text-accent-soft transition-colors duration-300 hover:bg-accent hover:text-ink">
            {{ PLATFORMS[idx]?.cta }} <PhArrowRight :size="14" weight="bold" />
          </a>
        </div>

        <p class="mt-8 text-sm text-muted">
          Prefer MetaTrader 5? <a :href="NAV[1]?.items[0]?.href" class="font-bold text-fg underline decoration-accent underline-offset-4">It is supported too.</a>
        </p>
      </div>

      <div ref="stage" class="p-stage relative aspect-4/3 lg:col-span-7 perspective-[1600px]">
        <div class="absolute inset-[10%] rounded-full bg-accent/10 blur-[110px]" aria-hidden="true" />

        <div class="p-frame absolute inset-0 flex flex-col" data-idx="0" :class="idx !== 0 ? 'pointer-events-none invisible opacity-0' : ''">
          <div class="panel flex flex-1 flex-col overflow-hidden rounded-2xl">
            <div class="flex h-9 items-center justify-between border-b border-white/8 px-4 font-mono text-[11px] text-muted">
              <span>Vaultex for Windows</span><span>EUR/USD  15m</span>
            </div>
            <div class="flex flex-1">
              <ul class="hidden w-40 shrink-0 border-r border-white/8 py-2 font-mono text-[11px] sm:block">
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

        <div class="p-frame absolute inset-[4%_2%] flex flex-col" data-idx="1" :class="idx !== 1 ? 'pointer-events-none invisible opacity-0' : ''">
          <div class="panel flex flex-1 flex-col overflow-hidden rounded-2xl">
            <div class="flex h-10 items-center gap-3 border-b border-white/8 px-4">
              <span class="flex-1 truncate rounded-full bg-white/6 px-4 py-1 text-center font-mono text-[11px] text-muted">my.artixcapital.com</span>
            </div>
            <div class="flex items-baseline justify-between px-5 pt-4">
              <span class="font-bold">Gold</span>
              <span class="font-mono text-lg tabular-nums">{{ fmt(gold?.price ?? 0, 2) }}</span>
            </div>
            <div class="flex-1 p-3"><CandleChart :seed="23" :base="2341.5" :dp="2" :vol="0.0011" :active="idx === 1" /></div>
          </div>
        </div>

        <div class="p-frame absolute inset-0 grid place-items-center" data-idx="2" :class="idx !== 2 ? 'pointer-events-none invisible opacity-0' : ''">
          <div class="panel flex h-full max-h-136 w-[min(16rem,60%)] flex-col overflow-hidden rounded-[2.5rem] border-[6px] border-white/8 p-3">
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
  </section>
</template>
