<script setup lang="ts">
import { PhArrowUp } from '@phosphor-icons/vue'

const COLS = [NAV[0], NAV[2], NAV[1], NAV[3], NAV[4], NAV[5]].filter(g => !!g)
const YEAR = new Date().getFullYear()

const { $lenis } = useNuxtApp()

const toTop = () => ($lenis ? $lenis.scrollTo(0, { duration: 1.2 }) : scrollTo({ top: 0, behavior: 'smooth' }))
</script>

<template>
  <footer class="border-t border-line bg-surface/40">
    <div class="wrap pt-20">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <BrandLogo class="h-9 w-auto" />
          <p class="mt-6 max-w-xs leading-relaxed text-muted">A forex and CFD broker giving traders access to global markets on nTrader and MetaTrader 5.</p>
          <ul class="mt-6 grid gap-2 text-sm">
            <li><a :href="`tel:${PHONE.replace(/\s/g, '')}`" class="transition-colors hover:text-accent-soft">{{ PHONE }}</a></li>
            <li><a :href="`mailto:${EMAIL}`" class="transition-colors hover:text-accent-soft">{{ EMAIL }}</a></li>
            <li class="text-muted">{{ OFFICE }}</li>
          </ul>
        </div>
        <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-8">
          <nav v-for="g in COLS" :key="g.label" :aria-label="g.label">
            <h2 class="text-sm font-medium">{{ g.label }}</h2>
            <ul class="mt-4 grid gap-2.5 text-sm text-muted">
              <li v-for="it in g.items" :key="it.label">
                <NuxtLink :to="it.href" class="transition-colors hover:text-fg">{{ it.label }}</NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div class="mt-16 flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-start lg:justify-between">
        <ul class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <li v-for="p in POLICIES" :key="p.label"><a :href="p.href" class="transition-colors hover:text-fg" target="_blank" rel="noopener">{{ p.label }}</a></li>
        </ul>
        <button type="button" class="btn btn-ghost h-10 shrink-0 self-start px-4 text-sm" @click="toTop">
          Back to top <PhArrowUp :size="14" weight="bold" />
        </button>
      </div>

      <div class="mt-8 grid max-w-5xl gap-3 text-xs leading-relaxed text-muted">
        <p>
          <strong class="font-medium text-fg/80">Risk warning:</strong> Forex and CFDs are leveraged products and carry a high level of risk. Leverage works against you as well as for you, and you can lose more than your initial investment. Prices can move fast, and past performance does not guarantee future results. Trading may not suit every investor, so make sure you understand the risks, and check that trading is legal where you live, before you open an account.
        </p>
        <p>
          Artix Capital Ltd is an International Business Company registered in Saint Lucia (registration number 2023-00122). It is not licensed or regulated as a financial services provider in Saint Lucia. Services are not available to residents of the countries listed in our FAQ.
        </p>
      </div>

      <p class="mt-10 border-t border-line py-6 text-xs text-muted">&copy; {{ YEAR }} Artix Capital Ltd. All rights reserved.</p>
    </div>
  </footer>
</template>
