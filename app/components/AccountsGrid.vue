<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight, PhCheck, PhLockSimple, PhSealCheck } from '@phosphor-icons/vue'

const STOPS = [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000]
const HERO_SPEC = 'Spreads from'

const LIVE = ACCOUNTS.filter(a => a.id !== 'demo').map(a => {
  const dep = a.specs.find(s => s.k === 'Min. deposit')?.v ?? '$0'
  return { ...a, min: Number(dep.replace(/\D/g, '')) || 0, hero: a.specs.find(s => s.k === HERO_SPEC)?.v ?? '', rest: a.specs.filter(s => s.k !== HERO_SPEC) }
})

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const step = ref(1)
const amount = computed(() => STOPS[step.value] ?? STOPS[0]!)
const label = computed(() => `${fmt.format(amount.value)}${step.value === STOPS.length - 1 ? '+' : ''}`)
const pick = computed(() => [...LIVE].reverse().find(a => amount.value >= a.min)?.id)
const fill = computed(() => `${(step.value / (STOPS.length - 1)) * 100}%`)

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.ac-bar'), { y: 32, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: q('.ac-bar')[0], start: 'top 85%' } })
  gsap.from(q('.ac-card'), { y: 48, opacity: 0, scale: 0.97, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: q('.ac-grid')[0], start: 'top 82%' } })
})
</script>

<template>
  <section id="accounts" ref="root" class="wrap" aria-labelledby="accounts-title">
    <div class="border-t border-line py-24 md:py-32">
      <h2 id="accounts-title" v-reveal="'lines'" class="h-section max-w-3xl text-4xl md:text-6xl">Pick the account that fits how you trade.</h2>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-muted">Every account runs on nTrader with access to FX, metals, indices, commodities, equities and crypto.</p>

      <div class="ac-bar mt-14 grid gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-7 md:grid-cols-[auto_1fr] md:items-center md:gap-10">
        <div>
          <label for="ac-range" class="text-sm text-muted">Your starting deposit</label>
          <p class="mt-1 font-mono text-3xl tabular-nums tracking-tight md:text-4xl" aria-live="polite">{{ label }}</p>
        </div>
        <div>
          <input
            id="ac-range"
            v-model.number="step"
            type="range"
            min="0"
            :max="STOPS.length - 1"
            step="1"
            :aria-valuetext="label"
            class="ac-range w-full"
            :style="{ '--p': fill }"
          />
          <div class="relative mt-2 h-4 font-mono text-[11px] text-muted" aria-hidden="true">
            <button
              v-for="(s, i) in STOPS"
              :key="s"
              type="button"
              tabindex="-1"
              class="absolute top-0 whitespace-nowrap transition-colors duration-200 hover:text-fg"
              :class="[i % 2 ? 'hidden sm:block' : '', i === step ? 'text-fg' : '', i === 0 ? '' : i === STOPS.length - 1 ? '-translate-x-full' : '-translate-x-1/2']"
              :style="{ left: `${(i / (STOPS.length - 1)) * 100}%` }"
              @click="step = i"
            >{{ s >= 1000 ? `${s / 1000}k` : s }}</button>
          </div>
        </div>
      </div>

      <ul class="ac-grid mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="a in LIVE" :key="a.id" class="ac-card min-w-0">
          <NuxtLink
            :to="a.href"
            class="ac group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border bg-surface p-6"
            :data-state="a.id === pick ? 'match' : amount >= a.min ? 'open' : 'locked'"
          >
            <span class="ac-glow pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />

            <div class="flex items-start justify-between gap-3">
              <span class="ac-icon grid size-11 place-items-center rounded-xl border border-line-strong bg-canvas text-accent-soft">
                <component :is="a.icon" :size="20" weight="duotone" />
              </span>
              <span v-if="a.id === pick" class="inline-flex h-7 items-center gap-1.5 rounded-full bg-accent px-2.5 text-xs font-semibold text-on-accent">
                <PhSealCheck :size="14" weight="fill" />Best match
              </span>
              <span v-else-if="amount < a.min" class="inline-flex h-7 items-center gap-1.5 rounded-full border border-line px-2.5 text-xs text-muted">
                <PhLockSimple :size="12" weight="bold" />From {{ fmt.format(a.min) }}
              </span>
              <span v-else-if="a.featured" class="inline-flex h-7 items-center rounded-full border border-line-strong px-2.5 text-xs text-fg">Lowest cost</span>
            </div>

            <h3 class="mt-6 text-2xl font-semibold tracking-tight">{{ a.name }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">{{ a.tag }}</p>

            <div class="mt-7 border-t border-line pt-5">
              <p class="text-xs text-muted">{{ HERO_SPEC }}</p>
              <p class="mt-1 font-mono text-4xl tabular-nums tracking-tight">{{ a.hero }}</p>
            </div>

            <dl class="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
              <div v-for="s in a.rest" :key="s.k" class="min-w-0">
                <dt class="text-xs text-muted">{{ s.k }}</dt>
                <dd class="mt-0.5 font-mono text-sm tabular-nums">{{ s.v }}</dd>
              </div>
            </dl>

            <span class="ac-cta mt-auto flex items-center justify-between gap-2 pt-7 text-sm font-medium">
              View {{ a.name }}
              <span class="ac-arrow grid size-9 place-items-center rounded-full border border-line-strong" aria-hidden="true">
                <PhArrowRight :size="14" weight="bold" />
              </span>
            </span>
          </NuxtLink>
        </li>
      </ul>

      <ul class="mt-8 flex flex-wrap gap-2 text-sm text-muted">
        <li v-for="n in ACCOUNT_NOTES" :key="n" class="chip inline-flex h-9 items-center gap-2 rounded-full px-3.5"><PhCheck :size="14" weight="bold" class="text-accent-soft" />{{ n }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ac-range { appearance: none; height: 2.75rem; background: transparent; cursor: pointer; }
.ac-range::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: linear-gradient(to right, var(--color-accent) var(--p), var(--color-line-strong) var(--p)); }
.ac-range::-moz-range-track { height: 6px; border-radius: 999px; background: linear-gradient(to right, var(--color-accent) var(--p), var(--color-line-strong) var(--p)); }
.ac-range::-webkit-slider-thumb { appearance: none; margin-top: -9px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-fg); border: 4px solid var(--color-accent); transition: scale 160ms ease-out; }
.ac-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--color-fg); border: 4px solid var(--color-accent); transition: scale 160ms ease-out; }
.ac-range:active::-webkit-slider-thumb { scale: 1.15; }
.ac-range:active::-moz-range-thumb { scale: 1.15; }
.ac-range:focus-visible { outline-offset: 6px; }

