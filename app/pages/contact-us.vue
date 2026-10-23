<script setup lang="ts">
import { PhArrowRight, PhClock, PhEnvelopeSimple, PhMapPin, PhPhone } from '@phosphor-icons/vue'

useSeoMeta({
  title: 'Contact us | Artix Capital',
  description: 'Reach the Artix Capital support desk: +44 7822 018441 and support@artixcapital.com, staffed 24 hours a day, five days a week.'
})

const tel = (s: string) => s.replace(/[^\d+]/g, '')

const topics = [
  ['Verification help', 'Document checks, KYC retries, approval status.'],
  ['Payments', 'Deposits, withdrawals, provider questions.'],
  ['Trading conditions', 'Spreads, commissions, symbols, sessions.'],
  ['Platform access', 'Logins, terminals, MT5 credentials.']
] as const

const channels = [
  { icon: PhPhone, label: 'Phone, desk answers directly', value: PHONE, href: `tel:${tel(PHONE)}`, mono: true },
  { icon: PhEnvelopeSimple, label: 'Email, same-day replies', value: EMAIL, href: `mailto:${EMAIL}`, mono: true },
  { icon: PhMapPin, label: 'Registered office', value: OFFICE },
  { icon: PhClock, label: 'Hours', value: '24 hours, five days' }
]
</script>

<template>
  <main id="main">
    <PageHero
      group="Company"
      title="Talk to a real person"
      lead="No bots, no ticket maze. Questions about accounts, verification, payments or trading conditions get direct answers from the desk, through every session."
    >
      <a :href="`mailto:${EMAIL}`" class="btn btn-primary h-13 px-7">
        Email the desk
        <span class="btn-icon" aria-hidden="true"><PhArrowRight :size="18" weight="bold" /><PhArrowRight :size="18" weight="bold" /></span>
      </a>
      <a :href="`tel:${tel(PHONE)}`" class="btn btn-ghost h-13 px-7">Call now</a>
      <template #aside>
        <ul class="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          <li v-for="c in channels" :key="c.label" class="flex items-center gap-4 bg-surface px-6 py-5">
            <component :is="c.icon" :size="22" class="shrink-0 text-accent-soft" aria-hidden="true" />
            <span class="min-w-0">
              <span class="block text-xs text-muted">{{ c.label }}</span>
              <a v-if="c.href" :href="c.href" class="block truncate text-lg transition-colors hover:text-accent-soft" :class="c.mono ? 'font-mono' : ''">{{ c.value }}</a>
              <span v-else class="block text-lg">{{ c.value }}</span>
            </span>
          </li>
        </ul>
      </template>
    </PageHero>

    <PageSection id="ct-card" title="Most questions resolve on first contact">
      <PageFeatures :items="topics" :cols="2" />
    </PageSection>
  </main>
</template>
