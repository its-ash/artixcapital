<script setup lang="ts">
import gsap from 'gsap'

usePageSeo({
  title: '2% USDT deposit cashback promotion | Artix Capital',
  description: 'Earn 2% cashback on eligible USDT deposits, up to USD 500 per client. Read the promotion terms and download the PDF.'
})

const steps = [
  ['Deposit USDT', 'Fund your account with USDT through an approved wallet or payment method.'],
  ['Trade genuinely', 'Complete at least 20 genuine closed trades and the volume rule over at least 7 calendar days.'],
  ['Receive cashback', 'Approved cashback is credited under the campaign rules, while the USD 10,000 budget lasts.']
] as const

const fmt = (n: number) => n.toLocaleString('en-US')
const deposit = ref(10000)
const pct = computed(() => `${((deposit.value - 1000) / 49000) * 100}%`)
const cashback = computed(() => Math.min(deposit.value * 0.02, 500))
const lots = computed(() => Math.min(25, Math.floor(deposit.value / 1000)))

const root = ref<HTMLElement | null>(null)
useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.promo-card'), { y: 40, opacity: 0, scale: 0.97, duration: 1.1, ease: 'expo.out', delay: 0.2 })
})

type TableBlock = { head: string[]; rows: string[][] }
type Block = string | string[] | TableBlock
const isTable = (b: Block): b is TableBlock => typeof b === 'object' && !Array.isArray(b)
const TERMS: { title: string; body: Block[] }[] = [
  {
    title: 'Cashback Rate',
    body: [
      'Eligible clients shall receive cashback equal to 2% of their eligible USDT deposit value, converted to USD using the applicable exchange rate at the time of deposit verification.',
      'Cashback is subject to all eligibility requirements, trading volume requirements, verification procedures, individual limits, and the overall campaign budget.'
    ]
  },
  {
    title: 'Maximum Cashback Per Client',
    body: [
      'The maximum cashback payable to any eligible client shall be USD 500 during the entire Promotion Period.',
      'The USD 500 limit applies collectively to all trading accounts operated, controlled, or beneficially owned by the same client.',
      'Opening additional accounts, splitting deposits, or using third parties to participate shall not increase the applicable cashback entitlement.',
      'Artix Capital may aggregate accounts where it reasonably determines that they are connected through common ownership, identity, funding sources, payment methods, wallet addresses, devices, trading activity, or other relevant circumstances.'
    ]
  },
  {
    title: 'Overall Campaign Budget',
    body: [
      'The total cashback budget available under this campaign shall not exceed USD 10,000 in aggregate.',
      'This limit applies to the total cashback awarded or payable to all eligible clients under the campaign.',
      'Cashback shall be allocated on a first-come, first-served basis according to the date and time at which a client satisfies all applicable eligibility and promotional requirements, subject to verification.',
      'Where necessary, Artix Capital may reserve amounts against pending eligible claims to avoid exceeding the campaign budget.'
    ]
  },
  {
    title: 'Campaign Budget Exhaustion',
    body: [
      'Once the USD 10,000 campaign budget has been fully allocated, Artix Capital may stop accepting further participants or qualifying claims and may suspend or close the promotion to new eligibility.',
      'Claims not accepted before the campaign budget is exhausted shall not qualify unless Artix Capital expressly confirms otherwise.',
      'Artix Capital shall communicate the campaign\'s closure or suspension through an appropriate channel where reasonably practicable and as required by applicable law.'
    ]
  },
  {
    title: 'Deposit Requirement',
    body: [
      'The cashback amount shall be calculated at 2% of the eligible deposit value, subject to the maximum cashback limit of USD 500 per client.',
      'The eligible deposit must comply with the campaign\'s minimum deposit requirements and any applicable funding, identity verification, and compliance procedures.',
      'Deposits that are reversed, refunded, disputed, or determined to be ineligible may be excluded from the calculation.'
    ]
  },
  {
    title: 'Trading Volume Requirement',
    body: [
      'The standard promotional trading volume requirement shall be one (1) eligible standard lot for every USD 1,000 of eligible deposit value, subject to a maximum required volume of twenty-five (25) standard lots per client.',
      'The applicable requirement shall be calculated using the eligible deposit value and the campaign\'s published calculation rules.',
      'Illustrative examples (these assume the standard-lot calculation applies without instrument-specific conversion factors):',
      {
        head: ['Eligible deposit', 'Cashback before cap', 'Cashback payable', 'Required volume'],
        rows: [
          ['USD 1,000', 'USD 20', 'USD 20', '1 lot'],
          ['USD 5,000', 'USD 100', 'USD 100', '5 lots'],
          ['USD 10,000', 'USD 200', 'USD 200', '10 lots'],
          ['USD 20,000', 'USD 400', 'USD 400', '20 lots'],
          ['USD 25,000', 'USD 500', 'USD 500', '25 lots'],
          ['USD 50,000', 'USD 1,000', 'USD 500', '25 lots maximum']
        ]
      }
    ]
  },
  {
    title: 'Minimum Trading Activity',
    body: [
      'Clients must complete at least twenty (20) genuine closed trades during the applicable promotional period.',
      'Trades must represent genuine trading activity and comply with Artix Capital\'s applicable trading rules and terms.',
      'Cancelled, invalid, artificial, coordinated, or otherwise prohibited transactions may be excluded from qualifying trading activity.',
      'Opening and closing transactions shall not be counted twice when calculating completed trading volume. Volume shall be counted once for each completed trade.'
    ]
  },
  {
    title: 'Minimum Promotional Period',
    body: [
      'Clients must satisfy the applicable trading requirements over a minimum promotional period of seven (7) calendar days.',
      'The promotional period shall be calculated according to the dates and eligibility rules specified by Artix Capital.',
      'Meeting the minimum duration alone does not guarantee cashback.'
    ]
  },
  {
    title: 'Instrument-Specific Trading Volume Calculation',
    body: [
      'For instruments whose contract specifications or exposure differ materially from standard foreign exchange contracts, Artix Capital may apply an instrument-specific volume conversion factor.',
      'The applicable factors shall be defined in the campaign rules or an accompanying instrument-equivalency schedule made available to clients before participation.',
      'Eligible trading volume shall be calculated using the relevant instrument\'s contract specifications and Artix Capital\'s recorded executed volume.',
      'Any instrument-specific conversion factors must be objectively defined and applied consistently to similarly situated clients.',
      'Artix Capital shall not introduce undisclosed conversion factors retrospectively to disqualify otherwise eligible trading activity.'
    ]
  },
  {
    title: 'Eligibility and Verification',
    body: [
      'All cashback claims are subject to verification of the client\'s identity, deposit eligibility, trading activity, and compliance with the campaign terms.',
      'Artix Capital may request additional information or documentation where reasonably necessary to verify eligibility or comply with applicable legal and regulatory obligations.',
      'Cashback shall not be guaranteed solely because a client has made an eligible deposit.'
    ]
  },
  {
    title: 'Prohibited Activity and Abuse Prevention',
    body: [
      'Artix Capital may exclude activity reasonably determined to involve fraud, manipulation, artificial trading, coordinated abuse, multiple-account exploitation, or other violations of the campaign terms.',
      'Where a client is found to have obtained or attempted to obtain cashback through prohibited activity, Artix Capital may reject the claim or cancel or recover the affected cashback to the extent permitted by applicable law and contractual terms.',
      'Any exclusion or recovery shall be based on the applicable terms and relevant evidence.'
    ]
  },
  {
    title: 'Cashback Payment',
    body: [
      'Approved cashback shall be credited or paid through the method specified by Artix Capital in the campaign rules.',
      'Payment timing, account eligibility, withdrawal conditions, and any restrictions applicable to credited cashback shall be disclosed to clients before participation.'
    ]
  },
  {
    title: 'No Guaranteed Cashback',
    body: [
      'Meeting the deposit requirement alone does not guarantee cashback.',
      'Cashback remains subject to all eligibility requirements, verification procedures, trading requirements, available campaign funds, and applicable Terms and Conditions.'
    ]
  },
  {
    title: 'Changes to the Campaign',
    body: [
      'Artix Capital may change the campaign budget or individual cashback cap for future participation, subject to applicable law.',
      'Changes shall not retrospectively remove a benefit that has already been validly earned, except where cancellation or adjustment is permitted under these Terms, the Client Agreement, or applicable law, including cases of fraud, abuse, or administrative error.'
    ]
  },
  {
    title: 'Final Conditions',
    body: [
      'Participation in the campaign constitutes acceptance of these Terms and Conditions.',
      'Artix Capital reserves the right to interpret and administer the campaign consistently with the published terms and applicable legal and regulatory obligations.',
      'The campaign shall be governed by the applicable law and dispute resolution provisions specified in Artix Capital\'s Client Agreement.'
    ]
  }
]

