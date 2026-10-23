<script setup lang="ts">
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'

const DETAILS = [
  ['Email address', 'Name and country', 'Secure password'],
  ['Identity document', 'Proof of address', 'Reviewed by our team'],
  ['Visa and Mastercard', 'Neteller and Skrill', 'Crypto wallets']
]

const ITEMS = STEPS.map((s, i) => ({ ...s, details: DETAILS[i] ?? [] }))
</script>

<template>
  <section class="wrap" aria-labelledby="steps-title">
    <div class="grid gap-14 border-t border-line py-24 md:py-32 lg:grid-cols-12 lg:gap-10">
      <div class="lg:col-span-5">
        <div class="lg:sticky lg:top-28">
          <h2 id="steps-title" class="h-section max-w-md text-4xl md:text-6xl">From sign-up to first trade in three steps.</h2>
          <p class="mt-5 max-w-sm text-lg leading-relaxed text-muted">Open, verify and fund from one client area. Your account is ready on nTrader once the checks clear.</p>
          <a v-magnetic="0.2" :href="SIGNUP" class="btn btn-primary mt-10 h-14 px-8">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
        </div>
      </div>

      <ol class="st-list relative grid gap-6 lg:col-span-7">
        <span class="absolute top-7 bottom-7 left-7 w-px bg-line-strong" aria-hidden="true">
          <span class="st-fill absolute inset-0 origin-top bg-accent" />
        </span>

        <li v-for="(s, i) in ITEMS" :key="s.title" class="st-item relative grid grid-cols-[3.5rem_1fr] gap-4 sm:gap-6">
          <span class="st-node relative z-1 grid size-14 place-items-center rounded-2xl border" aria-hidden="true">
            <component :is="s.icon" :size="22" weight="duotone" />
          </span>

          <article class="st-card group relative isolate overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-[border-color,translate] duration-300 hover:border-line-strong sm:p-7">
            <span class="st-glow pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
            <span class="pointer-events-none absolute -top-6 right-4 -z-1 select-none font-mono text-[7rem] leading-none font-bold text-fg/4" aria-hidden="true">{{ i + 1 }}</span>
            <p class="font-mono text-xs text-accent-soft">Step {{ i + 1 }}</p>
            <h3 class="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">{{ s.title }}</h3>
            <p class="mt-2 max-w-md leading-relaxed text-muted">{{ s.desc }}</p>
            <ul class="mt-6 flex flex-wrap gap-2">
              <li v-for="d in s.details" :key="d" class="chip inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs">
                <PhCheck :size="12" weight="bold" class="text-accent-soft" />{{ d }}
              </li>
            </ul>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.st-item { --on: 1; }
.st-node {
  background: color-mix(in oklab, var(--color-accent) calc(var(--on) * 100%), var(--color-canvas));
  border-color: color-mix(in oklab, var(--color-accent) calc(var(--on) * 100%), var(--color-line-strong));
  color: color-mix(in oklab, var(--color-on-accent) calc(var(--on) * 100%), var(--color-muted));
  scale: calc(0.9 + var(--on) * 0.1);
}
.st-card { opacity: calc(0.45 + var(--on) * 0.55); }
.st-glow { opacity: var(--on); background: radial-gradient(60% 80% at 0% 0%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%); }
@media (hover: hover) and (pointer: fine) {
  .st-card:hover { translate: 4px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .st-card:hover { translate: none; }
}
</style>
