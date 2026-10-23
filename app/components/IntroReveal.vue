<template>
  <section class="wrap" aria-labelledby="intro-title">
    <div class="border-t border-line py-24 md:py-36">
      <h2 id="intro-title" class="sr-only">About Artix Capital</h2>
      <p class="i-text max-w-5xl text-3xl font-medium leading-[1.2] tracking-[-0.025em] md:text-5xl">
        Artix brings you the tools, the experience and direct access to global markets on a platform built for what comes next.
        <span class="text-muted">nTrader sits at the center of it: simple enough for a first trade, deep enough for a tenth year.</span>
      </p>
      <ul class="i-pills mt-14 flex flex-wrap gap-2.5">
        <li v-for="a in ASSET_CLASSES" :key="a.label" class="i-pill">
          <span class="inline-flex h-11 items-center gap-2.5 rounded-full border border-line px-4 text-sm font-medium">
            <component :is="a.icon" :size="16" class="text-accent-soft" />{{ a.label }}
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
