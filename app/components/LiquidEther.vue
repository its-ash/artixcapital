<script setup lang="ts">
import * as THREE from 'three'

type SimOptions = {
  iterations_poisson: number
  iterations_viscous: number
  mouse_force: number
  resolution: number
  cursor_size: number
  viscous: number
  isBounce: boolean
  dt: number
  isViscous: boolean
  BFECC: boolean
}

type ShaderPassProps = {
  material?: any
  output?: THREE.WebGLRenderTarget | null
  output0?: THREE.WebGLRenderTarget | null
  output1?: THREE.WebGLRenderTarget | null
}

const props = withDefaults(defineProps<{
  mouseForce?: number
  cursorSize?: number
  isViscous?: boolean
  viscous?: number
  iterationsViscous?: number
  iterationsPoisson?: number
  dt?: number
  BFECC?: boolean
  resolution?: number
  isBounce?: boolean
  colors?: string[]
  autoDemo?: boolean
  autoSpeed?: number
  autoIntensity?: number
  takeoverDuration?: number
  autoResumeDelay?: number
  autoRampDuration?: number
}>(), {
  mouseForce: 20,
  cursorSize: 100,
  isViscous: false,
  viscous: 30,
  iterationsViscous: 32,
  iterationsPoisson: 32,
  dt: 0.014,
  BFECC: true,
  resolution: 0.5,
  isBounce: false,
  colors: () => ['#0a0b10', '#10131e', '#3d3a52'],
  autoDemo: true,
  autoSpeed: 0.5,
  autoIntensity: 2.2,
  takeoverDuration: 0.25,
  autoResumeDelay: 1000,
  autoRampDuration: 0.6
})

const mount = ref<HTMLElement | null>(null)
let disposeAll = () => {}

const faceVert = `
  attribute vec3 position;
  uniform vec2 px;
  uniform vec2 boundarySpace;
  varying vec2 uv;
  precision highp float;
  void main(){
    vec3 pos = position;
    vec2 scale = 1.0 - boundarySpace * 2.0;
    pos.xy = pos.xy * scale;
    uv = vec2(0.5)+(pos.xy)*0.5;
    gl_Position = vec4(pos, 1.0);
  }
`
const lineVert = `
  attribute vec3 position;
  uniform vec2 px;
  precision highp float;
  varying vec2 uv;
  void main(){
    vec3 pos = position;
    uv = 0.5 + pos.xy * 0.5;
    vec2 n = sign(pos.xy);
    pos.xy = abs(pos.xy) - px * 1.0;
    pos.xy *= n;
    gl_Position = vec4(pos, 1.0);
  }
`
const mouseVert = `
  precision highp float;
  attribute vec3 position;
  attribute vec2 uv;
  uniform vec2 center;
  uniform vec2 scale;
  uniform vec2 px;
  varying vec2 vUv;
  void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
  }
`
const advectionFrag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform float dt;
  uniform bool isBFECC;
  uniform vec2 fboSize;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
      vec2 vel = texture2D(velocity, uv).xy;
      vec2 uv2 = uv - vel * dt * ratio;
      vec2 newVel = texture2D(velocity, uv2).xy;
      gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
      vec2 spot_new = uv;
      vec2 vel_old = texture2D(velocity, uv).xy;
      vec2 spot_old = spot_new - vel_old * dt * ratio;
      vec2 vel_new1 = texture2D(velocity, spot_old).xy;
      vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
      vec2 error = spot_new2 - spot_new;
      vec2 spot_new3 = spot_new - error / 2.0;
      vec2 vel_2 = texture2D(velocity, spot_new3).xy;
      vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
      vec2 newVel2 = texture2D(velocity, spot_old2).xy;
      gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
  }
`
const colorFrag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform sampler2D palette;
  uniform vec4 bgColor;
  varying vec2 uv;
  void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float lenv = clamp(length(vel), 0.0, 1.0);
    vec3 c = texture2D(palette, vec2(lenv, 0.5)).rgb;
    vec3 outRGB = mix(bgColor.rgb, c, lenv);
    float outA = mix(bgColor.a, 1.0, lenv);
    gl_FragColor = vec4(outRGB, outA);
  }
`
const divergenceFrag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform float dt;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0.0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0.0)).x;
    float y0 = texture2D(velocity, uv-vec2(0.0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0.0, px.y)).y;
    float divergence = (x1 - x0 + y1 - y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
  }
