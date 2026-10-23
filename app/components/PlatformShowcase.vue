<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight } from '@phosphor-icons/vue'

const CHARTS = [
  { sym: 'EUR/USD', seed: 11, base: 1.1212, dp: 5, vol: 0.0009 },
  { sym: 'XAU/USD', seed: 23, base: 4013.8, dp: 2, vol: 0.0011 },
  { sym: 'BTC/USD', seed: 37, base: 64210, dp: 0, vol: 0.0016 }
]

const root = ref<HTMLElement | null>(null)
const idx = ref(0)

const onKey = (e: KeyboardEvent) => {
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const last = PLATFORMS.length - 1
  idx.value = ['ArrowDown', 'ArrowRight'].includes(e.key) ? Math.min(last, idx.value + 1)
    : ['ArrowUp', 'ArrowLeft'].includes(e.key) ? Math.max(0, idx.value - 1)
    : e.key === 'Home' ? 0 : last
  nextTick(() => root.value?.querySelector<HTMLButtonElement>(`#ptab-${PLATFORMS[idx.value]?.id}`)?.focus())
}

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.p-stage'), { y: 40, opacity: 0, duration: 1.1, scrollTrigger: { trigger: root.value, start: 'top 75%' } })
  const stop = watch(idx, i => {
    const el = q(`.p-frame[data-idx="${i}"]`)[0]
    if (el) gsap.fromTo(el, { opacity: 0, y: 12, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: 'auto' })
  })
  return () => stop()
})
</script>

<template>
  <section id="platform" ref="root" class="wrap" aria-labelledby="platform-title">
    <div class="grid items-center gap-14 border-t border-line py-24 md:py-32 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <h2 id="platform-title" v-reveal="'lines'" class="h-section text-4xl md:text-5xl">Built for precision, speed and simplicity.</h2>
        <p class="mt-5 max-w-md text-lg leading-relaxed text-muted">One terminal across desktop, browser and mobile. Pick a screen to see it.</p>

        <div class="mt-10 grid gap-1 border-l border-line" role="tablist" aria-label="Platform" aria-orientation="vertical" @keydown="onKey">
          <button
            v-for="(p, i) in PLATFORMS"
            :id="`ptab-${p.id}`"
            :key="p.id"
            type="button"
            role="tab"
            class="relative -ml-px flex items-center gap-4 border-l py-4 pl-6 pr-4 text-left transition-colors duration-200"
            :class="idx === i ? 'border-accent-soft' : 'border-transparent hover:border-line-strong'"
            :aria-selected="idx === i"
            :aria-controls="`ppanel-${p.id}`"
            :tabindex="idx === i ? 0 : -1"
            @click="idx = i"
          >
            <component :is="p.icon" :size="22" :class="idx === i ? 'text-accent-soft' : 'text-muted'" aria-hidden="true" />
            <span class="min-w-0">
              <span class="block font-semibold" :class="idx === i ? 'text-fg' : 'text-muted'">{{ p.label }}</span>
              <span class="mt-0.5 block text-sm text-muted">{{ p.title }}</span>
            </span>
          </button>
        </div>

        <div :id="`ppanel-${PLATFORMS[idx]?.id}`" class="mt-8" role="tabpanel" :aria-labelledby="`ptab-${PLATFORMS[idx]?.id}`">
          <p class="max-w-md leading-relaxed text-muted">{{ PLATFORMS[idx]?.desc }}</p>
          <a :href="PLATFORMS[idx]?.href" class="btn btn-ghost mt-6 h-12 px-6 text-sm">
            {{ PLATFORMS[idx]?.cta }} <PhArrowRight :size="14" weight="bold" />
          </a>
        </div>

        <p class="mt-10 text-sm text-muted">
          Prefer MetaTrader 5? <NuxtLink to="/meta-trader-5/" class="font-medium text-fg underline decoration-accent-soft underline-offset-4">It is supported too.</NuxtLink>
        </p>
      </div>

      <div class="p-stage relative grid min-h-96 lg:col-span-7 lg:min-h-128">
        <div
          v-for="(c, i) in CHARTS"
          :key="c.sym"
          class="p-frame col-start-1 row-start-1 flex items-center justify-center"
          :data-idx="i"
          :class="idx !== i ? 'pointer-events-none invisible opacity-0' : ''"
          :aria-hidden="idx !== i"
        >
          <ChartPanel v-bind="c" :tall="i === 2" :active="idx === i" :class="i === 2 ? 'w-full max-w-72' : 'w-full'" />
        </div>
      </div>
    </div>
  </section>
</template>
