<script setup lang="ts">
const ITEMS = FAQS.map(f => [f.q, f.a] as const)

useFaqLd(ITEMS)
</script>

<template>
  <section id="faq" class="wrap" aria-labelledby="faq-title">
    <div class="grid gap-14 border-t border-line py-24 md:py-32 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="faq-title" class="h-section text-4xl md:text-5xl">Questions, answered.</h2>
        <NuxtLink to="/contact-us/" class="btn btn-ghost mt-10 h-12 px-6 text-sm">Contact us</NuxtLink>
      </div>
      <div class="lg:col-span-8">
        <PageFaq :items="ITEMS" name="faq-home" />
      </div>
    </div>
  </section>
</template>
