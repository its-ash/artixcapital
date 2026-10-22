<template>
  <div>
    <div class="fixed inset-0" aria-hidden="true">
      <LiquidEther
        :colors="['#0b0d14', '#2563eb', '#7dd3fc']"
        :mouse-force="20"
        :cursor-size="140"
        :resolution="0.45"
        :auto-speed="0.7"
        :auto-intensity="2.4"
      />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgb(10_11_16/0.45)_100%)]" />
    </div>
    <SiteNav />
    <NuxtPage />
    <SiteFooter />
  </div>
</template>
