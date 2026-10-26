<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhCaretDown, PhCaretUp, PhList, PhX } from '@phosphor-icons/vue'

const CLOSE_DELAY = 140

const root = ref<HTMLElement | null>(null)
const shell = ref<HTMLElement | null>(null)
const pill = ref<HTMLElement | null>(null)
const bar = ref<HTMLElement | null>(null)
const burger = ref<HTMLButtonElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
const active = ref<number | null>(null)
const expandedGroup = ref<number | null>(0)
const menu = ref(false)
const scrolled = ref(false)
const { $lenis } = useNuxtApp()
let timer: ReturnType<typeof setTimeout> | undefined

const open = (i: number) => {
  clearTimeout(timer)
  active.value = i
}
const closeSoon = () => {
  clearTimeout(timer)
  timer = setTimeout(() => { active.value = null }, CLOSE_DELAY)
}
const toggle = (i: number) => { active.value = active.value === i ? null : i }

const movePill = (e: PointerEvent | FocusEvent) => {
  const t = e.currentTarget as HTMLElement
  const ul = pill.value?.parentElement as HTMLElement | null
  if (!pill.value || !t || !ul) return
  const a = t.getBoundingClientRect()
  const b = ul.getBoundingClientRect()
  gsap.to(pill.value, { x: a.left - b.left, width: a.width, opacity: 1, duration: 0.45, ease: 'expo.out', overwrite: 'auto' })
}
const hidePill = () => pill.value && gsap.to(pill.value, { opacity: 0, duration: 0.25 })

const setMenu = (v: boolean) => {
  menu.value = v
  v ? $lenis?.stop() : $lenis?.start()
  nextTick(() => (v ? closeBtn.value : burger.value)?.focus())
}

const onKey = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  if (menu.value) setMenu(false)
  active.value = null
}
const onDoc = (e: PointerEvent) => {
  if (active.value !== null && !shell.value?.contains(e.target as Node)) active.value = null
}
const onDrawerKey = (e: KeyboardEvent) => {
  if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return
  const btns = [...(root.value?.querySelectorAll<HTMLButtonElement>('.drawer-group-btn')) ?? []]
  if (!btns.length) return
  e.preventDefault()
  const i = btns.indexOf(document.activeElement as HTMLButtonElement)
  const next = e.key === 'ArrowDown' ? Math.min(btns.length - 1, i + 1)
    : e.key === 'ArrowUp' ? Math.max(0, i - 1)
    : e.key === 'Home' ? 0 : btns.length - 1
  btns[next]?.focus()
}

onMounted(() => {
  addEventListener('keydown', onKey)
  document.addEventListener('pointerdown', onDoc)
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  removeEventListener('keydown', onKey)
  document.removeEventListener('pointerdown', onDoc)
})

useMotion(root, ({ motion }) => {
  const st = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => { scrolled.value = self.scroll() > 8 } })
  if (bar.value) gsap.to(bar.value, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  if (motion) gsap.fromTo(gsap.utils.selector(root.value)('.nav-item'), { y: -8, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.04, duration: 0.7 })
  return () => st.kill()
})
</script>

