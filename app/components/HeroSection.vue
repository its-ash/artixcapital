<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const quiet = SplitText.create(q('.h-quiet'), { type: 'chars', aria: 'none' })
  const loud = SplitText.create(q('.h-loud'), { type: 'lines,chars', mask: 'lines', aria: 'none' })
  const scrub = { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true }
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(q('.h-label'), { y: 12, opacity: 0, duration: 0.7 })
    .from(quiet.chars, { opacity: 0, y: '0.12em', filter: 'blur(12px)', stagger: 0.03, duration: 1.4, ease: 'power2.out', clearProps: 'filter' }, 0.05)
    .from(loud.chars, { yPercent: 120, rotate: 10, transformOrigin: '0% 100%', stagger: 0.022, duration: 0.95 }, 0.6)
    .from(q('.h-bar'), { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, 0.95)
    .from(q('.h-sub'), { y: 16, opacity: 0, duration: 0.9 }, 1)
    .from(q('.h-cta'), { y: 16, opacity: 0, stagger: 0.06, duration: 0.8 }, 1.1)
    .fromTo(q('.h-globe'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.8 }, 0.1)
  gsap.fromTo(q('.h-globe-inner'), { yPercent: 0, opacity: 1 }, { yPercent: 8, opacity: 0.4, ease: 'none', immediateRender: false, scrollTrigger: scrub })
  gsap.to(q('.h-quiet'), { xPercent: -6, opacity: 0.25, ease: 'none', scrollTrigger: scrub })
  gsap.to(q('.h-loud-wrap'), { xPercent: 4, ease: 'none', scrollTrigger: scrub })
  return () => { quiet.revert(); loud.revert() }
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
          <span class="h-quiet block text-muted" aria-hidden="true">Quiet money.</span>
          <span class="h-loud-wrap relative mt-[0.04em] block w-fit pb-[0.14em]" aria-hidden="true">
            <span class="h-loud block">Loud success<span class="text-accent-soft">.</span></span>
            <span class="h-bar absolute inset-x-0 bottom-0 block h-[0.06em] origin-left rounded-full bg-accent" />
          </span>
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
