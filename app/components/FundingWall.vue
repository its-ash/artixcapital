<script setup lang="ts">
import gsap from 'gsap'
const LOGOS = [
  { name: 'Visa', src: '/payments/visa.svg' },
  { name: 'Mastercard', src: '/payments/mastercard.svg' },
  { name: 'Apple Pay', src: '/payments/applepay.svg' },
  { name: 'Google Pay', src: '/payments/googlepay.svg' },
  { name: 'Bitcoin', src: '/payments/bitcoin.svg' },
  { name: 'Tether USDT', src: '/payments/tether.svg' }
] as const

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: q('.f-grid')[0], start: 'top 85%' }
  gsap.fromTo(q('.f-sweep'), { xPercent: -120 }, { xPercent: 120, duration: 1.6, ease: 'power2.inOut', delay: 0.6, scrollTrigger: st })
})
</script>

<template>
  <section ref="root" class="relative py-24 md:py-32" aria-labelledby="fund-title">
    <div class="wrap grid items-center gap-12 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <h2 id="fund-title" class="text-4xl font-bold tracking-[-0.03em] md:text-5xl">Fund your account <span class="grad-text pb-1">your way.</span></h2>
        <p class="mt-5 max-w-md text-lg text-muted">Cards, e-wallets such as Skrill and Neteller, and crypto wallets. Manage every deposit and withdrawal from your client area.</p>
      </div>
      <ul class="f-grid relative grid grid-cols-2 gap-4 overflow-hidden rounded-3xl sm:grid-cols-3 lg:col-span-7">
        <li v-for="l in LOGOS" :key="l.name" class="f-tile">
          <div class="group glass grid h-28 place-items-center rounded-3xl transition-[translate] duration-300 hover:-translate-y-1">
            <img :src="l.src" :alt="l.name" class="size-12 transition-[scale] duration-300 group-hover:scale-110" width="48" height="48" loading="lazy" decoding="async" />
          </div>
        </li>
        <span class="f-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      </ul>
    </div>
  </section>
</template>
