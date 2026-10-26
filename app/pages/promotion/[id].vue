<script setup lang="ts">
import gsap from 'gsap'

const route = useRoute()
const promo = PROMOTIONS.find(p => p.id === route.params.id)
if (!promo) throw createError({ statusCode: 404, statusMessage: 'Promotion not found' })

usePageSeo({ title: promo.seoTitle, description: promo.seoDescription })

const fmt = (n: number) => n.toLocaleString('en-US')
const rateText = `${+(promo.rate * 100).toFixed(2)}%`
const deposit = ref(promo.example)
const pct = computed(() => `${((deposit.value - promo.minDeposit) / (promo.maxDeposit - promo.minDeposit)) * 100}%`)
const cashbackOf = (n: number) => Math.min(n * promo.rate, promo.cap)
const cashback = computed(() => cashbackOf(deposit.value))
const lots = computed(() => Math.min(promo.maxLots, Math.floor(deposit.value / promo.lotEvery)))

const root = ref<HTMLElement | null>(null)
useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.promo-card'), { y: 40, opacity: 0, scale: 0.97, duration: 1.1, ease: 'expo.out', delay: 0.2 })
})

const isTable = (b: PromoBlock): b is PromoTable => typeof b === 'object' && !Array.isArray(b)
const termsText = promo.terms.map((t, i) => [`${i + 1}. ${t.title}`, ...t.body.flatMap(b => (isTable(b) ? [b.head.join(' | '), ...b.rows.map(r => r.join(' | '))] : Array.isArray(b) ? b.map(x => `- ${x}`) : [b]))].join('\n')).join('\n\n')

const busy = ref(false)
const error = ref('')

