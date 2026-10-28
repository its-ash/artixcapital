<script setup lang="ts">
import * as THREE from 'three'
import { ref } from 'vue'
import { useMotion } from '~/composables/useMotion'

const props = withDefaults(defineProps<{
  /** Number of particles to render */
  count?: number
  /** Base particle size multiplier */
  size?: number
  /** Whether to enable mouse interaction */
  interactive?: boolean
  /** Color scheme: 'monochrome' | 'accent' | 'custom' */
  colorScheme?: 'monochrome' | 'accent' | 'custom'
  /** Custom color layers for 'custom' scheme: [h, s, l, size][] */
  customColors?: number[][]
}>(), {
  count: 20000,
  size: 1,
  interactive: true,
  colorScheme: 'accent'
})

const root = ref<HTMLElement | null>(null)
let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let particles: THREE.Points[] = []
let geometry: THREE.BufferGeometry | null = null
let materials: THREE.PointsMaterial[] = []
let animationId: number | null = null
let mouseX = 0
let mouseY = 0
let windowHalfX = 0
let windowHalfY = 0
let cameraZ = 0
let reduced = false

const init = () => {
  if (!root.value) return
  reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

  const width = root.value.clientWidth || window.innerWidth
  const height = root.value.clientHeight || window.innerHeight
  windowHalfX = width / 2
  windowHalfY = height / 2

  const fieldOfView = 75
  const aspectRatio = width / height
  const nearPlane = 1
  const farPlane = 3000

  cameraZ = farPlane / 3

  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  camera.position.z = cameraZ

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x000000, 0.0007)

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(props.count * 3)

  for (let i = 0; i < props.count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 2000
    positions[i + 1] = (Math.random() - 0.5) * 2000
    positions[i + 2] = (Math.random() - 0.5) * 2000
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const geo = geometry
  const layers = getColorLayers()
  materials = layers.map(([h = 0, s = 1, l = 0.5, size = 1]) => {
    const material = new THREE.PointsMaterial({
      size: size * props.size,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: false
    })
    material.color.setHSL(h, s, l)
    return material
  })

  particles = materials.map(material => {
    const pts = new THREE.Points(geo, material)
    pts.rotation.x = Math.random() * 6
    pts.rotation.y = Math.random() * 6
    pts.rotation.z = Math.random() * 6
    scene!.add(pts)
    return pts
  })

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  renderer.domElement.style.position = 'absolute'
  renderer.domElement.style.top = '0'
  renderer.domElement.style.left = '0'
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.pointerEvents = 'none'

  root.value.appendChild(renderer.domElement)

  if (props.interactive) {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('touchstart', onTouchStart, { passive: false })
    document.addEventListener('touchmove', onTouchMove, { passive: false })
  }
  window.addEventListener('resize', onResize)

  animate()
}

const getColorLayers = (): number[][] => {
  if (props.colorScheme === 'custom' && props.customColors?.length) {
    return props.customColors
  }

  if (props.colorScheme === 'monochrome') {
    return [
      [0, 0, 1, 5],
      [0, 0, 0.85, 4],
      [0, 0, 0.7, 3],
      [0, 0, 0.55, 2],
      [0, 0, 0.4, 1]
    ]
  }

  return [
    [0.15, 1, 0.5, 5],
    [0.1, 1, 0.5, 4],
    [0.05, 1, 0.5, 3],
    [0, 1, 0.5, 2],
    [0.95, 1, 0.5, 1]
  ]
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  render()
}

const render = () => {
  if (!camera || !scene || !renderer || !geometry) return

  const time = Date.now() * 0.00005

  if (props.interactive && !reduced) {
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - camera.position.y) * 0.05
  }

  camera.lookAt(scene.position)

  particles.forEach((object, i) => {
    if (object instanceof THREE.Points) {
      const dir = i < 4 ? 1 : -1
      object.rotation.y = time * (i + 1) * dir
    }
  })

  materials.forEach((material, i) => {
    const layer = getColorLayers()[i]
    if (layer) {
      const [h = 0, s = 1, l = 0.5] = layer
      const hue = (360 * (h + time) % 360) / 360
      material.color.setHSL(hue, s, l)
    }
  })

  renderer.render(scene, camera)
}

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX - windowHalfX
  mouseY = e.clientY - windowHalfY
}

const onTouchStart = (e: TouchEvent) => {
  const t = e.touches[0]
  if (e.touches.length === 1 && t) {
    e.preventDefault()
    mouseX = t.pageX - windowHalfX
    mouseY = t.pageY - windowHalfY
  }
}

const onTouchMove = (e: TouchEvent) => {
  const t = e.touches[0]
  if (e.touches.length === 1 && t) {
    e.preventDefault()
    mouseX = t.pageX - windowHalfX
    mouseY = t.pageY - windowHalfY
  }
}

const onResize = () => {
  if (!root.value || !camera || !renderer) return

  const width = root.value.clientWidth || window.innerWidth
  const height = root.value.clientHeight || window.innerHeight

  windowHalfX = width / 2
  windowHalfY = height / 2

  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

const cleanup = () => {
  if (animationId) cancelAnimationFrame(animationId)
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('touchstart', onTouchStart)
  document.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('resize', onResize)

  particles.forEach(p => {
    scene?.remove(p)
    p.geometry.dispose()
    if (Array.isArray(p.material)) {
      p.material.forEach(m => m.dispose())
    } else {
      p.material.dispose()
    }
  })
  particles = []
  materials = []

  geometry?.dispose()
  geometry = null

  renderer?.dispose()
  renderer = null

  scene = null
  camera = null
}

useMotion(root, ({ motion }) => {
  if (!motion) {
    // Reduced motion: show static particles
    init()
    // Render once without animation loop
    render()
    return cleanup
  }
  init()
  return cleanup
})
</script>

<template>
  <div
    ref="root"
    class="absolute inset-0 overflow-hidden"
    aria-hidden="true"
    style="z-index: 0"
  />
</template>

<style scoped>
/* Component styles are minimal - the canvas is injected via JS */
</style>