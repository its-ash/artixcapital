<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'

const RINGS = 4

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.fromTo(q('.cta-glow'), { scale: 0.5 }, { scale: 1.2, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'center center', scrub: true } })
})
</script>

<template>
  <section ref="root" class="relative grid min-h-[90dvh] place-items-center overflow-hidden py-28" aria-labelledby="cta-title">
    <div class="pointer-events-none absolute inset-0 grid place-items-center" aria-hidden="true">
      <span class="cta-glow absolute size-240 rounded-full bg-[radial-gradient(circle,rgb(201_167_93/0.3),rgb(142_160_191/0.07)_40%,transparent_65%)]" />
      <span
        v-for="r in RINGS"
        :key="r"
        class="absolute size-112 rounded-full border border-accent/25 motion-safe:animate-[ripple_6s_var(--ease-out-strong)_infinite]"
        :style="{ animationDelay: `${(r - 1) * 1.5}s` }"
      />
    </div>
    <div class="wrap relative text-center">
      <h2 id="cta-title" class="cta-title mx-auto max-w-5xl text-5xl font-bold leading-[1.05] tracking-[-0.04em] md:text-7xl lg:text-8xl">
        Trade capital markets <span class="cta-title-grad grad-text-cta">with conviction.</span>
      </h2>
      <div class="cta-btn mt-12 flex justify-center">
        <a v-magnetic="0.45" :href="SIGNUP" class="btn btn-primary h-16 px-10 text-lg">
          Open account
          <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="20" weight="bold" /><PhArrowRight :size="20" weight="bold" /></span>
        </a>
      </div>
    </div>
  </section>
</template>
