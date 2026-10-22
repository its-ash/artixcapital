<script setup lang="ts">
// Contact: two-column layout, details card right with icon rows.

import { PhArrowRight, PhClock, PhEnvelopeSimple, PhMapPin, PhPhone } from '@phosphor-icons/vue'
import { EMAIL, OFFICE, PHONE } from '~/utils/site'

useSeoMeta({
  title: 'Contact us | Artix Capital',
  description: 'Reach the Artix Capital support desk: +44 7822 018441 and support@artixcapital.com, staffed 24 hours a day, five days a week.'
})

const tel = (s: string) => s.replace(/[^\d+]/g, '')
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pt-32 pb-12 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Company</p>
      <h1 class="mt-4 max-w-3xl text-4xl font-bold tracking-[-0.03em] md:text-6xl">Talk to a real person</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-muted">
        No bots, no ticket maze. Questions about accounts, verification, payments or trading conditions get direct answers from the desk, through every session.
      </p>
    </header>

    <section aria-labelledby="ct-card">
      <div class="wrap grid items-start gap-8 pb-14 md:grid-cols-12 md:pb-16">
        <div class="md:col-span-6 lg:col-span-5">
          <h2 id="ct-card" class="text-2xl font-bold tracking-tight">Most questions resolve on first contact</h2>
          <ul class="mt-7 grid content-start gap-3 text-sm">
            <li v-for="t in [
              ['Verification help', 'Document checks, KYC retries, approval status.'],
              ['Payments', 'Deposits, withdrawals, provider questions.'],
              ['Trading conditions', 'Spreads, commissions, symbols, sessions.'],
              ['Platform access', 'Logins, terminals, MT5 credentials.']
            ] as const" :key="t[0]" class="flex items-start gap-3">
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span><strong class="font-bold text-fg">{{ t[0] }}.</strong> <span class="text-muted">{{ t[1] }}</span></span>
            </li>
          </ul>
        </div>

        <div class="panel rounded-3xl p-8 md:col-span-6 lg:col-span-7">
          <h2 class="sr-only">Contact details card</h2>
          <ul class="grid content-start gap-6 text-sm">
            <li class="flex items-center gap-4">
              <span class="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/4 text-accent-soft" aria-hidden="true">
                <PhPhone :size="22" />
              </span>
              <span class="min-w-0">
                <span class="block text-xs text-muted">Phone, desk answers directly</span>
                <a :href="`tel:${tel(PHONE)}`" class="block font-mono text-lg text-fg transition-colors hover:text-accent-soft">{{ PHONE }}</a>
              </span>
            </li>
            <li class="flex items-center gap-4">
              <span class="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/4 text-accent-soft" aria-hidden="true">
                <PhEnvelopeSimple :size="22" />
              </span>
              <span class="min-w-0">
                <span class="block text-xs text-muted">Email, same-day replies</span>
                <a :href="`mailto:${EMAIL}`" class="block font-mono text-lg text-fg transition-colors hover:text-accent-soft">{{ EMAIL }}</a>
              </span>
            </li>
            <li class="flex items-center gap-4">
              <span class="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/4 text-accent-soft" aria-hidden="true">
                <PhMapPin :size="22" />
              </span>
              <span class="min-w-0">
                <span class="block text-xs text-muted">Registered office</span>
                <span class="block text-lg text-fg">{{ OFFICE }}</span>
              </span>
            </li>
            <li class="flex items-center gap-4">
              <span class="grid size-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/4 text-accent-soft" aria-hidden="true">
                <PhClock :size="22" />
              </span>
              <span class="min-w-0">
                <span class="block text-xs text-muted">Hours</span>
                <span class="block font-mono text-lg text-fg">24 hours, five days</span>
              </span>
            </li>
          </ul>
          <div class="mt-8 flex flex-wrap gap-3 border-t border-white/8 pt-7">
            <a :href="`mailto:${EMAIL}`" class="btn btn-primary h-12 px-6">
              Email the desk
              <PhArrowRight :size="16" weight="bold" />
            </a>
            <a :href="`tel:${tel(PHONE)}`" class="btn btn-ghost h-12 px-6">Call now</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>