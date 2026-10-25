<script setup lang="ts">
import gsap from 'gsap'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { MultiPolygon, Polygon } from 'geojson'

type V3 = [number, number, number]
type Hub = { id: string; lat: number; lon: number; sym: string; hue: string }
type Arc = { world: Float32Array; sp: Float32Array; hid: Uint8Array; hue: string; offset: number; speed: number }
type Orbit = { inc: number; node: number; r: number; speed: number; phase: number; tag: string }
type Tick = { v: V3; t: number; text: string; up: boolean }

const DOTS = 24000
const SPIN = 0.0015
const TILT = -0.22
const AXIAL = (23.4 * Math.PI) / 180
const GEO_URL = 'https://get.geojs.io/v1/ip/geo.json'
const GEO_KEY = 'artix-geo'
const USER_HUE = '#3fd17a'
const USER_SPOT: [number, number] = [-0.32, -0.22]
const USER_SPOT_SM: [number, number] = [-0.22, -0.55]
const SWAY = 0.4
const SWAY_SPEED = 0.16
const GRID_STEP = 15
const ARC_PTS = 96
const TRAIL = 0.42
const TRAIL_SEGS = 10
const RIM_FADE = 0.22
const COS_AX = Math.cos(AXIAL)
const SIN_AX = Math.sin(AXIAL)
const NEUTRALS = ['#9a9ca3', '#c4c6cc']
const DOWN = '#ff5d64'
const UP = '#3fd17a'
const INK = '#ecedee'
const TAU = Math.PI * 2
const ORBIT_PTS = 120
const TICK_LIFE = 2.6
const TICK_GAP = 0.7
const SCAN_PERIOD = 5

const ORBITS: Orbit[] = [
  { inc: 0.95, node: 0.4, r: 1.12, speed: 0.22, phase: 0, tag: 'LP-01' },
  { inc: -0.55, node: 2.1, r: 1.07, speed: -0.3, phase: 2.4, tag: 'LP-02' }
]
const SESSIONS = [
  { id: 'SYD', from: 21, to: 6 },
  { id: 'TYO', from: 0, to: 9 },
  { id: 'LDN', from: 7, to: 16 },
  { id: 'NY', from: 12, to: 21 }
]

const live = (f: number, t: number, h: number) => (f < t ? h >= f && h < t : h >= f || h < t)

const orbitAt = (o: Orbit, t: number): V3 => {
  const x = o.r * Math.cos(t)
  const z = o.r * Math.sin(t)
  const z1 = z * Math.cos(o.inc)
  return [x * Math.cos(o.node) + z1 * Math.sin(o.node), -z * Math.sin(o.inc), -x * Math.sin(o.node) + z1 * Math.cos(o.node)]
}

const HUBS: Hub[] = [
  { id: 'LDN', lat: 51.51, lon: -0.13, sym: 'GBP/USD', hue: '#c4c6cc' },
  { id: 'NYC', lat: 40.71, lon: -74.0, sym: 'US500', hue: 'accent' },
  { id: 'FRA', lat: 50.11, lon: 8.68, sym: 'EUR/USD', hue: 'accent' },
  { id: 'TYO', lat: 35.68, lon: 139.69, sym: 'USD/JPY', hue: '#9a9ca3' },
  { id: 'SGP', lat: 1.35, lon: 103.82, sym: 'XAU/USD', hue: 'accent' },
  { id: 'SYD', lat: -33.87, lon: 151.21, sym: 'AUD/USD', hue: '#c4c6cc' },
  { id: 'HKG', lat: 22.32, lon: 114.17, sym: 'BTC/USD', hue: 'soft' },
  { id: 'SLU', lat: 14.08, lon: -60.95, sym: 'NAS100', hue: '#9a9ca3' }
]
const ROUTES: [string, string][] = [['LDN', 'NYC'], ['NYC', 'TYO'], ['FRA', 'SGP'], ['LDN', 'HKG'], ['SGP', 'SYD'], ['SLU', 'LDN'], ['TYO', 'SYD'], ['NYC', 'SLU'], ['HKG', 'FRA']]

const CORNERS: [number, number][] = [[-1, -1], [1, -1], [1, 1], [-1, 1]]

const props = defineProps<{ locate?: boolean }>()

type Geo = { lat: number; lon: number; city: string }

