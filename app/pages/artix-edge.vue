<script setup lang="ts">
usePageSeo({
  title: 'Artix Edge account | Artix Capital',
  description: 'Raw interbank pricing: 0.0 spreads, $5 per lot per side, sub-second execution. The account for active and scalping strategies.'
})

const scalars = [
  ['Pips, FX and metals', '0.0'],
  ['Per lot, per side', '$5'],
  ['Min. deposit', '$10K'],
  ['Stop out', '30%']
] as const

const head = ['Item', 'Artix Edge', 'Artix Core'] as const
const compare = [
  ['Entry', '$10,000', '$500'],
  ['FX pricing', '0.0 + $5/lot', '1.5 pips, no commission'],
  ['Best for', 'Intraday, scalps, systems', 'Swings, learning']
] as const

const faqs = [
  ['Who is Edge for?', 'Active traders and scalpers who want zero spreads and pay a straightforward per-lot commission.'],
  ['What does it cost per trade?', '$5 per lot per side on FX and metals. Crypto is 0.10% of notional.'],
  ['How much do I need to start?', '$10,000 minimum deposit.'],
  ['Does execution differ from Core?', 'Core uses spread pricing. Edge routes raw spreads with commission, on the same liquidity stack.'],
  ['Can I hold automated strategies?', 'Yes, algorithmic and rules-based trading on nTrader is fully supported.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Accounts"
      title="Artix Edge"
      lead="Raw pricing for experienced, active traders: zero spreads on FX and metals and one visible commission per lot."
    >
      <a :href="SIGNUP" class="btn btn-primary h-13 px-7">Open account</a>
      <NuxtLink to="/artix-core/" class="btn btn-ghost h-13 px-7">Compare with Core</NuxtLink>
      <template #below>
        <PageStats :items="scalars" />
      </template>
    </PageHero>

    <PageSection id="ed-when" title="When Edge wins">
      <div class="prose-muted">
        <p>Every pip you pay is a real cost on a fast strategy. Edge removes the spread markup and charges one visible number per lot instead: $5 per side on FX and metals, nothing hidden in the quote.</p>
        <p>If you trade intraday, run systems, or care about fill quality more than ticket elegance, this is the account that prices like a professional desk.</p>
      </div>
    </PageSection>

    <PageSection id="ed-compare" title="Edge vs Core">
      <PageTable :head="head" :rows="compare" :strong="1" caption="Artix Edge compared with Artix Core" />
    </PageSection>

    <PageFaqSection id="ed-faq" title="Edge questions" :items="faqs" />

    <PageCta />
  </main>
</template>
