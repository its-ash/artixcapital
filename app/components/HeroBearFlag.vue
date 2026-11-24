<script setup lang="ts">
const FLAG_W = 560
const FLAG_H = 330
const SLICES = 144
const PAD_X = 2
const PAD_TOP = 56
const PAD_BOT = 72

const X_MIN = 837.3
const Y_MIN = 15.7
const X_W = 237.3
const X_H = 314.1

const SLASH: [number, number][] = [[1074.6, 329.8], [1037.7, 329.8], [837.3, 15.7], [874.3, 15.7]]
const FACETS: { fill: string; pts: [number, number][] }[] = [
  { fill: '#851c23', pts: [[1074.6, 15.7], [985.7, 144.5], [907.8, 15.7]] },
  { fill: '#ec2026', pts: [[907.8, 15.7], [966.5, 113.4], [1011, 83.7]] },
  { fill: '#d71f29', pts: [[1074.6, 15.7], [1041.4, 15.7], [994.5, 15.7], [1011, 83.7]] },
  { fill: '#47b549', pts: [[926.2, 200.9], [1004.1, 329.8], [837.3, 329.8]] },
  { fill: '#8dc582', pts: [[1003.8, 329.3], [944.1, 230.5], [901.3, 259.7]] },
  { fill: '#30a150', pts: [[918.6, 329.8], [901.3, 259.7], [837.3, 329.8]] },
  { fill: '#1b713b', pts: [[944.1, 230.5], [871.6, 280.1], [911.3, 222.5]] }
]

const box = ref<HTMLElement | null>(null)
const cvs = ref<HTMLCanvasElement | null>(null)
let stop = () => {}

const buildFlagCanvas = () => {
  const off = document.createElement('canvas')
  off.width = FLAG_W
  off.height = FLAG_H
  const c = off.getContext('2d')
  if (!c) return off

  const bg = c.createLinearGradient(0, 0, FLAG_W, FLAG_H)
  bg.addColorStop(0, '#1b1e25')
  bg.addColorStop(0.45, '#12141a')
  bg.addColorStop(1, '#0d0f13')
  c.fillStyle = bg
  c.fillRect(0, 0, FLAG_W, FLAG_H)

  c.strokeStyle = 'rgba(255,255,255,0.028)'
  c.lineWidth = 1
  c.beginPath()
  for (let i = -FLAG_H; i < FLAG_W + FLAG_H; i += 9) {
    c.moveTo(i, 0)
    c.lineTo(i + FLAG_H, FLAG_H)
  }
  c.stroke()

  const glow = c.createRadialGradient(FLAG_W * 0.53, FLAG_H * 0.5, 16, FLAG_W * 0.53, FLAG_H * 0.5, FLAG_H * 0.62)
  glow.addColorStop(0, 'rgba(214,20,28,0.2)')
  glow.addColorStop(0.55, 'rgba(63,209,122,0.06)')
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  c.fillStyle = glow
  c.fillRect(0, 0, FLAG_W, FLAG_H)

  c.fillStyle = 'rgba(214,20,28,0.78)'
  c.fillRect(0, 0, 5, FLAG_H)

  c.strokeStyle = 'rgba(255,255,255,0.11)'
  c.lineWidth = 2
  c.strokeRect(10, 10, FLAG_W - 20, FLAG_H - 20)

  const targetH = FLAG_H * 0.66
  const sc = targetH / X_H
  const ox = FLAG_W * 0.53 - (X_W * sc) / 2
  const oy = (FLAG_H - targetH) / 2
  const poly = (pts: [number, number][]) => {
    c.beginPath()
    pts.forEach(([x, y], i) => {
      const px = ox + (x - X_MIN) * sc
      const py = oy + (y - Y_MIN) * sc
      i ? c.lineTo(px, py) : c.moveTo(px, py)
    })
    c.closePath()
  }

  c.save()
  c.shadowColor = 'rgba(236,32,38,0.35)'
  c.shadowBlur = 18
  for (const f of FACETS.slice(0, 3)) {
    poly(f.pts)
    c.fillStyle = f.fill
    c.fill()
  }
  c.shadowColor = 'rgba(71,181,73,0.32)'
  for (const f of FACETS.slice(3)) {
    poly(f.pts)
    c.fillStyle = f.fill
    c.fill()
  }
  c.restore()

  const slashGrad = c.createLinearGradient(ox, oy, ox + X_W * sc, oy + targetH)
  slashGrad.addColorStop(0, '#ffffff')
  slashGrad.addColorStop(0.55, '#eceef2')
  slashGrad.addColorStop(1, '#cfd3dc')
  poly(SLASH)
  c.fillStyle = slashGrad
  c.fill()

  const hoistShadow = c.createLinearGradient(0, 0, 26, 0)
  hoistShadow.addColorStop(0, 'rgba(0,0,0,0.62)')
  hoistShadow.addColorStop(0.45, 'rgba(0,0,0,0.2)')
  hoistShadow.addColorStop(1, 'rgba(0,0,0,0)')
  c.fillStyle = hoistShadow
  c.fillRect(0, 0, 26, FLAG_H)

  return off
}

