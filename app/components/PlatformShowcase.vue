<script setup lang="ts">
import type { Component } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowRight, PhArrowUpRight, PhDownloadSimple } from '@phosphor-icons/vue'

import BrandMetaTrader from '~/components/icons/BrandMetaTrader.vue'
import BrandNtrader from '~/components/icons/BrandNtrader.vue'

type Opt = { id: string; label: string; title: string; href: string; icon: Component; external: boolean }

const TABS: { id: string; label: string; badge: string; desc: string; logo?: Component; more?: { label: string; href: string }; opts: Opt[] }[] = [
  {
    id: 'mt5',
    label: 'MetaTrader 5',
    badge: 'ArtixCapital-Server',
    logo: BrandMetaTrader,
    desc: 'The industry-standard terminal, connected to the ArtixCapital-Server.',
    more: { label: 'Read about MT5', href: '/meta-trader-5/' },
    opts: MT5_DOWNLOADS.map(d => ({ ...d, external: true }))
  },
  {
    id: 'ntrader',
    label: 'nTrader',
    badge: 'Single Login · All Devices',
    logo: BrandNtrader,
    desc: 'Our own terminal on desktop, browser and mobile, with one login across every screen.',
    opts: PLATFORMS.map(p => ({ id: p.id, label: p.label, title: p.title, href: p.href, icon: p.icon, external: p.href.startsWith('http') }))
  }
]

const Link = resolveComponent('NuxtLink')
const root = ref<HTMLElement | null>(null)
const idx = ref(0)
const live = ref(-1)
const CYCLE = 2.2
const tab = computed(() => TABS[idx.value] ?? TABS[0]!)

const onKey = (e: KeyboardEvent) => {
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return
  e.preventDefault()
  const last = TABS.length - 1
  idx.value = e.key === 'ArrowRight' ? Math.min(last, idx.value + 1)
    : e.key === 'ArrowLeft' ? Math.max(0, idx.value - 1)
    : e.key === 'Home' ? 0 : last
  nextTick(() => root.value?.querySelector<HTMLButtonElement>(`#ptab-${tab.value.id}`)?.focus())
}

