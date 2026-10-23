<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'

withDefaults(defineProps<{ title?: string; demo?: boolean }>(), { title: 'Practise on demo. Go live when you are ready.', demo: true })
</script>

<template>
  <section class="wrap pb-24" aria-labelledby="cta-band">
    <div class="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-14 md:px-14 md:py-16">
      <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_100%_100%,rgb(214_20_28/0.16),transparent_70%)]" aria-hidden="true" />
      <div class="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="cta-band" class="h-section max-w-xl text-3xl md:text-4xl">{{ title }}</h2>
        <div class="flex flex-wrap gap-3">
          <a v-magnetic="0.2" :href="SIGNUP" class="btn btn-primary h-13 px-7">
            Open account
            <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
          </a>
          <NuxtLink v-if="demo" to="/artix-demo-account/" class="btn btn-ghost h-13 px-7">Try demo</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
