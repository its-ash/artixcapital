<script setup lang="ts">
import gsap from 'gsap'
import { PhArrowRight, PhCheckCircle } from '@phosphor-icons/vue'

const root = ref<HTMLElement | null>(null)

useMotion(root, ({ motion }) => {
  if (!motion) return
  const q = gsap.utils.selector(root.value)
  gsap.from(q('.a-card'), {
    y: 100, rotateX: -28, opacity: 0, transformPerspective: 1200, transformOrigin: '50% 100%',
    stagger: 0.1, duration: 1.3, scrollTrigger: { trigger: q('.a-grid')[0], start: 'top 82%' }
  })
  gsap.from(q('.a-note'), { x: -20, opacity: 0, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: q('.a-notes')[0], start: 'top 92%' } })
  q('.a-spec').forEach(el => {
    const raw = el.textContent ?? ''
    const m = raw.match(/^\$([\d,]+)$/)
    if (!m?.[1]) return
    const to = Number(m[1].replace(/,/g, ''))
    const o = { v: 0 }
    gsap.to(o, { v: to, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = `$${Math.round(o.v).toLocaleString('en-US')}` } })
  })
})
</script>

<template>
  <section id="accounts" ref="root" class="relative py-28 md:py-36" aria-labelledby="accounts-title">
    <div class="wrap">
      <h2 id="accounts-title" v-reveal="'lines'" class="max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-6xl">Pick the account that fits <span class="grad-text pb-1">how you trade.</span></h2>
      <p v-reveal="'fade'" class="mt-5 max-w-xl text-lg text-muted">Every account runs on nTrader with access to FX, metals, indices, commodities, equities and crypto.</p>

      <ul class="a-grid mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-6">
        <li v-for="a in ACCOUNTS" :key="a.id" class="a-card min-w-0" :class="[a.span, a.id === 'elite' ? 'md:col-span-2 lg:col-span-2' : '']">
          <article
            v-tilt="5"
            class="spot group relative flex h-full flex-col overflow-hidden rounded-3xl p-7"
            :class="a.featured ? 'shadow-[0_30px_80px_-40px_rgb(81_132_255/0.6)]' : a.id === 'demo' ? 'panel bg-[radial-gradient(90%_80%_at_100%_100%,rgb(255_122_234/0.14),transparent_70%)]' : 'panel'"
          >
            <template v-if="a.featured">
              <span class="ring-spin" aria-hidden="true" />
              <span class="ring-fill" aria-hidden="true" />
              <span class="holo-sheen" aria-hidden="true" />
            </template>
            <div class="flex items-center gap-3">
              <span class="chip grid size-11 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" :style="{ '--hue': a.hue }">
                <component :is="a.icon" :size="22" />
              </span>
              <h3 class="text-2xl font-bold tracking-tight">Artix {{ a.name }}</h3>
              <span v-if="a.featured" class="ml-auto rounded-full bg-fg px-3 py-1 text-xs font-bold text-ink">Lowest cost</span>
            </div>
            <p class="mt-4 max-w-sm text-muted">{{ a.tag }}</p>

            <dl v-if="a.specs.length" class="mt-7 grid grid-cols-2 gap-x-4 gap-y-5" :class="a.id === 'coverage' ? 'sm:grid-cols-4' : ''">
              <div v-for="s in a.specs" :key="s.k">
                <dt class="text-xs text-muted">{{ s.k }}</dt>
                <dd class="a-spec mt-1 font-mono text-xl tabular-nums">{{ s.v }}</dd>
              </div>
            </dl>

            <a :href="a.href" class="relative z-2 mt-auto inline-flex items-center gap-2 pt-8 text-sm font-bold">
              <span class="bg-linear-to-r from-accent-soft to-accent-soft bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                {{ a.id === 'demo' ? 'Try the demo' : `View ${a.name} account` }}
              </span>
              <PhArrowRight :size="16" weight="bold" class="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </article>
        </li>
      </ul>

      <ul class="a-notes mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
        <li v-for="n in ACCOUNT_NOTES" :key="n" class="a-note inline-flex items-center gap-2">
          <PhCheckCircle :size="16" weight="fill" class="text-accent" />{{ n }}
        </li>
      </ul>
    </div>
  </section>
</template>
