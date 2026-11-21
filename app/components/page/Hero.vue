<script setup lang="ts">
import gsap from 'gsap'
import { SITE_URL } from '#shared/routes'
import type { CapitalMascotPose } from '~/components/BearMascot.vue'

const props = defineProps<{ group: string; title: string; lead: string; center?: boolean; mascot?: CapitalMascotPose }>()
const slots = useSlots()
const route = useRoute()
const hasRight = computed(() => !!slots.aside || (!!props.mascot && !props.center))

useJsonLd('ld-breadcrumb', {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: props.title, item: `${SITE_URL}${route.path.replace(/\/?$/, '/')}` }
  ]
})

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.ph-in'), { y: 24, opacity: 0, stagger: 0.08, duration: 1, delay: 0.25, ease: 'expo.out' })
  gsap.from(q('.ph-aside'), { y: 40, opacity: 0, scale: 0.97, duration: 1.2, delay: 0.35, ease: 'expo.out' })
  gsap.to(q('.ph-glow'), { yPercent: 25, opacity: 0.4, ease: 'none', scrollTrigger: { trigger: root.value, start: 'top top', end: 'bottom top', scrub: true } })
})
</script>

<template>
  <header ref="root" class="relative isolate overflow-hidden border-b border-line">
    <div class="pointer-events-none absolute inset-0 -z-1" aria-hidden="true">
      <span class="ph-glow absolute -top-48 right-[-10%] size-176 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_62%)]" />
      <span class="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-canvas" />
    </div>
    <div class="wrap grid items-center gap-8 pt-10 pb-10 md:pt-12 md:pb-14" :class="hasRight ? 'lg:grid-cols-12' : ''">
      <div :class="[hasRight ? 'lg:col-span-7' : '', center ? 'mx-auto text-center' : '']">
        <div :class="slots.aside && mascot ? 'flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between' : ''">
          <div :class="slots.aside && mascot ? 'min-w-0 flex-1' : ''">
            <p class="ph-in eyebrow">{{ group }}</p>
            <h1 class="h-display mt-4 max-w-3xl text-balance text-4xl sm:text-5xl lg:text-6xl" :class="center ? 'mx-auto' : ''">{{ title }}</h1>
            <p class="ph-in mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg" :class="center ? 'mx-auto' : ''">{{ lead }}</p>
            <div v-if="slots.default" class="ph-in mt-6 flex flex-wrap gap-3" :class="center ? 'justify-center' : ''"><slot /></div>
          </div>
          <BearMascot v-if="slots.aside && mascot" :pose="mascot" eager class="ph-aside mx-auto w-32 shrink-0 sm:mx-0 sm:w-36 lg:w-40" />
        </div>
        <BearMascot v-if="center && mascot && !slots.aside" :pose="mascot" eager class="ph-aside mx-auto mt-8 w-44 sm:w-52" />
        <div v-if="slots.below" class="ph-in mt-8"><slot name="below" /></div>
      </div>
      <div v-if="slots.aside" class="ph-aside lg:col-span-5"><slot name="aside" /></div>
      <div v-else-if="mascot && !center" class="ph-aside flex justify-center lg:col-span-5 lg:justify-end">
        <BearMascot :pose="mascot" eager class="w-48 sm:w-56 lg:w-64" />
      </div>
    </div>
  </header>
</template>