const locateUser = async (): Promise<Geo | null> => {
  try {
    const hit = sessionStorage.getItem(GEO_KEY)
    if (hit) return JSON.parse(hit) as Geo
  } catch {}
  const ctl = new AbortController()
  const t = setTimeout(() => ctl.abort(), 4000)
  try {
    const r = await fetch(GEO_URL, { signal: ctl.signal })
    if (!r.ok) return null
    const d = await r.json() as { latitude?: string; longitude?: string; city?: string; country_code?: string }
    const lat = Number(d.latitude)
    const lon = Number(d.longitude)
    if (!Number.isFinite(lat) || !Number.isFinite(lon) || Math.abs(lat) > 90 || Math.abs(lon) > 180) return null
    const geo = { lat, lon, city: String(d.city || d.country_code || 'You').slice(0, 24).toUpperCase() }
    try { sessionStorage.setItem(GEO_KEY, JSON.stringify(geo)) } catch {}
    return geo
  } catch {
    return null
  } finally {
    clearTimeout(t)
  }
}

const tone = { accent: ACCENT_DEFAULT, soft: ACCENT_DEFAULT }
const hue = (h: string) => (h === 'accent' ? tone.accent : h === 'soft' ? tone.soft : h)

const box = ref<HTMLElement | null>(null)
const cvs = ref<HTMLCanvasElement | null>(null)
const { quotes } = useMarketFeed()
let stop = () => {}

const vec = (lat: number, lon: number): V3 => {
  const p = (lat * Math.PI) / 180
  const l = (lon * Math.PI) / 180
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)]
}

const slerp = (a: V3, b: V3, t: number): V3 => {
  const d = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]))
  const s = Math.sin(d) || 1
  const ka = Math.sin((1 - t) * d) / s
  const kb = Math.sin(t * d) / s
  return [a[0] * ka + b[0] * kb, a[1] * ka + b[1] * kb, a[2] * ka + b[2] * kb]
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)

const landDots = async () => {
  const [{ feature }, topo] = await Promise.all([import('topojson-client'), import('world-atlas/land-110m.json')])
  const t = (topo.default ?? topo) as unknown as Topology<{ land: GeometryCollection }>
  const land = feature(t, t.objects.land)
  const W = 720
  const H = 360
  const off = document.createElement('canvas')
  off.width = W
  off.height = H
  const c = off.getContext('2d', { willReadFrequently: true })
  if (!c) return new Float32Array()
  c.fillStyle = '#fff'
  for (const { geometry: g } of land.features) {
    const polys = g.type === 'MultiPolygon' ? (g as MultiPolygon).coordinates : g.type === 'Polygon' ? [(g as Polygon).coordinates] : []
    for (const poly of polys) {
      c.beginPath()
      for (const ring of poly) ring.forEach(([lo = 0, la = 0], i) => (i ? c.lineTo : c.moveTo).call(c, ((lo + 180) / 360) * W, ((90 - la) / 180) * H))
      c.fill('evenodd')
    }
  }
  const px = c.getImageData(0, 0, W, H).data
  const out: number[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < DOTS; i++) {
    const lat = (Math.asin(1 - (i / (DOTS - 1)) * 2) * 180) / Math.PI
    const lon = ((((golden * i * 180) / Math.PI) % 360) + 360) % 360 - 180
    const ix = Math.min(W - 1, Math.floor(((lon + 180) / 360) * W))
    const iy = Math.min(H - 1, Math.floor(((90 - lat) / 180) * H))
    if ((px[(iy * W + ix) * 4] ?? 0) > 128) out.push(...vec(lat, lon))
  }
  return new Float32Array(out)
}