.ac { border-color: var(--color-line); transition: border-color 260ms ease, opacity 260ms ease, translate 360ms var(--ease-out-expo); }
.ac-glow { opacity: 0; background: linear-gradient(180deg, color-mix(in oklab, var(--color-accent) 16%, transparent), transparent 55%); transition: opacity 360ms ease; }
.ac-icon, .ac-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), translate 320ms var(--ease-out-expo); }

.ac[data-state="match"] { border-color: color-mix(in oklab, var(--color-accent) 70%, transparent); translate: 0 -6px; }
.ac[data-state="match"] .ac-glow { opacity: 1; }
.ac[data-state="match"] .ac-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); }
.ac[data-state="locked"] { opacity: 0.55; }

.ac:focus-visible { outline: 2px solid var(--color-accent-soft); outline-offset: 3px; }

@media (hover: hover) and (pointer: fine) {
  .ac:hover { border-color: var(--color-line-strong); opacity: 1; }
  .ac[data-state="match"]:hover { border-color: var(--color-accent); }
  .ac:hover .ac-icon { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; }
  .ac:hover .ac-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); translate: 4px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ac, .ac-icon, .ac-arrow { transition-property: opacity, background-color, border-color, color; }
  .ac[data-state="match"] { translate: none; }
  .ac:hover .ac-icon { rotate: none; }
  .ac:hover .ac-arrow { translate: none; }
}
</style>
