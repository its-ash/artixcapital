<script setup lang="ts">
import gsap from 'gsap'

const root = ref<HTMLElement | null>(null)
const show = ref(true)
const pct = ref(0)
const done = useIntroDone()
const { $lenis } = useNuxtApp()

const finish = () => {
  done.value = true
  $lenis?.start()
}

onMounted(() => {
  const el = root.value
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    show.value = false
    return finish()
  }
  $lenis?.stop()
  const q = gsap.utils.selector(el)
  const word = q('.logo-word > *')
  const xs = q('.logo-x > *')
  const ctr = { v: 0 }
  gsap.set(el, { animation: 'none' })
  gsap.set(word, { fillOpacity: 0, stroke: '#eef0f6', strokeWidth: 3 })
  gsap.timeline({ onComplete: () => { show.value = false } })
    .from(word, { drawSVG: 0, duration: 1, stagger: 0.07, ease: 'power2.inOut' }, 0)
    .to(word, { fillOpacity: 1, strokeWidth: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out' }, 0.65)
    .from(xs, {
      opacity: 0, scale: 0.4, rotate: () => gsap.utils.random(-120, 120),
      x: () => gsap.utils.random(-160, 160), y: () => gsap.utils.random(-120, 120),
      svgOrigin: '956 172', duration: 0.9, stagger: 0.05, ease: 'expo.out'
    }, 0.35)
    .to(ctr, { v: 100, duration: 1.4, ease: 'power3.inOut', onUpdate: () => { pct.value = Math.round(ctr.v) } }, 0)
    .to(q('.pl-line'), { scaleX: 1, duration: 1.4, ease: 'power3.inOut' }, 0)
    .fromTo(q('.pl-inner'), { filter: 'blur(0px)' }, { y: -30, opacity: 0, filter: 'blur(6px)', duration: 0.45, ease: 'power2.inOut', immediateRender: false }, 1.45)
    .to(q('.pl-top'), { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 1.6)
    .to(q('.pl-bot'), { yPercent: 100, duration: 0.9, ease: 'expo.inOut' }, 1.6)
    .add(finish, 1.85)
})
</script>

<template>
  <div v-if="show" ref="root" class="preloader fixed inset-0 z-100 pointer-events-none" aria-hidden="true">
    <div class="pl-top absolute inset-x-0 top-0 h-1/2 bg-canvas" />
    <div class="pl-bot absolute inset-x-0 bottom-0 h-1/2 bg-canvas" />
    <div class="pl-inner absolute inset-0 grid place-items-center">
      <div class="flex w-[min(18rem,60vw)] flex-col items-center gap-6">
        <BrandLogo class="w-full text-fg" />
        <div class="h-px w-full overflow-hidden bg-white/10">
          <div class="pl-line h-full origin-left scale-x-0 bg-linear-to-r from-accent via-pink to-accent" />
        </div>
        <p class="font-mono text-xs tracking-[0.3em] text-muted tabular-nums">{{ String(pct).padStart(3, '0') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.preloader { animation: failsafe 0.4s ease 4s forwards; }
@media (prefers-reduced-motion: reduce) { .preloader { display: none; } }
</style>
