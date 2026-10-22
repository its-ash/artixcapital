<script setup lang="ts">
import gsap from 'gsap'

type Stat = { label: string; text: string; hue: string; count?: { to: number; pre?: string; suf?: string } }

const STATS: Stat[] = [
  { label: 'Spreads from', text: '0.0 pips', hue: '#e0525c' },
  { label: 'Maximum leverage', text: '1:200', hue: '#c41e2a', count: { to: 200, pre: '1:' } },
  { label: 'Commission on Core FX', text: '0%', hue: '#7d8da8' },
  { label: 'Global instruments', text: '150+', hue: '#c41e2a', count: { to: 150, suf: '+' } },
  { label: 'Human support', text: '24/5', hue: '#a9b7cf' }
]

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: root.value, start: 'top 85%' }
  gsap.from(q('.s-cell'), { y: 50, opacity: 0, stagger: 0.08, duration: 1.1, scrollTrigger: st })
  gsap.from(q('.s-div'), { scaleY: 0, stagger: 0.08, duration: 1.2, ease: 'expo.inOut', scrollTrigger: st })
  q('.s-val').forEach((el, i) => {
    const s = STATS[i]
    if (!s) return
    if (s.count) {
      const o = { v: 0 }
      const { to, pre = '', suf = '' } = s.count
      gsap.to(o, { v: to, duration: 2, ease: 'expo.out', scrollTrigger: st, onUpdate: () => { el.textContent = `${pre}${Math.round(o.v)}${suf}` } })
    } else {
      gsap.to(el, { duration: 1.4, scrambleText: { text: s.text, chars: '0123456789%/.', speed: 0.6, revealDelay: 0.3 }, scrollTrigger: st })
    }
  })
})
</script>

<template>
  <section ref="root" class="relative py-8" aria-label="Trading conditions">
    <div class="wrap">
      <dl class="glass grid grid-cols-2 rounded-3xl md:grid-cols-5">
        <div
          v-for="(s, i) in STATS"
          :key="s.label"
          class="s-cell relative px-6 py-7"
          :class="i === STATS.length - 1 ? 'col-span-2 md:col-span-1' : ''"
        >
          <span v-if="i" class="s-div absolute left-0 top-6 bottom-6 hidden w-px origin-top bg-white/10 md:block" aria-hidden="true" />
          <dt class="text-sm text-muted">{{ s.label }}</dt>
          <dd class="s-val mt-2 whitespace-nowrap font-mono text-2xl font-medium tracking-tight tabular-nums sm:text-3xl lg:text-4xl" :style="{ color: s.hue }">{{ s.text }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