<template>
  <header ref="root" class="sticky top-0 z-50">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink">Skip to main content</a>
    <div ref="shell" class="sf-nav glass relative border-b transition-colors duration-300" :class="scrolled ? 'border-line' : 'border-transparent'">
      <nav class="wrap relative flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <NuxtLink to="/" class="nav-item sf-logo shrink-0" aria-label="Artix Capital home">
          <BrandLogo class="h-7 w-auto sm:h-8" />
        </NuxtLink>

        <ul class="relative hidden items-center lg:flex" @pointerleave="hidePill">
          <span ref="pill" class="absolute left-0 top-1/2 h-9 w-0 -translate-y-1/2 rounded-full bg-white/6 opacity-0" aria-hidden="true" />
          <li
            v-for="(g, i) in NAV"
            :key="g.label"
            class="nav-item relative"
            @pointerenter="open(i)"
            @pointerleave="closeSoon"
          >
            <button
              type="button"
              class="sf-link relative flex h-9 items-center gap-1 rounded-full px-3.5 font-roboto text-[0.95rem] font-medium tracking-wide text-fg/80 transition-colors hover:text-fg"
              :class="active === i ? 'text-fg' : ''"
              :aria-expanded="active === i"
              :aria-controls="`mega-${i}`"
              @pointerenter="movePill"
              @focus="movePill"
              @click="toggle(i)"
            >
              {{ g.label }}
              <PhCaretDown :size="11" weight="bold" class="text-muted transition-transform duration-200" :class="active === i ? 'rotate-180' : ''" />
            </button>
            <div :id="`mega-${i}`" class="mega absolute left-1/2 top-full pt-3" :data-open="active === i">
              <ul class="w-80 rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)]">
                <li v-for="(it, j) in g.items" :key="it.label" class="mega-item" :style="{ '--i': j }">
                  <NuxtLink :to="it.href" class="group flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-white/4" :tabindex="active === i ? 0 : -1" @click="active = null">
                    <span class="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:text-accent-soft">
                      <component :is="it.icon" :size="18" />
                    </span>
                    <span class="min-w-0">
                      <span class="block text-sm font-medium">{{ it.label }}</span>
                      <span class="block truncate text-xs text-muted">{{ it.desc }}</span>
                    </span>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="flex shrink-0 items-center gap-2">
          <a :href="LOGIN" class="sf-link nav-item hidden h-10 items-center px-3 font-roboto text-[0.95rem] font-medium tracking-wide text-fg/80 transition-colors hover:text-fg xl:inline-flex">Log in</a>
          <a :href="SIGNUP" class="nav-item btn btn-primary h-10 px-5 text-sm">Open account</a>
          <button
            ref="burger"
            type="button"
            class="nav-item grid size-10 place-items-center rounded-full border border-line-strong lg:hidden"
            aria-controls="mobile-drawer"
            :aria-expanded="menu"
            aria-label="Open menu"
            @click="setMenu(true)"
          >
            <PhList :size="18" />
          </button>
        </div>

      </nav>
      <span class="pointer-events-none absolute inset-x-0 -bottom-px h-px overflow-hidden" aria-hidden="true">
        <span ref="bar" class="block h-full origin-left scale-x-0 bg-accent-soft" />
      </span>
    </div>

    <div
      id="mobile-drawer"
      class="drawer fixed inset-0 z-60 flex flex-col bg-canvas lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      :data-open="menu"
      :inert="!menu"
    >
      <div class="wrap flex h-16 shrink-0 items-center justify-between border-b border-line">
        <BrandLogo class="h-7 w-auto" />
        <button ref="closeBtn" type="button" class="grid size-10 place-items-center rounded-full border border-line-strong" aria-label="Close menu" @click="setMenu(false)">
          <PhX :size="18" />
        </button>
      </div>

      <div class="wrap min-h-0 flex-1 overflow-y-auto py-4" @keydown="onDrawerKey">
        <div v-for="(g, i) in NAV" :key="g.label" class="d-group border-b border-line" :style="{ '--i': i }">
          <button
            type="button"
            class="drawer-group-btn flex w-full items-center justify-between py-4 text-left text-xl font-semibold tracking-tight"
            :aria-expanded="expandedGroup === i"
            :aria-controls="`dgroup-${i}`"
            @click="expandedGroup = expandedGroup === i ? null : i"
          >
            {{ g.label }}
            <component :is="expandedGroup === i ? PhCaretUp : PhCaretDown" :size="14" weight="bold" class="text-muted" aria-hidden="true" />
          </button>
          <div :id="`dgroup-${i}`" class="grid transition-[grid-template-rows,opacity] duration-300 ease-out" :class="expandedGroup === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <ul class="min-h-0 overflow-hidden">
              <li v-for="it in g.items" :key="it.label">
                <NuxtLink :to="it.href" class="flex items-center gap-3 py-2.5 text-fg/85 transition-colors hover:text-fg" :tabindex="expandedGroup === i ? 0 : -1" @click="setMenu(false)">
                  <component :is="it.icon" :size="18" class="shrink-0 text-muted" aria-hidden="true" />
                  <span class="min-w-0">
                    <span class="block">{{ it.label }}</span>
                    <span class="block truncate text-xs text-muted">{{ it.desc }}</span>
                  </span>
                </NuxtLink>
              </li>
            </ul>
            <span class="block h-3" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div class="d-cta wrap grid shrink-0 grid-cols-2 gap-3 border-t border-line py-4">
        <a :href="LOGIN" class="btn btn-ghost h-12 px-4 text-sm">Log in</a>
        <a :href="SIGNUP" class="btn btn-primary h-12 px-4 text-sm">Open account</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.mega {
  opacity: 0; visibility: hidden; transform: translate(-50%, -6px) scale(0.97); transform-origin: top center;
  transition: opacity 180ms var(--ease-out-strong), transform 220ms var(--ease-out-strong), visibility 0s 220ms;
}
.mega[data-open="true"] { opacity: 1; visibility: visible; transform: translate(-50%, 0) scale(1); transition-delay: 0s; }
.mega-item { opacity: 0; transform: translateY(4px); transition: opacity 160ms ease, transform 200ms var(--ease-out-strong); }
.mega[data-open="true"] .mega-item { opacity: 1; transform: none; transition-delay: calc(var(--i) * 25ms); }

.drawer { visibility: hidden; opacity: 0; transition: opacity 200ms ease, visibility 0s 200ms; }
.drawer[data-open="true"] { visibility: visible; opacity: 1; transition-delay: 0s; }
.d-group { opacity: 0; transform: translateY(14px); transition: opacity 260ms ease, transform 420ms var(--ease-out-expo); }
.drawer[data-open="true"] .d-group { opacity: 1; transform: none; transition-delay: calc(60ms + var(--i) * 35ms); }
.d-cta { opacity: 0; transform: translateY(10px); transition: opacity 240ms ease, transform 380ms var(--ease-out-expo); }
.drawer[data-open="true"] .d-cta { opacity: 1; transform: none; transition-delay: 260ms; }

.sf-nav::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0.55;
  background-image: linear-gradient(color-mix(in oklab, var(--color-accent) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--color-accent) 7%, transparent) 1px, transparent 1px);
  background-size: 32px 32px; mask-image: linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent);
}
.sf-link { position: relative; text-shadow: 0 0 0 transparent; transition: color 220ms ease, text-shadow 320ms ease; }
.sf-link:hover { text-shadow: 0 0 14px color-mix(in oklab, var(--color-accent) 55%, transparent); }
.sf-logo { transition: filter 360ms ease; }
.sf-logo:hover { filter: drop-shadow(0 0 10px color-mix(in oklab, var(--color-accent) 45%, transparent)); }

@media (prefers-reduced-motion: reduce) {
  .d-group, .d-cta { transform: none; transition: opacity 200ms ease; }
}
</style>
