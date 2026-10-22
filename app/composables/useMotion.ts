import gsap from 'gsap'
import type { Ref } from 'vue'

export type MotionFlags = { motion: boolean; reduce: boolean; desktop: boolean; fine: boolean }

const QUERIES = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 1024px)',
  fine: '(hover: hover) and (pointer: fine)'
}

export const useMotion = (root: Ref<HTMLElement | null>, fn: (f: MotionFlags, ctx: gsap.Context) => void | (() => void)) => {
  let mm: gsap.MatchMedia | undefined
  onMounted(() => {
    if (!root.value) return
    mm = gsap.matchMedia(root.value)
    mm.add(QUERIES, ctx => fn(ctx.conditions as MotionFlags, ctx))
  })
  onBeforeUnmount(() => mm?.revert())
}