const downloadTerms = async () => {
  busy.value = true
  error.value = ''
  try {
    await downloadBrandPdf(promo.pdfTitle, termsText)
  } catch {
    error.value = 'The PDF could not be created. Check your connection and try again.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <main id="main" ref="root">
    <PageHero
      group="Promotions"
      :title="promo.heroTitle"
      :lead="promo.lead"
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <button type="button" class="btn btn-ghost h-13 px-7" :disabled="busy" @click="downloadTerms">{{ busy ? 'Creating PDF…' : 'Download terms (PDF)' }}</button>
      <template #aside>
        <div class="promo-card relative overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-8">
          <span class="absolute inset-x-0 top-0 h-px bg-accent-soft" aria-hidden="true" />
          <p class="text-sm text-muted">Cashback rate</p>
          <p class="mt-2 font-mono text-[clamp(5rem,14vw,8.5rem)] font-semibold leading-none tracking-tighter text-accent-soft">{{ rateText }}</p>
          <p class="mt-3 text-sm text-muted">on eligible {{ promo.asset }} deposits</p>
          <dl class="mt-8 grid gap-4 border-t border-line pt-6">
            <div class="flex items-center justify-between gap-4">
              <dt class="text-sm text-muted">Example deposit</dt>
              <dd class="font-mono tabular-nums">{{ fmt(promo.example) }} {{ promo.asset }}</dd>
            </div>
            <div class="flex items-center justify-between gap-4">
              <dt class="text-sm text-muted">Cashback</dt>
              <dd class="font-mono tabular-nums">USD {{ fmt(cashbackOf(promo.example)) }}</dd>
            </div>
            <div class="flex items-center justify-between gap-4">
              <dt class="text-sm text-muted">Per-client cap</dt>
              <dd class="font-mono tabular-nums">USD {{ fmt(promo.cap) }}</dd>
            </div>
          </dl>
        </div>
      </template>
    </PageHero>
    <p v-if="error" role="alert" class="wrap pt-4 text-sm text-down">{{ error }}</p>

    <PageSection id="pr-calc" title="See what you could earn" lead="Move the slider to see your cashback and the trading volume it requires.">
      <div class="calc grid gap-8 rounded-2xl border border-line bg-surface p-6 md:grid-cols-12 md:p-10">
        <div class="md:col-span-7">
          <label for="pr-deposit" class="flex items-baseline justify-between gap-4 text-sm text-muted">
            Eligible deposit
            <span class="font-mono text-2xl tabular-nums text-fg">{{ fmt(deposit) }} {{ promo.asset }}</span>
          </label>
          <input
            id="pr-deposit"
            v-model.number="deposit"
            type="range"
            :min="promo.minDeposit"
            :max="promo.maxDeposit"
            :step="promo.lotEvery"
            :aria-valuetext="`${fmt(deposit)} ${promo.asset}`"
            class="calc-range mt-6 w-full"
            :style="{ '--p': pct }"
          />
          <div class="mt-3 flex justify-between font-mono text-xs text-muted" aria-hidden="true">
            <span>{{ fmt(promo.minDeposit) }}</span>
            <span>{{ fmt(promo.maxDeposit / 2) }}</span>
            <span>{{ fmt(promo.maxDeposit) }}</span>
          </div>
        </div>
        <dl class="grid gap-4 md:col-span-5 md:content-start">
          <div class="rounded-xl border border-line bg-canvas p-5">
            <dt class="text-sm text-muted">Your cashback</dt>
            <dd class="mt-1 font-mono text-3xl tabular-nums">USD {{ fmt(cashback) }}</dd>
            <p class="mt-2 text-xs text-muted">{{ rateText }} of your deposit, up to USD {{ fmt(promo.cap) }}</p>
          </div>
          <div class="rounded-xl border border-line bg-canvas p-5">
            <dt class="text-sm text-muted">Trading volume required</dt>
            <dd class="mt-1 font-mono text-3xl tabular-nums">{{ lots }} lots</dd>
            <p class="mt-2 text-xs text-muted">1 lot per USD {{ fmt(promo.lotEvery) }}, up to {{ promo.maxLots }} lots</p>
          </div>
        </dl>
      </div>
      <p class="mt-4 text-xs text-muted">Illustrative only. Assumes the standard-lot calculation. Instrument conversion factors may apply.</p>
    </PageSection>

    <PageSection id="pr-steps" title="Three steps to your cashback" :lead="`The campaign budget is USD ${fmt(promo.budget)} in total, allocated first come, first served.`">
      <ol class="promo-steps grid gap-3 md:grid-cols-3">
        <li v-for="(s, i) in promo.steps" :key="s[0]" class="promo-step card flex flex-col p-6">
          <span class="card-icon font-mono text-xs" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-6 text-lg font-semibold tracking-tight">{{ s[0] }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ s[1] }}</p>
        </li>
      </ol>
    </PageSection>

    <PageSection id="pr-terms" title="Terms and conditions" lead="These promotional terms are supplementary to the Artix Capital Client Agreement, Risk Disclosure, AML/KYC Policy, Privacy Policy and other applicable account terms.">
      <div class="grid gap-x-10 gap-y-12 md:grid-cols-2">
        <article v-for="(t, i) in promo.terms" :key="t.title" class="min-w-0">
          <h3 class="text-lg font-semibold tracking-tight md:text-xl">{{ i + 1 }}. {{ t.title }}</h3>
          <div class="prose-muted mt-4 space-y-3 text-sm md:text-base">
            <template v-for="(b, j) in t.body" :key="j">
              <ul v-if="Array.isArray(b)" class="list-disc space-y-1.5 pl-5 marker:text-accent-soft">
                <li v-for="item in b" :key="item">{{ item }}</li>
              </ul>
              <div v-else-if="isTable(b)" class="overflow-x-auto rounded-xl border border-line">
                <table class="w-full min-w-[28rem] text-left text-sm">
                  <thead class="bg-canvas text-xs text-muted">
                    <tr>
                      <th v-for="h in b.head" :key="h" scope="col" class="px-4 py-3 font-medium">{{ h }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in b.rows" :key="r[0]" class="border-t border-line">
                      <td v-for="(c, k) in r" :key="k" class="px-4 py-3 font-mono tabular-nums" :class="k === 0 ? 'text-fg' : 'text-muted'">{{ c }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p v-else>{{ b }}</p>
            </template>
          </div>
        </article>
      </div>
      <p class="mt-14 border-t border-line pt-6 text-sm text-muted">
        Artix Capital reserves the right to interpret and administer the campaign consistently with the published terms. Where there is a conflict, the applicable client agreement and mandatory applicable law shall prevail.
      </p>
    </PageSection>

    <PageCta />
  </main>
</template>

<style scoped>
.calc-range { appearance: none; height: 2.75rem; background: transparent; cursor: pointer; }
.calc-range::-webkit-slider-runnable-track { height: 6px; border-radius: 999px; background: linear-gradient(to right, var(--color-accent) var(--p), var(--color-line-strong) var(--p)); }
.calc-range::-moz-range-track { height: 6px; border-radius: 999px; background: linear-gradient(to right, var(--color-accent) var(--p), var(--color-line-strong) var(--p)); }
.calc-range::-webkit-slider-thumb { appearance: none; margin-top: -9px; width: 24px; height: 24px; border-radius: 50%; background: var(--color-fg); border: 4px solid var(--color-accent); transition: scale 160ms ease-out; }
.calc-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; background: var(--color-fg); border: 4px solid var(--color-accent); transition: scale 160ms ease-out; }
.calc-range:active::-webkit-slider-thumb { scale: 1.15; }
.calc-range:active::-moz-range-thumb { scale: 1.15; }
.calc-range:focus-visible { outline-offset: 6px; }

@media (prefers-reduced-motion: reduce) {
  .calc-range::-webkit-slider-thumb, .calc-range::-moz-range-thumb { transition: none; }
}
</style>