`
const externalForceFrag = `
  precision highp float;
  uniform vec2 force;
  uniform vec2 center;
  uniform vec2 scale;
  uniform vec2 px;
  varying vec2 vUv;
  void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0 - min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0.0, 1.0);
  }
`
const poissonFrag = `
  precision highp float;
  uniform sampler2D pressure;
  uniform sampler2D divergence;
  uniform vec2 px;
  varying vec2 uv;
  void main(){
    float p0 = texture2D(pressure, uv + vec2(px.x * 2.0, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * 2.0, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * 2.0)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * 2.0)).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
  }
`
const pressureFrag = `
  precision highp float;
  uniform sampler2D pressure;
  uniform sampler2D velocity;
  uniform vec2 px;
  uniform float dt;
  varying vec2 uv;
  void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv + vec2(px.x * step, 0.0)).r;
    float p1 = texture2D(pressure, uv - vec2(px.x * step, 0.0)).r;
    float p2 = texture2D(pressure, uv + vec2(0.0, px.y * step)).r;
    float p3 = texture2D(pressure, uv - vec2(0.0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
  }
`
const viscousFrag = `
  precision highp float;
  uniform sampler2D velocity;
  uniform sampler2D velocity_new;
  uniform float v;
  uniform vec2 px;
  uniform float dt;
  varying vec2 uv;
  void main(){
    vec2 old = texture2D(velocity, uv).xy;
    vec2 new0 = texture2D(velocity_new, uv + vec2(px.x * 2.0, 0.0)).xy;
    vec2 new1 = texture2D(velocity_new, uv - vec2(px.x * 2.0, 0.0)).xy;
    vec2 new2 = texture2D(velocity_new, uv + vec2(0.0, px.y * 2.0)).xy;
    vec2 new3 = texture2D(velocity_new, uv - vec2(0.0, px.y * 2.0)).xy;
    vec2 newv = 4.0 * old + v * dt * (new0 + new1 + new2 + new3);
    newv /= 4.0 * (1.0 + v * dt);
    gl_FragColor = vec4(newv, 0.0, 0.0);
  }
`

onMounted(() => {
  const el = mount.value
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const makePaletteTexture = (stops: string[]) => {
    const arr = Array.isArray(stops) && stops.length > 0
      ? (stops.length === 1 ? [stops[0], stops[0]] : stops)
      : ['#ffffff', '#ffffff']
    const w = arr.length
    const data = new Uint8Array(w * 4)
    for (let i = 0; i < w; i++) {
      const c = new THREE.Color(arr[i] ?? '#ffffff')
      data[i * 4] = Math.round(c.r * 255)
      data[i * 4 + 1] = Math.round(c.g * 255)
      data[i * 4 + 2] = Math.round(c.b * 255)
      data[i * 4 + 3] = 255
    }
    const tex = new THREE.DataTexture(data, w, 1, THREE.RGBAFormat)
    tex.magFilter = THREE.LinearFilter
    tex.minFilter = THREE.LinearFilter
    tex.wrapS = THREE.ClampToEdgeWrapping
    tex.wrapT = THREE.ClampToEdgeWrapping
    tex.generateMipmaps = false
    tex.needsUpdate = true
    return tex
  }

  const paletteTex = makePaletteTexture(props.colors)
  const bgVec4 = new THREE.Vector4(0.02, 0.023, 0.04, 1)

  const Common = {
    width: 0, height: 0, aspect: 1, pixelRatio: 1,
    time: 0, delta: 0, container: null as HTMLElement | null, renderer: null as THREE.WebGLRenderer | null, clock: null as THREE.Clock | null,
    init(container: HTMLElement) {
      this.container = container
      this.pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      this.resize()
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.autoClear = false
      this.renderer.setClearColor(new THREE.Color(0x0a0b10), 0)
      this.renderer.setPixelRatio(this.pixelRatio)
      this.renderer.setSize(this.width, this.height)
      const c = this.renderer.domElement
      c.style.width = '100%'
      c.style.height = '100%'
      c.style.display = 'block'
      this.clock = new THREE.Clock()
      this.clock.start()
    },
    resize() {
      if (!this.container) return
      const rect = this.container.getBoundingClientRect()
      this.width = Math.max(1, Math.floor(rect.width))
      this.height = Math.max(1, Math.floor(rect.height))
      this.aspect = this.width / this.height
      if (this.renderer) this.renderer.setSize(this.width, this.height, false)
    },
    update() {
      if (!this.clock) return
      this.delta = this.clock.getDelta()
      this.time += this.delta
    }
  }

  const Mouse = {
    mouseMoved: false,
    coords: new THREE.Vector2(),
    coords_old: new THREE.Vector2(),
    diff: new THREE.Vector2(),
    timer: 0,
    container: null as HTMLElement | null,
    doc: null as Document | null,
    win: null as Window | null,
    isHoverInside: false,
    hasUserControl: false,
    isAutoActive: false,
    autoIntensity: props.autoIntensity,
    takeoverActive: false,
    takeoverStartTime: 0,
    takeoverDuration: props.takeoverDuration,
    takeoverFrom: new THREE.Vector2(),
    takeoverTo: new THREE.Vector2(),
    onInteract: null as null | (() => void),
    onMouseMove(e: MouseEvent) { Mouse.move(e.clientX, e.clientY) },
    onTouchStart(e: TouchEvent) { if (e.touches.length === 1) Mouse.move(e.touches[0]!.clientX, e.touches[0]!.clientY) },
    onTouchMove(e: TouchEvent) { if (e.touches.length === 1) Mouse.move(e.touches[0]!.clientX, e.touches[0]!.clientY) },
    onTouchEnd() { Mouse.isHoverInside = false },
    onLeave() { Mouse.isHoverInside = false },
    move(x: number, y: number) {
      if (!Mouse.inside(x, y)) return
      Mouse.onInteract?.()
      if (Mouse.isAutoActive && !Mouse.hasUserControl && !Mouse.takeoverActive) {
        const r = Mouse.container?.getBoundingClientRect()
        if (!r) return
        Mouse.takeoverFrom.copy(Mouse.coords)
        Mouse.takeoverTo.set(((x - r.left) / r.width) * 2 - 1, -(((y - r.top) / r.height) * 2 - 1))
        Mouse.takeoverStartTime = performance.now()
        Mouse.takeoverActive = true
        Mouse.hasUserControl = true
        Mouse.isAutoActive = false
        return
      }
      Mouse.setCoords(x, y)
      Mouse.hasUserControl = true
    },
    inside(x: number, y: number) {
      const r = Mouse.container?.getBoundingClientRect()
      return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
    },
    setCoords(x: number, y: number) {
      if (!Mouse.container) return
      clearTimeout(Mouse.timer)
      const rect = Mouse.container.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      Mouse.coords.set(((x - rect.left) / rect.width) * 2 - 1, -(((y - rect.top) / rect.height) * 2 - 1))
      Mouse.mouseMoved = true
      Mouse.timer = window.setTimeout(() => { Mouse.mouseMoved = false }, 100)
    },
    setNormalized(nx: number, ny: number) {
      Mouse.coords.set(nx, ny)
      Mouse.mouseMoved = true
    },
    update() {
      if (Mouse.takeoverActive) {
        const t = (performance.now() - Mouse.takeoverStartTime) / (Mouse.takeoverDuration * 1000)
        if (t >= 1) {
          Mouse.takeoverActive = false
          Mouse.coords.copy(Mouse.takeoverTo)
          Mouse.coords_old.copy(Mouse.coords)
          Mouse.diff.set(0, 0)
        } else {
          const k = t * t * (3 - 2 * t)
          Mouse.coords.copy(Mouse.takeoverFrom).lerp(Mouse.takeoverTo, k)
        }
      }
      Mouse.diff.subVectors(Mouse.coords, Mouse.coords_old)
      Mouse.coords_old.copy(Mouse.coords)
      if (Mouse.coords_old.x === 0 && Mouse.coords_old.y === 0) Mouse.diff.set(0, 0)
      if (Mouse.isAutoActive && !Mouse.takeoverActive) Mouse.diff.multiplyScalar(Mouse.autoIntensity)
    },
    dispose() {
      Mouse.win?.removeEventListener('mousemove', Mouse.onMouseMove)
      Mouse.win?.removeEventListener('touchstart', Mouse.onTouchStart)
      Mouse.win?.removeEventListener('touchmove', Mouse.onTouchMove)
      Mouse.win?.removeEventListener('touchend', Mouse.onTouchEnd)
      Mouse.doc?.removeEventListener('mouseleave', Mouse.onLeave)
      Mouse.win = null
      Mouse.doc = null
      Mouse.container = null
    },
    init(container: HTMLElement) {
      Mouse.container = container
      Mouse.doc = container.ownerDocument
      Mouse.win = Mouse.doc?.defaultView ?? null
      if (!Mouse.win) return
      Mouse.win.addEventListener('mousemove', Mouse.onMouseMove)
      Mouse.win.addEventListener('touchstart', Mouse.onTouchStart, { passive: true })
      Mouse.win.addEventListener('touchmove', Mouse.onTouchMove, { passive: true })
      Mouse.win.addEventListener('touchend', Mouse.onTouchEnd)
      Mouse.doc?.addEventListener('mouseleave', Mouse.onLeave)
    }
  }

  let raf = 0
  let lastUserInteraction = performance.now()
  const AutoDriver = {
    enabled: props.autoDemo,
    speed: props.autoSpeed,
    resumeDelay: props.autoResumeDelay || 3000,
    rampDurationMs: props.autoRampDuration * 1000,
    active: false,
    current: new THREE.Vector2(0, 0),
    target: new THREE.Vector2(),
    lastTime: performance.now(),
    activationTime: 0,
    margin: 0.2,
    tmp: new THREE.Vector2(),
    pickNewTarget() {
      const r = Math.random
      AutoDriver.target.set((r() * 2 - 1) * (1 - AutoDriver.margin), (r() * 2 - 1) * (1 - AutoDriver.margin))
    },
    forceStop() {
      AutoDriver.active = false
      Mouse.isAutoActive = false
    },
    update() {
      if (!AutoDriver.enabled) return
      const now = performance.now()
      const idle = now - lastUserInteraction
      if (idle < AutoDriver.resumeDelay || Mouse.isHoverInside) {
        if (AutoDriver.active) AutoDriver.forceStop()
        return
      }
      if (!AutoDriver.active) {
        AutoDriver.active = true
        AutoDriver.current.copy(Mouse.coords)
        AutoDriver.lastTime = now
        AutoDriver.activationTime = now
      }
      Mouse.isAutoActive = true
      let dtSec = (now - AutoDriver.lastTime) / 1000
      AutoDriver.lastTime = now
      if (dtSec > 0.2) dtSec = 0.016
      const dir = AutoDriver.tmp.subVectors(AutoDriver.target, AutoDriver.current)
      const dist = dir.length()
      if (dist < 0.01) {
        AutoDriver.pickNewTarget()
        return
      }
      dir.normalize()
      let ramp = 1
      if (AutoDriver.rampDurationMs > 0) {
        const t = Math.min(1, (now - AutoDriver.activationTime) / AutoDriver.rampDurationMs)
        ramp = t * t * (3 - 2 * t)
      }
      const step = AutoDriver.speed * dtSec * ramp
      AutoDriver.current.addScaledVector(dir, Math.min(step, dist))
      Mouse.setNormalized(AutoDriver.current.x, AutoDriver.current.y)
    }
  }
  AutoDriver.pickNewTarget()

  class ShaderPass {
    simProps: ShaderPassProps
    uniforms: Record<string, { value: any }>
    scene = new THREE.Scene()
    camera = new THREE.Camera()
    material: THREE.RawShaderMaterial | null = null
    constructor(simProps: ShaderPassProps) {
      this.simProps = simProps
      this.uniforms = simProps.material?.uniforms ?? {}
      if (this.uniforms && Object.keys(this.uniforms).length) {
        this.material = new THREE.RawShaderMaterial(this.simProps.material)
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material)
        this.scene.add(plane)
      }
    }
    render(target: THREE.WebGLRenderTarget | null) {
      if (!Common.renderer) return
      Common.renderer.setRenderTarget(target)
      Common.renderer.render(this.scene, this.camera)
      Common.renderer.setRenderTarget(null)
    }
  }

  class Advection extends ShaderPass {
    line: THREE.LineSegments
    constructor(simProps: any) {
      super({
        material: {
          vertexShader: faceVert,
          fragmentShader: advectionFrag,
          uniforms: {
            boundarySpace: { value: simProps.cellScale },
            px: { value: simProps.cellScale },
            fboSize: { value: simProps.fboSize },
            velocity: { value: simProps.src.texture },
            dt: { value: simProps.dt },
            isBFECC: { value: true }
          }
        },
        output: simProps.dst
      })
      this.uniforms = (this.simProps.material as any).uniforms
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array([-1, -1, 0, -1, 1, 0, -1, 1, 0, 1, 1, 0, 1, 1, 0, 1, -1, 0, 1, -1, 0, -1, -1, 0]), 3))
      this.line = new THREE.LineSegments(g, new THREE.RawShaderMaterial({ vertexShader: lineVert, fragmentShader: advectionFrag, uniforms: this.uniforms }))
      this.scene.add(this.line)
    }
    update(dt: number, isBounce: boolean, BFECC: boolean) {
      this.uniforms.dt.value = dt
      this.line.visible = isBounce
      this.uniforms.isBFECC.value = BFECC
      this.render(this.simProps.output ?? null)
    }
  }

  class ExternalForce extends ShaderPass {
    mesh: THREE.Mesh
    constructor(simProps: any) {
      super({ output: simProps.dst })
      const g = new THREE.PlaneGeometry(1, 1)
      const m = new THREE.RawShaderMaterial({
        vertexShader: mouseVert,
        fragmentShader: externalForceFrag,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        uniforms: {
          px: { value: simProps.cellScale },
          force: { value: new THREE.Vector2(0, 0) },
          center: { value: new THREE.Vector2(0, 0) },
          scale: { value: new THREE.Vector2(simProps.cursor_size, simProps.cursor_size) }
        }
      })
      this.mesh = new THREE.Mesh(g, m)
      this.scene.add(this.mesh)
    }
    update(cursor_size: number, mouse_force: number) {
      const u = (this.mesh.material as THREE.RawShaderMaterial).uniforms
      u.force.value.set((Mouse.diff.x / 2) * mouse_force, (Mouse.diff.y / 2) * mouse_force)
      u.center.value.set(Mouse.coords.x, Mouse.coords.y)
      u.scale.value.set(cursor_size, cursor_size)
      this.render(this.simProps.output ?? null)
    }
  }

  class IterativePass extends ShaderPass {
    swapA: THREE.WebGLRenderTarget | null
    swapB: THREE.WebGLRenderTarget | null
    texUniform: string
    constructor(simProps: any, texUniform: string) {
      super(simProps)
      this.simProps = simProps
      this.uniforms = (this.simProps.material as any).uniforms
      this.swapA = simProps.output0
      this.swapB = simProps.output1
      this.texUniform = texUniform
    }
    run(iterations: number) {
      for (let i = 0; i < iterations; i++) {
        const fin = i % 2 === 0 ? this.swapA : this.swapB
        const fout = i % 2 === 0 ? this.swapB : this.swapA
        this.uniforms[this.texUniform].value = fin!.texture
        this.simProps.output = fout
        this.render(fout ?? null)
      }
      return iterations % 2 === 0 ? this.swapA : this.swapB
    }
  }

  class Viscous extends IterativePass {
    constructor(simProps: any) {
      super({
        material: {
          vertexShader: faceVert,
          fragmentShader: viscousFrag,
          uniforms: {
            boundarySpace: { value: simProps.boundarySpace },
            velocity: { value: simProps.src.texture },
            velocity_new: { value: simProps.dst_.texture },
            v: { value: simProps.viscous },
            px: { value: simProps.cellScale },
            dt: { value: simProps.dt }
          }
        },
        output: simProps.dst,
        output0: simProps.dst_,
        output1: simProps.dst
      }, 'velocity_new')
    }
  }

  class Poisson extends IterativePass {
    constructor(simProps: any) {
      super({
        material: {
          vertexShader: faceVert,
          fragmentShader: poissonFrag,
          uniforms: {
            boundarySpace: { value: simProps.boundarySpace },
            pressure: { value: simProps.dst_.texture },
            divergence: { value: simProps.src.texture },
            px: { value: simProps.cellScale }
          }
        },
        output: simProps.dst,
        output0: simProps.dst_,
        output1: simProps.dst
      }, 'pressure')
    }
  }

  class Divergence extends ShaderPass {
    constructor(simProps: any) {
      super({
        material: {
          vertexShader: faceVert,
          fragmentShader: divergenceFrag,
          uniforms: {
            boundarySpace: { value: simProps.boundarySpace },
            velocity: { value: simProps.src.texture },
            px: { value: simProps.cellScale },
            dt: { value: simProps.dt }
          }
        },
        output: simProps.dst
      })
      this.uniforms = (this.simProps.material as any).uniforms
    }
    update(vel: THREE.WebGLRenderTarget) {
      this.uniforms.velocity.value = vel.texture
      this.render(this.simProps.output ?? null)
    }
  }

  class Pressure extends ShaderPass {
    constructor(simProps: any) {
      super({
        material: {
          vertexShader: faceVert,
          fragmentShader: pressureFrag,
          uniforms: {
            boundarySpace: { value: simProps.boundarySpace },
            pressure: { value: simProps.src_p.texture },
            velocity: { value: simProps.src_v.texture },
            px: { value: simProps.cellScale },
            dt: { value: simProps.dt }
          }
        },
        output: simProps.dst
      })
      this.uniforms = (this.simProps.material as any).uniforms
    }
    update(vel: THREE.WebGLRenderTarget, pressure: THREE.WebGLRenderTarget | null) {
      this.uniforms.velocity.value = vel.texture
      this.uniforms.pressure.value = pressure!.texture
      this.render(this.simProps.output ?? null)
    }
  }

  const opts: SimOptions = {
    iterations_poisson: props.iterationsPoisson,
    iterations_viscous: props.iterationsViscous,
    mouse_force: props.mouseForce,
    resolution: props.resolution,
    cursor_size: props.cursorSize,
    viscous: props.viscous,
    isBounce: props.isBounce,
    dt: props.dt,
    isViscous: props.isViscous,
    BFECC: props.BFECC
  }

  const fbos: Record<string, THREE.WebGLRenderTarget | null> = {}
  const fboSize = new THREE.Vector2()
  const cellScale = new THREE.Vector2()
  const boundarySpace = new THREE.Vector2()

  const calcSize = () => {
    const w = Math.max(1, Math.round(opts.resolution * Common.width))
    const h = Math.max(1, Math.round(opts.resolution * Common.height))
    cellScale.set(1 / w, 1 / h)
    fboSize.set(w, h)
  }
  calcSize()
  const floatType = /(iPad|iPhone|iPod)/i.test(navigator.userAgent) ? THREE.HalfFloatType : THREE.FloatType
  for (const key of ['vel_0', 'vel_1', 'vel_viscous0', 'vel_viscous1', 'div', 'pressure_0', 'pressure_1']) {
    fbos[key] = new THREE.WebGLRenderTarget(fboSize.x, fboSize.y, { type: floatType, depthBuffer: false, stencilBuffer: false, minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, wrapS: THREE.ClampToEdgeWrapping, wrapT: THREE.ClampToEdgeWrapping })
  }

  const advection = new Advection({ cellScale, fboSize, dt: opts.dt, src: fbos.vel_0, dst: fbos.vel_1 })
  const externalForce = new ExternalForce({ cellScale, cursor_size: opts.cursor_size, dst: fbos.vel_1 })
  const viscous = new Viscous({ cellScale, boundarySpace, viscous: opts.viscous, src: fbos.vel_1, dst: fbos.vel_viscous1, dst_: fbos.vel_viscous0, dt: opts.dt })
  const divergence = new Divergence({ cellScale, boundarySpace, src: fbos.vel_viscous0, dst: fbos.div, dt: opts.dt })
  const poisson = new Poisson({ cellScale, boundarySpace, src: fbos.div, dst: fbos.pressure_1, dst_: fbos.pressure_0 })
  const pressurePass = new Pressure({ cellScale, boundarySpace, src_p: fbos.pressure_0, src_v: fbos.vel_viscous0, dst: fbos.vel_0, dt: opts.dt })

  const outputScene = new THREE.Scene()
  const outputCam = new THREE.Camera()
  const outputMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.RawShaderMaterial({
    vertexShader: faceVert,
    fragmentShader: colorFrag,
    transparent: true,
    depthWrite: false,
    uniforms: {
      velocity: { value: fbos.vel_0!.texture },
      boundarySpace: { value: new THREE.Vector2() },
      palette: { value: paletteTex },
      bgColor: { value: bgVec4 }
    }
  }))
  outputScene.add(outputMesh)

  const simResize = () => {
    calcSize()
    for (const key in fbos) fbos[key]!.setSize(fboSize.x, fboSize.y)
  }

  const simUpdate = () => {
    boundarySpace.copy(opts.isBounce ? new THREE.Vector2(0, 0) : cellScale)
    advection.update(opts.dt, opts.isBounce, opts.BFECC)
    externalForce.update(opts.cursor_size, opts.mouse_force)
    let vel = fbos.vel_1!
    if (opts.isViscous) vel = viscous.run(opts.iterations_viscous)!
    divergence.update(vel)
    const pres = poisson.run(opts.iterations_poisson)
    pressurePass.update(vel, pres)
  }

  const renderOutput = () => {
    if (!Common.renderer) return
    outputMesh.material.uniforms.velocity.value = fbos.vel_0!.texture
    Common.renderer.setRenderTarget(null)
    Common.renderer.render(outputScene, outputCam)
  }

  let running = false
  let visible = true
  const loop = () => {
    if (!running) return
    AutoDriver.update()
    Mouse.update()
    Common.update()
    simUpdate()
    renderOutput()
    raf = requestAnimationFrame(loop)
  }
  const start = () => { if (!running) { running = true; loop() } }
  const pause = () => { running = false; cancelAnimationFrame(raf) }

  Mouse.init(el)
  Mouse.autoIntensity = props.autoIntensity
  Mouse.takeoverDuration = props.takeoverDuration
  Mouse.onInteract = () => { lastUserInteraction = performance.now(); AutoDriver.forceStop() }
  Common.init(el)
  el.prepend(Common.renderer!.domElement)

  const onResize = () => { Common.resize(); simResize() }
  const onVis = () => { if (document.hidden) pause(); else if (visible) start() }
  addEventListener('resize', onResize)
  document.addEventListener('visibilitychange', onVis)
  const ro = new ResizeObserver(onResize)
  ro.observe(el)
  const io = new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting
    visible && !document.hidden ? start() : pause()
  }, { threshold: 0.1 })
  io.observe(el)

  start()

  disposeAll = () => {
    pause()
    removeEventListener('resize', onResize)
    document.removeEventListener('visibilitychange', onVis)
    ro.disconnect()
    io.disconnect()
    Mouse.dispose()
    const c = Common.renderer?.domElement
    if (c?.parentNode) c.parentNode.removeChild(c)
    Common.renderer?.dispose()
    for (const key in fbos) fbos[key]?.dispose()
    paletteTex.dispose()
  }
})

onBeforeUnmount(() => disposeAll())
</script>

<template>
  <div ref="mount" class="absolute inset-0 size-full overflow-hidden [&_canvas]:absolute! [&_canvas]:inset-0" aria-hidden="true" />
</template>