<script setup lang="ts">
import { PhArrowRight, PhEnvelopeSimple, PhPhone } from '@phosphor-icons/vue'

const props = defineProps<{ id: string; title: string; items: readonly (readonly [string, string])[] }>()

useFaqLd(props.items)

const CONTACT = [
  { icon: PhPhone, value: PHONE, href: `tel:${PHONE.replace(/\s/g, '')}` },
  { icon: PhEnvelopeSimple, value: EMAIL, href: `mailto:${EMAIL}` }
]
</script>

<template>
  <section :aria-labelledby="id" class="wrap">
    <div class="section-rule grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:gap-8">
      <div class="lg:col-span-4">
        <div class="lg:sticky lg:top-24">
          <h2 :id="id" class="h-section max-w-sm text-3xl md:text-4xl">{{ title }}</h2>
          <p class="mt-3 max-w-xs leading-relaxed text-muted">Short answers to what traders ask most. Anything else, our team is a message away.</p>

          <div v-spot class="card mt-6 p-4 sm:p-5">
            <p class="font-medium">Talk to a real person</p>
            <p class="mt-1 text-sm text-muted">Support runs 24 hours a day, five days a week.</p>
            <ul class="mt-5 grid gap-2 text-sm">
              <li v-for="c in CONTACT" :key="c.href">
                <a :href="c.href" class="inline-flex items-center gap-3 transition-colors hover:text-accent-soft">
                  <span class="grid size-8 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)] text-accent-soft"><component :is="c.icon" :size="14" weight="bold" /></span>
                  {{ c.value }}
                </a>
              </li>
            </ul>
            <NuxtLink to="/contact-us/" class="btn btn-ghost mt-6 h-11 px-5 text-sm">
              Contact us
              <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="14" weight="bold" /><PhArrowRight :size="14" weight="bold" /></span>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="lg:col-span-8">
        <PageFaq :items="items" :name="id" />
        <slot />
      </div>
    </div>
  </section>
</template>
