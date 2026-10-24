import type { Component } from 'vue'
import { PhBookOpen, PhCalendarBlank, PhChartLineUp, PhClock, PhCoins, PhCpu, PhGlobe, PhLightning, PhShieldCheck, PhSparkle, PhUsers, PhWallet } from '@phosphor-icons/vue'

const THEMES: [RegExp, Component][] = [
  [/secur|safe|protect|regulat|trust|verif|licen|risk/i, PhShieldCheck],
  [/fee|cost|commission|spread|price|pay/i, PhCoins],
  [/deposit|fund|withdraw|wallet|bank/i, PhWallet],
  [/platform|terminal|tool|software|algo|expert|automat|mobile|desktop|api/i, PhCpu],
  [/fast|speed|instant|execut|quick|latency/i, PhLightning],
  [/time|session|hour|schedule|expir|roll|calendar/i, PhClock],
  [/chart|trend|analys|indicator|technical|leverage/i, PhChartLineUp],
  [/global|market|world|instrument|asset|international|pairs/i, PhGlobe],
  [/support|help|team|client|people/i, PhUsers],
  [/learn|educat|guide|tip|lesson|course/i, PhBookOpen],
  [/date|cycle|month|quarter/i, PhCalendarBlank]
]

export const themeIcon = (text: string): Component => THEMES.find(([re]) => re.test(text))?.[1] ?? PhSparkle
