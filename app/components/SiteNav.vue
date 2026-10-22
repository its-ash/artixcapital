<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowRight, PhCaretDown, PhList, PhX } from '@phosphor-icons/vue'

const CLOSE_DELAY = 140

const root = ref<HTMLElement | null>(null)
const shell = ref<HTMLElement | null>(null)
const pill = ref<HTMLElement | null>(null)
const bar = ref<HTMLElement | null>(null)
const burger = ref<HTMLButtonElement | null>(null)
const closeBtn = ref<HTMLButtonElement | null>(null)
const active = ref<number | null>(null)
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
  if (!pill.value || !t) return
  gsap.to(pill.value, { x: t.offsetLeft, width: t.offsetWidth, opacity: 1, duration: 0.45, ease: 'expo.out' })
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
    <div class="wrap pt-3 sm:pt-4">
      <nav
        ref="shell"
        class="glass glass-blur relative flex h-16 items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-[background-color,border-color] duration-300"
        :class="scrolled ? 'bg-[rgb(16_17_26/0.72)]' : ''"
        aria-label="Primary"
      >
        <a href="#top" class="nav-item shrink-0" aria-label="Artix Capital home">
          <BrandLogo class="h-7 w-auto text-fg" />
        </a>

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
                  <a :href="it.href" class="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-white/6" :tabindex="active === i ? 0 : -1">
                    <span class="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/4 text-steel transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-accent/10">
                      <component :is="it.icon" :size="20" />
                    </span>
                    <span class="min-w-0">
                      <span class="block text-sm font-bold">{{ it.label }}</span>
                      <span class="block truncate text-xs text-muted">{{ it.desc }}</span>
                    </span>
                    <PhArrowRight :size="14" class="ml-auto -translate-x-1 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="flex shrink-0 items-center gap-2">
          <a :href="LOGIN" class="nav-item btn btn-ghost hidden h-11 px-5 text-sm xl:inline-flex">Log in</a>
          <a v-magnetic="0.25" :href="SIGNUP" class="nav-item btn btn-primary h-11 px-5 text-sm">Open account</a>
          <button
            ref="burger"
            type="button"
            class="nav-item grid size-11 place-items-center rounded-full border border-white/15 lg:hidden"
            aria-controls="mobile-menu"
            :aria-expanded="menu"
            aria-label="Open menu"
            @click="setMenu(true)"
          >
            <PhList :size="20" />
          </button>
        </div>

        <span class="pointer-events-none absolute inset-x-6 bottom-0 h-px overflow-hidden" aria-hidden="true">
          <span ref="bar" class="block h-full origin-left scale-x-0 bg-accent" />
        </span>
      </nav>
    </div>

    <div
      id="mobile-menu"
      class="mobile fixed inset-0 z-70 overflow-y-auto bg-[rgb(10_11_16/0.97)] lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      :data-open="menu"
      :inert="!menu"
    >
      <div class="wrap flex min-h-full flex-col pb-10 pt-5">
        <div class="flex items-center justify-between">
          <BrandLogo class="h-7 w-auto text-fg" />
          <button ref="closeBtn" type="button" class="grid size-11 place-items-center rounded-full border border-white/15" aria-label="Close menu" @click="setMenu(false)">
            <PhX :size="20" />
          </button>
        </div>
        <div class="mt-10 grid gap-8 sm:grid-cols-2">
          <section v-for="(g, i) in NAV" :key="g.label" class="m-item" :style="{ '--i': i }">
            <h2 class="font-mono text-xs uppercase tracking-[0.2em] text-muted">{{ g.label }}</h2>
            <ul class="mt-3 grid gap-1">
              <li v-for="it in g.items" :key="it.label">
                <a :href="it.href" class="flex items-center gap-3 py-1.5 text-xl font-medium" @click="setMenu(false)">
                  <component :is="it.icon" :size="18" class="text-accent-soft" />{{ it.label }}
                </a>
              </li>
            </ul>
          </section>
        </div>
        <div class="m-item mt-auto flex gap-3 pt-10" :style="{ '--i': NAV.length }">
          <a :href="LOGIN" class="btn btn-ghost h-12 flex-1 px-6">Log in</a>
          <a :href="SIGNUP" class="btn btn-primary h-12 flex-1 px-6">Open account</a>
        </div>
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

.mobile {
  clip-path: circle(0% at calc(100% - 3rem) 2.5rem); visibility: hidden;
  transition: clip-path 420ms var(--ease-in-out-strong), visibility 0s 420ms;
}
.mobile[data-open="true"] { clip-path: circle(150% at calc(100% - 3rem) 2.5rem); visibility: visible; transition: clip-path 700ms var(--ease-in-out-strong), visibility 0s; }
.m-item { opacity: 0; transform: translateY(24px); transition: opacity 300ms ease, transform 500ms var(--ease-out-expo); }
.mobile[data-open="true"] .m-item { opacity: 1; transform: none; transition-delay: calc(200ms + var(--i) * 60ms); }

@media (prefers-reduced-motion: reduce) {
  .mobile, .mobile[data-open="true"] { clip-path: none; transition: visibility 0s; }
  .m-item, .mega-item { transform: none; }
}
</style>
