<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUpRight } from '@phosphor-icons/vue'

const SPAN: Record<string, string> = {
  forex: 'md:col-span-2 lg:col-span-7 lg:row-span-2',
  commodities: 'lg:col-span-5',
  stocks: 'lg:col-span-5',
  indices: 'lg:col-span-6',
  crypto: 'lg:col-span-6'
}
const FILL: Record<string, string> = {
  forex: 'bg-surface bg-[radial-gradient(80%_70%_at_100%_0%,rgb(214_20_28/0.18),transparent_70%)]',
  stocks: 'bg-elevated',
  crypto: 'bg-surface bg-[linear-gradient(135deg,rgb(255_255_255/0.05),transparent_60%)]'
}

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  gsap.from(gsap.utils.selector(root.value)('.m-cell'), { y: 40, opacity: 0, stagger: 0.07, duration: 1, scrollTrigger: { trigger: root.value, start: 'top 80%' } })
})
</script>

<template>
  <section id="markets" ref="root" class="wrap" aria-labelledby="markets-title">
    <div class="border-t border-line py-24 md:py-32">
      <h2 id="markets-title" v-reveal="'lines'" class="h-section max-w-2xl text-4xl md:text-6xl">One account. Five markets.</h2>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-muted">Over 150 instruments across currencies, commodities, shares, indices and crypto.</p>

      <ul class="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
        <li v-for="m in MARKETS" :key="m.id" class="m-cell min-w-0" :class="SPAN[m.id]">
          <article
            class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line p-6 transition-[border-color,translate] duration-300 hover:border-line-strong md:p-8"
            :class="[FILL[m.id] ?? 'bg-surface', m.id === 'forex' ? 'min-h-96 lg:min-h-full' : 'min-h-64']"
          >
            <div class="flex items-start justify-between gap-4">
              <span class="grid size-11 place-items-center rounded-full border border-line text-accent-soft">
                <component :is="m.icon" :size="20" />
              </span>
              <PhArrowUpRight :size="20" class="text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" aria-hidden="true" />
            </div>
            <h3 class="mt-6 font-semibold tracking-tight" :class="m.id === 'forex' ? 'text-4xl md:text-5xl' : 'text-2xl'">
              <NuxtLink :to="m.href" class="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-accent-soft">{{ m.name }}</NuxtLink>
            </h3>
            <p class="mt-2 max-w-sm leading-relaxed text-muted">{{ m.desc }}</p>

            <div class="mt-auto pt-8">
              <div v-if="m.id === 'forex'" class="relative z-1 mb-6">
                <Mql5Widget type="chart" :symbols="['EURUSD']" :height="240" />
              </div>
              <ul class="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted" aria-label="Popular symbols">
                <li v-for="p in m.popular" :key="p">{{ p }}</li>
              </ul>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>
