<script setup lang="ts">
const CANDLE_PX = 11
const NEW_CANDLE_MS = 1800
const MA = 10
const GROW_MS = 1200

type Candle = { o: number; h: number; l: number; c: number }

const props = withDefaults(defineProps<{ seed: number; base: number; dp: number; vol?: number; active?: boolean }>(), { vol: 0.0012, active: true })

const box = ref<HTMLElement | null>(null)
const cvs = ref<HTMLCanvasElement | null>(null)
let stop = () => {}

onMounted(() => {
  const el = box.value
  const c = cvs.value
  const ctx = c?.getContext('2d')
  if (!el || !c || !ctx) return

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const r = rng(props.seed)
  const next = (o: number): Candle => {
    const cl = o * (1 + (r() - 0.48) * props.vol * 3)
    return { o, c: cl, h: Math.max(o, cl) * (1 + r() * props.vol), l: Math.min(o, cl) * (1 - r() * props.vol) }
  }
  const data: Candle[] = []
  let p = props.base
  for (let i = 0; i < 140; i++) {
    const d = next(p)
    data.push(d)
    p = d.c
  }

  let w = 0
  let h = 0
  let lo = 0
  let hi = 0
  let raf = 0
  let visible = false
  let born = 0
  let last = 0

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2)
    w = el.clientWidth
    h = el.clientHeight
    c.width = Math.round(w * dpr)
    c.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (reduce || !raf) draw(performance.now())
  }

  const draw = (now: number) => {
    const n = Math.max(10, Math.floor((w - 56) / CANDLE_PX))
    const view = data.slice(-n)
    const tlo = Math.min(...view.map(d => d.l))
    const thi = Math.max(...view.map(d => d.h))
    lo = lo ? lo + (tlo - lo) * 0.08 : tlo
    hi = hi ? hi + (thi - hi) * 0.08 : thi
    const pad = (hi - lo) * 0.12
    const y = (v: number) => 10 + (1 - (v - lo + pad) / (hi - lo + pad * 2)) * (h - 20)
    const grow = reduce ? 1 : Math.min(1, (now - born) / GROW_MS)

    ctx.clearRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)'
    ctx.lineWidth = 1
    for (let k = 1; k < 5; k++) {
      const gy = Math.round((h / 5) * k) + 0.5
      ctx.beginPath()
      ctx.moveTo(0, gy)
      ctx.lineTo(w, gy)
      ctx.stroke()
    }

    view.forEach((d, i) => {
      const g = Math.max(0, Math.min(1, grow * 1.6 - (i / view.length) * 0.6))
      if (!g) return
      const x = 4 + i * CANDLE_PX + CANDLE_PX / 2
      const mid = (y(d.o) + y(d.c)) / 2
      const k = (v: number) => mid + (y(v) - mid) * g
      const up = d.c >= d.o
      ctx.strokeStyle = ctx.fillStyle = up ? '#3fd17a' : '#ff5d64'
      ctx.globalAlpha = 0.35 + g * 0.65
      ctx.beginPath()
      ctx.moveTo(Math.round(x) + 0.5, k(d.h))
      ctx.lineTo(Math.round(x) + 0.5, k(d.l))
      ctx.stroke()
      const top = k(Math.max(d.o, d.c))
      ctx.fillRect(x - CANDLE_PX * 0.32, top, CANDLE_PX * 0.64, Math.max(1, k(Math.min(d.o, d.c)) - top))
    })
    ctx.globalAlpha = 1

    ctx.strokeStyle = '#9a9ca3'
    ctx.lineWidth = 1.6
    ctx.beginPath()
    view.forEach((_, i) => {
      if (i < MA - 1 || i / view.length > grow) return
      const avg = view.slice(i - MA + 1, i + 1).reduce((s, d) => s + d.c, 0) / MA
      const x = 4 + i * CANDLE_PX + CANDLE_PX / 2
      i === MA - 1 ? ctx.moveTo(x, y(avg)) : ctx.lineTo(x, y(avg))
    })
    ctx.stroke()

    const cur = view.at(-1)
    if (!cur) return
    const py = Math.round(y(cur.c)) + 0.5
    const col = cur.c >= cur.o ? '#3fd17a' : '#ff5d64'
    ctx.setLineDash([3, 4])
    ctx.strokeStyle = col
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, py)
    ctx.lineTo(w - 52, py)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.fillStyle = col
    ctx.beginPath()
    ctx.roundRect(w - 54, py - 9, 52, 18, 4)
    ctx.fill()
    ctx.fillStyle = '#1a1d22'
    ctx.font = '500 10px "JetBrains Mono", ui-monospace, monospace'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(cur.c.toFixed(props.dp), w - 28, py + 0.5)
  }

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop)
    if (!visible || !props.active || document.hidden) return
    const cur = data.at(-1)
    if (cur) {
      cur.c *= 1 + (Math.random() - 0.5) * props.vol * 0.25
      cur.h = Math.max(cur.h, cur.c)
      cur.l = Math.min(cur.l, cur.c)
      if (now - last > NEW_CANDLE_MS) {
        last = now
        data.push(next(cur.c))
        data.shift()
      }
    }
    draw(now)
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el)
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting
    if (visible && !born) born = performance.now()
  }, { rootMargin: '100px' })
  io.observe(el)
  resize()
  if (!reduce) raf = requestAnimationFrame(loop)

  stop = () => {
    cancelAnimationFrame(raf)
    ro.disconnect()
    io.disconnect()
  }
})

onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="box" class="relative size-full">
    <canvas ref="cvs" class="absolute inset-0 size-full" aria-hidden="true" />
  </div>
</template>
