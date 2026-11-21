<script setup lang="ts">
const POSES = {
  stand: { src: '/images/mascot.webp', w: 522, h: 972, alt: 'Artix Capital polar bear mascot' },
  signup: { src: '/images/mascot/signup.webp', w: 634, h: 903, alt: 'Artix Capital polar bear filling out the sign-up form' },
  verify: { src: '/images/mascot/verify.webp', w: 625, h: 907, alt: 'Artix Capital polar bear holding a verified KYC shield' },
  trade: { src: '/images/mascot/trade.webp', w: 687, h: 900, alt: 'Artix Capital polar bear trading on a holographic chart' },
  faq: { src: '/images/mascot/faq.webp', w: 705, h: 886, alt: 'Artix Capital polar bear answering frequently asked questions' },
  forex: { src: '/images/mascot/forex.webp', w: 730, h: 906, alt: 'Artix Capital polar bear holding orbiting currency symbols for forex trading' },
  commodities: { src: '/images/mascot/commodities.webp', w: 662, h: 906, alt: 'Artix Capital polar bear holding gold bullion and energy emblems' },
  stocks: { src: '/images/mascot/stocks.webp', w: 683, h: 901, alt: 'Artix Capital polar bear presenting a holographic stock candlestick chart' },
  indices: { src: '/images/mascot/indices.webp', w: 763, h: 887, alt: 'Artix Capital polar bear pointing at a holographic global indices globe' },
  crypto: { src: '/images/mascot/crypto.webp', w: 726, h: 911, alt: 'Artix Capital polar bear holding a holographic digital crypto coin' },
  futures: { src: '/images/mascot/futures.webp', w: 738, h: 906, alt: 'Artix Capital polar bear holding a holographic futures hourglass' },
  core: { src: '/images/mascot/core.webp', w: 697, h: 902, alt: 'Artix Capital polar bear presenting the Artix Core geometric cube' },
  edge: { src: '/images/mascot/edge.webp', w: 647, h: 895, alt: 'Artix Capital polar bear holding a glowing crimson lightning bolt for Artix Edge' },
  elite: { src: '/images/mascot/elite.webp', w: 705, h: 909, alt: 'Artix Capital polar bear presenting a holographic crown for Artix Elite' },
  coverage: { src: '/images/mascot/coverage.webp', w: 619, h: 908, alt: 'Artix Capital polar bear holding a reinforced vault shield for Artix Coverage' },
  demo: { src: '/images/mascot/demo.webp', w: 672, h: 899, alt: 'Artix Capital polar bear holding a holographic demo trading flask' },
  ib: { src: '/images/mascot/ib.webp', w: 743, h: 886, alt: 'Artix Capital polar bear gesturing toward a holographic partner handshake network' },
  whitelabel: { src: '/images/mascot/whitelabel.webp', w: 691, h: 938, alt: 'Artix Capital polar bear launching a holographic white label rocket' },
  'ntrader-desktop': { src: '/images/mascot/ntrader-desktop.webp', w: 690, h: 905, alt: 'Artix Capital polar bear operating a holographic nTrader desktop workstation' },
  'ntrader-mobile': { src: '/images/mascot/ntrader-mobile.webp', w: 665, h: 897, alt: 'Artix Capital polar bear holding a smartphone with a holographic nTrader chart' },
  'mt5-desktop': { src: '/images/mascot/mt5-desktop.webp', w: 751, h: 886, alt: 'Artix Capital polar bear beside a holographic MetaTrader 5 terminal' },
  'mt5-mobile': { src: '/images/mascot/mt5-mobile.webp', w: 666, h: 884, alt: 'Artix Capital polar bear using MetaTrader 5 on a holographic tablet' },
  calendar: { src: '/images/mascot/calendar.webp', w: 759, h: 913, alt: 'Artix Capital polar bear pointing at a holographic economic calendar' },
  spreads: { src: '/images/mascot/spreads.webp', w: 673, h: 902, alt: 'Artix Capital polar bear inspecting a holographic spread table' },
  expiry: { src: '/images/mascot/expiry.webp', w: 775, h: 890, alt: 'Artix Capital polar bear checking a holographic futures expiry countdown' },
  about: { src: '/images/mascot/about.webp', w: 586, h: 903, alt: 'Artix Capital polar bear standing proudly beside the Artix emblem' },
  contact: { src: '/images/mascot/contact.webp', w: 728, h: 924, alt: 'Artix Capital polar bear wearing a support headset and waving warmly' },
  promotion: { src: '/images/mascot/promotion.webp', w: 598, h: 904, alt: 'Artix Capital polar bear holding a holographic cashback gift box' },
  pdf: { src: '/images/mascot/pdf.webp', w: 702, h: 891, alt: 'Artix Capital polar bear holding a holographic verified document' }
} as const

export type CapitalMascotPose = keyof typeof POSES

const props = withDefaults(defineProps<{ pose?: CapitalMascotPose; decorative?: boolean; eager?: boolean }>(), {
  pose: 'stand'
})

const m = computed(() => POSES[props.pose])
</script>

<template>
  <img
    :src="m.src"
    :width="m.w"
    :height="m.h"
    :alt="decorative ? '' : m.alt"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
    draggable="false"
    class="bear-mascot pointer-events-none block h-auto max-w-full select-none"
  >
</template>

<style scoped>
.bear-mascot {
  filter: drop-shadow(0 18px 36px color-mix(in oklab, var(--color-accent) 22%, transparent));
}
</style>
