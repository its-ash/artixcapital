<script setup lang="ts">
const POSES = {
  stand: { src: '/images/mascot.webp', w: 392, h: 720, alt: 'Artix Capital polar bear mascot' },
  signup: { src: '/images/mascot/signup.webp', w: 314, h: 457, alt: 'Artix Capital polar bear filling out the sign-up form' },
  verify: { src: '/images/mascot/verify.webp', w: 313, h: 459, alt: 'Artix Capital polar bear holding a verified KYC shield' },
  trade: { src: '/images/mascot/trade.webp', w: 338, h: 456, alt: 'Artix Capital polar bear trading on a holographic chart' },
  faq: { src: '/images/mascot/faq.webp', w: 344, h: 449, alt: 'Artix Capital polar bear answering frequently asked questions' }
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
