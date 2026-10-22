<script setup lang="ts">
// Introducing Broker: wide benefit grid, program table, earn loop explainer.

useSeoMeta({
  title: 'Introducing broker program | Artix Capital',
  description: 'Turn your network into revenue: competitive per-lot commissions, real-time referral reporting, marketing materials and a dedicated partner team.'
})

const benefits = [
  ['Trusted brand', 'A globally recognized broker built on credibility and industry reputation.'],
  ['High earnings', 'Competitive commissions and tiered rewards that grow with your client base.'],
  ['Marketing tools', 'Campaigns, landing assets and professional materials to attract clients.'],
  ['Seamless tracking', 'Transparent reporting on every referral and commission.'],
  ['Dedicated support', 'A partner team focused on helping you scale.'],
  ['Global reach', 'Multiple markets, diverse instruments and worldwide opportunity.']
] as const

const loop = [
  ['Refer', 'Share your link or materials with traders who need a broker.'],
  ['They trade', 'Clients open accounts, fund up, and trade on nTrader.'],
  ['You earn', 'Commission accrues per lot on qualifying trades, credited to your partner account.']
] as const

const program = [
  ['Commission basis', 'Per lot, per side, by instrument'],
  ['Tiers', 'Volume-based growth tiers'],
  ['Reporting', 'Clients, volume and earnings dashboard'],
  ['Materials', 'Campaigns, banners, landing assets'],
  ['Tracking', 'Referral links with client attribution'],
  ['Support', 'Dedicated partner helpdesk']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap pt-32 pb-12 md:pt-40">
      <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Partners</p>
      <div class="mt-6 grid gap-8 md:grid-cols-12">
        <h1 class="max-w-2xl text-4xl font-bold tracking-[-0.03em] md:col-span-7 md:text-6xl">
          Partner. Earn. Succeed.
        </h1>
        <div class="md:col-span-5 md:pt-2">
          <p class="text-lg leading-8 text-muted">
            Turn your audience, network or firm into a revenue stream on every lot your traders execute. Full sales support, real reporting, no ceiling.
          </p>
          <a href="https://artixcapital.com/introducing-broker/" class="btn btn-primary mt-7 h-13 px-7">Become a partner</a>
        </div>
      </div>
    </header>

    <section aria-labelledby="ib-benefits">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ib-benefits" class="text-2xl font-bold tracking-tight">Six dynamic advantages</h2>
        <div class="panel mt-6 max-w-3xl overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(b, i) in benefits" :key="b[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-56 px-6 py-4 font-medium text-muted">{{ b[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ b[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="ib-loop" class="relative">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ib-loop" class="text-2xl font-bold tracking-tight">How the earning loop runs</h2>
        <ol class="mt-10 grid gap-4 md:grid-cols-3">
          <li v-for="(s, i) in loop" :key="s[0]" class="panel relative rounded-3xl p-7">
            <span class="font-mono text-sm text-accent-soft">{{ String(i + 1).padStart(2, '0') }}</span>
            <h3 class="mt-3 text-xl font-bold">{{ s[0] }}</h3>
            <p class="mt-2 text-sm leading-6 text-muted">{{ s[1] }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section aria-labelledby="ib-program">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="ib-program" class="text-2xl font-bold tracking-tight">Program details</h2>
        <div class="mt-6 grid max-w-4xl gap-x-10 gap-y-5 sm:grid-cols-2">
          <div v-for="p in program" :key="p[0]" class="flex items-baseline justify-between gap-6 border-b border-white/8 pb-3">
            <span class="text-sm text-muted">{{ p[0] }}</span>
            <span class="whitespace-nowrap text-right text-sm text-fg">{{ p[1] }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>