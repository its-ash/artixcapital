<script setup lang="ts">
import { PhArrowUpRight, PhDownloadSimple } from '@phosphor-icons/vue'

usePageSeo({
  title: 'MetaTrader 5 trading platform | Artix Capital',
  description: 'Run the industry-standard terminal with Artix pricing: MQL5 automation, strategy testing, Level 2 depth across five devices.'
})

const strengths = [
  ['Expert advisors', 'Automate strategies in MQL5 with the largest EA ecosystem in retail trading.'],
  ['Strategy tester', 'Back-test and optimize on historical data before risking a dollar.'],
  ['Depth of market', 'Level 2 pricing and time and sales for precise execution.'],
  ['Five devices', 'Windows, macOS, iOS, Android and web, one account, everything synced.'],
  ['21 timeframes', 'From one minute to monthly, with dozens of chart objects.'],
  ['MQL5 marketplace', 'Thousands of indicators, scripts and add-ons on tap.']
] as const

const styles = [
  ['Manual traders', 'Deep charting, one-click trading and full order control make MT5 comfortable for hands-on trading, with the familiarity of two decades of muscle memory.'],
  ['System builders', 'MQL5, the tester and the optimization engine turn ideas into rules, run on historical data, then live on the Artix server.']
] as const

const spec = [
  ['Devices', 'Windows, macOS, iOS, Android, web'],
  ['Automation', 'MQL5 expert advisors and scripts'],
  ['Timeframes', '21, M1 to MN1'],
  ['Order types', 'Market, limit, stop, trailing, pending'],
  ['Depth', 'Level 2 where available'],
  ['Server', 'ArtixCapital-Server'],
  ['Credentials', 'Request MT5 access in your client area']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Platforms"
      title="If your edge lives in automation, MT5 is the road."
      lead="MetaTrader 5 connects to your Artix account with the same institutional feeds and pure agency execution: full multi-asset coverage, expert advisors and the strategy tester."
    >
      <a href="#mt-download" class="btn btn-primary h-13 px-7">Download MT5</a>
      <NuxtLink to="/ntrader-for-windows/" class="btn btn-ghost h-13 px-7">Prefer nTrader?</NuxtLink>
    </PageHero>

    <PageSection id="mt-download" title="Get MetaTrader 5" lead="Open the web terminal or install the app, then sign in with the MT5 login from your client area on the ArtixCapital-Server.">
      <ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="d in MT5_DOWNLOADS" :key="d.id" class="min-w-0">
          <a
            :href="d.href"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-dl relative isolate flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-line bg-surface p-5 sm:flex-col sm:items-start sm:p-7"
            :aria-label="`${d.id === 'web' ? 'Open' : 'Download'} MetaTrader 5 for ${d.label} (opens in a new tab)`"
          >
            <component :is="d.icon" :size="160" weight="thin" class="mt-ghost pointer-events-none absolute -right-8 -bottom-10 -z-1 text-fg max-sm:size-28 max-sm:-bottom-8" aria-hidden="true" />
            <span class="mt-ico grid size-12 shrink-0 place-items-center rounded-xl border border-line-strong bg-canvas text-accent-soft">
              <component :is="d.icon" :size="22" weight="fill" aria-hidden="true" />
            </span>
            <span class="min-w-0 flex-1 sm:mt-6">
              <span class="block text-lg font-semibold tracking-tight sm:text-xl">{{ d.label }}</span>
              <span class="mt-0.5 block truncate text-sm text-muted">{{ d.title }}</span>
            </span>
            <span class="mt-arrow grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted sm:mt-6 sm:self-end" aria-hidden="true">
              <PhArrowUpRight v-if="d.id === 'web'" :size="15" weight="bold" />
              <PhDownloadSimple v-else :size="15" weight="bold" />
            </span>
          </a>
        </li>
      </ul>
    </PageSection>

    <PageSection id="mt-strengths" title="Why traders keep choosing it">
      <PageFeatures :items="strengths" />
    </PageSection>

    <PageSection id="mt-two" title="Two ways to use it">
      <div class="grid gap-4 md:grid-cols-2">
        <div v-for="s in styles" :key="s[0]" v-spot class="card p-8">
          <h3 class="text-xl font-semibold tracking-tight">{{ s[0] }}</h3>
          <p class="mt-3 leading-relaxed text-muted">{{ s[1] }}</p>
        </div>
      </div>
    </PageSection>

    <PageSection id="mt-spec" title="Specifications">
      <PageSpecs :rows="spec" />
    </PageSection>

    <PageCta />
  </main>
</template>

<style scoped>
.mt-dl { transition: border-color 240ms ease, translate 360ms var(--ease-out-expo), scale 160ms var(--ease-out-strong); }
.mt-dl:active { scale: 0.98; }
.mt-dl:focus-visible { outline: 2px solid var(--color-accent-soft); outline-offset: 2px; }
.mt-ghost { opacity: 0.04; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo), scale 700ms var(--ease-out-expo); }
.mt-ico, .mt-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), translate 360ms var(--ease-out-expo); }

@media (hover: hover) and (pointer: fine) {
  .mt-dl:hover { border-color: color-mix(in oklab, var(--color-accent) 60%, transparent); translate: 0 -3px; }
  .mt-dl:hover .mt-ghost { opacity: 0.1; rotate: -10deg; scale: 1.08; }
  .mt-dl:hover .mt-ico { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; }
  .mt-dl:hover .mt-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); translate: 0 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .mt-dl, .mt-ghost, .mt-ico, .mt-arrow { transition-property: opacity, background-color, border-color, color; }
  .mt-dl:hover, .mt-dl:active, .mt-dl:hover .mt-ghost, .mt-dl:hover .mt-ico, .mt-dl:hover .mt-arrow { translate: none; rotate: none; scale: none; }
}
</style>
