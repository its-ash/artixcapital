<script setup lang="ts">
import { PhEnvelopeSimple, PhMapPin, PhPhone } from '@phosphor-icons/vue'

const ITEMS = FAQS.map(f => [f.q, f.a] as const)

useFaqLd(ITEMS)
</script>

<template>
  <section id="faq" class="wrap" aria-labelledby="faq-title">
    <div class="grid gap-14 border-t border-line py-24 md:py-32 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="faq-title" class="h-section text-4xl md:text-5xl">Questions, answered.</h2>
        <div id="contact" class="mt-10">
          <p class="font-semibold">Talk to a real person</p>
          <p class="mt-2 max-w-xs text-sm leading-relaxed text-muted">Our support team is available 24 hours a day, five days a week.</p>
          <ul class="mt-6 grid gap-3 text-sm">
            <li><a :href="`tel:${PHONE.replace(/\s/g, '')}`" class="inline-flex items-center gap-3 transition-colors hover:text-accent-soft"><PhPhone :size="16" class="text-muted" />{{ PHONE }}</a></li>
            <li><a :href="`mailto:${EMAIL}`" class="inline-flex items-center gap-3 transition-colors hover:text-accent-soft"><PhEnvelopeSimple :size="16" class="text-muted" />{{ EMAIL }}</a></li>
            <li class="inline-flex items-center gap-3 text-muted"><PhMapPin :size="16" />{{ OFFICE }}</li>
          </ul>
          <NuxtLink to="/contact-us/" class="btn btn-ghost mt-8 h-12 px-6 text-sm">Contact us</NuxtLink>
        </div>
      </div>
      <div class="lg:col-span-8">
        <PageFaq :items="ITEMS" name="faq-home" />
      </div>
    </div>
  </section>
</template>
