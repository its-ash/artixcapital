<script setup lang="ts">
import { PhArrowCounterClockwise, PhCheck, PhPalette, PhX } from '@phosphor-icons/vue'

const open = ref(false)
const current = ref(ACCENT_DEFAULT)
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)

const save = (hex: string) => {
  if (!isHex(hex)) return
  current.value = applyAccent(hex).accent
  try {
    hex.toLowerCase() === ACCENT_DEFAULT ? localStorage.removeItem(ACCENT_KEY) : localStorage.setItem(ACCENT_KEY, current.value)
  } catch {}
}

const onInput = (e: Event) => save((e.target as HTMLInputElement).value)
const close = () => {
  open.value = false
  trigger.value?.focus()
}
const onKey = (e: KeyboardEvent) => e.key === 'Escape' && open.value && close()
const onDoc = (e: PointerEvent) => {
  if (open.value && !root.value?.contains(e.target as Node)) open.value = false
}

onMounted(() => {
  const css = getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
  if (isHex(css)) current.value = css.toLowerCase()
  addEventListener('keydown', onKey)
  document.addEventListener('pointerdown', onDoc)
})
onBeforeUnmount(() => {
  removeEventListener('keydown', onKey)
  document.removeEventListener('pointerdown', onDoc)
})
</script>

<template>
  <div ref="root" class="fixed bottom-20 left-4 z-40 md:bottom-6 md:left-6">
    <div
      id="theme-panel"
      class="picker absolute bottom-full left-0 mb-3 w-64 rounded-2xl border border-line bg-surface p-4 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.8)]"
      :data-open="open"
      :inert="!open"
      role="dialog"
      aria-label="Accent colour"
    >
      <div class="flex items-center justify-between">
        <p class="text-sm font-medium">Accent colour</p>
        <button type="button" class="grid size-8 place-items-center rounded-full text-muted transition-colors hover:text-fg" aria-label="Close" @click="close">
          <PhX :size="14" />
        </button>
      </div>
      <ul class="mt-3 grid grid-cols-6 gap-2">
        <li v-for="p in ACCENT_PRESETS" :key="p.hex">
          <button
            type="button"
            class="grid size-8 place-items-center rounded-full ring-offset-2 ring-offset-surface transition-[scale] duration-150 active:scale-95"
            :class="current === p.hex ? 'ring-2 ring-fg' : ''"
            :style="{ background: p.hex, color: accentTokens(p.hex).on }"
            :aria-label="p.name"
            :aria-pressed="current === p.hex"
            @click="save(p.hex)"
          >
            <PhCheck v-if="current === p.hex" :size="14" weight="bold" />
          </button>
        </li>
      </ul>
      <label class="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line px-3 py-2 text-sm">
        <span>Custom</span>
        <span class="flex items-center gap-2 font-mono text-xs text-muted">
          {{ current }}
          <input type="color" :value="current" class="size-7 cursor-pointer rounded-md border-0 bg-transparent p-0" aria-label="Pick a custom accent colour" @input="onInput">
        </span>
      </label>
      <button type="button" class="mt-3 inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-fg" @click="save(ACCENT_DEFAULT)">
        <PhArrowCounterClockwise :size="12" /> Reset to brand red
      </button>
    </div>

    <button
      ref="trigger"
      type="button"
      class="grid size-12 place-items-center rounded-full border border-line-strong bg-surface text-fg shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)] transition-[scale,border-color] duration-150 hover:border-accent-soft active:scale-95"
      aria-controls="theme-panel"
      :aria-expanded="open"
      aria-label="Change accent colour"
      @click="open = !open"
    >
      <PhPalette :size="20" class="text-accent-soft" />
    </button>
  </div>
</template>

<style scoped>
.picker {
  opacity: 0; visibility: hidden; transform: translateY(6px) scale(0.97); transform-origin: bottom left;
  transition: opacity 160ms ease, transform 200ms var(--ease-out-strong), visibility 0s 200ms;
}
.picker[data-open="true"] { opacity: 1; visibility: visible; transform: none; transition-delay: 0s; }
@media (prefers-reduced-motion: reduce) {
  .picker { transform: none; }
}
</style>
