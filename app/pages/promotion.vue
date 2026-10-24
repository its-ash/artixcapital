<script setup lang="ts">
usePageSeo({
  title: '2% USDT deposit cashback promotion | Artix Capital',
  description: 'Earn 2% cashback on eligible USDT deposits, up to USD 500 per client. Read the promotion terms and download the PDF.'
})

const stats = [['Cashback rate', '2%'], ['Maximum per client', 'USD 500'], ['Campaign budget', 'USD 10,000'], ['Volume requirement', '1 lot / USD 1,000']] as const

type Block = string | string[]
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
      [
        'Eligible deposit USD 1,000: cashback USD 20, required trading volume 1 lot.',
        'Eligible deposit USD 5,000: cashback USD 100, required trading volume 5 lots.',
        'Eligible deposit USD 10,000: cashback USD 200, required trading volume 10 lots.',
        'Eligible deposit USD 20,000: cashback USD 400, required trading volume 20 lots.',
        'Eligible deposit USD 25,000: cashback USD 500, required trading volume 25 lots.',
        'Eligible deposit USD 50,000: cashback at 2% before the cap is USD 1,000; cashback payable after the cap is USD 500; required trading volume is 25 lots maximum.'
      ]
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
const termsText = TERMS.map((t, i) => [`${i + 1}. ${t.title}`, ...t.body.flatMap(b => (Array.isArray(b) ? b.map(x => `- ${x}`) : [b]))].join('\n')).join('\n\n')

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
  <main id="main">
    <PageHero
      group="Promotions"
      title="2% USDT deposit cashback"
      lead="Deposit USDT and receive 2% cashback on your eligible deposit, up to USD 500 per client. Eligibility, trading requirements and limits are set out in the terms below."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <button type="button" class="btn btn-ghost h-13 px-7" :disabled="busy" @click="downloadTerms">{{ busy ? 'Creating PDF…' : 'Download terms (PDF)' }}</button>
    </PageHero>
    <p v-if="error" role="alert" class="wrap pt-4 text-sm text-down">{{ error }}</p>

    <section class="wrap pt-12 pb-16 md:pt-16" aria-label="Promotion summary">
      <PageStats :items="stats" />
    </section>

    <PageSection id="pr-terms" title="Terms and conditions" lead="These promotional terms are supplementary to the Artix Capital Client Agreement, Risk Disclosure, AML/KYC Policy, Privacy Policy and other applicable account terms.">
      <div class="grid gap-x-10 gap-y-12 md:grid-cols-2">
        <article v-for="(t, i) in TERMS" :key="t.title" class="min-w-0">
          <h3 class="text-lg font-semibold tracking-tight md:text-xl">{{ i + 1 }}. {{ t.title }}</h3>
          <div class="prose-muted mt-4 space-y-3 text-sm md:text-base">
            <template v-for="(b, j) in t.body" :key="j">
              <ul v-if="Array.isArray(b)" class="list-disc space-y-1.5 pl-5 marker:text-accent-soft">
                <li v-for="item in b" :key="item">{{ item }}</li>
              </ul>
              <p v-else>{{ b }}</p>
            </template>
          </div>
        </article>
      </div>
      <p class="mt-14 border-t border-line pt-6 text-sm text-muted">
        Artix Capital reserves the right to interpret and administer the campaign consistently with the published terms. Where there is a conflict, the applicable client agreement and mandatory applicable law shall prevail.
      </p>
    </PageSection>
  </main>
</template>
