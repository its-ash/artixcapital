<script setup lang="ts">
import { PhDownloadSimple, PhGift, PhHouse, PhSignIn } from '@phosphor-icons/vue'

const TABS = [
  { label: 'Home', href: '/#top', icon: PhHouse, anim: 'tb-bob' },
  { label: 'Promotions', href: '/promotion/', icon: PhGift, anim: 'tb-wiggle' },
  { label: 'Download', href: '/meta-trader-5/', icon: PhDownloadSimple, anim: 'tb-drop' },
  { label: 'Login', href: LOGIN, icon: PhSignIn, anim: 'tb-nudge' }
]
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="Quick links">
    <ul class="grid grid-cols-4">
      <li v-for="t in TABS" :key="t.label">
        <a :href="t.href" class="tb-link flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted transition-colors duration-200 active:text-fg">
          <component :is="t.icon" :size="20" weight="bold" class="tb-ico text-accent-soft" :class="t.anim" aria-hidden="true" />
          {{ t.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.tb-ico { transform-origin: 50% 80%; transition: transform 260ms var(--ease-out-expo); }
.tb-link:active .tb-ico { scale: 0.9; transition-duration: 120ms; }

.tb-link:active .tb-bob,
.tb-link:hover .tb-bob { animation: tb-bob 900ms var(--ease-out-expo) 1; }
.tb-link:active .tb-wiggle,
.tb-link:hover .tb-wiggle { animation: tb-wiggle 700ms var(--ease-out-expo) 1; }
.tb-link:active .tb-drop,
.tb-link:hover .tb-drop { animation: tb-drop 700ms var(--ease-out-expo) 1; }
.tb-link:active .tb-nudge,
.tb-link:hover .tb-nudge { animation: tb-nudge 500ms var(--ease-out-expo) 1; }

@keyframes tb-bob {
  0%, 100% { transform: translateY(0); }
  35% { transform: translateY(-4px); }
  70% { transform: translateY(1px); }
}
@keyframes tb-wiggle {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(-12deg); }
  50% { transform: rotate(10deg); }
  75% { transform: rotate(-5deg); }
}
@keyframes tb-drop {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(3px); }
}
@keyframes tb-nudge {
  0%, 100% { transform: translateX(0); }
  40% { transform: translateX(3px); }
}

@media (prefers-reduced-motion: reduce) {
  .tb-ico, .tb-link:active .tb-ico { transition: none; scale: none; }
  .tb-link .tb-ico { animation: none !important; }
}
</style>
