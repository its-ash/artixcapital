<script setup lang="ts">
import type { Component } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowRight, PhArrowUpRight, PhDownloadSimple } from '@phosphor-icons/vue'

import BrandMetaTrader from '~/components/icons/BrandMetaTrader.vue'
import BrandNtrader from '~/components/icons/BrandNtrader.vue'

type Opt = { id: string; label: string; title: string; href: string; icon: Component; external: boolean }

const TABS: { id: string; label: string; desc: string; logo?: Component; more?: { label: string; href: string }; opts: Opt[] }[] = [
  {
    id: 'ntrader',
    label: 'nTrader',
    logo: BrandNtrader,
    desc: 'Our own terminal on desktop, browser and mobile, with one login across every screen.',
    opts: PLATFORMS.map(p => ({ id: p.id, label: p.label, title: p.title, href: p.href, icon: p.icon, external: p.href.startsWith('http') }))
  },
  {
    id: 'mt5',
    label: 'MetaTrader 5',
    logo: BrandMetaTrader,
    desc: 'The industry-standard terminal, connected to the ArtixCapital-Server.',
    more: { label: 'Read about MT5', href: '/meta-trader-5/' },
    opts: MT5_DOWNLOADS.map(d => ({ ...d, external: true }))
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
  <section id="platform" ref="root" class="wrap" aria-labelledby="platform-title">
    <div class="border-t border-line py-24 md:py-32">
      <div class="p-card relative isolate overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:p-8 lg:p-12">
        <span class="pointer-events-none absolute inset-0 -z-1 bg-[radial-gradient(50%_70%_at_90%_0%,color-mix(in_oklab,var(--color-accent)_12%,transparent),transparent_70%)]" aria-hidden="true" />

        <h2 id="platform-title" class="h-section max-w-3xl text-3xl sm:text-4xl md:text-5xl">Built for precision, speed and simplicity.</h2>
        <p class="mt-4 max-w-xl text-base leading-relaxed text-muted md:mt-5 md:text-lg">Trade on nTrader or MetaTrader 5. Pick a platform to get it on your device.</p>

        <div
          class="p-tabs relative mt-8 grid w-full grid-cols-2 rounded-full border border-line bg-canvas p-1 sm:inline-grid sm:w-auto md:mt-10"
          role="tablist"
          aria-label="Trading platform"
          @keydown="onKey"
        >
          <span
            class="p-pill pointer-events-none absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-accent"
            :style="{ translate: `${idx * 100}% 0` }"
            aria-hidden="true"
          />
          <button
            v-for="(t, i) in TABS"
            :id="`ptab-${t.id}`"
            :key="t.id"
            type="button"
            role="tab"
            class="p-tab relative z-1 h-11 whitespace-nowrap rounded-full px-6 text-sm font-semibold sm:min-w-44"
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

        <div :id="`ppanel-${tab.id}`" class="mt-6" role="tabpanel" :aria-labelledby="`ptab-${tab.id}`">
          <component :is="tab.logo" v-if="tab.logo" :size="88" class="p-logo mb-6 block" aria-hidden="true" />
          <p class="p-desc max-w-xl text-sm leading-relaxed text-muted md:text-base">
            {{ tab.desc }}
            <NuxtLink v-if="tab.more" :to="tab.more.href" class="font-medium text-fg underline decoration-accent-soft underline-offset-4">{{ tab.more.label }}</NuxtLink>
          </p>

          <ul :key="tab.id" class="mt-6 grid gap-2.5 sm:gap-3" :class="tab.opts.length > 3 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3'">
            <li v-for="(o, i) in tab.opts" :key="o.id" class="p-opt min-w-0">
              <component
                :is="o.external ? 'a' : Link"
                v-bind="o.external ? { href: o.href, target: '_blank', rel: 'noopener noreferrer' } : { to: o.href }"
                class="dl relative isolate flex h-full items-center gap-4 overflow-hidden rounded-xl border border-line bg-canvas p-4 sm:flex-col sm:items-start sm:p-6"
                :data-live="live === i || undefined"
                :aria-label="`${tab.id === 'mt5' ? (o.id === 'web' ? 'Open MetaTrader 5 for' : 'Download MetaTrader 5 for') : 'nTrader for'} ${o.label}${o.external ? ' (opens in a new tab)' : ''}`"
              >
                <span class="dl-glow pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
                <component :is="o.icon" :size="160" weight="thin" class="dl-ghost pointer-events-none absolute -right-8 -bottom-10 -z-1 max-sm:size-28 max-sm:-bottom-8" aria-hidden="true" />
                <span class="dl-ico relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border border-line-strong bg-surface text-accent-soft sm:size-12">
                  <component :is="o.icon" :size="22" :weight="tab.id === 'mt5' ? 'regular' : 'duotone'" class="dl-i1" aria-hidden="true" />
                  <component :is="o.icon" :size="22" weight="fill" class="dl-i2 absolute" aria-hidden="true" />
                </span>
                <span class="min-w-0 flex-1 sm:mt-6">
                  <span class="block font-semibold sm:text-xl sm:tracking-tight">{{ o.label }}</span>
                  <span class="mt-0.5 block truncate text-xs text-muted sm:text-sm">{{ o.title }}</span>
                </span>
                <span class="dl-arrow grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted sm:mt-6 sm:self-end" aria-hidden="true">
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
