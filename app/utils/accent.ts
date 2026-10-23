export const ACCENT_KEY = 'artix-accent'
export const ACCENT_DEFAULT = '#d6141c'
export const ACCENT_PRESETS: { name: string; hex: string }[] = [
  { name: 'Artix red', hex: ACCENT_DEFAULT },
  { name: 'Electric blue', hex: '#2f6bff' },
  { name: 'Emerald', hex: '#12a150' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Violet', hex: '#7c3aed' },
  { name: 'Cyan', hex: '#06b6d4' }
]

const HEX = /^#[0-9a-f]{6}$/i

export const isHex = (v: unknown): v is string => typeof v === 'string' && HEX.test(v)

const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16))
const toHex = (c: number[]) => `#${c.map(v => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, '0')).join('')}`

export const mix = (a: string, b: string, t: number) => {
  const x = rgb(a)
  const y = rgb(b)
  return toHex(x.map((v, i) => v + ((y[i] ?? 0) - v) * t))
}

const lum = (hex: string) => {
  const [r = 0, g = 0, b = 0] = rgb(hex).map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const accentTokens = (hex: string) => {
  const base = isHex(hex) ? hex.toLowerCase() : ACCENT_DEFAULT
  const l = lum(base)
  return {
    accent: base,
    soft: l < 0.2 ? mix(base, '#ffffff', 0.32) : base,
    on: 1.05 / (l + 0.05) >= (l + 0.05) / 0.05 ? '#ffffff' : '#0b0c0e'
  }
}

export const applyAccent = (hex: string) => {
  const t = accentTokens(hex)
  const s = document.documentElement.style
  s.setProperty('--color-accent', t.accent)
  s.setProperty('--color-accent-soft', t.soft)
  s.setProperty('--color-on-accent', t.on)
  dispatchEvent(new CustomEvent('accentchange', { detail: t }))
  return t
}
