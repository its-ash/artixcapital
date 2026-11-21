<script setup lang="ts">
import { PhArrowUp, PhArrowUpRight, PhEnvelopeSimple, PhFilePdf, PhMapPin, PhPhone } from '@phosphor-icons/vue'

const COLS = [NAV[0], NAV[1], NAV[2], NAV[3], NAV[4], NAV[5]].filter(g => !!g)
const YEAR = new Date().getFullYear()
const MAP = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE)}`
const DISCLOSURE = POLICIES.find(p => p.label === 'Risk Disclosure')?.href ?? SITE

const SOCIAL = [
  { icon: PhPhone, label: `Call ${PHONE}`, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { icon: PhEnvelopeSimple, label: `Email ${EMAIL}`, href: `mailto:${EMAIL}` },
  { icon: PhMapPin, label: 'Office location', href: MAP, ext: true },
  { icon: PhArrowUpRight, label: 'Client portal', href: LOGIN, ext: true }
]

const ENTITY = [
  { k: 'Company', v: COMPANY },
  { k: 'Registration no.', v: REG_NO },
  { k: 'Type', v: 'International Business Company (IBC)' }
]

const email = ref('')
const toTop = () => scrollTo({ top: 0, behavior: 'smooth' })
const onStart = () => {
  const url = email.value ? `${SIGNUP}?email=${encodeURIComponent(email.value)}` : SIGNUP
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <footer class="cv-auto section-rule relative overflow-hidden bg-canvas" style="--cv-h: 1120px" aria-labelledby="ft-title">
    <h2 id="ft-title" class="sr-only">Site footer</h2>

    <div class="wrap relative z-10 pt-10 sm:pt-12">
      <div class="grid gap-4 lg:grid-cols-[minmax(0,19.5rem)_1fr] lg:items-stretch">
        <div
          class="flex flex-col justify-between rounded-2xl bg-[linear-gradient(155deg,color-mix(in_oklab,var(--color-accent)_92%,#fff_8%),color-mix(in_oklab,var(--color-accent)_82%,#000_18%))] p-5 text-on-accent shadow-[inset_0_1px_0_oklch(1_0_0/0.24),0_24px_60px_-20px_color-mix(in_oklab,var(--color-accent)_36%,oklch(0_0_0/0.85))] ring-1 ring-inset ring-white/12 sm:p-6"
        >
          <BrandLogo class="h-8 w-auto self-start brightness-0 invert" />

          <p class="mt-6 text-xl font-semibold leading-[1.28] tracking-[-0.02em] text-on-accent sm:text-[1.375rem]">
            Global markets,<br>
            direct execution,<br>
            <span class="font-medium text-on-accent/70">powered by Artix.</span>
          </p>

          <div class="mt-6 flex flex-wrap items-center justify-between gap-3">
            <span class="hw-quiet text-lg text-on-accent/95">Stay in touch!</span>
            <ul class="flex items-center gap-2">
              <li v-for="s in SOCIAL" :key="s.label">
                <a
                  :href="s.href"
                  :target="s.ext ? '_blank' : undefined"
                  :rel="s.ext ? 'noopener noreferrer' : undefined"
                  :aria-label="s.label"
                  :title="s.label"
                  class="grid size-9 place-items-center rounded-lg bg-black/22 text-on-accent ring-1 ring-inset ring-white/12 transition-[background-color,scale] duration-200 hover:bg-black/38 active:scale-[0.96]"
                >
                  <component :is="s.icon" :size="16" weight="bold" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="surface-lux flex flex-col justify-between rounded-2xl p-5 sm:p-6 lg:p-7">
          <div class="grid gap-6 xl:grid-cols-[1fr_minmax(0,21rem)]">
            <div class="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
              <nav v-for="g in COLS" :key="g.label" :aria-label="g.label">
                <h3 class="hw-quiet text-base text-muted">{{ g.label }}</h3>
                <ul class="mt-2.5 grid gap-1.5 text-[13px] text-fg/80">
                  <li v-for="it in g.items" :key="it.label">
                    <NuxtLink :to="it.href" class="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-fg">
                      {{ it.label }}
                      <PhArrowUpRight :size="11" class="opacity-0 transition-[opacity,translate] duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div class="flex flex-col justify-end">
              <p class="text-xs text-muted">Markets move fast.</p>
              <p class="mt-1 text-base font-semibold tracking-[-0.015em] text-fg">Stay ahead with Artix Capital.</p>
              <form class="mt-3.5 flex flex-col gap-2 sm:flex-row" @submit.prevent="onStart">
                <label for="ft-email" class="sr-only">Email address</label>
                <input
                  id="ft-email"
                  v-model.trim="email"
                  type="email"
                  autocomplete="email"
                  placeholder="Enter email address"
                  class="h-10 min-w-0 flex-1 rounded-xl border border-line-strong bg-canvas px-3.5 text-sm text-fg placeholder:text-muted transition-colors focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  class="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-fg px-4 text-sm font-semibold text-ink transition-[background-color,scale] duration-200 hover:bg-fg/90 active:scale-[0.98]"
                >
                  Start Trading
                </button>
              </form>
            </div>
          </div>

          <div class="mt-5 flex flex-col gap-3 border-t border-line pt-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {{ YEAR }} {{ COMPANY }}. All rights reserved. &middot; Reg. {{ REG_NO }}</p>
            <button type="button" class="btn btn-ghost h-8 shrink-0 self-start px-3 text-xs sm:self-auto" @click="toTop">
              Back to top <PhArrowUp :size="12" weight="bold" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <section
        id="ft-disclosures"
        class="mt-4 grid gap-4 lg:grid-cols-12"
        aria-labelledby="ft-legal"
      >
        <div class="surface-lux rounded-2xl p-6 sm:p-7 lg:col-span-5">
          <h3 id="ft-legal" class="hw-quiet text-base text-muted">Legal documents</h3>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="p in POLICIES" :key="p.label">
              <a
                :href="p.href"
                target="_blank"
                rel="noopener"
                class="inline-flex h-8 items-center gap-1.5 rounded-full border border-line bg-canvas/70 px-3 text-xs text-muted transition-colors duration-200 hover:border-line-strong hover:text-fg"
              >
                <PhFilePdf :size="13" class="shrink-0 text-muted" aria-hidden="true" />{{ p.label }}
              </a>
            </li>
          </ul>
        </div>

        <div class="surface-lux rounded-2xl p-6 sm:p-7 lg:col-span-7">
          <h4 class="hw-quiet text-base text-muted">Corporate information</h4>
          <dl class="mt-4 grid gap-2.5 text-xs">
            <div v-for="e in ENTITY" :key="e.k" class="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-3">
              <dt class="text-muted">{{ e.k }}</dt>
              <dd class="text-fg">{{ e.v }}</dd>
            </div>
            <div class="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-3">
              <dt class="text-muted">Registered office</dt>
              <dd><a :href="MAP" target="_blank" rel="noopener" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">{{ OFFICE }}</a></dd>
            </div>
            <div class="grid gap-1 sm:grid-cols-[8.5rem_1fr] sm:gap-3">
              <dt class="text-muted">Corporate email</dt>
              <dd><a :href="`mailto:${EMAIL}`" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">{{ EMAIL }}</a></dd>
            </div>
          </dl>
        </div>

        <div class="surface-lux rounded-2xl p-6 text-xs leading-relaxed text-muted sm:p-7 lg:col-span-7">
          <h4 class="hw-quiet text-base text-muted">Risk statement</h4>
          <p class="mt-3 text-pretty">
            Trading derivatives, forex, stocks, commodities, indices, futures and crypto involves substantial risk of loss. {{ COMPANY }} (Reg. {{ REG_NO }}) operates as an offshore IBC in Saint Lucia and is <strong class="font-medium text-fg">not licensed or regulated</strong> as a financial services provider.
          </p>
          <p class="mt-2.5 text-pretty">
            An investment in derivatives may mean investors may lose an amount even greater than their original investment. Anyone wishing to invest in any of the products mentioned in <a :href="SITE" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">www.artixcapital.com</a> should seek their own financial or professional advice. Trading of securities, forex, stock market, commodities, options and futures may not be suitable for everyone and involves the risk of losing part or all of your money. Trading in the financial markets has large potential rewards, but also large potential risk. You must be aware of the risks and be willing to accept them in order to invest in the markets. Don't invest and trade with money which you can't afford to lose. Forex trading is not allowed in some countries. Before investing your money, make sure your country allows it.
          </p>
          <p class="mt-2.5 text-pretty">
            You are strongly advised to obtain independent financial, legal and tax advice before proceeding with any currency or spot metals trade. Nothing in this site should be read or construed as constituting advice on the part of {{ COMPANY }} or any of its affiliates, directors, officers or employees. Read the full <a :href="DISCLOSURE" target="_blank" rel="noopener" class="text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent-soft">Risk Disclosure</a>.
          </p>
        </div>

        <div class="surface-lux rounded-2xl p-6 text-xs leading-relaxed text-muted sm:p-7 lg:col-span-5">
          <h4 class="hw-quiet text-base text-muted">Restricted regions</h4>
          <ul class="mt-3.5 flex flex-wrap gap-2" aria-label="Countries we do not serve">
            <li v-for="r in RESTRICTED" :key="r.code" class="inline-flex h-7 items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--color-accent)_35%,transparent)] bg-[color-mix(in_oklab,var(--color-accent)_10%,transparent)] px-2.5 text-xs text-fg">
              <img :src="`/flags/${r.code}.svg`" alt="" width="18" height="12" loading="lazy" decoding="async" class="h-3 w-[1.125rem] rounded-[2px] object-cover ring-1 ring-line-strong" />{{ r.name.replace(/^the /, '') }}
            </li>
          </ul>
          <p class="mt-3.5 text-pretty">
            {{ COMPANY }} does not provide services for citizens/residents of {{ RESTRICTED_LIST }}. The services of {{ COMPANY }} are not intended for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. Information on this site is not directed at residents in any country or jurisdiction where such distribution or use would be contrary to local law or regulation.
          </p>
        </div>
      </section>
    </div>

    <div class="relative z-0 mt-2 sm:mt-4">
      <ClientOnly>
        <FooterWordmark />
        <template #fallback>
          <div class="ft-word-fb" aria-hidden="true">ARTIX</div>
        </template>
      </ClientOnly>
    </div>
  </footer>
</template>

<style scoped>
.ft-word-fb {
  display: grid;
  place-items: center;
  height: clamp(185px, 25vw, 380px);
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: clamp(88px, 20vw, 260px);
  letter-spacing: 0.08em;
  color: rgb(245 247 250 / 0.92);
}
</style>
