import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import type { Directive } from 'vue'

type Cleanup = { __fx?: () => void }
type El = HTMLElement & Cleanup

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches
const coarse = () => matchMedia('(pointer: coarse)').matches
const ssr = { getSSRProps: () => ({}) }

const magnetic: Directive<El, number | undefined> = {
  ...ssr,
  mounted(el, { value = 0.35 }) {
    if (reduced() || !coarse()) return
    const x = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const y = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      x((e.clientX - r.left - r.width / 2) * value)
      y((e.clientY - r.top - r.height / 2) * value)
    }
    const leave = () => { x(0); y(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el.__fx = () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  },
  beforeUnmount: el => el.__fx?.()
}

const tilt: Directive<El, number | undefined> = {
  ...ssr,
  mounted(el, { value = 8 }) {
    const spot = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
      return r
    }
    if (reduced() || !coarse()) {
      el.addEventListener('pointermove', spot)
      el.__fx = () => el.removeEventListener('pointermove', spot)
      return
    }
    gsap.set(el, { transformPerspective: 1000 })
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      const r = spot(e)
      ry(((e.clientX - r.left) / r.width - 0.5) * value * 2)
      rx(-((e.clientY - r.top) / r.height - 0.5) * value * 2)
    }
    const leave = () => { rx(0); ry(0) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    el.__fx = () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  },
  beforeUnmount: el => el.__fx?.()
}

const spot: Directive<El> = {
  ...ssr,
  mounted(el) {
    if (!fine()) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    el.addEventListener('pointermove', move)
    el.__fx = () => el.removeEventListener('pointermove', move)
  },
  beforeUnmount: el => el.__fx?.()
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('magnetic', magnetic)
  nuxtApp.vueApp.directive('tilt', tilt)
  nuxtApp.vueApp.directive('spot', spot)

  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin)
  gsap.defaults({ ease: 'expo.out', duration: 1 })
  ScrollTrigger.config({ ignoreMobileResize: true })
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
})