onMounted(() => {
  const el = box.value
  const c = cvs.value
  const ctx = c?.getContext('2d')
  if (!el || !c || !ctx) return

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const hubs: (Hub & { v: V3; phase: number; user?: boolean })[] = HUBS.map(h => ({ ...h, v: vec(h.lat, h.lon), phase: Math.random() * 2 }))
  const byId = Object.fromEntries(hubs.map(h => [h.id, h]))
  const makeArc = (A: { v: V3; hue: string }, B: { v: V3 }, i: number): Arc => {
    const dist = Math.acos(Math.min(1, A.v[0] * B.v[0] + A.v[1] * B.v[1] + A.v[2] * B.v[2]))
    const world = new Float32Array((ARC_PTS + 1) * 3)
    for (let k = 0; k <= ARC_PTS; k++) {
      const t = k / ARC_PTS
      const p = slerp(A.v, B.v, t)
      const h = 1 + Math.sin(Math.PI * t) * (0.08 + dist * 0.12)
      world.set([p[0] * h, p[1] * h, p[2] * h], k * 3)
    }
    return { world, sp: new Float32Array((ARC_PTS + 1) * 3), hid: new Uint8Array(ARC_PTS + 1), hue: A.hue, offset: (i * 0.29) % 1, speed: 0.34 + (i % 3) * 0.05 }
  }
  const arcs: Arc[] = ROUTES.flatMap(([a, b], i) => {
    const A = byId[a]
    const B = byId[b]
    return A && B ? [makeArc(A, B, i)] : []
  })
  const grid: V3[][] = []
  for (let lon = -180; lon < 180; lon += GRID_STEP) grid.push(Array.from({ length: 61 }, (_, k) => vec(-90 + k * 3, lon)))
  for (let lat = -75; lat <= 75; lat += GRID_STEP) grid.push(Array.from({ length: 121 }, (_, k) => vec(lat, -180 + k * 3)))
  const HQ = { lat: 14.08, lon: -60.95, foot: 1.6, h: 0.12 }
  const hqCenter = vec(HQ.lat, HQ.lon)
  const hqBaseV = CORNERS.map(([a, b]) => vec(HQ.lat + a * HQ.foot, HQ.lon + b * HQ.foot))
  const hqTopV = hqBaseV.map(([x, y, z]) => [x * (1 + HQ.h), y * (1 + HQ.h), z * (1 + HQ.h)] as V3)
  const orbitPts = ORBITS.map(o => {
    const out = new Float32Array((ORBIT_PTS + 1) * 3)
    for (let k = 0; k <= ORBIT_PTS; k++) out.set(orbitAt(o, (k / ORBIT_PTS) * TAU), k * 3)
    return out
  })
  const ticks: Tick[] = []
  let nextTick = 0
  const bm: V3 = [0, 0, 0]

  let dots = new Float32Array()
  const state = { yaw: 0.6, tilt: TILT, vYaw: SPIN, reveal: reduce ? 1 : 0, dots: 0, hover: 0 }
  let anchor: { yaw: number; tilt: number } | null = null
  let waiting = !!props.locate
  const born = performance.now()
  const tmp: V3 = [0, 0, 0]
  const pt: V3 = [0, 0, 0]
  let w = 0
  let R = 0
  let cx = 0
  let cy = 0
  let raf = 0
  let visible = true
  let drag: { x: number; y: number; t: number } | null = null
  let fills: { body: CanvasGradient; pal: CanvasGradient } | null = null

  const glow = document.createElement('canvas')
  glow.width = glow.height = 64
  const gctx = glow.getContext('2d')
  if (gctx) {
    const g = gctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.25, 'rgba(255,255,255,0.55)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    gctx.fillStyle = g
    gctx.fillRect(0, 0, 64, 64)
  }

  const resize = () => {
    const dpr = Math.min(devicePixelRatio, 2)
    w = el.clientWidth
    c.width = c.height = Math.round(w * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    R = w * 0.42
    cx = cy = w / 2
    const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R)
    body.addColorStop(0, 'rgba(30,31,36,0.95)')
    body.addColorStop(0.7, 'rgba(18,19,22,0.96)')
    body.addColorStop(1, 'rgba(11,12,14,0.98)')
    const pal = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
    const palette = [tone.accent, tone.soft, ...NEUTRALS]
    palette.forEach((col, i) => pal.addColorStop(i / (palette.length - 1), col))
    fills = { body, pal }
    if (reduce) draw(0)
  }

  const proj = (v: ArrayLike<number>, o: number, out: V3) => {
    const cyw = Math.cos(state.yaw)
    const syw = Math.sin(state.yaw)
    const ct = Math.cos(state.tilt)
    const st = Math.sin(state.tilt)
    const vx = v[o] ?? 0
    const vy = v[o + 1] ?? 0
    const vz = v[o + 2] ?? 0
    const x = vx * cyw + vz * syw
    const z1 = -vx * syw + vz * cyw
    const y = -(vy * ct - z1 * st)
    out[0] = cx + (x * COS_AX - y * SIN_AX) * R
    out[1] = cy + (x * SIN_AX + y * COS_AX) * R
    out[2] = vy * st + z1 * ct
    return out
  }
  const aim = (lat: number, lon: number) => {
    const [dx, dy] = matchMedia('(min-width: 768px)').matches ? USER_SPOT : USER_SPOT_SM
    const X = dx * COS_AX + dy * SIN_AX
    const Y = -dx * SIN_AX + dy * COS_AX
    const la = (lat * Math.PI) / 180
    const lo = (lon * Math.PI) / 180
    const a = Math.asin(gsap.utils.clamp(-1, 1, X / Math.max(0.2, Math.cos(la))))
    const A = Math.sin(la)
    const B = Math.cos(la) * Math.cos(a)
    const phi = Math.atan2(B, A)
    const k = Math.acos(gsap.utils.clamp(-1, 1, -Y / Math.hypot(A, B)))
    const tilt = [k - phi, -k - phi]
      .map(t => Math.atan2(Math.sin(t), Math.cos(t)))
      .filter(t => A * Math.sin(t) + B * Math.cos(t) > 0)
      .sort((p, q) => Math.abs(p) - Math.abs(q))[0] ?? la
    return { yaw: a - lo, tilt: gsap.utils.clamp(-1.1, 1.1, tilt) }
  }
  const occluded = (x: number, y: number, z: number) => z < 0 && Math.hypot(x - cx, y - cy) < R

  const arcPoint = (a: Arc, f: number, out: V3) => {
    const idx = Math.min(ARC_PTS - 1e-6, Math.max(0, f * ARC_PTS))
    const i = Math.floor(idx)
    const t = idx - i
    const j = i * 3
    out[0] = (a.sp[j] ?? 0) + ((a.sp[j + 3] ?? 0) - (a.sp[j] ?? 0)) * t
    out[1] = (a.sp[j + 1] ?? 0) + ((a.sp[j + 4] ?? 0) - (a.sp[j + 1] ?? 0)) * t
    out[2] = (a.hid[i] ?? 1) && (a.hid[i + 1] ?? 1) ? 1 : 0
    return out
  }

  const traceArc = (a: Arc, f0: number, f1: number) => {
    arcPoint(a, f0, pt)
    let pen = !pt[2]
    if (pen) ctx.moveTo(pt[0], pt[1])
    for (let k = Math.ceil(f0 * ARC_PTS); k < f1 * ARC_PTS; k++) {
      if (a.hid[k]) { pen = false; continue }
      const x = a.sp[k * 3] ?? 0
      const y = a.sp[k * 3 + 1] ?? 0
      pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
      pen = true
    }
    arcPoint(a, f1, pt)
    if (pen && !pt[2]) ctx.lineTo(pt[0], pt[1])
  }

  const drawBlock = (base: V3[], top: V3[], alpha: number) => {
    const pb = base.map(v => proj(v, 0, [0, 0, 0] as V3))
    const pt = top.map(v => proj(v, 0, [0, 0, 0] as V3))
    ctx.globalAlpha = alpha
    ctx.lineWidth = 1
    ctx.strokeStyle = hue('accent')
    ctx.fillStyle = 'rgba(18,19,22,0.92)'
    for (let i = 0; i < 4; i++) {
      const j = (i + 1) % 4
      const a = pb[i]!
      const b = pb[j]!
      const c = pt[j]!
      const d = pt[i]!
      ctx.beginPath()
      ctx.moveTo(a[0], a[1])
      ctx.lineTo(b[0], b[1])
      ctx.lineTo(c[0], c[1])
      ctx.lineTo(d[0], d[1])
      ctx.closePath()
      ctx.fill()
      ctx.stroke()
    }
    ctx.beginPath()
    pt.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)))
    ctx.closePath()
    ctx.fillStyle = hue('accent')
    ctx.globalAlpha = alpha * 0.9
    ctx.fill()
    return pt
  }

  const hud = (s: number, rv: number) => {
    const acc = hue('accent')
    ctx.save()
    ctx.globalAlpha = (0.45 + Math.sin(s * 1.4) * 0.12) * rv
    ctx.shadowColor = acc
    ctx.shadowBlur = R * 0.16
    ctx.strokeStyle = acc
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, TAU)
    ctx.stroke()
    ctx.restore()

    const r1 = R * 1.04
    const rot = s * 0.04
    ctx.beginPath()
    for (let i = 0; i < 120; i++) {
      const a = rot + (i / 120) * TAU
      const l = i % 10 ? R * 0.012 : R * 0.03
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1)
      ctx.lineTo(cx + Math.cos(a) * (r1 + l), cy + Math.sin(a) * (r1 + l))
    }
    ctx.strokeStyle = INK
    ctx.lineWidth = 1
    ctx.globalAlpha = 0.16 * rv
    ctx.stroke()

    ctx.setLineDash([R * 0.18, R * 0.06, R * 0.02, R * 0.06])
    ctx.lineDashOffset = -s * R * 0.05
    ctx.strokeStyle = acc
    ctx.lineWidth = 1.5
    ctx.globalAlpha = 0.3 * rv
    ctx.beginPath()
    ctx.arc(cx, cy, R * 1.09, 0, TAU)
    ctx.stroke()
    ctx.setLineDash([])

    const now = new Date()
    const hr = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600
    const ang = (h: number) => (h / 24) * TAU - Math.PI / 2
    SESSIONS.forEach((ses, i) => {
      const on = live(ses.from, ses.to, hr)
      ctx.strokeStyle = on ? acc : INK
      ctx.globalAlpha = (on ? 0.85 : 0.12) * rv
      ctx.lineWidth = on ? 2.5 : 1.5
      ctx.beginPath()
      ctx.arc(cx, cy, R * (1.13 + i * 0.014), ang(ses.from) + 0.02, ang(ses.to < ses.from ? ses.to + 24 : ses.to) - 0.02)
      ctx.stroke()
    })
    const na = ang(hr)
    ctx.strokeStyle = acc
    ctx.fillStyle = acc
    ctx.lineWidth = 1.5
    ctx.globalAlpha = 0.9 * rv
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(na) * R * 1.02, cy + Math.sin(na) * R * 1.02)
    ctx.lineTo(cx + Math.cos(na) * R * 1.19, cy + Math.sin(na) * R * 1.19)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(cx + Math.cos(na) * R * 1.19, cy + Math.sin(na) * R * 1.19, 2.5, 0, TAU)
    ctx.fill()

    const fs = Math.min(11, Math.max(9, Math.round(w / 70)))
    ctx.font = `500 ${fs}px "Geist Mono", ui-monospace, monospace`
    ctx.textBaseline = 'middle'
    const tx = cx - R * 1.17
    const ty = cy - R * 1.12
    ctx.globalAlpha = 0.85 * rv
    ctx.fillStyle = INK
    ctx.fillText(`UTC ${now.toISOString().slice(11, 19)}`, tx, ty)
    ctx.globalAlpha = 0.5 * rv
    ctx.fillText('SESSIONS', tx, ty + fs * 1.6)
    let sx = tx
    for (const ses of SESSIONS) {
      const on = live(ses.from, ses.to, hr)
      ctx.fillStyle = on ? acc : INK
      ctx.globalAlpha = (on ? 1 : 0.3) * rv
      ctx.fillText(ses.id, sx, ty + fs * 3.2)
      sx += ctx.measureText(`${ses.id}  `).width
    }
    ctx.textAlign = 'right'
    ctx.fillStyle = INK
    ctx.globalAlpha = 0.5 * rv
    ctx.fillText(`FX 24/5 · ${HUBS.length} HUBS`, cx + R * 1.17, cy + R * 1.08)
    ctx.fillText('FEED · INDICATIVE', cx + R * 1.17, cy + R * 1.08 + fs * 1.6)
    ctx.textAlign = 'left'
  }

  const scan = (s: number, rv: number) => {
    const y = cy - R + ((s / SCAN_PERIOD) % 1) * 2 * R
    ctx.save()
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, TAU)
    ctx.clip()
    ctx.fillStyle = hue('accent')
    for (let k = 0; k < 14; k++) {
      ctx.globalAlpha = (1 - k / 14) * 0.06 * rv
      ctx.fillRect(cx - R, y - (k + 1) * 4, 2 * R, 4)
    }
    ctx.globalAlpha = 0.45 * rv
    ctx.fillRect(cx - R, y, 2 * R, 1)
    ctx.restore()
  }

  const sats = (s: number, a: number) => {
    if (!a) return
    ctx.setLineDash([2, 6])
    ctx.lineWidth = 1
    ctx.strokeStyle = INK
    for (const pts of orbitPts) {
      ctx.beginPath()
      let pen = false
      for (let k = 0; k <= ORBIT_PTS; k++) {
        const p = proj(pts, k * 3, tmp)
        if (occluded(p[0], p[1], p[2])) { pen = false; continue }
        pen ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])
        pen = true
      }
      ctx.globalAlpha = 0.18 * a
      ctx.stroke()
    }
    ctx.setLineDash([])
    for (const o of ORBITS) {
      const p = proj(orbitAt(o, s * o.speed + o.phase), 0, tmp)
      if (occluded(p[0], p[1], p[2])) continue
      ctx.globalAlpha = a
      ctx.drawImage(glow, p[0] - 9, p[1] - 9, 18, 18)
      ctx.fillStyle = hue('accent')
      ctx.fillRect(p[0] - 2, p[1] - 2, 4, 4)
      ctx.globalAlpha = 0.7 * a
      ctx.fillStyle = INK
      ctx.fillText(o.tag, p[0] + 8, p[1] - 8)
    }
  }

  const spawnTick = (s: number) => {
    while (ticks[0] && s - ticks[0].t > TICK_LIFE) ticks.shift()
    if (s < nextTick) return
    nextTick = s + TICK_GAP
    const pool = hubs.filter(h => !h.user && h.id !== 'SLU' && proj(h.v, 0, bm)[2] > 0.45)
    const h = pool[Math.floor(Math.random() * pool.length)]
    const q = h && quotes.value.find(x => x.sym === h.sym)
    if (h && q) ticks.push({ v: h.v, t: s, text: `${q.chg >= 0 ? '▲ +' : '▼ '}${q.chg.toFixed(2)}%`, up: q.chg >= 0 })
  }

  const drawTicks = (s: number, a: number) => {
    ctx.textAlign = 'right'
    for (const tk of ticks) {
      const p = proj(tk.v, 0, tmp)
      if (p[2] < 0.2) continue
      const k = (s - tk.t) / TICK_LIFE
      ctx.globalAlpha = (1 - k) * Math.min(1, k * 6) * a
      ctx.fillStyle = tk.up ? UP : DOWN
      ctx.fillText(tk.text, p[0] - 10, p[1] - 14 - k * 36)
    }
    ctx.textAlign = 'left'
  }

  const draw = (time: number) => {
    if (!fills) return
    const s = time / 1000
    const rv = state.reveal
    ctx.clearRect(0, 0, w, w)
    hud(s, rv)

    ctx.globalAlpha = rv
    ctx.fillStyle = fills.body
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.fill()

    ctx.lineWidth = 1
    for (const front of [false, true]) {
      ctx.beginPath()
      for (const line of grid) {
        let pen = false
        const n = Math.ceil(line.length * rv)
        for (let k = 0; k < n; k++) {
          const v = line[k]
          if (!v) continue
          const p = proj(v, 0, tmp)
          if (p[2] >= 0 === front) {
            pen ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])
            pen = true
          } else pen = false
        }
      }
      ctx.strokeStyle = front ? fills.pal : 'rgba(255,255,255,0.06)'
      ctx.globalAlpha = (front ? 0.38 : 1) * rv
      ctx.stroke()
    }

    if (dots.length) {
      const sz = Math.min(2.6, Math.max(1.4, R / 120))
      for (const rimPass of [true, false]) {
        ctx.beginPath()
        for (let i = 0; i < dots.length; i += 3) {
          const p = proj(dots, i, tmp)
          if (p[2] <= 0 || (p[2] < RIM_FADE) !== rimPass) continue
          ctx.rect(p[0] - sz / 2, p[1] - sz / 2, sz, sz)
        }
        ctx.fillStyle = fills.pal
        ctx.globalAlpha = (rimPass ? 0.35 : 0.95) * state.dots
        ctx.fill()
      }
    }
    if (!reduce) scan(s, rv)

    const arcAlpha = Math.max(0, rv * 2 - 1)
    const lw = 1.4 * Math.min(1.6, w / 560 + 0.4)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    for (const a of arcs) {
      for (let k = 0; k <= ARC_PTS; k++) {
        const p = proj(a.world, k * 3, tmp)
        a.sp[k * 3] = p[0]
        a.sp[k * 3 + 1] = p[1]
        a.hid[k] = occluded(p[0], p[1], p[2]) ? 1 : 0
      }
      ctx.strokeStyle = hue(a.hue)
      ctx.lineWidth = lw * 0.7
      ctx.globalAlpha = (reduce ? 0.6 : 0.16) * arcAlpha
      ctx.beginPath()
      traceArc(a, 0, 1)
      ctx.stroke()
      if (reduce || !arcAlpha) continue

      const u = easeInOut((s * a.speed + a.offset) % 1) * (1 + TRAIL)
      const head = Math.min(1, u)
      const tail = Math.max(0, u - TRAIL)
      for (let j = 0; j < TRAIL_SEGS && head > tail; j++) {
        const k = (j + 1) / TRAIL_SEGS
        ctx.beginPath()
        traceArc(a, tail + (head - tail) * (j / TRAIL_SEGS), tail + (head - tail) * k)
        ctx.globalAlpha = k * k * arcAlpha
        ctx.lineWidth = lw * (0.5 + k * 0.9)
        ctx.stroke()
      }
      if (u < 1) {
        arcPoint(a, head, pt)
        if (!pt[2]) {
          ctx.globalAlpha = arcAlpha
          ctx.drawImage(glow, pt[0] - 10, pt[1] - 10, 20, 20)
        }
      } else {
        const r = (u - 1) / TRAIL
        arcPoint(a, 1, pt)
        if (!pt[2]) {
          ctx.globalAlpha = (1 - r) * arcAlpha
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.arc(pt[0], pt[1], 4 + r * 18, 0, Math.PI * 2)
          ctx.stroke()
        }
      }
    }

    ctx.font = `500 ${Math.min(12, Math.max(9, Math.round(w / 64)))}px "Geist Mono", ui-monospace, monospace`
    ctx.textBaseline = 'middle'
    sats(s, arcAlpha)
    for (const h of hubs) {
      if (h.id === 'SLU') continue
      const p = proj(h.v, 0, tmp)
      if (p[2] <= 0.05) continue
      const vis = Math.min(1, p[2] / 0.35) * arcAlpha
      const lift = 1.04 + (reduce ? 0.03 : (Math.sin(s * 2 + h.phase * 3) + 1) * 0.025)
      const b = proj([h.v[0] * lift, h.v[1] * lift, h.v[2] * lift], 0, bm)
      ctx.globalAlpha = vis * 0.7
      ctx.strokeStyle = hue(h.hue)
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(p[0], p[1])
      ctx.lineTo(b[0], b[1])
      ctx.stroke()
      const pulse = reduce ? 0.5 : ((s + h.phase) % 2) / 2
      ctx.globalAlpha = vis * (1 - pulse)
      ctx.strokeStyle = hue(h.hue)
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(p[0], p[1], 3 + pulse * 16, 0, Math.PI * 2)
      ctx.stroke()
      ctx.globalAlpha = vis
      ctx.fillStyle = hue(h.hue)
      ctx.beginPath()
      ctx.arc(p[0], p[1], 3.2, 0, Math.PI * 2)
      ctx.fill()
      if (p[2] < 0.45) continue
      const q = h.user ? undefined : quotes.value.find(x => x.sym === h.sym)
      const label = h.user ? `YOU  ${h.sym}` : `${h.id}  ${h.sym}  ${q ? fmt(q.price, Math.min(q.dp, 4)) : ''}`
      const tw = ctx.measureText(label).width + 16
      const lx = p[0] + 10
      const ly = p[1] - 16
      ctx.globalAlpha = vis * 0.92
      ctx.fillStyle = 'rgba(18,19,22,0.85)'
      ctx.beginPath()
      ctx.roundRect(lx, ly - 10, tw, 20, 10)
      ctx.fill()
      ctx.strokeStyle = hue(h.hue)
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.fillStyle = q && q.dir < 0 ? DOWN : '#ecedee'
      ctx.fillText(label, lx + 8, ly + 0.5)
    }
    if (!reduce && arcAlpha) {
      spawnTick(s)
      drawTicks(s, arcAlpha)
    }

    const hqC = proj(hqCenter, 0, [0, 0, 0] as V3)
    if (hqC[2] > 0.02) {
      const alpha = Math.min(1, hqC[2] / 0.3) * arcAlpha
      const top = drawBlock(hqBaseV, hqTopV, alpha)
      const tx = top.reduce((s, p) => s + p[0], 0) / top.length
      const ty = top.reduce((s, p) => s + p[1], 0) / top.length
      const tag = 'ARTIX HQ'
      const tw = ctx.measureText(tag).width + 16
      ctx.globalAlpha = alpha * 0.92
      ctx.fillStyle = 'rgba(18,19,22,0.85)'
      ctx.beginPath()
      ctx.roundRect(tx + 10, ty - 26, tw, 20, 10)
      ctx.fill()
      ctx.stroke()
      ctx.fillStyle = '#ecedee'
      ctx.fillText(tag, tx + 18, ty - 15.5)
    }

    ctx.globalAlpha = rv
    ctx.globalAlpha = 1
  }

  const loop = (now: number) => {
    raf = requestAnimationFrame(loop)
    if (!visible || document.hidden) return
    if (drag) state.yaw += state.vYaw
    else if (anchor) {
      const target = anchor.yaw + Math.sin((now / 1000) * SWAY_SPEED) * SWAY
      state.vYaw *= 0.94
      state.yaw += state.vYaw + (target - state.yaw) * 0.02
      state.tilt += (anchor.tilt + state.hover - state.tilt) * 0.03
    } else if (!waiting) {
      state.vYaw += (SPIN - state.vYaw) * 0.02
      state.tilt += (TILT + state.hover - state.tilt) * 0.04
      state.yaw += state.vYaw
    }
    draw(now)
  }

  const down = (e: PointerEvent) => {
    if (!e.isPrimary) return
    drag = { x: e.clientX, y: e.clientY, t: performance.now() }
    c.setPointerCapture(e.pointerId)
    c.style.cursor = 'grabbing'
  }
  const move = (e: PointerEvent) => {
    if (!drag) {
      if (e.pointerType === 'mouse') {
        const r = c.getBoundingClientRect()
        state.hover = ((e.clientY - r.top) / r.height - 0.5) * 0.25
      }
      return
    }
    const now = performance.now()
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    const dt = Math.max(1, now - drag.t)
    state.yaw += dx * 0.006
    state.tilt = gsap.utils.clamp(-1.1, 1.1, state.tilt + dy * 0.006)
    state.vYaw = ((dx * 0.006) / dt) * 16
    drag = { x: e.clientX, y: e.clientY, t: now }
  }
  const up = (e: PointerEvent) => {
    if (!drag) return
    drag = null
    if (c.hasPointerCapture(e.pointerId)) c.releasePointerCapture(e.pointerId)
    c.style.cursor = ''
  }
  const leave = () => { state.hover = 0 }

  const onAccent = (e: Event) => {
    const d = (e as CustomEvent<{ accent: string; soft: string }>).detail
    tone.accent = d.accent
    tone.soft = d.soft
    resize()
  }
  const root = getComputedStyle(document.documentElement)
  tone.accent = root.getPropertyValue('--color-accent').trim() || tone.accent
  tone.soft = root.getPropertyValue('--color-accent-soft').trim() || tone.soft
  addEventListener('accentchange', onAccent)

  const ro = new ResizeObserver(resize)
  ro.observe(el)
  const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting })
  io.observe(el)
  resize()

  if (!reduce) gsap.to(state, { reveal: 1, duration: 2.4, ease: 'power2.inOut' })

  landDots().then(d => {
    dots = d
    if (reduce) {
      state.dots = 1
      draw(0)
    } else gsap.to(state, { dots: 1, duration: 1.6, delay: 0.6, ease: 'power2.out' })
  }).catch(() => { dots = new Float32Array() })

  if (props.locate) locateUser().then(g => {
    waiting = false
    if (!g) return
    const me = { id: 'YOU', lat: g.lat, lon: g.lon, sym: g.city, hue: USER_HUE, v: vec(g.lat, g.lon), phase: 0, user: true }
    const near = hubs.reduce((a, h) => (h.v[0] * me.v[0] + h.v[1] * me.v[1] + h.v[2] * me.v[2] > a.v[0] * me.v[0] + a.v[1] * me.v[1] + a.v[2] * me.v[2] ? h : a))
    hubs.push(me)
    arcs.push(makeArc(me, near, arcs.length))
    anchor = aim(g.lat, g.lon)
    anchor.yaw += Math.round((state.yaw - anchor.yaw) / (Math.PI * 2)) * Math.PI * 2
    if (reduce || performance.now() - born < 3000) {
      state.yaw = anchor.yaw
      state.tilt = anchor.tilt
      state.vYaw = 0
      if (reduce) draw(0)
    }
  })

  if (reduce) draw(0)
  else {
    c.addEventListener('pointerdown', down)
    c.addEventListener('pointermove', move)
    c.addEventListener('pointerup', up)
    c.addEventListener('pointercancel', up)
    c.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(loop)
  }

  stop = () => {
    cancelAnimationFrame(raf)
    removeEventListener('accentchange', onAccent)
    ro.disconnect()
    io.disconnect()
    gsap.killTweensOf(state)
    c.removeEventListener('pointerdown', down)
    c.removeEventListener('pointermove', move)
    c.removeEventListener('pointerup', up)
    c.removeEventListener('pointercancel', up)
    c.removeEventListener('pointerleave', leave)
  }
})

onBeforeUnmount(() => stop())
</script>

<template>
  <div ref="box" class="relative size-full">
    <canvas ref="cvs" class="absolute inset-0 size-full cursor-grab touch-pan-y" role="img" aria-label="Rotating globe linking London, New York, Frankfurt, Tokyo, Singapore, Sydney, Hong Kong and Saint Lucia with indicative prices" />
  </div>
</template>
