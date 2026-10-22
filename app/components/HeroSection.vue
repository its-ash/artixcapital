<script setup lang="ts">
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { PhArrowRight, PhPlay } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const title = SplitText.create(q('.h-l1'), { type: 'lines,words,chars', mask: 'lines' })
  const sub = SplitText.create(q('.h-sub'), { type: 'lines', mask: 'lines' })

  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
    .from(q('.h-eyebrow'), { y: 20, opacity: 0, scale: 0.94, duration: 0.9 })
    .from(title.chars, { yPercent: 120, rotateX: -90, opacity: 0, transformOrigin: '50% 100% -30px', stagger: 0.025, duration: 1.2 }, 0.1)
    .fromTo(q('.h-l2'), { clipPath: 'inset(-10% 100% -30% 0%)', filter: 'blur(12px)', x: -30 }, { clipPath: 'inset(-10% 0% -30% 0%)', filter: 'blur(0px)', x: 0, duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath,filter' }, 0.35)
    .from(sub.lines, { yPercent: 110, stagger: 0.08, duration: 1 }, 0.7)
    .fromTo(q('.h-cta'), { y: 30, opacity: 0, scale: 0.95 }, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 1 }, 0.85)
    .fromTo(q('.h-globe'), { opacity: 0, scale: 0.85, rotate: -8 }, { opacity: 1, scale: 1, rotate: 0, duration: 2, ease: 'expo.out' }, 0.2)
  tl.play()

  gsap.timeline({ scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
    .to(q('.h-copy'), { y: -140, opacity: 0.1, ease: 'none' }, 0)
    .to(q('.h-globe'), { y: 60, opacity: 0.35, ease: 'none' }, 0)

  return () => {
    title.revert()
    sub.revert()
  }
})
</script>

<template>
  <section id="top" ref="root" class="relative flex min-h-dvh items-center overflow-hidden pb-16 pt-28 lg:pt-24">
    <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
      <div class="h-globe absolute left-[60%] top-1/2 aspect-square h-[125%] max-w-none -translate-x-1/2 -translate-y-1/2">
        <GlobeGrid />
      </div>
    </div>
    <div class="wrap relative z-2 grid items-center gap-6 lg:grid-cols-12 lg:gap-6">
      <div class="h-copy relative z-10 lg:col-span-7">
        <p class="h-eyebrow glass inline-flex h-9 items-center gap-2.5 rounded-full px-4 font-mono text-xs uppercase tracking-[0.18em] text-fg/85">
          <span class="pulse-dot size-2 rounded-full bg-accent" aria-hidden="true" />Forex and CFD brokerage
        </p>
        <h1 class="mt-7 text-5xl font-bold tracking-[-0.035em] sm:text-6xl xl:text-7xl">
          <span class="h-l1 block leading-[1.05]">Capital, treated</span>
          <span class="h-l2 grad-text block pb-2 leading-[1.1]">with conviction.</span>
        </h1>
        <p class="h-sub mt-6 max-w-xl text-lg leading-8 text-muted">
          Institutional pricing and a professional terminal for your portfolio across forex, stocks, indices, commodities and crypto.
        </p>
        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a v-magnetic :href="SIGNUP" class="h-cta btn btn-primary h-14 px-8 text-base">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="20" weight="bold" /><PhArrowRight :size="20" weight="bold" /></span>
          </a>
          <a v-magnetic :href="NAV[2]?.items[4]?.href" class="h-cta btn btn-ghost h-14 px-8 text-base font-medium">
            <PhPlay :size="18" weight="fill" class="text-accent" />Try demo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
