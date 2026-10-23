<script setup lang="ts">
const SYMBOLS = ['EURUSD', 'GBPUSD', 'USDJPY', 'XAUUSD', 'XTIUSD', 'US500', 'USTEC', 'DE40', 'AAPL', 'NVDA', 'TSLA', 'BTCUSD', 'ETHUSD'] as const
</script>

<template>
  <section class="border-y border-widget-line bg-elevated" aria-label="Market prices">
    <div class="wrap">
      <Mql5Widget type="ticker" :symbols="SYMBOLS" :height="50" />
    </div>
  </section>
</template>
