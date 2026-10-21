<script setup lang="ts">
import gsap from 'gsap'
import { PhEnvelopeSimple, PhMapPin, PhPhone, PhPlus } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.faq-item'), { y: 40, opacity: 0, stagger: 0.07, duration: 1, scrollTrigger: { trigger: q('.faq')[0], start: 'top 85%' } })
  gsap.from(q('.c-card'), { y: 60, opacity: 0, scale: 0.96, duration: 1.2, scrollTrigger: { trigger: q('.c-card')[0], start: 'top 90%' } })
})
</script>

<template>
  <section id="faq" ref="root" class="relative py-28 md:py-36" aria-labelledby="faq-title">
    <div class="wrap grid gap-12 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <h2 id="faq-title" v-reveal="'lines'" class="text-4xl font-bold tracking-[-0.03em] md:text-6xl">Questions, <span class="grad-text">answered.</span></h2>
        <div id="contact" v-tilt="4" class="c-card spot glass mt-10 rounded-3xl p-7">
          <p class="text-xl font-bold">Talk to a real person</p>
          <p class="mt-2 text-muted">Our support team is available 24 hours a day, five days a week.</p>
          <ul class="mt-6 grid gap-4 text-sm">
            <li><a :href="`tel:${PHONE.replace(/\s/g, '')}`" class="relative z-2 inline-flex items-center gap-3 hover:text-accent-soft"><PhPhone :size="18" class="text-accent-soft" />{{ PHONE }}</a></li>
            <li><a :href="`mailto:${EMAIL}`" class="relative z-2 inline-flex items-center gap-3 hover:text-accent-soft"><PhEnvelopeSimple :size="18" class="text-accent-soft" />{{ EMAIL }}</a></li>
            <li class="inline-flex items-center gap-3 text-muted"><PhMapPin :size="18" class="text-accent-soft" />{{ OFFICE }}</li>
          </ul>
          <a v-magnetic="0.2" :href="NAV[5]?.items[1]?.href" class="btn btn-ghost relative z-2 mt-7 h-12 px-6">Contact us</a>
        </div>
      </div>

      <div class="faq grid content-start gap-3 lg:col-span-7">
        <details v-for="(f, i) in FAQS" :key="f.q" name="faq" class="faq-item glass group rounded-3xl" :open="i === 0">
          <summary class="flex cursor-pointer items-center justify-between gap-6 rounded-3xl p-6 text-lg font-bold transition-colors hover:text-accent-soft">
            {{ f.q }}
            <span class="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 transition-colors group-open:border-accent group-open:bg-accent group-open:text-ink">
              <PhPlus :size="16" weight="bold" class="faq-icon" />
            </span>
          </summary>
          <p class="px-6 pb-6 text-muted">{{ f.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
