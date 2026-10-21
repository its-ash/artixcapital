<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUp } from '@phosphor-icons/vue'

const COLS = [NAV[0], NAV[2], NAV[1], NAV[4]].filter(g => !!g)
const YEAR = new Date().getFullYear()

const root = ref<HTMLElement | null>(null)
const { $lenis } = useNuxtApp()

const toTop = () => ($lenis ? $lenis.scrollTo(0, { duration: 1.6 }) : scrollTo({ top: 0, behavior: 'smooth' }))

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.ft-col'), { y: 40, opacity: 0, stagger: 0.08, duration: 1, scrollTrigger: { trigger: root.value, start: 'top 90%' } })
  const st = { trigger: q('.ft-logo')[0], start: 'top bottom', end: 'bottom bottom', scrub: 1 }
  gsap.from(q('.ft-logo .logo-word > *'), { yPercent: 110, opacity: 0, stagger: 0.06, ease: 'none', scrollTrigger: st })
  gsap.from(q('.ft-logo .logo-x > *'), { x: () => gsap.utils.random(-200, 200), y: () => gsap.utils.random(-200, 50), rotate: () => gsap.utils.random(-180, 180), opacity: 0, svgOrigin: '956 172', stagger: 0.04, ease: 'none', scrollTrigger: st })
})
</script>

<template>
  <footer ref="root" class="relative overflow-hidden border-t border-white/10 bg-[rgb(10_10_16/0.88)] pt-20">
    <div class="wrap">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="ft-col lg:col-span-4">
          <BrandLogo class="h-9 w-auto text-fg" />
          <p class="mt-5 max-w-xs text-muted">A forex and CFD broker giving traders access to global markets on nTrader and MetaTrader 5.</p>
          <ul class="mt-6 grid gap-2 text-sm">
            <li><a :href="`tel:${PHONE.replace(/\s/g, '')}`" class="hover:text-accent-soft">{{ PHONE }}</a></li>
            <li><a :href="`mailto:${EMAIL}`" class="hover:text-accent-soft">{{ EMAIL }}</a></li>
            <li class="text-muted">{{ OFFICE }}</li>
          </ul>
        </div>
        <nav v-for="g in COLS" :key="g.label" class="ft-col lg:col-span-2" :aria-label="g.label">
          <h2 class="text-sm font-bold">{{ g.label }}</h2>
          <ul class="mt-4 grid gap-2.5 text-sm text-muted">
            <li v-for="it in g.items" :key="it.label">
              <a :href="it.href" class="inline-block transition-[color,translate] duration-300 hover:translate-x-1 hover:text-fg">{{ it.label }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="ft-col mt-16 grid gap-6 border-t border-white/10 pt-8 lg:grid-cols-12">
        <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted lg:col-span-9">
          <li v-for="p in POLICIES" :key="p.label"><a :href="p.href" class="hover:text-fg" target="_blank" rel="noopener">{{ p.label }}</a></li>
        </ul>
        <div class="flex lg:col-span-3 lg:justify-end">
          <button v-magnetic="0.3" type="button" class="btn btn-ghost h-11 px-5 text-sm" @click="toTop">
            Back to top <PhArrowUp :size="16" weight="bold" />
          </button>
        </div>
      </div>

      <div class="ft-col mt-8 grid gap-3 text-xs leading-relaxed text-muted">
        <p>
          <strong class="text-fg/80">Risk warning:</strong> Forex and CFDs are leveraged products and carry a high level of risk. Leverage works against you as well as for you, and you can lose more than your initial investment. Prices can move fast, and past performance does not guarantee future results. Trading may not suit every investor, so make sure you understand the risks, and check that trading is legal where you live, before you open an account.
        </p>
        <p>
          Artix Capital Ltd is an International Business Company registered in Saint Lucia (registration number 2023-00122). It is not licensed or regulated as a financial services provider in Saint Lucia. Services are not available to residents of the countries listed in our FAQ.
        </p>
      </div>

      <div class="ft-logo mt-16 overflow-hidden pb-6" aria-hidden="true">
        <BrandLogo class="w-full text-fg/90" label="" />
      </div>

      <p class="border-t border-white/10 py-6 text-xs text-muted">&copy; {{ YEAR }} Artix Capital Ltd. All rights reserved.</p>
    </div>
  </footer>
</template>
