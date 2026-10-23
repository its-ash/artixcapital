<script setup lang="ts">
usePageSeo({
  title: 'Artix Demo account | Artix Capital',
  description: 'Practise on live market prices with virtual funds. Full nTrader access, no deposit, no risk, one-click upgrade to live.'
})

const steps = [
  ['Register', 'Create a profile with an email address. No card, no deposit step.'],
  ['Open nTrader', 'Sign in on desktop, browser or phone with virtual funds loaded.'],
  ['Practise', 'Trade the live feed, review history, refine the process. Go live whenever ready.']
] as const

const head = ['Item', 'Demo', 'Live'] as const
const compare = [
  ['Prices', 'Live market feed', 'Live market feed'],
  ['Your money at risk', 'None', 'Yes'],
  ['Emotion', 'Calm', 'Real']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Accounts"
      title="Live prices. Play money. Real habits."
      lead="The Demo account mirrors live market conditions with virtual funds. Practise sizing, stops and discipline in nTrader, then take the workflow live without relearning anything."
      center
    >
      <a href="https://artixcapital.com/artix-demo-account/" class="btn btn-primary h-14 px-8 text-base">Try demo</a>
      <template #below>
        <p class="text-sm text-muted">Free. No payment details.</p>
      </template>
    </PageHero>

    <PageSection id="dm-steps" title="How to start">
      <PageSteps :items="steps" />
    </PageSection>

    <PageSection id="dm-compare" title="Demo vs live">
      <PageTable :head="head" :rows="compare" :strong="1" caption="Demo account compared with a live account" />
      <p class="mt-4 text-xs text-muted">Demo fills use indicative pricing. Live execution may differ slightly on fast markets.</p>
    </PageSection>

    <PageCta title="Ready for real fills?" :demo="false" />
  </main>
</template>
