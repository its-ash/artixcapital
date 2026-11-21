<script setup lang="ts">
import * as THREE from 'three'
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const props = withDefaults(defineProps<{
  accent?: string
  emissive?: string
  spark?: string
  up?: string
}>(), {
  accent: '#d6141c',
  emissive: '#8f0a11',
  spark: '#ff4d56',
  up: '#3fd17a'
})

const host = ref<HTMLDivElement>()
const ready = ref(false)
const { quotes } = useMarketFeed()

const SVG_CX = 545.6
const SVG_CY = 172.75
const SVG_SCALE = 8.4 / 1058.0

const LETTER_SVGS: { key: string; svg: string; xBias: number }[] = [
  {
    key: 'a',
    xBias: -3.26,
    svg: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M175,298.3l0.1,31.5H75.4c-4.5,0-26.3-1.5-43.2-21.6c-11-13.1-14.4-28.1-15.6-34.7V133.1c-0.2-4.8-0.7-28.7,14.8-48.7c13.3-17.1,29.8-20.7,34.6-21.5h128.6c12.3-0.9,31.3,2,46.5,22.3c10.4,13.9,10.7,20.2,10.9,35.3v209.3h-31.5V124.2c-0.9-3.8,1.1-12.7-6.1-20c-10.4-10.6-22.1-9.5-25.4-9.5H84.4c-5.2,0.5-24.9-3.1-32.4,12c-6.4,12.8-3.4,25.4-4.2,28.1c0,39.9-0.4,80.6-0.4,120.5c0.4,4.3-1.8,16.2,6,27.3c8.6,12.4,19.9,16.4,24,15.7C109.9,298,142.4,298.5,175,298.3Z"/></svg>'
  },
  {
    key: 'r',
    xBias: -1.24,
    svg: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M303.9,329.8V136.5c-0.1-2.7-0.5-16.1,9.6-27.6C324.8,96.2,340.4,96,342.7,96h163.5V63.8H336.1c-5.5,0.5-27.4,3.1-44.9,21.6c-15.1,16-18,34.3-18.7,40.4v204H303.9Z"/></svg>'
  },
  {
    key: 't',
    xBias: 0.78,
    svg: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M526.9,15.7h33.2V256c-0.2,2.4-0.4,15.7,7.8,27c8.2,11.4,18.7,13.1,23.1,13h172.6v33.4H590.1c-8.4,0.8-25.4-0.2-43.2-16.9c-16.6-15.7-20.2-32.2-20.1-40.5V15.7Z"/><rect x="580.7" y="65.1" width="182.8" height="31.8"/></svg>'
  },
  {
    key: 'i',
    xBias: 2.02,
    svg: '<svg xmlns="http://www.w3.org/2000/svg"><rect x="784" y="65.8" width="32.8" height="263.9"/><rect x="784.1" y="15.7" width="32.8" height="32.8"/></svg>'
  },
  {
    key: 'x',
    xBias: 3.26,
    svg: '<svg xmlns="http://www.w3.org/2000/svg"><polygon points="1074.6,329.8 1037.7,329.8 837.3,15.7 874.3,15.7"/></svg>'
  }
]

const toWorld = (sx: number, sy: number, z = 0): [number, number, number] => [
  (sx - SVG_CX) * SVG_SCALE,
  -(sy - SVG_CY) * SVG_SCALE,
  z
]

function makeBrushedTextures() {
  const size = 256
  const roughCvs = document.createElement('canvas')
  roughCvs.width = roughCvs.height = size
  const rctx = roughCvs.getContext('2d')!
  rctx.fillStyle = '#3c3c3c'
  rctx.fillRect(0, 0, size, size)
  for (let y = 0; y < size; y++) {
    const streak = 48 + Math.sin(y * 0.7) * 10 + (Math.random() - 0.5) * 34
    rctx.fillStyle = `rgb(${streak | 0},${streak | 0},${streak | 0})`
    rctx.fillRect(0, y, size, 1)
  }
  for (let i = 0; i < 420; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const w = 18 + Math.random() * 84
    const v = 30 + Math.random() * 58
    rctx.fillStyle = `rgba(${v | 0},${v | 0},${v | 0},0.28)`
    rctx.fillRect(x, y, w, 1)
  }
  const tex = new THREE.CanvasTexture(roughCvs)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(3.5, 3.5)
  tex.needsUpdate = true
  return tex
}

