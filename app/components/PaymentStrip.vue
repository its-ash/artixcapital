<script setup lang="ts">
const PAYMENTS = [
  ['Visa', '/payments/visa.svg'],
  ['Mastercard', '/payments/mastercard.svg'],
  ['Apple Pay', '/payments/applepay.svg'],
  ['Google Pay', '/payments/googlepay.svg'],
  ['Bitcoin', '/payments/bitcoin.svg'],
  ['Tether USDT', '/payments/tether.svg']
] as const
const LOOP = [...PAYMENTS, ...PAYMENTS]
</script>

<template>
  <section class="ps border-t border-line py-16 md:py-24" aria-labelledby="ps-title">
    <h2 id="ps-title" class="wrap text-center text-3xl font-semibold tracking-tight md:text-4xl">We accept</h2>
    <ul class="wrap mt-10 hidden flex-wrap items-center justify-center gap-12 md:flex">
      <li v-for="p in PAYMENTS" :key="p[0]" class="shrink-0">
        <img :src="p[1]" :alt="p[0]" class="h-8 w-auto" height="32" loading="lazy" decoding="async" />
      </li>
    </ul>
    <div class="ps-viewport mt-10 md:hidden">
      <ul class="ps-track flex w-max items-center gap-12 pr-12">
        <li v-for="(p, i) in LOOP" :key="i" class="shrink-0" :aria-hidden="i >= PAYMENTS.length || undefined">
          <img :src="p[1]" :alt="i < PAYMENTS.length ? p[0] : ''" class="h-8 w-auto" height="32" loading="lazy" decoding="async" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ps-viewport { mask: linear-gradient(90deg, transparent, #000 4rem, #000 calc(100% - 4rem), transparent); overflow: hidden; }
.ps-track { animation: ps-move 40s linear infinite; will-change: transform; }

@keyframes ps-move { to { transform: translateX(-50%); } }

@media (prefers-reduced-motion: reduce) {
  .ps-viewport { mask: none; overflow-x: auto; }
  .ps-track { animation: none; }
  .ps-track li[aria-hidden] { display: none; }
}
</style>
