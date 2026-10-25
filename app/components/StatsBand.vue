<script setup lang="ts">
import gsap from 'gsap'

type Kind = 'spread' | 'leverage' | 'commission' | 'instruments' | 'support'
type Stat = { label: string; big: string; unit?: string; kind: Kind }

const STATS: Stat[] = [
  { label: 'Spreads from', big: '0.0', unit: 'pips', kind: 'spread' },
  { label: 'Maximum leverage', big: '1:200', kind: 'leverage' },
  { label: 'Commission on Core FX', big: '0', unit: '%', kind: 'commission' },
  { label: 'Global instruments', big: '150', unit: '+', kind: 'instruments' },
  { label: 'Human support', big: '24/5', kind: 'support' }
]
const BARS = 18
const COLS = 25
const ROWS = 3
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const ASK = 'M0 8 L14 10 L26 7 L38 12 L50 10 L62 15 L74 14 L86 18 L98 19 L110 20 L120 20'
const BID = 'M0 32 L14 29 L26 31 L38 27 L50 29 L62 25 L74 26 L86 22 L98 21 L110 20 L120 20'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion || !root.value) return
  const offs = gsap.utils.toArray<HTMLElement>('.s-card', root.value).map(card => {
    const val = card.querySelector<HTMLElement>('.s-big')
    const text = val?.textContent ?? ''
    const fn = () => val && gsap.to(val, { duration: 0.8, scrambleText: { text, chars: '0123456789', speed: 0.6 }, overwrite: true })
    card.addEventListener('pointerenter', fn)
    return () => card.removeEventListener('pointerenter', fn)
  })
  return () => offs.forEach(f => f())
})
</script>

<template>
  <section ref="root" class="wrap py-12 md:py-16" aria-label="Trading conditions">
    <dl class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
      <div
        v-for="(s, i) in STATS"
        :key="s.label"
        v-spot
        class="s-card card group flex min-h-52 flex-col p-5"
        :class="i === STATS.length - 1 ? 'col-span-2 md:col-span-2 lg:col-span-1' : ''"
      >
        <dt class="flex items-center justify-between gap-2 text-sm text-muted">
          <span>{{ s.label }}</span>
          <span class="font-mono text-xs text-muted/60">0{{ i + 1 }}</span>
        </dt>
        <dd class="mt-4 whitespace-nowrap font-mono tabular-nums tracking-tight">
          <span class="s-big text-4xl font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft lg:text-[2.6rem]">{{ s.big }}</span>
          <span v-if="s.unit" class="ml-1 text-lg text-muted">{{ s.unit }}</span>
        </dd>
        <dd class="mt-auto pt-5" aria-hidden="true">
          <svg v-if="s.kind === 'spread'" viewBox="0 0 120 40" class="h-10 w-full overflow-visible">
            <path :d="ASK" class="sv-flow" stroke="var(--color-down)" />
            <path :d="BID" class="sv-flow" stroke="var(--color-up)" />
            <circle cx="120" cy="20" r="6" class="sv-ping" fill="var(--color-accent)" />
            <circle cx="120" cy="20" r="2.5" fill="var(--color-accent)" />
          </svg>

          <div v-else-if="s.kind === 'leverage'" class="flex h-10 items-end gap-0.75">
            <span
              v-for="b in BARS"
              :key="b"
              class="sv-bar flex-1 rounded-full bg-accent"
              :style="{ height: `${18 + (b / BARS) * 82}%`, animationDelay: `${b * 0.08}s` }"
            />
          </div>

          <svg v-else-if="s.kind === 'commission'" viewBox="0 0 120 40" class="h-10 w-full overflow-visible">
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-line-strong)" stroke-width="2" />
            <circle cx="20" cy="20" r="16" fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-dasharray="6 94.5" pathLength="100" class="sv-orbit" />
            <text x="20" y="21" text-anchor="middle" dominant-baseline="middle" class="fill-fg font-mono text-[11px]">0</text>
            <path d="M48 20 H120" stroke="var(--color-line-strong)" stroke-dasharray="2 4" />
            <circle cx="48" cy="20" r="2.5" fill="var(--color-accent)" class="sv-run" />
          </svg>

          <div v-else-if="s.kind === 'instruments'" class="grid h-10 content-between" :style="{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }">
            <span
              v-for="d in COLS * ROWS"
              :key="d"
              class="sv-dot mx-auto size-1 rounded-full bg-fg/30"
              :style="{ animationDelay: `${((d * 37) % 29) / 10}s` }"
            />
          </div>

          <div v-else class="flex h-10 items-center gap-1.5">
            <span
              v-for="(d, k) in DAYS"
              :key="k"
              class="relative grid h-8 flex-1 place-items-center rounded-full font-mono text-[10px]"
              :class="k < 5 ? 'bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] text-accent-soft' : 'border border-line text-muted/50'"
            >
              {{ d }}
              <span v-if="k < 5" class="sv-scan absolute inset-0 rounded-full border border-accent" :style="{ animationDelay: `${k * 0.5}s` }" />
            </span>
          </div>
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.sv-flow { fill: none; stroke-width: 1.5; stroke-linejoin: round; vector-effect: non-scaling-stroke; stroke-dasharray: 4 3; }
.sv-ping { opacity: 0.35; transform-box: fill-box; transform-origin: center; }
.sv-bar { opacity: 0.85; }
.sv-dot { opacity: 0.6; }
.sv-scan { opacity: 0; }

@media (prefers-reduced-motion: no-preference) {
  .sv-flow { animation: flow 1.2s linear infinite; }
  .sv-ping { animation: ping 1.8s var(--ease-out-strong) infinite; }
  .sv-bar { animation: bar 1.6s ease-in-out infinite; }
  .sv-orbit { transform-box: fill-box; transform-origin: center; animation: spin 3s linear infinite; }
  .sv-run { animation: run 2.4s var(--ease-in-out-strong) infinite; }
  .sv-dot { animation: twinkle 3s ease-in-out infinite; }
  .sv-scan { animation: scan 2.5s ease-out infinite; }
}

@keyframes flow { to { stroke-dashoffset: -14; } }
@keyframes ping { from { opacity: 0.6; scale: 0.4; } to { opacity: 0; scale: 2.2; } }
@keyframes bar { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
@keyframes spin { to { rotate: 360deg; } }
@keyframes run { 0% { translate: 0 0; opacity: 0; } 15% { opacity: 1; } 85% { opacity: 1; } 100% { translate: 72px 0; opacity: 0; } }
@keyframes twinkle { 0%, 100% { opacity: 0.25; background: var(--color-fg); } 50% { opacity: 1; background: var(--color-accent); } }
@keyframes scan { 0% { opacity: 0.9; scale: 1; } 40%, 100% { opacity: 0; scale: 1.25; } }
</style>
