let timer: ReturnType<typeof setInterval> | undefined
let subs = 0

export const useMarketFeed = () => {
  const quotes = useState<Quote[]>('quotes', seedQuotes)

  const tick = () => {
    if (document.hidden) return
    for (const q of quotes.value) {
      const prev = q.price
      q.price = prev * (1 + (Math.random() - 0.5) * q.vol * 2)
      q.chg = (q.price / q.open - 1) * 100
      q.dir = q.price > prev ? 1 : q.price < prev ? -1 : 0
      q.hist.push(q.price)
      q.hist.shift()
    }
  }

  onMounted(() => {
    if (!subs++) timer = setInterval(tick, TICK_MS)
  })
  onBeforeUnmount(() => {
    if (!--subs) clearInterval(timer)
  })

  const get = (sym: string) => computed(() => quotes.value.find(q => q.sym === sym))
  return { quotes, get }
}
