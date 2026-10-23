<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUpRight } from '@phosphor-icons/vue'

const SPAN: Record<string, string> = {
  forex: 'md:col-span-2 lg:col-span-7 lg:row-span-2',
  commodities: 'lg:col-span-5',
  stocks: 'lg:col-span-5',
  indices: 'md:col-span-1 lg:col-span-6',
  crypto: 'md:col-span-1 lg:col-span-6'
}

const root = ref<HTMLElement | null>(null)

const track = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}

useMotion(root, ({ motion }) => {
  if (!motion) return
  gsap.from(gsap.utils.selector(root.value)('.mk-card'), { y: 48, opacity: 0, scale: 0.97, stagger: 0.08, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: root.value, start: 'top 75%' } })
})
</script>

<template>
  <section id="markets" ref="root" class="wrap" aria-labelledby="markets-title">
    <div class="border-t border-line py-24 md:py-32">
      <h2 id="markets-title" v-reveal="'lines'" class="h-section max-w-2xl text-4xl md:text-6xl">One account. Five markets.</h2>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-muted">Over 150 instruments across currencies, commodities, shares, indices and crypto.</p>

      <ul class="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
        <li v-for="m in MARKETS" :key="m.id" class="mk-card min-w-0" :class="SPAN[m.id]">
          <article
            class="mk group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 md:p-6"
            :class="m.id === 'forex' ? 'min-h-72' : 'min-h-56'"
            @pointermove="track"
          >
            <span class="mk-spot pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
            <span class="mk-ring pointer-events-none absolute inset-0 rounded-2xl" aria-hidden="true" />
            <component :is="m.icon" :size="m.id === 'forex' ? 220 : 150" weight="thin" class="mk-ghost pointer-events-none absolute -right-6 -bottom-8 -z-1 text-fg" aria-hidden="true" />

            <div class="flex items-start justify-between gap-4">
              <span class="mk-icon relative grid size-11 place-items-center overflow-hidden rounded-xl border border-line-strong bg-canvas text-accent-soft">
                <component :is="m.icon" :size="20" weight="duotone" class="mk-i1" />
                <component :is="m.icon" :size="20" weight="fill" class="mk-i2 absolute" aria-hidden="true" />
              </span>
              <span class="mk-arrow grid size-9 place-items-center rounded-full border border-line-strong text-muted" aria-hidden="true">
                <PhArrowUpRight :size="16" weight="bold" />
              </span>
            </div>

            <h3 class="mt-5 font-semibold tracking-tight" :class="m.id === 'forex' ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'">
              <NuxtLink :to="m.href" class="after:absolute after:inset-0 after:z-1 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent-soft">{{ m.name }}</NuxtLink>
            </h3>
            <p class="mt-2 max-w-sm text-pretty text-sm leading-relaxed text-muted">{{ m.desc }}</p>

            <div class="mt-auto pt-5">
              <div v-if="m.id === 'forex'" class="relative z-2 mb-4">
                <Mql5Widget type="chart" :symbols="['EURUSD']" :height="180" />
              </div>
              <ul class="flex flex-wrap gap-2" aria-label="Popular symbols">
                <li v-for="(p, i) in m.popular" :key="p" class="mk-chip chip inline-flex h-7 items-center rounded-full px-2.5 font-mono text-xs" :style="{ '--d': `${i * 40}ms` }">{{ p }}</li>
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
