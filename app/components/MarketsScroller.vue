<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUpRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const { quotes } = useMarketFeed()
const quote = (sym: string) => quotes.value.find(q => q.sym === sym)

useMotion(root, ({ motion, desktop }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  if (!desktop || !track.value) {
    gsap.from(q('.m-card'), { y: 60, opacity: 0, stagger: 0.1, duration: 1.1, scrollTrigger: { trigger: track.value, start: 'top 85%' } })
    return
  }
  const t = track.value
  const dist = () => t.scrollWidth - innerWidth
  const scroller = gsap.to(t, {
    x: () => -dist(),
    ease: 'none',
    scrollTrigger: { trigger: q('.m-pin')[0], start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
  })
  gsap.to(q('.m-giant'), { xPercent: -30, ease: 'none', scrollTrigger: { trigger: q('.m-pin')[0], start: 'top bottom', end: () => `+=${dist() + innerHeight * 2}`, scrub: 1 } })
  gsap.to(q('.m-progress'), { scaleX: 1, ease: 'none', scrollTrigger: { trigger: q('.m-pin')[0], start: 'top top', end: () => `+=${dist()}`, scrub: 1 } })
  q('.m-card').forEach(card => {
    gsap.fromTo(card, { rotateY: -28, scale: 0.86, opacity: 0.35, transformPerspective: 1200 }, {
      rotateY: 0, scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: card, containerAnimation: scroller, start: 'left 100%', end: 'left 55%', scrub: true }
    })
  })
})
</script>

<template>
  <section id="markets" ref="root" class="relative" aria-labelledby="markets-title">
    <div class="m-pin relative flex min-h-dvh flex-col justify-center gap-12 overflow-hidden py-24">
      <p class="m-giant outline-text pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap text-[18vw] font-bold leading-none tracking-tighter" aria-hidden="true">
        FOREX COMMODITIES STOCKS INDICES CRYPTO
      </p>
      <div class="wrap relative">
        <h2 id="markets-title" v-reveal="'lines'" class="text-4xl font-bold tracking-[-0.03em] md:text-6xl">One account. <span class="grad-text">Five markets.</span></h2>
        <p v-reveal="'fade'" class="mt-5 max-w-xl text-lg text-muted">Over 150 instruments across currencies, commodities, shares, indices and crypto, all inside nTrader.</p>
      </div>

      <div class="relative overflow-x-auto pb-4 lg:overflow-visible lg:pb-0 scrollbar-none">
        <ul ref="track" class="flex w-max snap-x snap-mandatory gap-5 px-4 sm:px-6 lg:snap-none lg:pl-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:pr-[12vw]">
          <li v-for="m in MARKETS" :id="`market-${m.id}`" :key="m.id" class="m-card w-[min(25rem,82vw)] shrink-0 snap-start">
            <article
              v-tilt="6"
              class="spot panel group relative flex h-full min-h-108 flex-col overflow-hidden rounded-3xl p-7"
              :style="{ '--hue': m.hue, backgroundImage: `radial-gradient(70% 60% at ${m.tint}, color-mix(in oklab, ${m.hue} 26%, transparent), transparent 70%), linear-gradient(180deg, rgb(28 30 44 / .72), rgb(18 19 28 / .72))` }"
            >
              <div class="flex items-center justify-between">
                <span class="chip grid size-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110">
                  <component :is="m.icon" :size="24" />
                </span>
                <span class="font-mono text-xs text-muted">{{ m.sym }}</span>
              </div>
              <h3 class="mt-6 text-3xl font-bold tracking-tight">{{ m.name }}</h3>
              <p class="mt-2 text-muted">{{ m.desc }}</p>

              <div class="mt-auto pt-6">
                <div class="flex items-end justify-between font-mono tabular-nums">
                  <span class="text-2xl">{{ fmt(quote(m.sym)?.price ?? 0, quote(m.sym)?.dp ?? 2) }}</span>
                  <span class="text-sm" :class="(quote(m.sym)?.chg ?? 0) >= 0 ? 'text-up' : 'text-down'">
                    {{ (quote(m.sym)?.chg ?? 0) >= 0 ? '+' : '' }}{{ (quote(m.sym)?.chg ?? 0).toFixed(2) }}%
                  </span>
                </div>
                <div class="mt-3 h-16">
                  <SparkLine :hist="quote(m.sym)?.hist ?? []" :up="(quote(m.sym)?.chg ?? 0) >= 0" />
                </div>
                <div class="mt-5 flex items-center justify-between gap-3">
                  <ul class="flex flex-wrap gap-1.5">
                    <li v-for="p in m.popular" :key="p" class="chip rounded-full px-2.5 py-1 font-mono text-[11px]">{{ p }}</li>
                  </ul>
                  <a :href="m.href" class="relative z-2 grid size-11 shrink-0 place-items-center rounded-full bg-(--hue) text-ink transition-transform duration-300 hover:rotate-45" :aria-label="`Explore ${m.name} trading`">
                    <PhArrowUpRight :size="18" weight="bold" />
                  </a>
                </div>
              </div>
            </article>
          </li>
        </ul>
      </div>

      <div class="wrap hidden lg:block" aria-hidden="true">
        <div class="h-px w-full bg-white/10"><div class="m-progress h-full origin-left scale-x-0 bg-accent" /></div>
      </div>
    </div>
  </section>
</template>
