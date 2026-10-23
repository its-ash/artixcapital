<script setup lang="ts">
usePageSeo({
  title: 'White label solution | Artix Capital',
  description: 'Launch your own brokerage: fully branded nTrader, tier-1 liquidity, flexible commissions and compliance support, live in weeks.'
})

const included = [
  ['Platform', 'nTrader, fully branded desktop, web and mobile'],
  ['Instruments', 'FX, metals, indices, commodities, equities, crypto'],
  ['Liquidity', 'Aggregated top-tier institutional providers'],
  ['Risk tools', 'Admin terminal and exposure controls included'],
  ['Onboarding', 'Deployment plus KYC and AML guidance'],
  ['Helpdesk', '24/5 operational support for your team']
] as const

const steps = [
  ['Connect with us', 'Submit your request for a demo and onboarding guidance.'],
  ['Sign the contract', 'Formalize the partnership with a clear, transparent agreement.'],
  ['Brand and launch', 'Send branding materials, launch your platform within a week.']
] as const
</script>

<template>
  <main id="main">
    <PageHero
      group="Partners"
      title="Your brokerage, on our rails"
      lead="A fully branded nTrader, institutional liquidity, multi-asset trading and a support desk behind it. Launch in weeks and scale on infrastructure that already works."
    >
      <a href="https://artixcapital.com/white-label-solution/" class="btn btn-primary h-13 px-7">Request a consultation</a>
    </PageHero>

    <PageSection id="wl-steps" title="Launch timeline">
      <PageSteps :items="steps" />
    </PageSection>

    <PageSection id="wl-included" title="Everything a brokerage runs on">
      <PageSpecs :rows="included" />
    </PageSection>

    <PageSection id="wl-why" title="Why partners pick us">
      <div class="prose-muted">
        <p>One contract instead of five vendors. A platform that carries your identity on every screen, liquidity that arrives connected, and operational help that treats your launch like ours.</p>
        <p>You run the brand. We keep the rails running.</p>
      </div>
    </PageSection>
  </main>
</template>
