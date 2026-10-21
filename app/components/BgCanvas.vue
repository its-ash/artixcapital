<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const RES = 0.33
const FRAME_MS = 1000 / 30
const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform float s;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<4;i++){v+=a*n(p);p=R*p*2.02;a*=.5;}return v;}
void main(){
vec2 uv=gl_FragCoord.xy/r;
vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);
p+=(m-.5)*.18;p.y+=s*.9;
float T=t*.035;
vec2 q=vec2(fbm(p*1.3+T),fbm(p*1.3+vec2(5.2,1.3)-T));
vec2 w=vec2(fbm(p*1.5+3.*q+vec2(1.7,9.2)+T*1.4),fbm(p*1.5+3.*q+vec2(8.3,2.8)-T));
float f=fbm(p*1.1+2.6*w);
vec3 col=vec3(.059,.059,.082);
col=mix(col,vec3(.1,.14,.38),smoothstep(.22,.82,f)*.9);
col=mix(col,vec3(.318,.518,1.),smoothstep(.5,1.,f*length(w)*1.3)*.55);
col=mix(col,vec3(1.,.478,.918),smoothstep(.6,1.05,q.y*f*1.8)*.2);
float d=length((uv-m)*vec2(r.x/r.y,1.));
col+=vec3(.318,.518,1.)*.09*exp(-d*d*6.);
col*=1.-.35*smoothstep(.0,1.,s);
gl_FragColor=vec4(col,1.);
}`

const cvs = ref<HTMLCanvasElement | null>(null)
const failed = ref(false)
let stop = () => {}

const compile = (gl: WebGLRenderingContext, type: number, src: string) => {
  const sh = gl.createShader(type)
  if (!sh) return null
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null
}

onMounted(() => {
  const c = cvs.value
  const gl = c?.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' })
  const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG)
  const prog = gl?.createProgram()
  if (!c || !gl || !vs || !fs || !prog) {
    failed.value = true
    return
  }
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    failed.value = true
    return
  }
  gl.useProgram(prog)
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const loc = gl.getAttribLocation(prog, 'p')
  gl.enableVertexAttribArray(loc)
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
  const u = { r: gl.getUniformLocation(prog, 'r'), t: gl.getUniformLocation(prog, 't'), m: gl.getUniformLocation(prog, 'm'), s: gl.getUniformLocation(prog, 's') }

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const mouse = { x: 0.5, y: 0.6, tx: 0.5, ty: 0.6 }
  let scroll = 0
  let raf = 0
  let prev = 0
  const t0 = performance.now()

  const resize = () => {
    c.width = Math.ceil(innerWidth * RES)
    c.height = Math.ceil(innerHeight * RES)
    gl.viewport(0, 0, c.width, c.height)
    gl.uniform2f(u.r, c.width, c.height)
  }
  const draw = (now: number) => {
    mouse.x += (mouse.tx - mouse.x) * 0.05
    mouse.y += (mouse.ty - mouse.y) * 0.05
    gl.uniform1f(u.t, reduce ? 12 : (now - t0) / 1000)
    gl.uniform2f(u.m, mouse.x, mouse.y)
    gl.uniform1f(u.s, scroll)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop)
    if (document.hidden || now - prev < FRAME_MS) return
    prev = now
    draw(now)
  }
  const onMove = (e: PointerEvent) => {
    mouse.tx = e.clientX / innerWidth
    mouse.ty = 1 - e.clientY / innerHeight
  }

  resize()
  addEventListener('resize', resize)
  const trig = ScrollTrigger.create({ start: 0, end: 'max', onUpdate: self => { scroll = self.progress; if (reduce) draw(0) } })
  if (reduce) draw(0)
  else {
    addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
  }

  stop = () => {
    cancelAnimationFrame(raf)
    removeEventListener('resize', resize)
    removeEventListener('pointermove', onMove)
    trig.kill()
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
})

onBeforeUnmount(() => stop())
</script>

<template>
  <div class="bg-stage pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <canvas ref="cvs" class="absolute inset-0 size-full" />
    <div v-if="failed" class="bg-fallback absolute inset-0" />
    <div class="bg-grid absolute inset-0" />
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(10_10_16/0.7)_100%)]" />
    <div class="grain" />
  </div>
</template>

<style scoped>
.bg-stage { background: var(--color-canvas); }
.bg-fallback {
  background:
    radial-gradient(40% 50% at 15% 10%, rgb(81 132 255 / 0.35), transparent 70%),
    radial-gradient(35% 45% at 90% 25%, rgb(40 60 160 / 0.45), transparent 70%),
    radial-gradient(30% 40% at 50% 100%, rgb(255 122 234 / 0.14), transparent 70%);
}
.bg-grid {
  background-image: linear-gradient(rgb(255 255 255 / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.045) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse at 50% 20%, #000 20%, transparent 70%);
}
</style>
