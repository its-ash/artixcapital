<script setup lang="ts">
usePageSeo({
  title: 'Promotions | Artix Capital',
  description: 'Current promotions from Artix Capital. Compare cashback rates and caps, then open a promotion for its calculator and full terms.'
})
</script>

<template>
  <main id="main">
    <PageHero
      group="Promotions"
      title="Current promotions."
      lead="Compare what is on offer, then open a promotion to see its rate, calculator and full terms."
    />

    <PageSection id="pr-list" title="Open promotions" lead="Select a promotion to see its details.">
      <ul class="grid gap-4 md:grid-cols-2">
        <li v-for="p in PROMOTIONS" :key="p.id">
          <NuxtLink
            :to="`/promotion/${p.id}/`"
            class="card group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent-soft md:p-8"
          >
            <p class="text-sm text-muted">Cashback on {{ p.asset }} deposits</p>
            <h2 class="mt-4 text-4xl font-semibold leading-[1.05] tracking-tighter md:text-5xl">{{ p.heroTitle }}</h2>
            <p class="mt-4 text-base leading-relaxed text-muted">{{ p.lead }}</p>
            <dl class="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
              <div>
                <dt class="text-muted">Per-client cap</dt>
                <dd class="mt-1 font-mono tabular-nums">USD {{ p.cap.toLocaleString('en-US') }}</dd>
              </div>
              <div>
                <dt class="text-muted">Campaign budget</dt>
                <dd class="mt-1 font-mono tabular-nums">USD {{ p.budget.toLocaleString('en-US') }}</dd>
              </div>
            </dl>
            <span class="mt-auto pt-8 text-sm font-medium text-fg transition-colors group-hover:text-accent-soft">View details →</span>
          </NuxtLink>
        </li>
      </ul>
    </PageSection>

    <PageCta />
  </main>
</template>