const PDF_TITLE = '2% USDT Deposit Cashback Promotion'
const termsText = TERMS.map((t, i) => [`${i + 1}. ${t.title}`, ...t.body.flatMap(b => (isTable(b) ? [b.head.join(' | '), ...b.rows.map(r => r.join(' | '))] : Array.isArray(b) ? b.map(x => `- ${x}`) : [b]))].join('\n')).join('\n\n')

const busy = ref(false)
const error = ref('')

const downloadTerms = async () => {
  busy.value = true
  error.value = ''
  try {
    await downloadBrandPdf(PDF_TITLE, termsText)
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
      title="Get 2% back on eligible USDT deposits."
      lead="Deposit USDT, trade with Artix and earn cashback up to USD 500 per client."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <button type="button" class="btn btn-ghost h-13 px-7" :disabled="busy" @click="downloadTerms">{{ busy ? 'Creating PDF…' : 'Download terms (PDF)' }}</button>
      <template #aside>
        <div class="promo-card relative overflow-hidden rounded-2xl border border-line bg-surface p-6 md:p-8">
          <span class="absolute inset-x-0 top-0 h-px bg-accent-soft" aria-hidden="true" />
          <p class="text-sm text-muted">Cashback rate</p>
          <p class="mt-2 font-mono text-[clamp(5rem,14vw,8.5rem)] font-semibold leading-none tracking-tighter text-accent-soft">2%</p>
          <p class="mt-3 text-sm text-muted">on eligible USDT deposits</p>
          <dl class="mt-8 grid gap-4 border-t border-line pt-6">
            <div class="flex items-center justify-between gap-4">
              <dt class="text-sm text-muted">Example deposit</dt>
              <dd class="font-mono tabular-nums">10,000 USDT</dd>
            </div>
            <div class="flex items-center justify-between gap-4">
              <dt class="text-sm text-muted">Cashback</dt>
              <dd class="font-mono tabular-nums">USD 200</dd>
            </div>
            <div class="flex items-center justify-between gap-4">
              <dt class="text-sm text-muted">Per-client cap</dt>
              <dd class="font-mono tabular-nums">USD 500</dd>
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
            <span class="font-mono text-2xl tabular-nums text-fg">{{ fmt(deposit) }} USDT</span>
          </label>
          <input
            id="pr-deposit"
            v-model.number="deposit"
            type="range"
            min="1000"
            max="50000"
            step="1000"
            :aria-valuetext="`${fmt(deposit)} USDT`"
            class="calc-range mt-6 w-full"
            :style="{ '--p': pct }"
          />
          <div class="mt-3 flex justify-between font-mono text-xs text-muted" aria-hidden="true">
            <span>1,000</span>
            <span>25,000</span>
            <span>50,000</span>
          </div>
        </div>
        <dl class="grid gap-4 md:col-span-5 md:content-start">
          <div class="rounded-xl border border-line bg-canvas p-5">
            <dt class="text-sm text-muted">Your cashback</dt>
            <dd class="mt-1 font-mono text-3xl tabular-nums">USD {{ fmt(cashback) }}</dd>
            <p class="mt-2 text-xs text-muted">2% of your deposit, up to USD 500</p>
          </div>
          <div class="rounded-xl border border-line bg-canvas p-5">
            <dt class="text-sm text-muted">Trading volume required</dt>
            <dd class="mt-1 font-mono text-3xl tabular-nums">{{ lots }} lots</dd>
            <p class="mt-2 text-xs text-muted">1 lot per USD 1,000, up to 25 lots</p>
          </div>
        </dl>
      </div>
      <p class="mt-4 text-xs text-muted">Illustrative only. Assumes the standard-lot calculation. Instrument conversion factors may apply.</p>
    </PageSection>

    <PageSection id="pr-steps" title="Three steps to your cashback" lead="The campaign budget is USD 10,000 in total, allocated first come, first served.">
      <ol class="promo-steps grid gap-3 md:grid-cols-3">
        <li v-for="(s, i) in steps" :key="s[0]" class="promo-step card flex flex-col p-6">
          <span class="card-icon font-mono text-xs" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="mt-6 text-lg font-semibold tracking-tight">{{ s[0] }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">{{ s[1] }}</p>
        </li>
      </ol>
    </PageSection>

    <PageSection id="pr-terms" title="Terms and conditions" lead="These promotional terms are supplementary to the Artix Capital Client Agreement, Risk Disclosure, AML/KYC Policy, Privacy Policy and other applicable account terms.">
      <div class="grid gap-x-10 gap-y-12 md:grid-cols-2">
        <article v-for="(t, i) in TERMS" :key="t.title" class="min-w-0">
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
