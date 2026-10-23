<script setup lang="ts">
import gsap from 'gsap'
import visa from '~/assets/pay/visa.svg?url'
import mastercard from '~/assets/pay/mastercard.svg?url'
import amex from '~/assets/pay/americanexpress.svg?url'
import gpay from '~/assets/pay/googlepay.svg?url'
import bitcoin from '~/assets/pay/bitcoin.svg?url'
import tether from '~/assets/pay/tether.svg?url'

const LOGOS = [
  { name: 'Visa', src: visa, hue: '#a9b7cf' },
  { name: 'Mastercard', src: mastercard, hue: '#31a150' },
  { name: 'American Express', src: amex, hue: '#7d8da8' },
  { name: 'Google Pay', src: gpay, hue: '#31a150' },
  { name: 'Bitcoin', src: bitcoin, hue: '#31a150' },
  { name: 'Tether', src: tether, hue: '#31a150' }
]

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: q('.f-grid')[0], start: 'top 85%' }
  gsap.from(q('.f-tile'), { rotateY: 90, opacity: 0, transformPerspective: 900, stagger: { each: 0.08, from: 'center' }, duration: 1.2, scrollTrigger: st })
  gsap.fromTo(q('.f-sweep'), { xPercent: -120 }, { xPercent: 120, duration: 1.6, ease: 'power2.inOut', delay: 0.6, scrollTrigger: st })
})
</script>

<template>
  <section ref="root" class="relative py-24 md:py-32" aria-labelledby="fund-title">
    <div class="wrap grid items-center gap-12 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <h2 id="fund-title" v-reveal="'lines'" class="text-4xl font-bold tracking-[-0.03em] md:text-5xl">Fund your account <span class="grad-text pb-1">your way.</span></h2>
        <p v-reveal="'fade'" class="mt-5 max-w-md text-lg text-muted">Cards, e-wallets such as Skrill and Neteller, and crypto wallets. Manage every deposit and withdrawal from your client area.</p>
      </div>
      <ul class="f-grid relative grid grid-cols-2 gap-4 overflow-hidden rounded-3xl sm:grid-cols-3 lg:col-span-7">
        <li v-for="l in LOGOS" :key="l.name" class="f-tile">
          <div
            class="group glass grid h-28 place-items-center rounded-3xl transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-(--hue)"
            :style="{ '--hue': l.hue }"
          >
            <span role="img" :aria-label="l.name" class="logo-mask size-12 bg-steel-soft transition-[scale] duration-300 group-hover:scale-110" :style="{ '--src': `url(${l.src})` }" />
          </div>
        </li>
        <span class="f-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
      </ul>
    </div>
  </section>
</template>
