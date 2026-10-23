<script setup lang="ts">
defineProps<{ group: string; title: string; lead: string; center?: boolean }>()
const slots = useSlots()
</script>

<template>
  <header class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(50%_60%_at_80%_0%,rgb(214_20_28/0.14),transparent_70%)]" aria-hidden="true" />
    <div class="wrap relative grid items-center gap-12 pb-16 pt-12 md:pb-20 md:pt-20" :class="slots.aside ? 'lg:grid-cols-12' : ''">
      <div :class="[slots.aside ? 'lg:col-span-7' : '', center ? 'mx-auto text-center' : '']">
        <p class="text-sm font-medium text-accent-soft">{{ group }}</p>
        <h1 v-reveal="'lines'" class="h-display mt-4 max-w-3xl text-4xl sm:text-5xl lg:text-6xl" :class="center ? 'mx-auto' : ''">{{ title }}</h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted" :class="center ? 'mx-auto' : ''">{{ lead }}</p>
        <div v-if="slots.default" class="mt-9 flex flex-wrap gap-3" :class="center ? 'justify-center' : ''"><slot /></div>
        <div v-if="slots.below" class="mt-12"><slot name="below" /></div>
      </div>
      <div v-if="slots.aside" v-reveal="'fade'" class="lg:col-span-5"><slot name="aside" /></div>
    </div>
  </header>
</template>
