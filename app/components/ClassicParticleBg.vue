<script setup lang="ts">
import * as THREE from 'three'
import { ref, onUnmounted } from 'vue'
import { useMotion } from '~/composables/useMotion'

const props = withDefaults(defineProps<{
  /** Number of particles to render (default: 20000) */
  count?: number
  /** Base particle size multiplier */
  size?: number
  /** Whether to enable mouse/touch interaction */
  interactive?: boolean
  /** Fog density (default: 0.0007) */
  fogDensity?: number
  /** Camera Z position (default: farPlane / 3 = 1000) */
  cameraZ?: number
}>(), {
  count: 20000,
  size: 1,
  interactive: true,
  fogDensity: 0.0007,
  cameraZ: 1000
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
let time = 0

// Original color parameters from the vanilla code: [[h, s, l], size]
// The vanilla code uses: [[1, 1, 0.5], 5], [[0.95, 1, 0.5], 4], [[0.90, 1, 0.5], 3], [[0.85, 1, 0.5], 2], [[0.80, 1, 0.5], 1]
// Hue values in Three.js are 0-1, so 1 = 0 (360°), 0.95 ≈ 342°, 0.90 = 324°, 0.85 = 306°, 0.80 = 288°
const COLOR_LAYERS: [number, number, number, number][] = [
  [0, 1, 0.5, 5],      // h=1→0 (red), s=1, l=0.5, size=5
  [0.95, 1, 0.5, 4],   // h=0.95, s=1, l=0.5, size=4
  [0.90, 1, 0.5, 3],   // h=0.90, s=1, l=0.5, size=3
  [0.85, 1, 0.5, 2],   // h=0.85, s=1, l=0.5, size=2
  [0.80, 1, 0.5, 1]    // h=0.80, s=1, l=0.5, size=1
]

const init = () => {
  if (!root.value) return

  const prefersReducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) return

  const width = root.value.clientWidth || window.innerWidth
  const height = root.value.clientHeight || window.innerHeight
  windowHalfX = width / 2
  windowHalfY = height / 2

  const fieldOfView = 75
  const aspectRatio = width / height
  const nearPlane = 1
  const farPlane = 3000

  const cameraZPos = props.cameraZ ?? farPlane / 3
  const fogHex = 0x000000 // As black as your heart

  camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
  camera.position.z = cameraZPos

  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(fogHex, props.fogDensity)

  // Create geometry with particle positions
  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(props.count * 3)

  for (let i = 0; i < props.count * 3; i += 3) {
    // Original: Math.random() * 2000 - 1000 = range [-1000, 1000]
    positions[i] = Math.random() * 2000 - 1000
    positions[i + 1] = Math.random() * 2000 - 1000
    positions[i + 2] = Math.random() * 2000 - 1000
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  // Create materials for each layer (matching original PointCloudMaterial)
  materials = COLOR_LAYERS.map(([h, s, l, size]) => {
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

  // Create particle systems (PointCloud in original)
  particles = materials.map((material) => {
    const pts = new THREE.Points(geometry, material)
    // Original: random rotation on all axes
    pts.rotation.x = Math.random() * 6
    pts.rotation.y = Math.random() * 6
    pts.rotation.z = Math.random() * 6
    scene!.add(pts)
    return pts
  })

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
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

const animate = () => {
  animationId = requestAnimationFrame(animate)
  render()
}

const render = () => {
  if (!camera || !scene || !renderer || !geometry) return

  time = Date.now() * 0.00005

  if (props.interactive) {
    camera.position.x += (mouseX - camera.position.x) * 0.05
    camera.position.y += (-mouseY - camera.position.y) * 0.05
  }

  camera.lookAt(scene.position)

  // Original rotation logic: object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1))
  particles.forEach((object, i) => {
    if (object instanceof THREE.Points) {
      const dir = i < 4 ? 1 : -1
      object.rotation.y = time * (i + 1) * dir
    }
  })

  // Original color cycling: h = (360 * (color[0] + time) % 360) / 360
  materials.forEach((material, i) => {
    const [h, s, l] = COLOR_LAYERS[i]
    const hue = (360 * (h + time) % 360) / 360
    material.color.setHSL(hue, s, l)
  })

  renderer.render(scene, camera)
}

const onMouseMove = (e: MouseEvent) => {
  mouseX = e.clientX - windowHalfX
  mouseY = e.clientY - windowHalfY
}

const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    e.preventDefault()
    mouseX = e.touches[0].pageX - windowHalfX
    mouseY = e.touches[0].pageY - windowHalfY
  }
}

const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 1) {
    e.preventDefault()
    mouseX = e.touches[0].pageX - windowHalfX
    mouseY = e.touches[0].pageY - windowHalfY
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

  particles.forEach((p) => {
    scene?.remove(p)
    p.geometry.dispose()
    if (Array.isArray(p.material)) {
      p.material.forEach((m) => m.dispose())
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

// Use useMotion for reduced motion handling and lifecycle
useMotion(root, ({ motion }) => {
  if (!motion) {
    // Reduced motion: render once without animation loop
    init()
    render()
    return cleanup
  }

  init()
  return cleanup
})

onUnmounted(() => {
  cleanup()
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