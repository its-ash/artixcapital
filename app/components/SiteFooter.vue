<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowUp, PhArrowUpRight, PhEnvelopeSimple, PhFilePdf, PhMapPin, PhPhone } from '@phosphor-icons/vue'

const MARK = 'Artix Capital'.split('')

const COLS = [NAV[0], NAV[2], NAV[1], NAV[3], NAV[4], NAV[5]].filter(g => !!g)
const YEAR = new Date().getFullYear()
const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE)}`
const DISCLOSURE = POLICIES.find(p => p.label === 'Risk Disclosure')?.href ?? SITE

const CONTACT = [
  { icon: PhPhone, label: 'Phone', value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { icon: PhEnvelopeSimple, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: PhMapPin, label: 'Registered office', value: OFFICE, href: MAP, ext: true }
]

const ENTITY = [
  { k: 'Company', v: COMPANY },
  { k: 'Registration no.', v: REG_NO },
  { k: 'Type', v: 'International Business Company (IBC)' }
]

const root = ref<HTMLElement | null>(null)
const { $lenis } = useNuxtApp()

const toTop = () => ($lenis ? $lenis.scrollTo(0, { duration: 1.2 }) : scrollTo({ top: 0, behavior: 'smooth' }))

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.ft-mark'), { yPercent: 45, ease: 'none', scrollTrigger: { trigger: q('.ft-mark')[0], start: 'top bottom', end: 'bottom bottom', scrub: true } })
})
</script>

<template>
  <footer ref="root" class="relative overflow-hidden border-t border-line" aria-labelledby="ft-title">
    <h2 id="ft-title" class="sr-only">Site footer</h2>

    <div class="wrap pt-20">
      <div class="grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <BrandLogo class="h-9 w-auto" />
          <p class="mt-6 max-w-sm text-pretty leading-relaxed text-muted">
            {{ COMPANY }} is a global forex and CFD brokerage, giving traders access to global financial markets on nTrader and MetaTrader 5.
          </p>

          <ul class="mt-8 grid gap-2">
            <li v-for="c in CONTACT" :key="c.label">
              <a
                :href="c.href"
                :target="c.ext ? '_blank' : undefined"
                :rel="c.ext ? 'noopener' : undefined"
                class="group flex items-start gap-4 rounded-2xl border border-line bg-surface/60 p-4 transition-[border-color,background-color] duration-200 hover:border-line-strong hover:bg-surface"
              >
                <span class="grid size-10 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] text-accent-soft">
                  <component :is="c.icon" :size="18" weight="bold" />
                </span>
                <span class="min-w-0 flex-1">
                  <span class="block text-xs text-muted">{{ c.label }}</span>
                  <span class="mt-0.5 block text-sm leading-snug text-fg">{{ c.value }}</span>
                </span>
                <PhArrowUpRight :size="16" class="mt-1 shrink-0 text-muted transition-[color,translate] duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        <div class="ft-cols grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:col-span-7 lg:pl-8">
          <nav v-for="g in COLS" :key="g.label" class="ft-col" :aria-label="g.label">
            <h3 class="accent-rule pt-4 text-sm font-medium">{{ g.label }}</h3>
            <ul class="mt-4 grid gap-3 text-sm text-muted">
              <li v-for="it in g.items" :key="it.label">
                <NuxtLink :to="it.href" class="group inline-flex items-center gap-1.5 transition-colors duration-200 hover:text-fg">
                  {{ it.label }}
                  <PhArrowUpRight :size="12" class="opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <section class="mt-20 grid overflow-hidden rounded-2xl border border-line bg-surface/60 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]" aria-labelledby="ft-legal">
        <div class="border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0">
          <h3 id="ft-legal" class="text-lg font-semibold tracking-tight">Corporate information</h3>
          <dl class="mt-6 grid gap-4 text-sm">
            <div v-for="e in ENTITY" :key="e.k" class="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt class="text-muted">{{ e.k }}</dt>
              <dd class="text-fg">{{ e.v }}</dd>
            </div>
            <div class="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt class="text-muted">Registered office</dt>
              <dd><a :href="MAP" target="_blank" rel="noopener" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">{{ OFFICE }}</a></dd>
            </div>
            <div class="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-4">
              <dt class="text-muted">Corporate email</dt>
              <dd><a :href="`mailto:${EMAIL}`" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">{{ EMAIL }}</a></dd>
            </div>
          </dl>
          <p class="mt-6 rounded-xl border border-line bg-canvas/60 p-4 text-sm leading-relaxed text-muted">
            The company operates as an offshore entity that gives international clients access to an online trading platform. {{ COMPANY }} is <strong class="font-medium text-fg">not licensed or regulated</strong> as a financial services provider in Saint Lucia.
          </p>

          <h4 class="mt-8 text-sm font-medium">Legal documents</h4>
          <ul class="mt-3 flex flex-wrap gap-2">
            <li v-for="p in POLICIES" :key="p.label">
              <a :href="p.href" target="_blank" rel="noopener" class="chip inline-flex h-9 items-center gap-2 rounded-full px-3.5 text-xs transition-colors duration-200 hover:border-line-strong hover:text-accent-soft">
                <PhFilePdf :size="14" aria-hidden="true" />{{ p.label }}
              </a>
            </li>
          </ul>
        </div>

        <div class="grid content-start gap-8 p-6 text-sm leading-relaxed text-muted sm:p-8">
          <div>
            <h3 class="text-lg font-semibold tracking-tight text-fg">Risk statement</h3>
            <p class="mt-4 text-pretty">
              An investment in derivatives may mean investors may lose an amount even greater than their original investment. Anyone wishing to invest in any of the products mentioned in <a :href="SITE" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">www.artixcapital.com</a> should seek their own financial or professional advice. Trading of securities, forex, stock market, commodities, options and futures may not be suitable for everyone and involves the risk of losing part or all of your money. Trading in the financial markets has large potential rewards, but also large potential risk. You must be aware of the risks and be willing to accept them in order to invest in the markets. Don't invest and trade with money which you can't afford to lose. Forex trading is not allowed in some countries. Before investing your money, make sure your country allows it.
            </p>
            <p class="mt-3 text-pretty">
              You are strongly advised to obtain independent financial, legal and tax advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or construed as constituting advice on the part of {{ COMPANY }} or any of its affiliates, directors, officers or employees. Read the full <a :href="DISCLOSURE" target="_blank" rel="noopener" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">Risk Disclosure</a>.
            </p>
          </div>

          <div class="border-t border-line pt-8">
            <h3 class="text-lg font-semibold tracking-tight text-fg">Restricted regions</h3>
            <ul class="mt-4 flex flex-wrap gap-2" aria-label="Countries we do not serve">
              <li v-for="r in RESTRICTED" :key="r.code" class="inline-flex h-8 items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] px-3 text-xs text-fg">
                <img :src="`/flags/${r.code}.svg`" alt="" width="18" height="12" loading="lazy" decoding="async" class="h-3 w-[1.125rem] rounded-[2px] object-cover ring-1 ring-line-strong" />{{ r.name.replace(/^the /, '') }}
              </li>
            </ul>
            <p class="mt-4 text-pretty">
              {{ COMPANY }} does not provide services for citizens/residents of {{ RESTRICTED_LIST }}. The services of {{ COMPANY }} are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. Information on this site is not directed at residents in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.
            </p>
          </div>
        </div>
      </section>

      <div class="mt-10 flex flex-col-reverse gap-4 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>&copy; {{ YEAR }} {{ COMPANY }}. All rights reserved. Registration no. {{ REG_NO }}.</p>
        <button type="button" class="btn btn-ghost h-10 shrink-0 self-start px-4 text-sm sm:self-auto" @click="toTop">
          Back to top <PhArrowUp :size="14" weight="bold" />
        </button>
      </div>
    </div>

    <div class="pointer-events-none select-none overflow-hidden" aria-hidden="true">
      <p class="ft-mark wrap mb-[-0.1em] whitespace-nowrap text-center text-[clamp(3.5rem,15vw,13rem)] font-bold leading-none tracking-[-0.06em] text-muted/35 [-webkit-text-stroke:1px_var(--color-fg)]">
        <span v-for="(c, i) in MARK" :key="i" class="ft-ch" :style="{ '--i': i }">{{ c === ' ' ? ' ' : c }}</span>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.ft-ch { display: inline-block; animation: ft-wave 4.8s ease-in-out infinite; animation-delay: calc(var(--i) * 140ms); }

@keyframes ft-wave {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-0.07em); }
}

@media (prefers-reduced-motion: reduce) {
  .ft-ch { animation: none; }
}
</style>
