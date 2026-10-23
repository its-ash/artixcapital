<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'

const LIVE = ACCOUNTS.filter(a => a.id !== 'demo')
const DEMO = ACCOUNTS.find(a => a.id === 'demo')

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.a-col'), { y: 40, opacity: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: q('.a-grid')[0], start: 'top 80%' } })
})
</script>

<template>
  <section id="accounts" ref="root" class="wrap" aria-labelledby="accounts-title">
    <div class="border-t border-line py-24 md:py-32">
      <h2 id="accounts-title" v-reveal="'lines'" class="h-section max-w-3xl text-4xl md:text-6xl">Pick the account that fits how you trade.</h2>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-muted">Every account runs on Vaultex with access to FX, metals, indices, commodities, equities and crypto.</p>

      <ul class="a-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="a in LIVE" :key="a.id" class="a-col min-w-0">
          <NuxtLink
            :to="a.href"
            class="group relative flex h-full flex-col rounded-2xl border p-6 transition-colors duration-300"
            :class="a.featured ? 'border-accent/60 bg-[linear-gradient(180deg,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_45%)] bg-surface' : 'border-line bg-surface hover:border-line-strong'"
          >
            <div class="flex items-center justify-between gap-3">
              <h3 class="text-xl font-semibold tracking-tight">{{ a.name }}</h3>
              <span v-if="a.featured" class="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-on-accent">Lowest cost</span>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-muted">{{ a.tag }}</p>
            <dl class="mt-8 grid gap-5">
              <div v-for="s in a.specs" :key="s.k">
                <dt class="text-xs text-muted">{{ s.k }}</dt>
                <dd class="mt-1 font-mono text-lg tabular-nums">{{ s.v }}</dd>
              </div>
            </dl>
            <span class="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium">
              View {{ a.name }}
              <PhArrowRight :size="14" weight="bold" class="transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </NuxtLink>
        </li>
      </ul>

      <div v-if="DEMO" class="mt-4 flex flex-col gap-6 rounded-2xl border border-line px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="text-xl font-semibold tracking-tight">{{ DEMO.name }}</h3>
          <p class="mt-1 text-sm text-muted">{{ DEMO.tag }}</p>
        </div>
        <NuxtLink :to="DEMO.href" class="btn btn-ghost h-12 shrink-0 px-6 text-sm">Try demo</NuxtLink>
      </div>

      <ul class="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
        <li v-for="n in ACCOUNT_NOTES" :key="n" class="inline-flex items-center gap-2"><PhCheck :size="14" weight="bold" class="text-accent-soft" />{{ n }}</li>
      </ul>
    </div>
  </section>
</template>
