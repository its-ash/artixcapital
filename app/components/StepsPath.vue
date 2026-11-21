<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhArrowRight, PhCheck } from '@phosphor-icons/vue'
import type { CapitalMascotPose } from './BearMascot.vue'

const DETAILS = [
  ['Email address', 'Name and country', 'Secure password'],
  ['Identity document', 'Proof of address', 'Reviewed by our team'],
  ['Visa and Mastercard', 'Neteller and Skrill', 'Crypto wallets']
]

const POSES: CapitalMascotPose[] = ['signup', 'verify', 'trade']
const ITEMS = STEPS.map((s, i) => ({ ...s, details: DETAILS[i] ?? [], pose: POSES[i] ?? 'stand' }))

const root = ref<HTMLElement | null>(null)
const active = ref(0)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  q('.st-item').forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => { active.value = i },
      onEnterBack: () => { active.value = i }
    })
  })
})
</script>

<template>
  <section ref="root" class="wrap" aria-labelledby="steps-title">
    <div class="section-rule grid gap-8 py-12 md:py-16 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-5">
        <div class="lg:sticky lg:top-24">
          <h2 id="steps-title" class="h-section max-w-md text-3xl sm:text-4xl md:text-5xl">From sign-up to first trade in three steps.</h2>
          <p class="mt-3 max-w-sm text-base leading-relaxed text-muted md:text-lg">Open, verify and fund from one client area. Your account is ready on MetaTrader 5 and nTrader once checks clear.</p>
          <a v-magnetic="0.2" :href="SIGNUP" class="btn btn-primary mt-6 h-12 px-7">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
          <div class="st-bear relative mx-auto mt-6 hidden h-56 w-48 lg:mx-0 lg:block" aria-hidden="true">
            <BearMascot
              v-for="(s, i) in ITEMS"
              :key="s.pose"
              :pose="s.pose"
              decorative
              class="st-bear-img absolute bottom-0 left-0 max-h-full w-auto transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
              :class="i === active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95'"
            />
          </div>
        </div>
      </div>

      <ol class="st-list relative grid gap-4 lg:col-span-7">
        <span class="absolute top-6 bottom-6 left-6 w-px bg-line-strong" aria-hidden="true">
          <span class="st-fill absolute inset-0 origin-top bg-accent" />
        </span>

        <li v-for="(s, i) in ITEMS" :key="s.title" class="st-item relative grid grid-cols-[3rem_1fr] gap-4 sm:gap-5">
          <span class="st-node relative z-1 grid size-12 place-items-center rounded-2xl border shadow-[inset_0_1px_0_oklch(1_0_0/0.22),0_10px_24px_-12px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]" aria-hidden="true">
            <component :is="s.icon" :size="20" weight="duotone" />
          </span>

          <article class="st-card surface-lux group relative isolate overflow-hidden rounded-2xl p-4 transition-[border-color,translate,box-shadow] duration-300 hover:border-line-strong sm:p-5">
            <span class="st-glow pointer-events-none absolute inset-0 -z-1" aria-hidden="true" />
            <span class="pointer-events-none absolute -top-5 right-4 -z-1 select-none font-mono text-[5.5rem] leading-none font-bold text-fg/4" aria-hidden="true">{{ i + 1 }}</span>
            <p class="font-mono text-xs text-accent-soft">Step {{ i + 1 }}</p>
            <h3 class="mt-1.5 text-xl font-semibold tracking-tight md:text-2xl">{{ s.title }}</h3>
            <p class="mt-1.5 max-w-md text-sm leading-relaxed text-muted md:text-base">{{ s.desc }}</p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li v-for="d in s.details" :key="d" class="chip inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs">
                <PhCheck :size="12" weight="bold" class="text-accent-soft" />{{ d }}
              </li>
            </ul>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.st-item { --on: 1; }
.st-node {
  background: color-mix(in oklab, var(--color-accent) calc(var(--on) * 100%), var(--color-canvas));
  border-color: color-mix(in oklab, var(--color-accent) calc(var(--on) * 100%), var(--color-line-strong));
  color: color-mix(in oklab, var(--color-on-accent) calc(var(--on) * 100%), var(--color-muted));
  scale: calc(0.9 + var(--on) * 0.1);
}
.st-card { opacity: calc(0.45 + var(--on) * 0.55); }
.st-glow { opacity: var(--on); background: radial-gradient(60% 80% at 0% 0%, color-mix(in oklab, var(--color-accent) 12%, transparent), transparent 70%); }
@media (hover: hover) and (pointer: fine) {
  .st-card:hover { translate: 4px 0; }
}
@media (prefers-reduced-motion: reduce) {
  .st-card:hover { translate: none; }
}
</style>
