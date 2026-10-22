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
  let hidden = false
  const st = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: self => {
      scrolled.value = self.scroll() > 40
      if (!motion || menu.value) return
      const hide = self.direction === 1 && self.scroll() > 240 && active.value === null
      if (hide === hidden) return
      hidden = hide
      gsap.to(shell.value, { yPercent: hide ? -160 : 0, duration: 0.5, ease: hide ? 'power3.in' : 'expo.out', overwrite: 'auto' })
    }
  })
  if (bar.value) gsap.to(bar.value, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } })
  if (!motion) return () => st.kill()
  const q = gsap.utils.selector(root.value)
  const tl = gsap.timeline({ paused: true })
    .fromTo(shell.value, { yPercent: -160, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.1, ease: 'expo.out' })
    .fromTo(q('.nav-item'), { y: -16, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.8 }, 0.25)
  tl.play()
  return () => st.kill()
})
</script>

<template>
  <header ref="root" class="fixed inset-x-0 top-0 z-50">
    <a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-60 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink">Skip to main content</a>
    <div class="wrap pt-2.5 sm:pt-4">
      <nav
        ref="shell"
        class="glass glass-blur relative flex h-14 items-center justify-between gap-2 rounded-2xl pl-3.5 pr-2 transition-[background-color,border-color] duration-300 sm:h-16 sm:rounded-full sm:pl-5"
        :class="scrolled ? 'bg-[rgb(13_14_21/0.78)]' : ''"
        aria-label="Primary"
      >
        <NuxtLink to="/" class="nav-item shrink-0" aria-label="Artix Capital home">
          <BrandLogo class="h-6 w-auto text-fg sm:h-7" />
        </NuxtLink>

        <ul class="relative hidden items-center lg:flex" @pointerleave="hidePill">
          <span ref="pill" class="absolute left-0 top-1/2 h-10 w-0 -translate-y-1/2 rounded-full bg-white/8 opacity-0" aria-hidden="true" />
          <li
            v-for="(g, i) in NAV"
            :key="g.label"
            class="nav-item relative"
            @pointerenter="open(i)"
            @pointerleave="closeSoon"
          >
            <button
              type="button"
              class="relative flex h-10 items-center gap-1 rounded-full px-3.5 text-sm font-medium text-fg/80 transition-colors hover:text-fg"
              :aria-expanded="active === i"
              :aria-controls="`mega-${i}`"
              @pointerenter="movePill"
              @focus="movePill"
              @click="toggle(i)"
            >
              {{ g.label }}
              <PhCaretDown :size="12" weight="bold" class="transition-transform duration-300" :class="active === i ? 'rotate-180' : ''" />
            </button>
            <div :id="`mega-${i}`" class="mega absolute left-1/2 top-full pt-3" :data-open="active === i">
              <ul class="glass w-80 rounded-3xl bg-[rgb(14_15_22/0.92)] p-2">
                <li v-for="(it, j) in g.items" :key="it.label" class="mega-item" :style="{ '--i': j }">
                  <NuxtLink :to="it.href" class="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-white/6" :tabindex="active === i ? 0 : -1">
                    <span class="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/4 text-steel transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-accent/10">
                      <component :is="it.icon" :size="20" />
                    </span>
                    <span class="min-w-0">
                      <span class="block text-sm font-bold">{{ it.label }}</span>
                      <span class="block truncate text-xs text-muted">{{ it.desc }}</span>
                    </span>
                    <PhCaretDown :size="13" class="ml-auto rotate-90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-steel" />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <a :href="LOGIN" class="nav-item btn btn-ghost hidden h-10 px-4 text-sm xl:inline-flex sm:h-11">Log in</a>
          <a href="/contact-us/" class="nav-item btn btn-ghost hidden h-10 px-4 text-sm sm:inline-flex lg:hidden">Contact</a>
          <a v-magnetic="0.25" :href="SIGNUP" class="nav-item btn btn-primary h-10 px-4 text-xs sm:h-11 sm:px-5 sm:text-sm">Open account</a>
          <button
            ref="burger"
            type="button"
            class="nav-item grid size-10 place-items-center rounded-xl border border-white/15 lg:hidden sm:size-11 sm:rounded-full"
            aria-controls="mobile-drawer"
            :aria-expanded="menu"
            aria-label="Open menu"
            @click="setMenu(true)"
          >
            <PhList :size="19" />
          </button>
        </div>

        <span class="pointer-events-none absolute inset-x-4 bottom-0 h-px overflow-hidden sm:inset-x-6" aria-hidden="true">
          <span ref="bar" class="block h-full origin-left scale-x-0 bg-accent" />
        </span>
      </nav>
    </div>

    <div
      id="mobile-drawer"
      class="drawer fixed inset-x-2 top-17 bottom-0 z-60 flex flex-col rounded-3xl bg-[rgb(12_13_20/0.97)] border border-white/10 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.8)] overflow-hidden sm:top-21 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      :data-open="menu"
      :inert="!menu"
    >
      <div class="flex items-center justify-between border-b border-white/8 px-5 h-14 shrink-0">
        <span class="font-mono text-xs uppercase tracking-[0.2em] text-muted">Menu</span>
        <button ref="closeBtn" type="button" class="grid size-10 place-items-center rounded-full border border-white/15" aria-label="Close menu" @click="setMenu(false)">
          <PhX :size="18" />
        </button>
      </div>

      <div class="min-h-0 flex-1 overflow-y-auto px-2.5 py-3" @keydown="onDrawerKey">
        <div v-for="(g, i) in NAV" :key="g.label" class="d-group" :style="{ '--i': i }">
          <button
            type="button"
            class="drawer-group-btn flex w-full items-center justify-between rounded-2xl px-3.5 py-3 text-left text-lg font-bold transition-colors hover:bg-white/4"
            :aria-expanded="expandedGroup === i"
            :aria-controls="`dgroup-${i}`"
            @click="expandedGroup = expandedGroup === i ? null : i"
          >
            {{ g.label }}
            <span class="grid size-8 shrink-0 place-items-center rounded-full border border-white/12 text-steel transition-colors" :class="expandedGroup === i ? 'bg-accent border-accent text-ink' : ''" aria-hidden="true">
              <component :is="expandedGroup === i ? PhCaretUp : PhCaretDown" :size="13" weight="bold" />
            </span>
          </button>
          <div :id="`dgroup-${i}`" class="grid transition-[grid-template-rows] duration-500 ease-out" :class="expandedGroup === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'">
            <ul class="min-h-0 overflow-hidden pl-3.5">
              <li v-for="it in g.items" :key="it.label">
                <NuxtLink :to="it.href" class="flex items-center gap-3 rounded-xl py-2.5 pr-3 text-base font-medium text-fg/85 transition-colors hover:text-fg" @click="setMenu(false)">
                  <span class="grid size-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/4 text-steel" aria-hidden="true">
                    <component :is="it.icon" :size="15" />
                  </span>
                  <span class="min-w-0">
                    <span class="block">{{ it.label }}</span>
                    <span class="block truncate text-xs text-muted">{{ it.desc }}</span>
                  </span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="d-cta shrink-0 grid grid-cols-2 gap-2.5 border-t border-white/8 p-4">
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
.mega-item { opacity: 0; transform: translateY(6px); transition: opacity 200ms ease, transform 260ms var(--ease-out-strong); }
.mega[data-open="true"] .mega-item { opacity: 1; transform: none; transition-delay: calc(var(--i) * 35ms); }

.drawer { visibility: hidden; }
.drawer[data-open="true"] { visibility: visible; }
.d-group { opacity: 0; transform: translateY(14px); transition: opacity 260ms ease, transform 420ms var(--ease-out-expo); }
.drawer[data-open="true"] .d-group { opacity: 1; transform: none; transition-delay: calc(80ms + var(--i) * 55ms); }
.d-cta { opacity: 0; transform: translateY(10px); transition: opacity 240ms ease, transform 380ms var(--ease-out-expo); }
.drawer[data-open="true"] .d-cta { opacity: 1; transform: none; transition-delay: 480ms; }

@media (prefers-reduced-motion: reduce) {
  .d-group, .d-cta { transform: none; transition: opacity 200ms ease; }
}
</style>
