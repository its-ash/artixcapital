<script setup lang="ts">
import { PhDownloadSimple, PhGift, PhHouse, PhSignIn } from '@phosphor-icons/vue'

const TABS = [
  { label: 'Home', href: '/#top', icon: PhHouse },
  { label: 'Promotions', href: '/promotion/', icon: PhGift },
  { label: 'Download', href: '/meta-trader-5/', icon: PhDownloadSimple },
  { label: 'Login', href: LOGIN, icon: PhSignIn }
]
</script>

<template>
  <nav class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] md:hidden" aria-label="Quick links">
    <ul class="grid grid-cols-4">
      <li v-for="t in TABS" :key="t.label">
        <a :href="t.href" class="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium text-muted transition-colors duration-200 active:text-fg">
          <component :is="t.icon" :size="20" weight="duotone" class="text-accent-soft" aria-hidden="true" />
          {{ t.label }}
        </a>
      </li>
    </ul>
  </nav>
</template>
