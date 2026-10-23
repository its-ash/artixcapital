<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const title = SplitText.create(q('.h-title'), { type: 'lines', mask: 'lines' })
  gsap.timeline({ defaults: { ease: 'expo.out' } })
    .from(q('.h-label'), { y: 12, opacity: 0, duration: 0.7 })
    .from(title.lines, { yPercent: 110, stagger: 0.08, duration: 1.1 }, 0.05)
    .from(q('.h-sub'), { y: 16, opacity: 0, duration: 0.9 }, 0.35)
    .from(q('.h-cta'), { y: 16, opacity: 0, stagger: 0.06, duration: 0.8 }, 0.45)
    .fromTo(q('.h-globe'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.8 }, 0.1)
  gsap.fromTo(q('.h-globe-inner'), { yPercent: 0, opacity: 1 }, { yPercent: 8, opacity: 0.4, ease: 'none', immediateRender: false, scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
  return () => title.revert()
})
</script>

<template>
  <section id="top" ref="root" class="relative overflow-hidden" aria-labelledby="hero-title">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_55%_at_85%_10%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_70%),radial-gradient(35%_40%_at_0%_100%,rgb(255_255_255/0.03),transparent_70%)]" aria-hidden="true" />
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="h-globe absolute -bottom-[64vw] -right-[42vw] size-[130vw] opacity-60 md:-right-[39.5vw] md:bottom-auto md:top-[62%] md:size-[119vw] md:-translate-y-1/2 md:opacity-100">
        <div class="h-globe-inner size-full">
          <GlobeGrid locate class="pointer-events-auto" />
        </div>
      </div>
      <div class="absolute inset-y-0 left-0 hidden w-1/2 bg-linear-to-r from-canvas via-canvas/80 to-transparent md:block" />
    </div>
    <div class="pointer-events-none relative z-1 wrap grid min-h-[calc(100dvh-4rem)] items-start pb-14 pt-16 *:pointer-events-auto md:items-center md:py-14 lg:grid-cols-12 lg:py-20">
      <div class="lg:col-span-7">
        <p class="h-label text-sm font-medium text-accent-soft">Forex and CFD brokerage</p>
        <h1 id="hero-title" class="h-title h-display mt-5 max-w-[14ch] text-5xl sm:text-6xl xl:text-7xl">Quiet money. Loud success.</h1>
        <p class="h-sub mt-7 max-w-lg text-lg leading-relaxed text-muted">
          Institutional pricing and a professional terminal across forex, stocks, indices, commodities and crypto.
        </p>
        <div class="mt-10 flex flex-wrap gap-3">
          <a v-magnetic="0.2" :href="SIGNUP" class="h-cta btn btn-primary h-14 px-8 text-base">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
          <NuxtLink to="/artix-demo-account/" class="h-cta btn btn-ghost h-14 px-8 text-base">Try demo</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
