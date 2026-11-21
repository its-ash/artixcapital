<script setup lang="ts">
import { PhArrowRight, PhCheck, PhLockSimple, PhSealCheck } from '@phosphor-icons/vue'

const STOPS = [500, 1000, 2500, 5000, 10000, 25000, 50000, 100000]
const HERO_SPEC = 'Spreads from'
const STACK_QUERY = '(max-width: 1023.98px)'

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
const stacked = ref(false)
const list = computed(() => stacked.value ? [...LIVE].sort((a, b) => Number(b.id === pick.value) - Number(a.id === pick.value)) : LIVE)

onMounted(() => {
  const mq = matchMedia(STACK_QUERY)
  const sync = () => { stacked.value = mq.matches }
  sync()
  mq.addEventListener('change', sync)
  onBeforeUnmount(() => mq.removeEventListener('change', sync))
})
</script>

<template>
  <section id="accounts" class="cv-auto wrap" style="--cv-h: 740px" aria-labelledby="accounts-title">
    <div class="section-rule py-12 md:py-16">
      <p class="eyebrow">Account Tiers</p>
      <h2 id="accounts-title" class="h-section mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl">Pick the account that fits how you trade.</h2>
      <p class="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">Every account runs on MetaTrader 5 and nTrader with access to FX, metals, indices, commodities, equities and crypto.</p>

      <div class="ac-bar surface-lux mt-7 grid gap-4 rounded-2xl p-4 sm:p-5 md:grid-cols-[auto_1fr] md:items-center md:gap-8">
        <div>
          <label for="ac-range" class="text-xs font-medium uppercase tracking-wider text-muted">Starting deposit</label>
          <p class="mt-1 font-mono text-3xl font-semibold tabular-nums tracking-tight text-fg md:text-4xl" aria-live="polite">{{ label }}</p>
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

      <TransitionGroup tag="ul" move-class="ac-move" class="ac-grid mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-4 lg:grid-cols-4">
        <li v-for="a in list" :key="a.id" class="ac-card min-w-0">
          <NuxtLink
            :to="a.href"
            class="ac surface-lux group relative isolate flex h-full flex-col overflow-hidden rounded-2xl p-4 sm:p-5"
            :data-state="a.id === pick ? 'match' : amount >= a.min ? 'open' : 'locked'"
          >
            <span class="ac-glow pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />

            <div class="flex min-h-7 items-start justify-between gap-2 sm:gap-3">
              <span class="ac-icon hidden size-10 place-items-center rounded-xl border border-line-strong bg-linear-to-b from-elevated to-canvas text-accent-soft shadow-[inset_0_1px_0_oklch(1_0_0/0.09)] sm:grid">
                <component :is="a.icon" :size="18" weight="duotone" />
              </span>
              <span v-if="a.id === pick" class="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-accent px-2.5 text-[11px] font-semibold text-on-accent sm:text-xs">
                <PhSealCheck :size="14" weight="fill" />Best match
              </span>
              <span v-else-if="amount < a.min" class="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 text-[11px] text-muted sm:text-xs">
                <PhLockSimple :size="12" weight="bold" />From {{ fmt.format(a.min) }}
              </span>
              <span v-else-if="a.featured" class="inline-flex h-7 items-center whitespace-nowrap rounded-full border border-line-strong px-2.5 text-[11px] text-fg sm:text-xs">Lowest cost</span>
            </div>

            <h3 class="mt-3 text-xl font-semibold tracking-tight sm:mt-4 sm:text-2xl">{{ a.name }}</h3>
            <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-muted sm:mt-1.5 sm:line-clamp-none sm:text-sm">{{ a.tag }}</p>

            <div class="mt-3 border-t border-line pt-3 sm:mt-4 sm:pt-4">
              <p class="text-xs text-muted">{{ HERO_SPEC }}</p>
              <p class="mt-0.5 font-mono text-2xl tabular-nums tracking-tight sm:text-3xl">{{ a.hero }}</p>
            </div>

            <dl class="mt-3 grid gap-2.5 sm:mt-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
              <div v-for="(s, i) in a.rest" :key="s.k" class="min-w-0" :class="i ? 'max-sm:hidden' : ''">
                <dt class="text-xs text-muted">{{ s.k }}</dt>
                <dd class="mt-0.5 font-mono text-sm tabular-nums">{{ s.v }}</dd>
              </div>
            </dl>

            <span class="ac-cta mt-auto flex items-center justify-between gap-2 pt-4 text-sm font-medium sm:pt-5">
              <span>View<span class="max-sm:sr-only"> {{ a.name }}</span></span>
              <span class="ac-arrow grid size-8 place-items-center rounded-full border border-line-strong" aria-hidden="true">
                <PhArrowRight :size="14" weight="bold" />
              </span>
            </span>
          </NuxtLink>
        </li>
      </TransitionGroup>

      <ul class="mt-5 flex flex-wrap gap-2 text-sm text-muted">
        <li v-for="n in ACCOUNT_NOTES" :key="n" class="chip inline-flex h-9 items-center gap-2 rounded-full px-3.5"><PhCheck :size="14" weight="bold" class="text-accent-soft" />{{ n }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ac-range { appearance: none; height: 2.75rem; background: transparent; cursor: pointer; }
.ac-range::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: linear-gradient(to right, var(--color-accent) var(--p), var(--color-line-strong) var(--p)); }
.ac-range::-moz-range-track { height: 6px; border-radius: 999px; background: linear-gradient(to right, var(--color-accent) var(--p), var(--color-line-strong) var(--p)); }
.ac-range::-webkit-slider-thumb { appearance: none; margin-top: -9px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-fg); border: 4px solid var(--color-accent); box-shadow: 0 4px 14px color-mix(in oklab, var(--color-accent) 60%, oklch(0 0 0 / 0.8)); transition: scale 160ms ease-out; }
.ac-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--color-fg); border: 4px solid var(--color-accent); box-shadow: 0 4px 14px color-mix(in oklab, var(--color-accent) 60%, oklch(0 0 0 / 0.8)); transition: scale 160ms ease-out; }
.ac-range:active::-webkit-slider-thumb { scale: 1.15; }
.ac-range:active::-moz-range-thumb { scale: 1.15; }
.ac-range:focus-visible { outline-offset: 6px; }

