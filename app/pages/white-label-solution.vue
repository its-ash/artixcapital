<script setup lang="ts">
// White label: launch-path hero, ecosystem ledger table, launch steps.

useSeoMeta({
  title: 'White label solution | Artix Capital',
  description: 'Launch your own brokerage: fully branded nTrader, tier-1 liquidity, flexible commissions and compliance support, live in weeks.'
})

const included = [
  ['Platform', 'nTrader, fully branded desktop, web and mobile'],
  ['Instruments', 'FX, metals, indices, commodities, equities, crypto'],
  ['Liquidity', 'Aggregated top-tier institutional providers'],
  ['Risk tools', 'Admin terminal and exposure controls included'],
  ['Onboarding', 'Deployment plus KYC and AML guidance'],
  ['Helpdesk', '24/5 operational support for your team']
] as const

const steps = [
  ['Connect with us', 'Submit your request for a demo and onboarding guidance.'],
  ['Sign the contract', 'Formalize the partnership with a clear, transparent agreement.'],
  ['Brand and launch', 'Send branding materials, launch your platform within a week.']
] as const
</script>

<template>
  <main id="main" class="relative">
    <header class="wrap grid min-h-[58svh] items-center gap-10 pt-32 pb-12 md:grid-cols-12 md:pt-40">
      <div class="md:col-span-7">
        <p class="font-mono text-xs uppercase tracking-[0.2em] text-accent-soft">Partners</p>
        <h1 class="mt-4 text-4xl font-bold tracking-[-0.03em] md:text-6xl">Your brokerage,<br>on our rails</h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
          A fully branded nTrader, institutional liquidity, multi-asset trading and a support desk behind it. Launch in weeks and scale on infrastructure that already works.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="https://artixcapital.com/white-label-solution/" class="btn btn-primary h-13 px-7">Request a consultation</a>
        </div>
      </div>
      <div class="md:col-span-5">
        <div class="panel rotate-1 rounded-3xl p-7">
          <h2 class="font-mono text-xs uppercase tracking-[0.2em] text-muted">Launch timeline</h2>
          <ol class="mt-4 grid gap-3 text-sm">
            <li v-for="(s, i) in steps" :key="s[0]" class="flex gap-4">
              <span class="font-mono text-accent-soft">{{ String(i + 1).padStart(2, '0') }}</span>
              <span>
                <strong class="block font-bold text-fg">{{ s[0] }}</strong>
                <span class="text-muted">{{ s[1] }}</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </header>

    <section aria-labelledby="wl-included">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <h2 id="wl-included" class="text-2xl font-bold tracking-tight">Everything a brokerage runs on</h2>
        <div class="panel mt-6 overflow-hidden rounded-3xl">
          <table class="w-full text-left text-sm">
            <tbody>
              <tr v-for="(r, i) in included" :key="r[0]" :class="i ? 'border-t border-white/8' : ''">
                <th scope="row" class="w-44 px-6 py-4 font-medium text-muted">{{ r[0] }}</th>
                <td class="px-6 py-4 text-fg">{{ r[1] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section aria-labelledby="wl-why">
      <div class="wrap border-t border-white/8 py-14 md:py-16">
        <div class="grid gap-8 md:grid-cols-12">
          <h2 class="text-2xl font-bold tracking-tight md:col-span-4">Why partners pick us</h2>
          <div class="max-w-[60ch] text-lg leading-8 text-muted md:col-span-8">
            <p>One contract instead of five vendors. A platform that carries your identity on every screen, liquidity that arrives connected, and operational help that treats your launch like ours.</p>
            <p class="mt-4">You run the brand. We keep the rails running.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>