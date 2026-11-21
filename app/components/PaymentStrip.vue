<script setup lang="ts">
const PAYMENTS = [
  { name: 'Visa', src: '/payments/visa.svg', lift: true },
  { name: 'Mastercard', src: '/payments/mastercard.svg', lift: false },
  { name: 'Apple Pay', src: '/payments/applepay.svg', lift: false },
  { name: 'Google Pay', src: '/payments/googlepay.svg', lift: false },
  { name: 'Bitcoin', src: '/payments/bitcoin.svg', lift: false },
  { name: 'Tether USDT', src: '/payments/tether.svg', lift: false }
] as const
const LOOP = [...PAYMENTS, ...PAYMENTS, ...PAYMENTS, ...PAYMENTS]
const root = ref<HTMLElement | null>(null)
const paused = ref(true)
let io: IntersectionObserver | undefined

onMounted(() => {
  if (!root.value) return
  io = new IntersectionObserver(([e]) => { paused.value = !e?.isIntersecting }, { rootMargin: '120px' })
  io.observe(root.value)
})
onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <section ref="root" class="cv-auto ps section-rule py-10 md:py-14" :class="paused ? 'anim-paused' : ''" style="--cv-h: 240px" aria-labelledby="ps-title">
    <h2 id="ps-title" class="wrap h-section text-center text-3xl md:text-4xl">We accept</h2>
    <div class="ps-viewport wrap mt-7 md:mt-8">
      <ul class="ps-track flex w-max items-center gap-4 py-3 pr-4 md:gap-5 md:pr-5">
        <li
          v-for="(p, i) in LOOP"
          :key="i"
          class="ps-item surface-lux flex shrink-0 items-center gap-3.5 rounded-2xl px-5 py-3 md:gap-4 md:px-6 md:py-3.5"
          :style="{ '--i': i % PAYMENTS.length }"
          :aria-hidden="i >= PAYMENTS.length || undefined"
        >
          <img
            :src="p.src"
            :alt="i < PAYMENTS.length ? p.name : ''"
            class="ps-logo h-11 w-11 shrink-0 object-contain md:h-12 md:w-12"
            :class="p.lift ? 'ps-lift' : ''"
            width="48"
            height="48"
            loading="lazy"
            decoding="async"
          />
          <span class="whitespace-nowrap text-sm font-medium tracking-tight text-fg/90 md:text-base">{{ p.name }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.ps-viewport { mask: linear-gradient(90deg, transparent, #000 4rem, #000 calc(100% - 4rem), transparent); overflow: hidden; }
.ps-track { animation: ps-move 42s linear infinite; will-change: transform; }
.ps-item {
  animation: ps-float 3.8s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.65s);
  transition: border-color 240ms ease, box-shadow 260ms ease;
}
.ps-logo { transition: transform 260ms var(--ease-out-expo); }
.ps-lift { filter: brightness(2.6) saturate(1.25); }

@media (hover: hover) and (pointer: fine) {
  .ps-viewport:hover .ps-track { animation-play-state: paused; }
  .ps-item:hover {
    border-color: var(--color-line-strong);
    box-shadow: inset 0 1px 0 oklch(1 0 0 / 0.14), 0 18px 40px -22px oklch(0 0 0 / 0.92);
  }
  .ps-item:hover .ps-logo { transform: scale(1.1); }
}

@keyframes ps-move { to { transform: translateX(-50%); } }
@keyframes ps-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@media (prefers-reduced-motion: reduce) {
  .ps-viewport { mask: none; overflow-x: auto; }
  .ps-track { animation: none; width: auto; flex-wrap: wrap; justify-content: center; padding-right: 0; }
  .ps-item { animation: none; }
  .ps-track li[aria-hidden] { display: none; }
}
</style>