.ac { border-color: var(--color-line); transition: border-color 260ms ease, opacity 260ms ease, translate 360ms var(--ease-out-expo), box-shadow 300ms ease; }
.ac-glow { opacity: 0; background: radial-gradient(95% 65% at 50% 0%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 72%); transition: opacity 360ms ease; }
.ac-icon, .ac-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), translate 320ms var(--ease-out-expo); }

.ac[data-state="match"] {
  border-color: color-mix(in oklab, var(--color-accent) 72%, transparent);
  box-shadow: inset 0 1px 0 color-mix(in oklab, var(--color-accent-soft) 45%, oklch(1 0 0 / 0.14)), 0 24px 56px -26px color-mix(in oklab, var(--color-accent) 42%, oklch(0 0 0 / 0.92));
  translate: 0 -6px;
}
.ac[data-state="match"] .ac-glow { opacity: 1; }
.ac[data-state="match"] .ac-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); }
.ac[data-state="locked"] { opacity: 0.55; }

.ac-move { transition: transform 520ms var(--ease-out-expo); }

.ac:focus-visible { outline: 2px solid var(--color-accent-soft); outline-offset: 3px; }

@media (hover: hover) and (pointer: fine) {
  .ac:hover { border-color: var(--color-line-strong); opacity: 1; }
  .ac[data-state="match"]:hover { border-color: var(--color-accent); }
  .ac:hover .ac-icon { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; }
  .ac:hover .ac-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); translate: 4px 0; }
}

@media (prefers-reduced-motion: reduce) {
  .ac, .ac-icon, .ac-arrow { transition-property: opacity, background-color, border-color, color; }
  .ac-move { transition: none; }
  .ac[data-state="match"] { translate: none; }
  .ac:hover .ac-icon { rotate: none; }
  .ac:hover .ac-arrow { translate: none; }
}
</style>
