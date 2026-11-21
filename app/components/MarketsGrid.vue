<script setup lang="ts">
import { PhArrowUpRight } from '@phosphor-icons/vue'

const SPAN: Record<string, string> = {
  forex: 'col-span-2 lg:col-span-7 lg:row-span-2',
  commodities: 'lg:col-span-5',
  stocks: 'lg:col-span-5',
  indices: 'lg:col-span-6',
  crypto: 'lg:col-span-6'
}

const track = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>

<template>
  <section id="markets" class="cv-auto wrap" style="--cv-h: 780px" aria-labelledby="markets-title">
    <div class="section-rule py-12 md:py-16">
      <h2 id="markets-title" class="h-section max-w-2xl text-3xl sm:text-4xl md:text-5xl">One account. Five markets.</h2>
      <p class="mt-3 max-w-xl text-base leading-relaxed text-muted md:text-lg">
        Over 150 instruments across currencies, commodities, shares, indices and crypto.
        <NuxtLink to="/spread-table/" class="font-medium text-fg underline decoration-accent-soft underline-offset-4 transition-colors hover:text-accent-soft">View spreads</NuxtLink>
      </p>

      <ul class="mt-6 grid grid-cols-2 gap-3 md:mt-8 md:gap-3.5 lg:grid-cols-12">
        <li v-for="m in MARKETS" :key="m.id" class="mk-card min-w-0" :class="SPAN[m.id]">
          <article
            class="mk surface-lux group relative isolate flex h-full flex-col overflow-hidden rounded-2xl p-4 md:p-5"
            :class="m.id === 'forex' ? 'min-h-52 md:min-h-60' : 'min-h-36 md:min-h-44'"
            @pointermove="track"
          >
            <span class="mk-spot pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
            <span class="mk-ring pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />
            <component :is="m.icon" :size="m.id === 'forex' ? 220 : 150" weight="thin" class="mk-ghost pointer-events-none absolute -right-6 -bottom-8 -z-1 text-fg" :class="m.id === 'forex' ? 'max-md:size-40' : 'max-md:size-24'" aria-hidden="true" />

            <div class="flex items-start justify-between gap-4">
              <span class="mk-icon relative grid size-9 place-items-center overflow-hidden rounded-xl border border-line-strong bg-linear-to-b from-elevated to-canvas text-accent-soft shadow-[inset_0_1px_0_oklch(1_0_0/0.09)] md:size-11">
                <component :is="m.icon" :size="20" weight="duotone" class="mk-i1" />
                <component :is="m.icon" :size="20" weight="fill" class="mk-i2 absolute" aria-hidden="true" />
              </span>
              <span class="mk-arrow grid size-8 place-items-center rounded-full border border-line-strong bg-canvas/50 text-muted md:size-9" aria-hidden="true">
                <PhArrowUpRight :size="16" weight="bold" />
              </span>
            </div>

            <h3 class="mt-3 font-semibold tracking-tight" :class="m.id === 'forex' ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'">
              <NuxtLink :to="m.href" class="after:absolute after:inset-0 after:z-1 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-soft">{{ m.name }}</NuxtLink>
            </h3>
            <p class="mt-1.5 line-clamp-3 max-w-sm text-pretty text-xs leading-relaxed text-muted md:line-clamp-none md:text-sm">{{ m.desc }}</p>

            <div class="mt-auto pt-3 md:pt-4">
              <div v-if="m.id === 'forex'" class="relative z-2 mb-3">
                <Mql5Widget type="chart" :symbols="['EURUSD']" :height="150" />
              </div>
              <ul class="flex flex-wrap gap-1.5 md:gap-2" aria-label="Popular symbols">
                <li v-for="(p, i) in m.popular" :key="p" class="mk-chip chip inline-flex h-6 items-center rounded-full px-2 font-mono text-[11px] md:h-7 md:px-2.5 md:text-xs" :class="m.id !== 'forex' && i > 1 ? 'max-md:hidden' : ''" :style="{ '--d': `${i * 40}ms` }">{{ p }}</li>
              </ul>
            </div>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.mk { --mx: 50%; --my: 0%; transition: border-color 240ms ease, translate 320ms var(--ease-out-expo); }
.mk-spot { opacity: 0; background: radial-gradient(28rem circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent) 14%, transparent), transparent 60%); transition: opacity 300ms ease; }
.mk-ring {
  padding: 1px; opacity: 0; transition: opacity 300ms ease;
  background: radial-gradient(18rem circle at var(--mx) var(--my), color-mix(in oklab, var(--color-accent-soft) 80%, transparent), transparent 70%);
  mask: linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0);
}
.mk-ghost { opacity: 0.035; transition: opacity 500ms ease, rotate 700ms var(--ease-out-expo), scale 700ms var(--ease-out-expo); }
.mk-icon { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo), scale 420ms var(--ease-out-expo); }
.mk-i1, .mk-i2 { transition: translate 420ms var(--ease-out-expo), opacity 240ms ease; }
.mk-i2 { translate: 0 140%; opacity: 0; }
.mk-arrow { transition: background-color 240ms ease, border-color 240ms ease, color 240ms ease, rotate 420ms var(--ease-out-expo); }
.mk-chip { transition: border-color 240ms ease, color 240ms ease, translate 320ms var(--ease-out-expo); transition-delay: var(--d); }

.mk:focus-within .mk-ring { opacity: 1; }
.mk:focus-within .mk-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); }

@media (hover: hover) and (pointer: fine) {
  .mk:hover { border-color: var(--color-line-strong); translate: 0 -4px; }
  .mk:hover .mk-spot, .mk:hover .mk-ring { opacity: 1; }
  .mk:hover .mk-ghost { opacity: 0.08; rotate: -8deg; scale: 1.06; }
  .mk:hover .mk-icon { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: -6deg; scale: 1.06; }
  .mk:hover .mk-i1 { translate: 0 -140%; opacity: 0; }
  .mk:hover .mk-i2 { translate: 0 0; opacity: 1; }
  .mk:hover .mk-arrow { background: var(--color-accent); border-color: var(--color-accent); color: var(--color-on-accent); rotate: 45deg; }
  .mk:hover .mk-chip { border-color: var(--color-line-strong); color: var(--color-fg); translate: 0 -2px; }
}

@media (prefers-reduced-motion: reduce) {
  .mk, .mk-ghost, .mk-icon, .mk-i1, .mk-i2, .mk-arrow, .mk-chip { transition-property: opacity, background-color, border-color, color; }
  .mk:hover, .mk:hover .mk-chip { translate: none; }
  .mk:hover .mk-ghost, .mk:hover .mk-icon, .mk:hover .mk-arrow { rotate: none; scale: none; }
  .mk:hover .mk-i1, .mk:hover .mk-i2 { translate: 0 0; }
  .mk:hover .mk-i1 { opacity: 0; }
}
</style>
