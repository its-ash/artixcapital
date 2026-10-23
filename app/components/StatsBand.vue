<script setup lang="ts">
import gsap from 'gsap'

type Stat = { label: string; text: string; count?: { to: number; pre?: string; suf?: string } }

const STATS: Stat[] = [
  { label: 'Spreads from', text: '0.0 pips' },
  { label: 'Maximum leverage', text: '1:200', count: { to: 200, pre: '1:' } },
  { label: 'Commission on Core FX', text: '0%' },
  { label: 'Global instruments', text: '150+', count: { to: 150, suf: '+' } },
  { label: 'Human support', text: '24/5' }
]

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  const st = { trigger: root.value, start: 'top 90%' }
  gsap.from(q('.s-cell'), { y: 20, opacity: 0, stagger: 0.06, duration: 0.9, scrollTrigger: st })
  q('.s-val').forEach((el, i) => {
    const c = STATS[i]?.count
    if (!c) return
    const o = { v: 0 }
    gsap.to(o, { v: c.to, duration: 1.6, ease: 'expo.out', scrollTrigger: st, onUpdate: () => { el.textContent = `${c.pre ?? ''}${Math.round(o.v)}${c.suf ?? ''}` } })
  })
})
</script>

<template>
  <section ref="root" class="wrap" aria-label="Trading conditions">
    <dl class="grid grid-cols-2 gap-y-10 py-12 md:grid-cols-5 md:py-14">
      <div v-for="(s, i) in STATS" :key="s.label" class="s-cell pr-4" :class="[i ? 'md:border-l md:border-line md:pl-6' : '', i === STATS.length - 1 ? 'col-span-2 md:col-span-1' : '']">
        <dt class="text-sm text-muted">{{ s.label }}</dt>
        <dd class="s-val mt-2 whitespace-nowrap font-mono text-3xl tabular-nums tracking-tight lg:text-4xl">{{ s.text }}</dd>
      </div>
    </dl>
  </section>
</template>
