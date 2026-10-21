<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PhCaretDown, PhCaretUp } from '@phosphor-icons/vue'

const LOOP_S = 60
const MAX_SPEED = 6

const { quotes } = useMarketFeed()
const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

useMotion(root, ({ motion, fine }) => {
  if (!motion || !track.value) return
  const loop = gsap.to(track.value, { xPercent: -50, duration: LOOP_S, ease: 'none', repeat: -1 })
  loop.totalTime(LOOP_S * 100)
  const skew = gsap.quickTo(track.value, 'skewX', { duration: 0.6, ease: 'power3.out' })
  const unskew = gsap.delayedCall(0.2, () => skew(0)).pause()
  let dir = 1
  const st = ScrollTrigger.create({
    trigger: root.value,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: self => {
      const v = self.getVelocity()
      dir = self.direction
      gsap.to(loop, { timeScale: dir * gsap.utils.clamp(1, MAX_SPEED, 1 + Math.abs(v) / 400), duration: 0.2, overwrite: true })
      gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25, ease: 'power2.out' })
      skew(gsap.utils.clamp(-8, 8, v / -250))
      unskew.restart(true)
    }
  })
  const pause = () => gsap.to(loop, { timeScale: 0, duration: 0.6, overwrite: true })
  const resume = () => gsap.to(loop, { timeScale: dir, duration: 0.6, overwrite: true })
  if (fine) {
    root.value?.addEventListener('pointerenter', pause)
    root.value?.addEventListener('pointerleave', resume)
  }
  return () => {
    st.kill()
    root.value?.removeEventListener('pointerenter', pause)
    root.value?.removeEventListener('pointerleave', resume)
  }
})
</script>

<template>
  <section ref="root" class="relative border-y border-white/10 bg-[rgb(12_12_19/0.82)]" aria-label="Indicative prices">
    <div class="flex h-16 items-center overflow-x-auto motion-safe:overflow-hidden scrollbar-none">
      <div ref="track" class="flex w-max font-mono text-sm will-change-transform">
        <ul v-for="copy in 2" :key="copy" class="flex shrink-0" :aria-hidden="copy === 2">
          <li v-for="q in quotes" :key="q.sym" class="inline-flex items-center gap-2.5 px-7">
            <b class="font-bold text-fg">{{ q.sym }}</b>
            <span class="tabular-nums text-fg/80">{{ fmt(q.price, q.dp) }}</span>
            <span class="inline-flex items-center gap-0.5 tabular-nums" :class="q.chg >= 0 ? 'text-up' : 'text-down'">
              <component :is="q.chg >= 0 ? PhCaretUp : PhCaretDown" :size="12" weight="fill" aria-hidden="true" />{{ Math.abs(q.chg).toFixed(2) }}%
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
