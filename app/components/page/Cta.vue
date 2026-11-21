<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'

const RINGS = 3

withDefaults(defineProps<{ title?: string; demo?: boolean }>(), { title: 'Practise on demo. Go live when you are ready.', demo: true })

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.fromTo(q('.cb-glow'), { scale: 0.6 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'center center', scrub: true } })
})
</script>

<template>
  <section ref="root" class="wrap pb-14 pt-4" aria-labelledby="cta-band">
    <div class="cb-box surface-lux relative isolate overflow-hidden rounded-2xl px-6 py-10 md:px-10 md:py-12">
      <div class="pointer-events-none absolute inset-0 -z-1" aria-hidden="true">
        <span class="cb-glow absolute -right-40 -bottom-56 size-176 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_26%,transparent),transparent_62%)]" />
        <span
          v-for="r in RINGS"
          :key="r"
          class="absolute -right-24 -bottom-40 size-112 rounded-full border border-accent/20 motion-safe:animate-[ripple_6s_var(--ease-out-strong)_infinite]"
          :style="{ animationDelay: `${(r - 1) * 2}s` }"
        />
      </div>
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="cta-band" class="h-section max-w-2xl text-balance text-3xl sm:text-4xl md:text-5xl">{{ title }}</h2>
        <div class="flex flex-wrap gap-3">
          <a v-magnetic="0.25" :href="SIGNUP" class="btn btn-primary h-12 px-7">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
          <NuxtLink v-if="demo" to="/artix-demo-account/" class="btn btn-ghost h-12 px-7">Try demo</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
