<script setup lang="ts">
import { PhDownloadSimple } from '@phosphor-icons/vue'

usePageSeo({
  title: 'MetaTrader 5 for Mobile: iOS and Android | Artix Capital',
  description: 'Download MetaTrader 5 for iPhone, iPad and Android. Trade Artix markets, run charts and manage your account from your phone.'
})

const DOWNLOADS = MT5_DOWNLOADS.filter(d => d.id === 'ios' || d.id === 'android')

const caps = [
  ['Full charting', 'Candlestick, bar and line charts with 21 timeframes and chart objects.'],
  ['Trade from anywhere', 'Market, limit and stop orders with stop-loss and take-profit.'],
  ['Price alerts', 'Set alerts on any symbol and get notified the moment price moves.'],
  ['Depth and quotes', 'Live quotes and Level 2 depth where the instrument supports it.'],
  ['Expert advisors', 'Run MQL5 automation on your phone alongside desktop MT5.'],
  ['Synced accounts', 'Positions, history and settings sync with your desktop and web terminal.']
] as const

const steps = [
  ['Install', 'Download MetaTrader 5 from the App Store or Google Play, or use the Android APK.'],
  ['Open the app', 'Choose Add account, then search for ArtixCapital-Server.'],
  ['Sign in', 'Enter your MT5 login and password from your client area.']
] as const

const spec = [
  ['Devices', 'iPhone, iPad, Android phones and tablets'],
  ['Server', 'ArtixCapital-Server'],
  ['Timeframes', '21, M1 to MN1'],
  ['Order types', 'Market, limit, stop, trailing, pending'],
  ['Automation', 'MQL5 expert advisors and scripts'],
  ['Credentials', 'Request MT5 access in your client area']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Platforms"
      title="MetaTrader 5 for Mobile"
      lead="Take the full MT5 terminal with you. Charts, orders, alerts and expert advisors on iPhone, iPad and Android, connected to your Artix account."
    >
      <a href="#mt-mobile-download" class="btn btn-primary h-13 px-7">Download MT5</a>
      <NuxtLink to="/ntrader-for-mobile/" class="btn btn-ghost h-13 px-7">Prefer nTrader?</NuxtLink>
    </PageHero>

    <PageSection id="mt-mobile-download" title="Download for your phone" lead="Install the app, then sign in with the MT5 login from your client area on the ArtixCapital-Server.">
      <ul class="grid gap-3 sm:grid-cols-3">
        <li v-for="d in DOWNLOADS" :key="d.id" class="min-w-0">
          <a
            :href="d.href"
            target="_blank"
            rel="noopener noreferrer"
            class="mm-dl relative isolate flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:flex-col sm:items-start sm:p-7"
            :aria-label="`Download MetaTrader 5 for ${d.label} (opens in a new tab)`"
          >
            <component :is="d.icon" :size="160" weight="thin" class="mm-ghost pointer-events-none absolute -right-8 -bottom-10 -z-1 text-fg max-sm:size-28 max-sm:-bottom-8" aria-hidden="true" />
            <span class="mm-ico grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-canvas text-accent-soft">
              <component :is="d.icon" :size="22" weight="fill" aria-hidden="true" />
            </span>
            <span class="min-w-0 flex-1 sm:mt-6">
              <span class="block text-lg font-semibold tracking-tight sm:text-xl">{{ d.label }}</span>
              <span class="mt-0.5 block truncate text-sm text-muted">{{ d.title }}</span>
            </span>
            <span class="mm-arrow grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted sm:mt-6 sm:self-end" aria-hidden="true">
              <PhDownloadSimple :size="15" weight="bold" />
            </span>
          </a>
        </li>
      </ul>
    </PageSection>

    <PageSection id="mm-caps" title="Everything MT5, in your pocket">
      <PageFeatures :items="caps" />
    </PageSection>

    <PageSection id="mm-steps" title="Get started in three steps">
      <PageSteps :items="steps" />
    </PageSection>

    <PageSection id="mm-spec" title="Specifications">
      <PageSpecs :rows="spec" />
    </PageSection>

    <PageCta />
  </main>
</template>

<style scoped>
.mm-dl { transition: border-color 240ms ease, translate 360ms var(--ease-out-expo), scale 160ms var(--ease-out-strong); }
.mm-dl:active { scale: 0.98; }
.mm-dl:focus-visible { outline: 2px solid var(--color-accent-soft); outline-offset: 2px; }
.mm-ghost { opacity: 0.04; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo), scale 700ms var(--ease-out-expo); }
.mm-ico, .mm-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), translate 360ms var(--ease-out-expo); }

@media (hover: hover) and (pointer: fine) {
  .mm-dl:hover { border-color: color-mix(in oklab, var(--color-accent) 60%, transparent); translate: 0 -3px; }
  .mm-dl:hover .mm-ghost { opacity: 0.1; rotate: -10deg; scale: 1.08; }
  .mm-dl:hover .mm-ico { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; }
  .mm-dl:hover .mm-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); translate: 0 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .mm-dl, .mm-ghost, .mm-ico, .mm-arrow { transition-property: opacity, background-color, border-color, color; }
  .mm-dl:hover, .mm-dl:active, .mm-dl:hover .mm-ghost, .mm-dl:hover .mm-ico, .mm-dl:hover .mm-arrow { translate: none; rotate: none; scale: none; }
}
</style>
