<script setup lang="ts">
const QUOTES_SRC = 'https://c.mql5.com/js/widgets/quotes/widget.js?v=3'
const CALENDAR_SRC = 'https://www.tradays.com/c/js/widgets/calendar/widget.js?v=15'
const DARK = 1
const ROW_PX = 62
const CHROME_PX = 72

type Kind = 'ticker' | 'overview' | 'chart' | 'calendar'

const props = withDefaults(defineProps<{ type: Kind; symbols?: readonly string[]; height?: number; period?: string }>(), {
  symbols: () => [],
  height: 420,
  period: 'D1'
})

const id = `mql5${props.type[0]?.toUpperCase()}${props.type.slice(1)}${useId().replace(/\W/g, '')}`
const box = ref<HTMLElement | null>(null)
const h = computed(() => props.type === 'overview' ? CHROME_PX + props.symbols.length * ROW_PX : props.height)
const credit = computed(() => props.type === 'ticker' || props.type === 'chart')
const label = computed(() => props.type === 'chart' ? `${props.symbols[0] ?? ''} chart by MQL5` : 'MetaTrader World Markets')
const link = computed(() => props.type === 'calendar'
  ? 'https://www.metatrader.com/?utm_source=calendar.widget&utm_medium=link&utm_term=economic.calendar&utm_content=visit.mql5.calendar&utm_campaign=202.calendar.widget'
  : `https://www.metatrader.com/?utm_source=quotes.widget&utm_medium=link&utm_term=quotes.${props.type}&utm_content=visit.mql5.quotes&utm_campaign=quotes.${props.type}.widget`)

const config = () => {
  if (props.type === 'calendar') return { width: '100%', height: h.value, mode: 2, fw: 'html', theme: DARK }
  const base = { type: props.type, width: '100%', height: h.value, id, fw: 'html', theme: DARK }
  if (props.type === 'chart') return { ...base, filter: props.symbols[0] ?? 'EURUSD', period: props.period }
  if (props.type === 'overview') return { ...base, style: 'table', filter: [...props.symbols], period: props.period }
  return { ...base, filter: [...props.symbols] }
}

onMounted(() => {
  if (!box.value) return
  const s = document.createElement('script')
  s.src = props.type === 'calendar' ? CALENDAR_SRC : QUOTES_SRC
  s.async = true
  s.dataset.type = props.type === 'calendar' ? 'calendar-widget' : 'quotes-widget'
  s.textContent = JSON.stringify(config())
  box.value.appendChild(s)
})
onBeforeUnmount(() => box.value?.replaceChildren())
</script>

<template>
  <div :class="type === 'ticker' ? 'mql5-strip flex items-center' : 'mql5-frame'">
    <div class="min-w-0 flex-1" :style="{ minHeight: `${h - 2}px` }">
      <div ref="box"><div :id="type === 'calendar' ? 'economicCalendarWidget' : id" /></div>
    </div>
    <div
      v-if="credit"
      :class="[type === 'calendar' ? 'ecw-copyright' : 'qw-copyright', type === 'ticker' ? 'hidden shrink-0 border-l border-widget-line px-4 md:block' : 'border-t border-widget-line px-5 py-2.5']"
      class="text-[11px] text-muted"
    >
      <a :href="link" rel="noopener nofollow" target="_blank" class="transition-colors hover:text-fg">{{ label }}</a>
    </div>
  </div>
</template>