useMotion(root, ({ motion, fine }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  let loop: gsap.core.Tween | undefined
  const next = () => {
    live.value = (live.value + 1) % tab.value.opts.length
    loop = gsap.delayedCall(CYCLE, next)
  }
  const run = (on: boolean) => {
    loop?.kill()
    live.value = -1
    if (on) loop = gsap.delayedCall(0.6, next)
  }
  const auto = fine ? undefined : ScrollTrigger.create({ trigger: q('.p-card')[0], start: 'top 70%', end: 'bottom 30%', onToggle: st => run(st.isActive) })
  const stop = watch(idx, () => nextTick(() => {
    if (auto?.isActive) run(true)
    gsap.fromTo(q('.p-desc'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', overwrite: 'auto' })
    gsap.fromTo(q('.p-opt'), { opacity: 0, y: 16, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out', overwrite: 'auto' })
  }))
  return () => { stop(); loop?.kill(); auto?.kill(); live.value = -1 }
})
</script>

<template>
  <section id="platform" ref="root" class="cv-auto wrap" style="--cv-h: 560px" aria-labelledby="platform-title">
    <div class="section-rule py-12 md:py-16">
      <div class="p-card surface-lux relative isolate overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-8">
        <span class="pointer-events-none absolute inset-0 -z-1 bg-[radial-gradient(52%_75%_at_92%_0%,color-mix(in_oklab,var(--color-accent)_16%,transparent),transparent_68%),radial-gradient(40%_50%_at_0%_100%,oklch(1_0_0/0.03),transparent_70%)]" aria-hidden="true" />

        <p class="eyebrow">Trading Terminals</p>
        <h2 id="platform-title" class="h-section mt-3 max-w-3xl text-3xl sm:text-4xl md:text-5xl">Built for precision, speed and simplicity.</h2>
        <p class="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">Trade on MetaTrader 5 or nTrader. Pick a platform to get it on your device.</p>

        <div
          class="p-tabs relative mt-5 grid w-full grid-cols-2 rounded-full border border-line bg-canvas/90 p-1 shadow-[inset_0_2px_4px_oklch(0_0_0/0.55)] sm:inline-grid sm:w-auto md:mt-6"
          role="tablist"
          aria-label="Trading platform"
          @keydown="onKey"
        >
          <span
            class="p-pill pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-linear-to-b from-[color-mix(in_oklab,var(--color-accent)_92%,#fff_8%)] to-[color-mix(in_oklab,var(--color-accent)_92%,#000_8%)] shadow-[inset_0_1px_0_oklch(1_0_0/0.25),0_8px_20px_-8px_color-mix(in_oklab,var(--color-accent)_75%,transparent)]"
            :style="{ translate: `${idx * 100}% 0` }"
            aria-hidden="true"
          />
          <button
            v-for="(t, i) in TABS"
            :id="`ptab-${t.id}`"
            :key="t.id"
            type="button"
            role="tab"
            class="p-tab relative z-1 h-11 cursor-pointer whitespace-nowrap rounded-full px-6 text-sm font-semibold sm:min-w-44"
            :class="idx === i ? 'text-on-accent' : 'text-muted'"
            :aria-selected="idx === i"
            :aria-controls="`ppanel-${t.id}`"
            :tabindex="idx === i ? 0 : -1"
            @click="idx = i"
          >
            <component :is="t.logo" v-if="t.logo" :size="24" class="mr-2 inline-block align-[-6px]" aria-hidden="true" />
            {{ t.label }}
          </button>
        </div>

        <div :id="`ppanel-${tab.id}`" class="mt-5" role="tabpanel" :aria-labelledby="`ptab-${tab.id}`">
          <div class="mb-4 flex flex-wrap items-center gap-3.5">
            <component :is="tab.logo" v-if="tab.logo" :size="58" class="p-logo block" aria-hidden="true" />
            <span class="chip inline-flex h-7 items-center rounded-full px-3 font-mono text-xs text-muted">{{ tab.badge }}</span>
          </div>
          <p class="p-desc max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {{ tab.desc }}
            <NuxtLink v-if="tab.more" :to="tab.more.href" class="font-medium text-fg underline decoration-accent-soft underline-offset-4 transition-colors hover:text-accent-soft">{{ tab.more.label }}</NuxtLink>
          </p>

          <ul :key="tab.id" class="mt-5 grid gap-2.5 sm:gap-3" :class="tab.opts.length > 3 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'">
            <li v-for="(o, i) in tab.opts" :key="o.id" class="p-opt min-w-0">
              <component
                :is="o.external ? 'a' : Link"
                v-bind="o.external ? { href: o.href, target: '_blank', rel: 'noopener noreferrer' } : { to: o.href }"
                class="dl relative isolate flex h-full items-center gap-4 overflow-hidden rounded-xl border border-line bg-linear-to-b from-canvas/85 to-canvas p-3.5 shadow-[inset_0_1px_0_oklch(1_0_0/0.06)] sm:flex-col sm:items-start sm:p-4"
                :data-live="live === i || undefined"
                :aria-label="`${tab.id === 'mt5' ? (o.id === 'web' ? 'Open MetaTrader 5 for' : 'Download MetaTrader 5 for') : 'nTrader for'} ${o.label}${o.external ? ' (opens in a new tab)' : ''}`"
              >
                <span class="dl-glow pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
                <component :is="o.icon" :size="160" weight="thin" class="dl-ghost pointer-events-none absolute -right-8 -bottom-10 -z-1 max-sm:size-28 max-sm:-bottom-8" aria-hidden="true" />
                <span class="dl-ico relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-surface text-accent-soft sm:size-11">
                  <component :is="o.icon" :size="20" :weight="tab.id === 'mt5' ? 'regular' : 'duotone'" class="dl-i1" aria-hidden="true" />
                  <component :is="o.icon" :size="20" weight="fill" class="dl-i2 absolute" aria-hidden="true" />
                </span>
                <span class="min-w-0 flex-1 sm:mt-4">
                  <span class="block font-semibold sm:text-lg sm:tracking-tight">{{ o.label }}</span>
                  <span class="mt-0.5 block truncate text-xs text-muted sm:text-sm">{{ o.title }}</span>
                </span>
                <span class="dl-arrow grid size-8 shrink-0 place-items-center rounded-full border border-line-strong text-muted sm:mt-4 sm:self-end" aria-hidden="true">
                  <PhDownloadSimple v-if="tab.id === 'mt5' && o.id !== 'web'" :size="15" weight="bold" />
                  <PhArrowUpRight v-else-if="o.external" :size="15" weight="bold" />
                  <PhArrowRight v-else :size="15" weight="bold" />
                </span>
              </component>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.p-pill { transition: translate 420ms var(--ease-out-expo); }
.p-tab { transition: color 220ms ease, scale 160ms var(--ease-out-strong); }
.p-tab:active { scale: 0.97; }
.p-tab:focus-visible, .dl:focus-visible { outline: 2px solid var(--color-accent-soft); outline-offset: 2px; }

.dl { transition: border-color 260ms ease, translate 360ms var(--ease-out-expo), scale 160ms var(--ease-out-strong); }
.dl:active { scale: 0.98; }
.dl-glow { opacity: 0; background: radial-gradient(120% 90% at 100% 100%, color-mix(in oklab, var(--color-accent) 18%, transparent), transparent 60%); transition: opacity 360ms ease; }
.dl-ghost { opacity: 0.84; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo), scale 700ms var(--ease-out-expo), translate 700ms var(--ease-out-expo); }
.dl-ico, .dl-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), translate 360ms var(--ease-out-expo), scale 420ms var(--ease-out-expo); }
.dl-i1, .dl-i2 { transition: translate 420ms var(--ease-out-expo), opacity 240ms ease; }
.dl-i2 { translate: 0 140%; opacity: 0; }

.dl[data-live] { border-color: color-mix(in oklab, var(--color-accent) 60%, transparent); translate: 0 -3px; }
.dl[data-live] .dl-glow { opacity: 1; }
.dl[data-live] .dl-ghost { opacity: 0.22; rotate: -10deg; scale: 1.08; translate: -6px -6px; }
.dl[data-live] .dl-ico { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; scale: 1.06; }
.dl[data-live] .dl-i1 { translate: 0 -140%; opacity: 0; }
.dl[data-live] .dl-i2 { translate: 0 0; opacity: 1; }
.dl[data-live] .dl-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); translate: 0 2px; }

@media (hover: hover) and (pointer: fine) {
  .p-tab[aria-selected="false"]:hover { color: var(--color-fg); }
  .dl:hover { border-color: color-mix(in oklab, var(--color-accent) 60%, transparent); translate: 0 -3px; }
  .dl:hover .dl-glow { opacity: 1; }
  .dl:hover .dl-ghost { opacity: 0.22; rotate: -10deg; scale: 1.08; translate: -6px -6px; }
  .dl:hover .dl-ico { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; scale: 1.06; }
  .dl:hover .dl-i1 { translate: 0 -140%; opacity: 0; }
  .dl:hover .dl-i2 { translate: 0 0; opacity: 1; }
  .dl:hover .dl-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); translate: 0 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .p-pill { transition: none; }
  .p-tab, .dl, .dl-ghost, .dl-ico, .dl-arrow, .dl-i1, .dl-i2 { transition-property: opacity, background-color, border-color, color; }
  .p-tab:active, .dl:hover, .dl:active, .dl:hover .dl-ghost, .dl:hover .dl-ico, .dl:hover .dl-arrow { translate: none; rotate: none; scale: none; }
  .dl:hover .dl-i1, .dl:hover .dl-i2 { translate: 0 0; }
}
</style>
