<script setup lang="ts">
import gsap from 'gsap'
import { SITE_URL } from '#shared/routes'

const props = defineProps<{ group: string; title: string; lead: string; center?: boolean }>()
const slots = useSlots()
const route = useRoute()

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
    <div class="wrap grid items-center gap-12 pt-14 pb-16 md:pt-20 md:pb-24" :class="slots.aside ? 'lg:grid-cols-12' : ''">
      <div :class="[slots.aside ? 'lg:col-span-7' : '', center ? 'mx-auto text-center' : '']">
        <p class="ph-in chip inline-flex h-8 items-center rounded-full px-3.5 text-xs font-medium text-accent-soft">{{ group }}</p>
        <h1 v-reveal="'lines'" class="h-display mt-6 max-w-3xl text-balance text-4xl sm:text-5xl lg:text-6xl" :class="center ? 'mx-auto' : ''">{{ title }}</h1>
        <p class="ph-in mt-6 max-w-2xl text-lg leading-relaxed text-muted" :class="center ? 'mx-auto' : ''">{{ lead }}</p>
        <div v-if="slots.default" class="ph-in mt-9 flex flex-wrap gap-3" :class="center ? 'justify-center' : ''"><slot /></div>
        <div v-if="slots.below" class="ph-in mt-12"><slot name="below" /></div>
      </div>
      <div v-if="slots.aside" class="ph-aside lg:col-span-5"><slot name="aside" /></div>
    </div>
  </header>
</template>
