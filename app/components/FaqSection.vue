<script setup lang="ts">
const ITEMS = FAQS.map(f => [f.q, f.a] as const)

useFaqLd(ITEMS)
</script>

<template>
  <section id="faq" class="cv-auto wrap" style="--cv-h: 620px" aria-labelledby="faq-title">
    <div class="section-rule grid gap-8 py-12 md:py-16 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="faq-title" class="h-section text-3xl sm:text-4xl md:text-5xl">Questions, answered.</h2>
        <NuxtLink to="/contact-us/" class="btn btn-ghost mt-6 h-11 px-5 text-sm">Contact us</NuxtLink>
        <BearMascot pose="faq" class="mx-auto mt-6 w-40 sm:w-44 lg:mx-0 lg:w-48" />
      </div>
      <div class="lg:col-span-8">
        <PageFaq :items="ITEMS" name="faq-home" />
      </div>
    </div>
  </section>
</template>
