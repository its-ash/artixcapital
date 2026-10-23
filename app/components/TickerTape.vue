<script setup lang="ts">
const SYMBOLS = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'XTIUSD', 'US500', 'USTEC', 'DE40', 'AAPL', 'NVDA', 'TSLA', 'BTCUSD', 'ETHUSD'] as const
const COPY_PX = 1900
</script>

<template>
  <section class="tt relative overflow-hidden border-y border-line" aria-label="Market prices">
    <div class="tt-track flex w-max bg-canvas">
      <Mql5Widget type="ticker" :symbols="SYMBOLS" :height="50" class="shrink-0" :style="{ width: `${COPY_PX}px` }" />
      <div class="tt-dup shrink-0" aria-hidden="true" inert>
        <Mql5Widget type="ticker" :symbols="SYMBOLS" :height="50" :style="{ width: `${COPY_PX}px` }" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.tt { mask: linear-gradient(90deg, transparent, #000 4rem, #000 calc(100% - 4rem), transparent); }
.tt-track { animation: tt-move 70s linear infinite; will-change: transform; }

@keyframes tt-move { to { transform: translateX(-50%); } }

@media (hover: hover) and (pointer: fine) {
  .tt:hover .tt-track { animation-play-state: paused; }
}

@media (prefers-reduced-motion: reduce) {
  .tt { overflow-x: auto; mask: none; }
  .tt-track { animation: none; }
  .tt-dup { display: none; }
}
</style>
