export const TICK_MS = 1100
export const HIST_LEN = 48

export type Quote = { sym: string; name: string; dp: number; vol: number; price: number; open: number; chg: number; dir: -1 | 0 | 1; hist: number[] }

const SEED: [sym: string, name: string, price: number, dp: number, vol: number][] = [
  ['EUR/USD', 'Euro vs US Dollar', 1.08642, 5, 0.00028],
  ['GBP/USD', 'Pound vs US Dollar', 1.27315, 5, 0.00032],
  ['USD/JPY', 'US Dollar vs Yen', 151.482, 3, 0.0003],
  ['AUD/USD', 'Aussie vs US Dollar', 0.6542, 5, 0.00035],
  ['USD/CHF', 'US Dollar vs Franc', 0.8824, 5, 0.0003],
  ['XAU/USD', 'Gold', 2341.55, 2, 0.0005],
  ['XAG/USD', 'Silver', 29.412, 3, 0.0007],
  ['WTI', 'US Crude Oil', 78.42, 2, 0.0008],
  ['US500', 'US 500 Index', 5280.4, 1, 0.0004],
  ['NAS100', 'US Tech 100 Index', 18420.6, 1, 0.0005],
  ['GER40', 'Germany 40 Index', 18610.2, 1, 0.0004],
  ['AAPL', 'Apple Inc.', 189.42, 2, 0.0009],
  ['NVDA', 'NVIDIA Corp.', 912.3, 2, 0.0014],
  ['TSLA', 'Tesla Inc.', 176.8, 2, 0.0016],
  ['BTC/USD', 'Bitcoin', 64210.5, 1, 0.0012],
  ['ETH/USD', 'Ethereum', 3120.8, 2, 0.0014]
]

export const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

export const seedQuotes = (): Quote[] => SEED.map(([sym, name, p, dp, vol], i) => {
  const r = rng(i * 977 + 13)
  const hist: number[] = []
  let v = p * (1 - vol * 6)
  for (let k = 0; k < HIST_LEN; k++) {
    v *= 1 + (r() - 0.48) * vol * 2.4
    hist.push(v)
  }
  const price = hist.at(-1) ?? p
  return { sym, name, dp, vol, price, open: hist[0] ?? p, chg: ((price / (hist[0] ?? p)) - 1) * 100, dir: 0, hist }
})

export const fmt = (v: number, dp: number) => v.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })

export const sparkPath = (hist: number[], w: number, h: number, pad = 4) => {
  if (hist.length < 2) return { line: '', area: '', y: h / 2 }
  const min = Math.min(...hist)
  const rngV = Math.max(...hist) - min || 1
  const pts = hist.map((v, i) => [(i / (hist.length - 1)) * w, h - pad - ((v - min) / rngV) * (h - pad * 2)] as const)
  const line = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
  return { line, area: `${line} L${w},${h} L0,${h} Z`, y: pts.at(-1)?.[1] ?? h / 2 }
}
