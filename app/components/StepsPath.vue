<script setup lang="ts">
import { PhArrowRight } from '@phosphor-icons/vue'

const ITEMS = STEPS.map(s => [s.title, s.desc] as const)
</script>

<template>
  <section class="wrap" aria-labelledby="steps-title">
    <div class="border-t border-line py-24 md:py-32">
      <h2 id="steps-title" v-reveal="'lines'" class="h-section max-w-2xl text-4xl md:text-6xl">From sign-up to first trade in three steps.</h2>
      <div class="mt-16">
        <PageSteps :items="ITEMS" />
      </div>
      <a v-magnetic="0.2" :href="SIGNUP" class="btn btn-primary mt-16 h-14 px-8">
        Open account
        <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
      </a>
    </div>
  </section>
</template>