function buildOrigamiCrystal(
  facets: [number[], number[], number[], number][],
  perimeter: [number, number][],
  edgeZ: number
) {
  const positions: number[] = []
  const colors: number[] = []
  const tmpCol = new THREE.Color()

  const pushTri = (a: number[], b: number[], c: number[], hex: number) => {
    tmpCol.setHex(hex)
    positions.push(a[0]!, a[1]!, a[2]!, b[0]!, b[1]!, b[2]!, c[0]!, c[1]!, c[2]!)
    for (let k = 0; k < 3; k++) colors.push(tmpCol.r, tmpCol.g, tmpCol.b)
  }

  for (const [a, b, c, hex] of facets) {
    const va = toWorld(a[0]!, a[1]!, a[2]!)
    const vb = toWorld(b[0]!, b[1]!, b[2]!)
    const vc = toWorld(c[0]!, c[1]!, c[2]!)
    const e1x = vb[0] - va[0]
    const e1y = vb[1] - va[1]
    const e2x = vc[0] - va[0]
    const e2y = vc[1] - va[1]
    const nz = e1x * e2y - e1y * e2x
    if (nz >= 0) pushTri(va, vb, vc, hex)
    else pushTri(va, vc, vb, hex)

    const ba = [va[0], va[1], -va[2]]
    const bb = [vb[0], vb[1], -vb[2]]
    const bc = [vc[0], vc[1], -vc[2]]
    if (nz >= 0) pushTri(ba, bc, bb, hex)
    else pushTri(ba, bb, bc, hex)
  }

  for (let i = 0; i < perimeter.length; i++) {
    const p0 = perimeter[i]!
    const p1 = perimeter[(i + 1) % perimeter.length]!
    const f0 = toWorld(p0[0], p0[1], edgeZ)
    const f1 = toWorld(p1[0], p1[1], edgeZ)
    const b0 = toWorld(p0[0], p0[1], -edgeZ)
    const b1 = toWorld(p1[0], p1[1], -edgeZ)
    pushTri(f0, b0, b1, facets[0]![3])
    pushTri(f0, b1, f1, facets[0]![3])
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
  geo.computeVertexNormals()
  return geo
}

function buildArtixMonument(
  metalMat: THREE.MeshPhysicalMaterial,
  downCrystalMat: THREE.MeshPhysicalMaterial,
  upCrystalMat: THREE.MeshPhysicalMaterial,
  edgeMat: THREE.LineBasicMaterial,
  downEdgeMat: THREE.LineBasicMaterial,
  upEdgeMat: THREE.LineBasicMaterial
) {
  const loader = new SVGLoader()
  const root = new THREE.Group()
  const depth = 0.32
  const extrudeOpts: THREE.ExtrudeGeometryOptions = {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.042,
    bevelSize: 0.024,
    bevelSegments: 5,
    curveSegments: 24
  }

  const letters: { group: THREE.Group; baseX: number; baseY: number; phase: number; lift: number }[] = []
  let iTittleMesh: THREE.Group | null = null

  for (let idx = 0; idx < LETTER_SVGS.length; idx++) {
    const def = LETTER_SVGS[idx]!
    const parsed = loader.parse(def.svg)
    const holder = new THREE.Group()

    for (let pIdx = 0; pIdx < parsed.paths.length; pIdx++) {
      const svgPath = parsed.paths[pIdx]!
      const rawShapes = SVGLoader.createShapes(svgPath)
      for (const raw of rawShapes) {
        const pts = raw.getPoints(28)
        const flipped: THREE.Vector2[] = []
        for (const p of pts) {
          const wx = (p.x - SVG_CX) * SVG_SCALE
          const wy = -(p.y - SVG_CY) * SVG_SCALE
          const prev = flipped[flipped.length - 1]
          if (!prev || Math.hypot(wx - prev.x, wy - prev.y) > 1e-4) {
            flipped.push(new THREE.Vector2(wx, wy))
          }
        }
        if (flipped.length < 3) continue
        const shape = new THREE.Shape(flipped)
        const geo = new THREE.ExtrudeGeometry(shape, extrudeOpts)
        geo.translate(0, 0, -depth / 2)
        const mesh = new THREE.Mesh(geo, metalMat)
        const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 30), edgeMat)
        const piece = new THREE.Group()
        piece.add(mesh, edges)
        if (def.key === 'i' && pIdx === 1) iTittleMesh = piece
        holder.add(piece)
      }
    }

    if (def.key === 'x') {
      const edgeZ = 0.085
      const ridgeZ = 0.145
      const peakZ = 0.285

      const tl = [907.8, 15.7, edgeZ]
      const tr = [1074.6, 15.7, edgeZ]
      const bot = [985.7, 144.5, edgeZ]
      const mTop = [994.5, 15.7, ridgeZ]
      const mLeft = [966.5, 113.4, ridgeZ]
      const apexDn = [1011.0, 83.7, peakZ]

      const downGeo = buildOrigamiCrystal(
        [
          [tl, mTop, apexDn, 0x720d16],
          [tl, apexDn, mLeft, 0xf21e28],
          [mTop, tr, apexDn, 0xc81520],
          [mLeft, apexDn, bot, 0x560910],
          [apexDn, tr, bot, 0x8e111a]
        ],
        [[907.8, 15.7], [994.5, 15.7], [1074.6, 15.7], [985.7, 144.5], [966.5, 113.4]],
        edgeZ
      )
      const downGroup = new THREE.Group()
      downGroup.add(
        new THREE.Mesh(downGeo, downCrystalMat),
        new THREE.LineSegments(new THREE.EdgesGeometry(downGeo, 12), downEdgeMat)
      )
      downGroup.userData.crystal = 'down'
      holder.add(downGroup)

      const top = [926.2, 200.9, edgeZ]
      const bl = [837.3, 329.8, edgeZ]
      const br = [1004.1, 329.8, edgeZ]
      const mRight = [944.1, 230.5, ridgeZ]
      const mBot = [918.6, 329.8, ridgeZ]
      const mL1 = [911.3, 222.5, ridgeZ]
      const mL2 = [871.6, 280.1, ridgeZ]
      const apexUp = [901.3, 259.7, peakZ]

      const upGeo = buildOrigamiCrystal(
        [
          [top, mL1, mRight, 0x2ea64c],
          [mL1, apexUp, mRight, 0x187339],
          [mL1, mL2, apexUp, 0x0e5229],
          [mL2, bl, apexUp, 0x166834],
          [bl, mBot, apexUp, 0x229144],
          [mBot, br, apexUp, 0x34b857],
          [apexUp, br, mRight, 0x62cf79]
        ],
        [[926.2, 200.9], [911.3, 222.5], [871.6, 280.1], [837.3, 329.8], [918.6, 329.8], [1004.1, 329.8], [944.1, 230.5]],
        edgeZ
      )
      const upGroup = new THREE.Group()
      upGroup.add(
        new THREE.Mesh(upGeo, upCrystalMat),
        new THREE.LineSegments(new THREE.EdgesGeometry(upGeo, 12), upEdgeMat)
      )
      upGroup.userData.crystal = 'up'
      holder.add(upGroup)
    }

    root.add(holder)
    letters.push({ group: holder, baseX: def.xBias, baseY: 0, phase: idx * 0.72, lift: 0 })
  }

  return { root, letters, iTittleMesh }
}

