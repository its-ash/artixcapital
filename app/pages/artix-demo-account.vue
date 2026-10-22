<script setup lang="ts">
// Artix Demo: friendly zero-risk hero, 3-step start walkthrough, demo vs live strip.

useSeoMeta({
  title: 'Artix Demo account | Artix Capital',
  description: 'Practise on live market prices with virtual funds. Full nTrader access, no deposit, no risk, one-click upgrade to live.'
})

const steps = [
  ['Register', 'Create a profile with an email address. No card, no deposit step.'],
  ['Open nTrader', 'Sign in on desktop, browser or phone with virtual funds loaded.'],
  ['Practise', 'Trade the live feed, review history, refine the process. Go live whenever ready.']
] as const

const compare = [
  ['Prices', 'Live market feed', 'Live market feed'],
  ['Your money at risk', 'None', 'Yes'],
  ['Emotion', 'Calm', 'Real']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pt-32 text-center md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Accounts</p>
      <h1 class="mx-auto mt-5 max-w-3xl text-5xl font-bold tracking-[-0.035em] md:text-7xl">
        Live prices.<br>Play money. <span class="grad-text">Real habits.</span>
      </h1>
      <p class="mx-auto mt-7 max-w-xl text-lg leading-8 text-muted">
        The Demo account mirrors live market conditions with virtual funds. Practise sizing, stops and discipline in nTrader, then take the workflow live without relearning anything.
      </p>
      <div class="mt-9 flex justify-center">
        <a href="https://artixcapital.com/artix-demo-account/" class="btn btn-primary h-14 px-8 text-base">Try a demo</a>
      </div>
      <p class="mt-3 font-mono text-xs text-muted">Free. No payment details.</p>
    </header>

    <section aria-labelledby="dm-steps" class="mt-16">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="dm-steps" class="sr-only">How to start</h2>
        <ol class="grid gap-4 md:grid-cols-3">
          <li v-for="(s, i) in steps" :key="s[0]" class="panel relative rounded-3xl p-7">
            <span class="font-mono text-sm text-accent-soft">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 text-xl font-bold">{{ s[0] }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted">{{ s[1] }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section aria-labelledby="dm-compare">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="dm-compare" class="text-2xl font-bold tracking-tight">Demo vs live</h2>
        <div class="panel mt-6 overflow-hidden rounded-3xl">
          <table class="w-full min-w-90 text-left text-sm">
            <thead>
              <tr class="border-b border-white/10 font-mono text-xs uppercase tracking-wider text-muted">
                <th scope="col" class="px-6 py-3.5 font-medium">Item</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Demo</th>
                <th scope="col" class="px-6 py-3.5 font-medium">Live</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="c in compare" :key="c[0]" class="border-b border-white/8 last:border-0">
                <td class="px-6 py-3.5 font-medium text-muted">{{ c[0] }}</td>
                <td class="px-6 py-3.5 text-fg">{{ c[1] }}</td>
                <td class="px-6 py-3.5 text-muted">{{ c[2] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="mt-4 text-xs text-muted">Demo fills use indicative pricing. Live execution may differ slightly on fast markets.</p>
      </div>
    </section>
  </main>
</template>