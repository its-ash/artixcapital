import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import Lenis from 'lenis'
import type { Directive } from 'vue'

type Cleanup = { __fx?: () => void }
type El = HTMLElement & Cleanup
type RevealMode = 'lines' | 'words' | 'chars' | 'fade'

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches
const fine = () => matchMedia('(hover: hover) and (pointer: fine)').matches
const ssr = { getSSRProps: () => ({}) }

const magnetic: Directive<El, number | undefined> = {
  ...ssr,
  mounted(el, { value = 0.35 }) {
    if (reduced() || !fine()) return
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
    if (reduced() || !fine()) {
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

const reveal: Directive<El, RevealMode | undefined> = {
  ...ssr,
  mounted(el, { value = 'lines' }) {
    if (reduced()) return
    const trigger = { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    if (value === 'fade') {
      const tw = gsap.fromTo(el, { autoAlpha: 0, y: 40, filter: 'blur(8px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', clearProps: 'filter', scrollTrigger: trigger })
      el.__fx = () => { tw.scrollTrigger?.kill(); tw.revert() }
      return
    }
    const split = SplitText.create(el, {
      type: value === 'chars' ? 'words,chars' : value === 'words' ? 'lines,words' : 'lines',
      mask: value === 'chars' ? 'words' : 'lines',
      wordsClass: 'w',
      charsClass: 'ch',
      autoSplit: true,
      onSplit: s => {
        const targets = value === 'chars' ? s.chars : value === 'words' ? s.words : s.lines
        return gsap.from(targets, {
          yPercent: 115,
          rotate: value === 'lines' ? 0 : 6,
          opacity: value === 'lines' ? 1 : 0,
          duration: value === 'chars' ? 0.9 : 1.15,
          ease: 'expo.out',
          stagger: value === 'chars' ? 0.018 : value === 'words' ? 0.035 : 0.09,
          scrollTrigger: trigger
        })
      }
    })
    el.__fx = () => split.revert()
  },
  beforeUnmount: el => el.__fx?.()
}

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.directive('magnetic', magnetic)
  nuxtApp.vueApp.directive('tilt', tilt)
  nuxtApp.vueApp.directive('reveal', reveal)
  nuxtApp.vueApp.directive('spot', spot)

  if (import.meta.server) return { provide: { lenis: null as Lenis | null } }

  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, ScrambleTextPlugin, MotionPathPlugin)
  gsap.defaults({ ease: 'expo.out', duration: 1 })
  ScrollTrigger.config({ ignoreMobileResize: true })

  const lenis = reduced() ? null : new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -88 } })
  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(t => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
  }
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return { provide: { lenis } }
})