onMounted(() => {
  const el = box.value
  const c = cvs.value
  const ctx = c?.getContext('2d')
  if (!el || !c || !ctx) return

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const src = buildFlagCanvas()
  const vw = FLAG_W + PAD_X * 2 + 24
  const vh = FLAG_H + PAD_TOP + PAD_BOT
  const xs = new Float32Array(SLICES + 1)
  const yt = new Float32Array(SLICES + 1)
  const yb = new Float32Array(SLICES + 1)
  const sl = new Float32Array(SLICES + 1)
  let raf = 0
  let visible = true

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2)
    const cw = Math.max(1, c.clientWidth)
    const ch = Math.max(1, c.clientHeight)
    c.width = Math.round(cw * dpr)
    c.height = Math.round(ch * dpr)
    ctx.setTransform((cw * dpr) / vw, 0, 0, (ch * dpr) / vh, 0, 0)
    if (reduce) draw(1.2)
  }

  const waveY = (u: number, t: number, gust: number) => {
    const e = u ** 1.15
    return (
      e * (
        Math.sin(u * 6.4 - t * 3.8) * 26 * gust +
        Math.sin(u * 12.2 - t * 6.4 + 1.1) * 7.5 +
        Math.cos(u * 3.1 - t * 1.8) * 5.2
      ) +
      u * u * 16
    )
  }

  const draw = (t: number) => {
    const gust = 0.88 + 0.22 * Math.sin(t * 0.95)
    const step = FLAG_W / SLICES
    const du = 1 / SLICES

    let px = PAD_X
    for (let i = 0; i <= SLICES; i++) {
      const u = i * du
      const y = waveY(u, t, gust)
      const ym = i > 0 ? waveY(Math.max(0, u - du), t, gust) : y
      const yp = i < SLICES ? waveY(Math.min(1, u + du), t, gust) : y
      const dy = (yp - ym) / (2 * step)
      sl[i] = dy
      if (i > 0) px += step * (1 - 0.2 * Math.min(1, dy * dy * 2.5))
      xs[i] = px
      const flutter = Math.sin(u * 7.8 - t * 4.6) * 6.5 * u
      const billow = Math.sin(u * 5.1 - t * 3.1 + 0.85) * 7 * u
      yt[i] = PAD_TOP + y + flutter
      yb[i] = PAD_TOP + FLAG_H + y + billow - u * 5
    }

    ctx.clearRect(0, 0, vw, vh)

    ctx.save()
    ctx.beginPath()
    ctx.moveTo(xs[0]!, yt[0]!)
    for (let i = 1; i <= SLICES; i++) ctx.lineTo(xs[i]!, yt[i]!)
    for (let i = SLICES; i >= 0; i--) ctx.lineTo(xs[i]!, yb[i]!)
    ctx.closePath()
    ctx.shadowColor = 'rgba(214,20,28,0.24)'
    ctx.shadowBlur = 28
    ctx.shadowOffsetY = 14
    ctx.fillStyle = '#0e1015'
    ctx.fill()
    ctx.restore()

    const srcStep = FLAG_W / SLICES
    for (let i = 0; i < SLICES; i++) {
      const x0 = xs[i]!
      const x1 = xs[i + 1]!
      const dw = Math.max(0.75, x1 - x0 + 0.9)
      const top = yt[i]!
      const h = yb[i]! - top
      ctx.drawImage(src, i * srcStep, 0, srcStep + 0.6, FLAG_H, x0, top, dw, h)

      const d = sl[i]!
      if (d < -0.006) {
        const a = Math.min(0.32, -d * 1.2)
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
        ctx.fillRect(x0, top, dw, h)
        if (-d > 0.08) {
          ctx.fillStyle = `rgba(214,20,28,${Math.min(0.14, (-d - 0.08) * 0.5).toFixed(3)})`
          ctx.fillRect(x0, top, dw, h)
        }
      } else if (d > 0.006) {
        const a = Math.min(0.66, d * 1.9)
        ctx.fillStyle = `rgba(0,0,0,${a.toFixed(3)})`
        ctx.fillRect(x0, top, dw, h)
      }
    }

    ctx.beginPath()
    ctx.moveTo(xs[0]!, yt[0]! + 0.5)
    for (let i = 1; i <= SLICES; i++) ctx.lineTo(xs[i]!, yt[i]! + 0.5)
    ctx.strokeStyle = 'rgba(255,255,255,0.24)'
    ctx.lineWidth = 1.25
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(xs[0]!, yb[0]! - 0.5)
    for (let i = 1; i <= SLICES; i++) ctx.lineTo(xs[i]!, yb[i]! - 0.5)
    ctx.strokeStyle = 'rgba(214,20,28,0.34)'
    ctx.lineWidth = 1.25
    ctx.stroke()
  }

  const loop = (now: number) => {
    raf = 0
    if (!visible || document.hidden) return
    raf = requestAnimationFrame(loop)
    draw(now / 1000)
  }

  const sync = () => {
    if (reduce) return
    if (visible && !document.hidden) {
      if (!raf) raf = requestAnimationFrame(loop)
    } else if (raf) {
      cancelAnimationFrame(raf)
      raf = 0
    }
  }

  const ro = new ResizeObserver(resize)
  ro.observe(el)
  const io = new IntersectionObserver(([e]) => {
    visible = Boolean(e?.isIntersecting)
    sync()
  })
  io.observe(el)
  document.addEventListener('visibilitychange', sync)
  resize()
  if (reduce) draw(1.2)
  else raf = requestAnimationFrame(loop)

  stop = () => {
    cancelAnimationFrame(raf)
    document.removeEventListener('visibilitychange', sync)
    ro.disconnect()
    io.disconnect()
  }
})

onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="box" class="pointer-events-none relative aspect-680/1380 select-none" aria-hidden="true">
    <canvas
      ref="cvs"
      class="absolute left-[8.3%] top-[3.9%] z-0 h-[33.5%] w-[87.5%]"
    />
    <img
      src="/images/mascot/hero-flag.webp"
      alt=""
      width="680"
      height="1380"
      fetchpriority="high"
      loading="eager"
      decoding="async"
      draggable="false"
      class="bear-flag-img relative z-1 block size-full object-contain"
    >
    <span class="pole-ring absolute left-[7.1%] top-[8.2%] z-2 h-[0.75%] w-[3.3%] rounded-full" />
    <span class="pole-ring absolute left-[7.1%] top-[31.6%] z-2 h-[0.75%] w-[3.3%] rounded-full" />
  </div>
</template>

<style scoped>
.bear-flag-img {
  filter: drop-shadow(0 20px 42px color-mix(in oklab, var(--color-accent) 24%, transparent));
}

.pole-ring {
  background: linear-gradient(90deg, #5f646e 0%, #e5e7ec 42%, #8e94a0 76%, #363940 100%);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
}
</style>