function createHaloPlane(color: THREE.Color, radius: number) {
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: color.clone() },
      uIntensity: { value: 0.65 }
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec2 vUv;
      void main() {
        float d = length(vUv - 0.5) * 2.0;
        float core = exp(-d * d * 4.2);
        float halo = exp(-d * d * 1.45) * 0.45;
        float a = clamp((core + halo) * smoothstep(1.0, 0.2, d) * uIntensity, 0.0, 1.0);
        gl_FragColor = vec4(uColor * (0.85 + core * 0.65), a);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  })
  return { mesh: new THREE.Mesh(new THREE.PlaneGeometry(radius, radius), mat), mat }
}

onMounted(() => {
  const el = host.value
  if (!el) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const accentCol = new THREE.Color(props.accent)
  const emissiveCol = new THREE.Color(props.emissive)
  const sparkCol = new THREE.Color(props.spark)
  const upCol = new THREE.Color(props.up)
  const upEmissiveCol = new THREE.Color('#136b36')
  const compact = (el.clientWidth || window.innerWidth) < 640

  let renderer: THREE.WebGLRenderer
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
  } catch {
    return
  }

  let raf = 0
  let visible = false
  let disposed = false

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.18
  el.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100)
  camera.position.set(0, 0.18, 12.2)

  // Museum-grade studio IBL combining RoomEnvironment + custom crimson/emerald rim softboxes
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envScene = new RoomEnvironment()
  const stripMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
  const strip1 = new THREE.Mesh(new THREE.PlaneGeometry(22, 4), stripMat1)
  strip1.position.set(0, 7.5, 4.5)
  strip1.rotation.x = Math.PI / 2.4
  const stripMat2 = new THREE.MeshBasicMaterial({ color: accentCol, side: THREE.DoubleSide })
  const strip2 = new THREE.Mesh(new THREE.PlaneGeometry(14, 4.5), stripMat2)
  strip2.position.set(7.5, -2.5, 2.5)
  strip2.rotation.y = -Math.PI / 2.8
  const stripMat3 = new THREE.MeshBasicMaterial({ color: upCol, side: THREE.DoubleSide })
  const strip3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 3.5), stripMat3)
  strip3.position.set(-7.5, -3.5, 2)
  strip3.rotation.y = Math.PI / 2.8
  envScene.add(strip1, strip2, strip3)
  const envRT = pmrem.fromScene(envScene, 0.04)
  scene.environment = envRT.texture
  envScene.dispose()
  strip1.geometry.dispose()
  stripMat1.dispose()
  strip2.geometry.dispose()
  stripMat2.dispose()
  strip3.geometry.dispose()
  stripMat3.dispose()

  const brushedTex = makeBrushedTextures()

  // Custom GLSL shader uniforms injected into the titanium wordmark material
  const metalUniforms = {
    uTime: { value: 0 },
    uAccent: { value: accentCol.clone() },
    uUp: { value: upCol.clone() },
    uPulseOrigin: { value: new THREE.Vector3(0, 0, 0) },
    uPulseTime: { value: 99 },
    uPointerWorld: { value: new THREE.Vector2(10, 10) }
  }

  const metalMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xeef1f7),
    metalness: 0.56,
    roughness: 0.22,
    roughnessMap: brushedTex,
    bumpMap: brushedTex,
    bumpScale: 0.011,
    clearcoat: 0.95,
    clearcoatRoughness: 0.12,
    envMapIntensity: 1.35
  })
  metalMat.customProgramCacheKey = () => 'artix-titanium-scan-v1'
  metalMat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = metalUniforms.uTime
    shader.uniforms.uAccent = metalUniforms.uAccent
    shader.uniforms.uUp = metalUniforms.uUp
    shader.uniforms.uPulseOrigin = metalUniforms.uPulseOrigin
    shader.uniforms.uPulseTime = metalUniforms.uPulseTime
    shader.uniforms.uPointerWorld = metalUniforms.uPointerWorld

    shader.vertexShader = `varying vec3 vArtixWorldPos;\n${shader.vertexShader}`.replace(
      '#include <worldpos_vertex>',
      `#include <worldpos_vertex>
      vArtixWorldPos = (modelMatrix * vec4(transformed, 1.0)).xyz;`
    )

    shader.fragmentShader = `
      uniform float uTime;
      uniform vec3 uAccent;
      uniform vec3 uUp;
      uniform vec3 uPulseOrigin;
      uniform float uPulseTime;
      uniform vec2 uPointerWorld;
      varying vec3 vArtixWorldPos;
      ${shader.fragmentShader}
    `.replace(
      '#include <emissivemap_fragment>',
      `#include <emissivemap_fragment>
      float scanX = mod(uTime * 2.2, 16.5) - 8.25;
      float scanBand = exp(-pow((vArtixWorldPos.x - scanX) * 2.5, 2.0));
      float scanCore = exp(-pow((vArtixWorldPos.x - scanX) * 14.0, 2.0));
      totalEmissiveRadiance += uAccent * (scanBand * 0.26) + vec3(1.0, 0.9, 0.92) * (scanCore * 0.45);

      float ptrDist = length(vArtixWorldPos.xy - uPointerWorld);
      totalEmissiveRadiance += uAccent * exp(-ptrDist * ptrDist * 0.34) * 0.2;

      if (uPulseTime >= 0.0 && uPulseTime < 2.2) {
        float pr = uPulseTime * 6.0;
        float pd = length(vArtixWorldPos - uPulseOrigin);
        float pring = exp(-pow((pd - pr) * 3.0, 2.0)) * (1.0 - uPulseTime / 2.2);
        totalEmissiveRadiance += mix(uAccent, vec3(1.0), 0.38) * pring * 1.25;
      }`
    )
  }

  const downCrystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    flatShading: true,
    emissive: emissiveCol,
    emissiveIntensity: 0.42,
    metalness: 0.36,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.75
  })

  const upCrystalMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    vertexColors: true,
    flatShading: true,
    emissive: upEmissiveCol,
    emissiveIntensity: 0.38,
    metalness: 0.36,
    roughness: 0.16,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    envMapIntensity: 1.75
  })

  const edgeMat = new THREE.LineBasicMaterial({ color: sparkCol, transparent: true, opacity: 0.16 })
  const downEdgeMat = new THREE.LineBasicMaterial({ color: sparkCol, transparent: true, opacity: 0.62 })
  const upEdgeMat = new THREE.LineBasicMaterial({ color: 0x6be88b, transparent: true, opacity: 0.55 })

  const stageGroup = new THREE.Group()
  scene.add(stageGroup)

  const { root: wordGroup, letters, iTittleMesh } = buildArtixMonument(
    metalMat,
    downCrystalMat,
    upCrystalMat,
    edgeMat,
    downEdgeMat,
    upEdgeMat
  )
  wordGroup.position.set(0, -0.02, 0)
  stageGroup.add(wordGroup)

  // Volumetric halos seated directly behind the crimson Ask & emerald Bid origami crystals
  const downHalo = createHaloPlane(accentCol, 2.55)
  const dnPos = toWorld(990, 62, -0.36)
  downHalo.mesh.position.set(dnPos[0], dnPos[1], dnPos[2])
  const upHalo = createHaloPlane(upCol, 2.45)
  const upPos = toWorld(922, 282, -0.36)
  upHalo.mesh.position.set(upPos[0], upPos[1], upPos[2])
  wordGroup.add(downHalo.mesh, upHalo.mesh)

  // Layer 2: GPU 3D Liquidity Depth Terrain (custom GLSL fwidth grid + live order-flow waves)
  const terrainGeo = new THREE.PlaneGeometry(17.5, 7.6, compact ? 64 : 116, compact ? 28 : 44)
  terrainGeo.rotateX(-Math.PI / 2)
  const terrainMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uAccent: { value: accentCol.clone() },
      uUp: { value: upCol.clone() },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uHover: { value: 0 },
      uVolatility: { value: 0.35 },
      uPulseOrigin: { value: new THREE.Vector2(0, 0) },
      uPulseTime: { value: 99 }
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      uniform vec2 uPointer;
      uniform float uHover;
      uniform float uVolatility;
      uniform vec2 uPulseOrigin;
      uniform float uPulseTime;
      varying vec2 vUv;
      varying float vElev;
      varying vec3 vWorldPos;

      void main() {
        vUv = uv;
        vec3 p = position;

        float w1 = sin(p.x * 0.62 + uTime * 0.95) * cos(p.z * 0.78 - uTime * 0.65) * 0.26;
        float w2 = sin(p.x * 1.45 - p.z * 1.15 + uTime * 1.4) * 0.11;
        float w3 = cos(p.x * 0.32 + p.z * 0.55 + uTime * 0.45) * 0.16;
        float elev = (w1 + w2 + w3) * (0.78 + uVolatility * 0.65);

        float ptrD = length(p.xz - vec2(uPointer.x * 5.2, -uPointer.y * 2.2));
        elev += exp(-ptrD * ptrD * 0.38) * 0.34 * uHover;

        if (uPulseTime >= 0.0 && uPulseTime < 2.2) {
          float pr = uPulseTime * 6.0;
          float pd = length(p.xz - uPulseOrigin);
          elev += sin((pd - pr) * 3.8) * exp(-pow((pd - pr) * 1.15, 2.0)) * (1.0 - uPulseTime / 2.2) * 0.42;
        }

        p.y += elev;
        vElev = elev;
        vec4 wp = modelMatrix * vec4(p, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      uniform vec3 uAccent;
      uniform vec3 uUp;
      uniform vec2 uPointer;
      uniform float uHover;
      uniform vec2 uPulseOrigin;
      uniform float uPulseTime;
      varying vec2 vUv;
      varying float vElev;
      varying vec3 vWorldPos;

      float gridLine(vec2 coord, float thickness) {
        vec2 g = abs(fract(coord - 0.5) - 0.5) / max(fwidth(coord), vec2(0.0005));
        float line = min(g.x, g.y);
        return 1.0 - smoothstep(0.0, thickness, line);
      }

      void main() {
        vec2 minorCoord = vec2(vWorldPos.x * 2.2, vWorldPos.z * 2.2 - uTime * 0.25);
        vec2 majorCoord = minorCoord * 0.25;
        float minorG = gridLine(minorCoord, 1.15);
        float majorG = gridLine(majorCoord, 1.35);

        float crest = smoothstep(0.08, 0.44, vElev);
        float sideBias = smoothstep(-2.4, 2.8, vWorldPos.x);
        vec3 heatCol = mix(uUp, uAccent, sideBias * 0.72 + 0.28);

        // Sweeping scanner pulse synced with wordmark
        float scanX = mod(uTime * 2.2, 16.5) - 8.25;
        float scan = exp(-pow((vWorldPos.x - scanX) * 1.4, 2.0));

        // Pointer radial highlight
        float ptrD = length(vWorldPos.xz - vec2(uPointer.x * 5.2, -uPointer.y * 2.2));
        float ptrGlow = exp(-ptrD * ptrD * 0.25) * uHover;

        // Click shockwave ring
        float pulseRing = 0.0;
        if (uPulseTime >= 0.0 && uPulseTime < 2.2) {
          float pr = uPulseTime * 6.0;
          float pd = length(vWorldPos.xz - uPulseOrigin);
          pulseRing = exp(-pow((pd - pr) * 2.2, 2.0)) * (1.0 - uPulseTime / 2.2);
        }

        vec3 baseLine = vec3(0.58, 0.62, 0.70);
        vec3 col = baseLine * (minorG * 0.16 + majorG * 0.24)
          + heatCol * (crest * (0.28 + majorG * 0.45) + scan * (0.22 + minorG * 0.35))
          + uAccent * (ptrGlow * 0.38 + pulseRing * 0.95);

        float edgeX = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
        float edgeY = smoothstep(0.0, 0.26, vUv.y) * smoothstep(1.0, 0.76, vUv.y);
        float radial = smoothstep(1.0, 0.28, length((vUv - 0.5) * vec2(1.9, 2.05)));
        float alpha = clamp((minorG * 0.32 + majorG * 0.48 + crest * 0.25 + scan * 0.22 + ptrGlow * 0.3 + pulseRing * 0.7) * edgeX * edgeY * radial, 0.0, 0.92);

        gl_FragColor = vec4(col, alpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  })
  const terrain = new THREE.Mesh(terrainGeo, terrainMat)
  terrain.position.set(0, -1.52, -0.45)
  terrain.rotation.x = 0.08
  stageGroup.add(terrain)

  // Layer 3: Instanced 3D Real-Time Market Candlesticks framing the horizon behind the wordmark
  const candleCount = compact ? 34 : 58
  const bodyGeo = new THREE.BoxGeometry(0.11, 1, 0.11)
  const wickGeo = new THREE.BoxGeometry(0.018, 1, 0.018)
  const bodyMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.28,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  const wickMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.2,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  })
  const candleBodies = new THREE.InstancedMesh(bodyGeo, bodyMat, candleCount)
  const candleWicks = new THREE.InstancedMesh(wickGeo, wickMat, candleCount)
  candleBodies.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
  candleWicks.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

  const candleMeta = Array.from({ length: candleCount }, (_, i) => {
    const t = i / (candleCount - 1)
    const angle = (t - 0.5) * 1.48
    const radius = 5.4
    const x = Math.sin(angle) * radius * 1.28
    const z = -1.65 - (1 - Math.cos(angle)) * 2.4
    const phase = i * 0.47 + Math.sin(i * 1.3) * 0.5
    const bull = ((i * 7 + 3) % 5) < 3
    return {
      x,
      z,
      phase,
      bull,
      height: 0.28 + (Math.sin(i * 0.9) * 0.5 + 0.5) * 0.65,
      target: 0.35,
      wickPad: 0.22 + (i % 4) * 0.09,
      edgeFade: Math.sin(t * Math.PI)
    }
  })

  const instObj = new THREE.Object3D()
  const tmpColor = new THREE.Color()
  const darkTint = new THREE.Color(0x0c0e13)

  const syncCandles = (t: number, marketBias: number) => {
    const qList = quotes.value
    for (let i = 0; i < candleCount; i++) {
      const m = candleMeta[i]!
      const q = qList.length ? qList[i % qList.length] : undefined
      const qAmp = q ? Math.min(0.95, Math.abs(q.chg) * 0.28) : 0.25
      const wave = 0.22 + (Math.sin(t * 0.85 + m.phase) * 0.5 + 0.5) * 0.72 + qAmp * 0.35
      m.target = wave * (0.45 + m.edgeFade * 0.75)
      m.height += (m.target - m.height) * 0.06

      const isBull = q ? q.chg >= 0 : m.bull
      const baseY = -1.55 + Math.sin(m.x * 0.55 + t * 0.8) * 0.14
      const h = Math.max(0.08, m.height)
      const wickH = h + m.wickPad * (0.65 + Math.abs(marketBias) * 0.5)

      instObj.position.set(m.x, baseY + h * 0.5, m.z)
      instObj.rotation.set(0, 0, 0)
      instObj.scale.set(1, h, 1)
      instObj.updateMatrix()
      candleBodies.setMatrixAt(i, instObj.matrix)

      instObj.position.set(m.x, baseY + h * 0.5 + m.wickPad * 0.12, m.z)
      instObj.scale.set(1, wickH, 1)
      instObj.updateMatrix()
      candleWicks.setMatrixAt(i, instObj.matrix)

      tmpColor.copy(isBull ? upCol : accentCol).lerp(darkTint, 1 - m.edgeFade * 0.88)
      candleBodies.setColorAt(i, tmpColor)
      candleWicks.setColorAt(i, tmpColor)
    }
    candleBodies.instanceMatrix.needsUpdate = true
    candleWicks.instanceMatrix.needsUpdate = true
    if (candleBodies.instanceColor) candleBodies.instanceColor.needsUpdate = true
    if (candleWicks.instanceColor) candleWicks.instanceColor.needsUpdate = true
  }
  syncCandles(0, 0)
  stageGroup.add(candleBodies, candleWicks)

  // Layer 4: Global Liquidity Execution Arcs (GPU traveling photon ribbons echoing GlobeGrid)
  const arcConfigs = [
    { pts: [[-6.4, -1.45, -1.8], [-2.2, 1.75, -1.3], [2.4, 0.95, -0.9], [6.2, -1.35, -1.9]], speed: 0.34, offset: 0.0, bull: false },
    { pts: [[-5.8, -1.55, -0.9], [-1.6, -0.55, -1.5], [1.9, 1.65, -1.2], [5.8, -1.4, -1.1]], speed: 0.29, offset: 0.38, bull: true },
    { pts: [[6.1, -1.4, -2.2], [2.8, 1.35, -1.7], [-1.8, 1.45, -1.5], [-6.1, -1.5, -2.0]], speed: 0.38, offset: 0.72, bull: false },
    { pts: [[-5.0, -1.5, -1.4], [-0.4, 2.05, -2.0], [3.5, 0.45, -1.1], [5.4, -1.45, -1.6]], speed: 0.26, offset: 0.19, bull: true },
    { pts: [[5.2, -1.5, -0.8], [1.4, -0.85, -1.2], [-2.5, 1.55, -1.3], [-5.6, -1.4, -1.2]], speed: 0.33, offset: 0.56, bull: false }
  ]

  const arcMeshes: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial; geo: THREE.BufferGeometry }[] = []
  for (const cfg of arcConfigs) {
    const curve = new THREE.CatmullRomCurve3(cfg.pts.map(p => new THREE.Vector3(p[0], p[1], p[2])))
    const geo = new THREE.TubeGeometry(curve, 72, 0.014, 6, false)
    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSpeed: { value: cfg.speed },
        uOffset: { value: cfg.offset },
        uColor: { value: (cfg.bull ? upCol : sparkCol).clone() }
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float uTime;
        uniform float uSpeed;
        uniform float uOffset;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float head = fract(uTime * uSpeed + uOffset);
          float dist = head - vUv.x;
          if (dist < 0.0) dist += 1.0;
          float trail = smoothstep(0.24, 0.0, dist) * step(dist, 0.24);
          float tip = exp(-dist * 58.0);
          float fade = smoothstep(0.0, 0.12, vUv.x) * smoothstep(1.0, 0.88, vUv.x);
          float rail = 0.09;
          vec3 col = mix(uColor, vec3(1.0), tip * 0.72);
          float alpha = (rail + trail * 0.72 + tip * 0.95) * fade;
          gl_FragColor = vec4(col, alpha);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `
    })
    const mesh = new THREE.Mesh(geo, mat)
    stageGroup.add(mesh)
    arcMeshes.push({ mesh, mat, geo })
  }

  // Layer 5: GPU Soft-Bokeh Liquidity Micro-Sparks (zero square points!)
  const sparkCount = compact ? 95 : 175
  const sparkPos = new Float32Array(sparkCount * 3)
  const sparkSeed = new Float32Array(sparkCount * 3)
  const sparkTint = new Float32Array(sparkCount * 3)
  const platCol = new THREE.Color(0xe6ebf5)

  for (let i = 0; i < sparkCount; i++) {
    sparkPos[i * 3] = (Math.random() - 0.5) * 13.5
    sparkPos[i * 3 + 1] = (Math.random() - 0.5) * 3.6
    sparkPos[i * 3 + 2] = (Math.random() - 0.5) * 4.2 - 0.5
    sparkSeed[i * 3] = Math.random() * 6.28318
    sparkSeed[i * 3 + 1] = 0.25 + Math.random() * 0.75
    sparkSeed[i * 3 + 2] = 0.6 + Math.random() * 1.4

    const pick = Math.random()
    const c = pick < 0.55 ? sparkCol : pick < 0.82 ? platCol : upCol
    sparkTint[i * 3] = c.r
    sparkTint[i * 3 + 1] = c.g
    sparkTint[i * 3 + 2] = c.b
  }

  const sparkGeo = new THREE.BufferGeometry()
  sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3))
  sparkGeo.setAttribute('aSeed', new THREE.BufferAttribute(sparkSeed, 3))
  sparkGeo.setAttribute('aTint', new THREE.BufferAttribute(sparkTint, 3))

  const sparkMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uPointer: { value: new THREE.Vector2(0, 0) }
    },
    vertexShader: /* glsl */ `
      attribute vec3 aSeed;
      attribute vec3 aTint;
      uniform float uTime;
      uniform float uPixelRatio;
      uniform vec2 uPointer;
      varying vec3 vTint;
      varying float vAlpha;

      void main() {
        vec3 p = position;
        float t = uTime * aSeed.y + aSeed.x;
        p.y = mod(p.y + uTime * (0.14 + aSeed.y * 0.16) + 2.0, 4.0) - 2.0;
        p.x += sin(t * 0.85) * 0.22 + uPointer.x * 0.18 * aSeed.y;
        p.z += cos(t * 0.7) * 0.16;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = clamp((16.0 * aSeed.z * uPixelRatio) / max(-mv.z, 2.0), 2.0, 14.0);

        float yFade = smoothstep(-2.0, -1.1, p.y) * smoothstep(2.0, 1.05, p.y);
        float twinkle = 0.55 + 0.45 * sin(uTime * 2.4 * aSeed.y + aSeed.x);
        vTint = aTint;
        vAlpha = yFade * twinkle * 0.72;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vTint;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        float soft = exp(-d * d * 4.5);
        gl_FragColor = vec4(vTint * (0.85 + soft * 0.5), soft * vAlpha);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }
    `
  })
  const sparks = new THREE.Points(sparkGeo, sparkMat)
  sparks.frustumCulled = false
  stageGroup.add(sparks)

  // Precision studio lighting rig
  const hemiLight = new THREE.HemisphereLight(0xf2f6ff, 0x16080b, 0.65)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.15)
  keyLight.position.set(-4.8, 5.4, 8.2)
  const crimsonRim = new THREE.DirectionalLight(accentCol, 2.65)
  crimsonRim.position.set(5.5, -2.0, -4.5)
  const emeraldRim = new THREE.DirectionalLight(upCol, 1.35)
  emeraldRim.position.set(-5.0, -3.2, -3.2)
  const cursorLight = new THREE.PointLight(sparkCol, 11, 11, 1.55)
  cursorLight.position.set(2.4, 0.4, 2.8)
  scene.add(hemiLight, keyLight, crimsonRim, emeraldRim, cursorLight)

  // Interactive spring-damper orbit, hover parallax, and execution shockwave state
  const mouse = new THREE.Vector2(0.28, 0.04)
  const smoothMouse = new THREE.Vector2(0.28, 0.04)
  let hovering = false
  let hoverBlend = 0

  let dragActive = false
  let dragStartX = 0
  let dragStartY = 0
  let dragMoved = 0
  let dragYaw = 0
  let dragPitch = 0
  let targetDragYaw = 0
  let targetDragPitch = 0
  let pulseAge = 99
  let lastScrollY = window.scrollY
  let scrollVel = 0
  let lastQuoteSnap = ''
  let marketSurge = 0
  let marketDir = 1

  const resize = () => {
    const w = el.clientWidth || 1200
    const h = el.clientHeight || 340
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    const vFov = (camera.fov * Math.PI) / 180
    const fitW = 5.35 / (Math.tan(vFov / 2) * camera.aspect)
    const fitH = 2.28 / Math.tan(vFov / 2)
    camera.position.z = Math.max(fitW, fitH)
    camera.position.y = 0.24
    camera.lookAt(0, -0.14, 0)
    camera.updateProjectionMatrix()
    sparkMat.uniforms.uPixelRatio!.value = Math.min(window.devicePixelRatio || 1, 2)
  }
  resize()

  const pointerToNorm = (e: PointerEvent) => {
    const r = el.getBoundingClientRect()
    return {
      nx: ((e.clientX - r.left) / Math.max(1, r.width)) * 2 - 1,
      ny: -(((e.clientY - r.top) / Math.max(1, r.height)) * 2 - 1)
    }
  }

  const onDown = (e: PointerEvent) => {
    if (!e.isPrimary) return
    dragActive = true
    dragStartX = e.clientX
    dragStartY = e.clientY
    dragMoved = 0
    el.setPointerCapture(e.pointerId)
    const { nx, ny } = pointerToNorm(e)
    mouse.set(nx, ny)
    hovering = true
  }

  const onMove = (e: PointerEvent) => {
    const { nx, ny } = pointerToNorm(e)
    mouse.set(nx, ny)
    hovering = true
    if (!dragActive) return
    const dx = e.clientX - dragStartX
    const dy = e.clientY - dragStartY
    dragMoved += Math.abs(dx) + Math.abs(dy)
    dragStartX = e.clientX
    dragStartY = e.clientY
    targetDragYaw = THREE.MathUtils.clamp(targetDragYaw + dx * 0.0055, -0.58, 0.58)
    targetDragPitch = THREE.MathUtils.clamp(targetDragPitch + dy * 0.0042, -0.32, 0.32)
  }

  const onUp = (e: PointerEvent) => {
    if (!dragActive) return
    dragActive = false
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    if (dragMoved < 8 && !reduce) {
      const { nx, ny } = pointerToNorm(e)
      const wx = nx * 4.4
      const wy = ny * 1.4
      metalUniforms.uPulseOrigin.value.set(wx, wy, 0.2)
      terrainMat.uniforms.uPulseOrigin!.value.set(wx, -ny * 2.1)
      pulseAge = 0
      marketSurge = 1.0
    }
  }

  const onLeave = () => {
    hovering = false
    dragActive = false
  }

  el.addEventListener('pointerdown', onDown)
  el.addEventListener('pointermove', onMove, { passive: true })
  el.addEventListener('pointerup', onUp)
  el.addEventListener('pointercancel', onUp)
  el.addEventListener('pointerleave', onLeave, { passive: true })

  const ro = new ResizeObserver(resize)
  ro.observe(el)

  // Heartbeat curve echoing logo.svg's double-pulse rhythm
  const heartbeat = (phase: number) => {
    const p = ((phase % 1) + 1) % 1
    if (p < 0.08) return p / 0.08
    if (p < 0.16) return 1 - ((p - 0.08) / 0.08) * 0.72
    if (p < 0.24) return 0.28 + ((p - 0.16) / 0.08) * 0.65
    if (p < 0.45) return 0.93 * (1 - (p - 0.24) / 0.21)
    return 0
  }

  let elapsed = 0
  let lastNow = performance.now()

  const renderFrame = (now = performance.now()) => {
    if (disposed) return
    const dt = Math.min(Math.max((now - lastNow) / 1000, 0), 0.05)
    lastNow = now
    if (!reduce) elapsed += dt

    // Detect live quote ticks from useMarketFeed()
    const qList = quotes.value
    if (qList.length) {
      const head = qList[0]!
      const snap = `${head.price.toFixed(5)}|${qList[1]?.price.toFixed(4) ?? ''}`
      if (snap !== lastQuoteSnap) {
        lastQuoteSnap = snap
        marketSurge = Math.min(1, marketSurge + 0.55)
        marketDir = head.dir >= 0 ? 1 : -1
      }
    }
    marketSurge *= Math.exp(-dt * 2.6)

    // Scroll velocity tilt (sampled passively inside rAF, zero scroll listener jank)
    const curScrollY = window.scrollY
    const rawVel = (curScrollY - lastScrollY) * 0.0022
    lastScrollY = curScrollY
    scrollVel += (THREE.MathUtils.clamp(rawVel, -0.22, 0.22) - scrollVel) * 0.12

    if (!hovering && !dragActive && !reduce) {
      mouse.x = Math.sin(elapsed * 0.42) * 0.48
      mouse.y = Math.cos(elapsed * 0.31) * 0.16
    }
    smoothMouse.lerp(mouse, dragActive ? 0.16 : 0.07)
    hoverBlend += ((hovering ? 1 : 0.22) - hoverBlend) * 0.08

    if (!dragActive) {
      targetDragYaw *= Math.exp(-dt * 3.2)
      targetDragPitch *= Math.exp(-dt * 3.2)
    }
    dragYaw += (targetDragYaw - dragYaw) * 0.14
    dragPitch += (targetDragPitch - dragPitch) * 0.14

    if (pulseAge < 2.4) pulseAge += dt

    // Update studio cursor light
    const ptrWorldX = smoothMouse.x * 4.5
    const ptrWorldY = smoothMouse.y * 1.45
    cursorLight.position.set(ptrWorldX, ptrWorldY + 0.2, 2.75)
    cursorLight.intensity = hovering ? 17 : 11

    // Global monument orbit + subtle scroll inertia
    stageGroup.rotation.y = smoothMouse.x * 0.13 + dragYaw
    stageGroup.rotation.x = -smoothMouse.y * 0.08 + dragPitch + scrollVel * 0.32
    stageGroup.position.y = -scrollVel * 0.25

    // Per-letter harmonic levitation & magnetic cursor proximity lift
    if (!reduce) {
      for (let i = 0; i < letters.length; i++) {
        const l = letters[i]!
        const prox = Math.exp(-Math.pow((l.baseX - ptrWorldX) * 0.62, 2)) * hoverBlend
        l.lift += (prox * 0.22 - l.lift) * 0.1
        l.group.position.y = Math.sin(elapsed * 1.15 - l.phase) * 0.042 + l.lift * 0.25
        l.group.position.z = Math.cos(elapsed * 0.9 - l.phase) * 0.032 + l.lift
        l.group.rotation.y = (ptrWorldX - l.baseX) * -0.018 * prox
      }
      if (iTittleMesh) {
        iTittleMesh.position.y = Math.sin(elapsed * 2.2) * 0.03 + marketSurge * 0.028
      }
    }

    // Dual-phase liquidity heartbeat for X origami crystals (matches logo.svg beat)
    const beatPeriod = 1.45
    const upBeat = reduce ? 0.55 : heartbeat(elapsed / beatPeriod)
    const dnBeat = reduce ? 0.55 : heartbeat(elapsed / beatPeriod + 0.5)
    const upBoost = upBeat + (marketDir > 0 ? marketSurge * 0.55 : 0)
    const dnBoost = dnBeat + (marketDir < 0 ? marketSurge * 0.55 : 0)

    upCrystalMat.emissiveIntensity = 0.26 + upBoost * 0.56
    downCrystalMat.emissiveIntensity = 0.28 + dnBoost * 0.62
    upHalo.mat.uniforms.uIntensity!.value = 0.24 + upBoost * 0.42
    downHalo.mat.uniforms.uIntensity!.value = 0.28 + dnBoost * 0.48
    upEdgeMat.opacity = 0.34 + upBoost * 0.42
    downEdgeMat.opacity = 0.36 + dnBoost * 0.45

    // Update GPU shader uniforms
    metalUniforms.uTime.value = elapsed
    metalUniforms.uPulseTime.value = pulseAge
    metalUniforms.uPointerWorld.value.set(ptrWorldX, ptrWorldY)

    terrainMat.uniforms.uTime!.value = elapsed
    terrainMat.uniforms.uPointer!.value.copy(smoothMouse)
    terrainMat.uniforms.uHover!.value = hoverBlend
    terrainMat.uniforms.uVolatility!.value = 0.3 + marketSurge * 0.55
    terrainMat.uniforms.uPulseTime!.value = pulseAge

    sparkMat.uniforms.uTime!.value = elapsed
    sparkMat.uniforms.uPointer!.value.copy(smoothMouse)

    for (const a of arcMeshes) a.mat.uniforms.uTime!.value = elapsed

    if (!reduce) syncCandles(elapsed, marketSurge * marketDir)

    renderer.render(scene, camera)

    if (visible && !reduce && !document.hidden) {
      raf = requestAnimationFrame(renderFrame)
    } else {
      raf = 0
    }
  }

  const start = () => {
    if (!raf && visible && !reduce && !document.hidden) {
      lastNow = performance.now()
      raf = requestAnimationFrame(renderFrame)
    }
  }

  const io = new IntersectionObserver(
    (entries) => {
      visible = entries[0]?.isIntersecting ?? false
      if (visible) {
        if (reduce) renderFrame()
        else start()
      } else if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    },
    { rootMargin: '160px' }
  )
  io.observe(el)

  const onVis = () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf)
      raf = 0
    } else if (!document.hidden && visible) {
      start()
    }
  }
  document.addEventListener('visibilitychange', onVis)

  renderFrame()
  ready.value = true

  onBeforeUnmount(() => {
    disposed = true
    if (raf) cancelAnimationFrame(raf)
    io.disconnect()
    ro.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    el.removeEventListener('pointerdown', onDown)
    el.removeEventListener('pointermove', onMove)
    el.removeEventListener('pointerup', onUp)
    el.removeEventListener('pointercancel', onUp)
    el.removeEventListener('pointerleave', onLeave)

    wordGroup.traverse((o) => {
      if ((o as THREE.Mesh).geometry) (o as THREE.Mesh).geometry.dispose()
    })
    metalMat.dispose()
    downCrystalMat.dispose()
    upCrystalMat.dispose()
    edgeMat.dispose()
    downEdgeMat.dispose()
    upEdgeMat.dispose()
    downHalo.mat.dispose()
    upHalo.mat.dispose()
    brushedTex.dispose()
    terrainGeo.dispose()
    terrainMat.dispose()
    bodyGeo.dispose()
    wickGeo.dispose()
    bodyMat.dispose()
    wickMat.dispose()
    candleBodies.dispose()
    candleWicks.dispose()
    for (const a of arcMeshes) {
      a.geo.dispose()
      a.mat.dispose()
    }
    sparkGeo.dispose()
    sparkMat.dispose()
    envRT.dispose()
    pmrem.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  })
})
</script>

<template>
  <div class="wm" aria-hidden="true">
    <div ref="host" class="wm__stage" />
    <span class="wm__fallback" :class="{ hidden: ready }">ARTIX</span>
  </div>
</template>

<style scoped>
.wm {
  position: relative;
  width: 100%;
  height: clamp(185px, 25vw, 380px);
  overflow: hidden;
  user-select: none;
  touch-action: pan-y;
  cursor: grab;
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%);
}
.wm:active { cursor: grabbing; }
.wm::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(46% 74% at 62% 58%, color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 72%),
    radial-gradient(36% 64% at 44% 72%, color-mix(in oklab, var(--color-up) 10%, transparent), transparent 70%);
}
.wm__stage { position: absolute; inset: 0; }
.wm__stage :deep(canvas) { width: 100% !important; height: 100% !important; display: block; }
.wm__fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--font-sans);
  font-weight: 800;
  font-size: clamp(88px, 20vw, 260px);
  letter-spacing: 0.08em;
  color: rgb(245 247 250 / 0.92);
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.wm__fallback.hidden { opacity: 0; }
</style>
