<script setup lang="ts">
usePageSeo({
  title: 'Generate a branded PDF | Artix Capital',
  description: 'Create an Artix Capital PDF in your browser with the company logo and formatting. Load the promotion terms or paste your own text.'
})

const TERMS_SRC = '/promotions/usdt-cashback-terms.txt'

const title = ref('2% USDT Deposit Cashback Promotion')
const text = ref('')
const busy = ref(false)
const error = ref('')
const ready = computed(() => text.value.trim().length > 0 && title.value.trim().length > 0 && !busy.value)

const loadTerms = async () => {
  error.value = ''
  try {
    const res = await fetch(TERMS_SRC)
    if (!res.ok) throw new Error(String(res.status))
    text.value = (await res.text()).trim()
  } catch {
    error.value = 'The terms could not be loaded. Paste your text in the box instead.'
  }
}

const generate = async () => {
  if (!ready.value) return
  busy.value = true
  error.value = ''
  try {
    await downloadBrandPdf(title.value, text.value)
  } catch {
    error.value = 'The PDF could not be created. Check your connection and try again.'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <main id="main">
    <PageHero
      group="Tools"
      title="Generate a branded PDF"
      lead="Create an Artix Capital PDF in your browser, with the company logo and formatting. Load the promotion terms or paste your own text, then download the file."
    />

    <PageSection id="pdf-form" title="Document" lead="Nothing is uploaded. The PDF is built on your device and downloads straight away.">
      <form class="grid gap-6" @submit.prevent="generate">
        <div class="grid gap-2">
          <label for="pdf-title" class="text-sm font-medium">Title</label>
          <input
            id="pdf-title"
            v-model="title"
            type="text"
            maxlength="120"
            class="h-12 w-full rounded-xl border border-line bg-surface px-4 text-fg outline-none transition-colors focus-visible:border-accent-soft"
          />
          <p class="text-xs text-muted">Shown at the top of the document and used for the file name.</p>
        </div>

        <div class="grid gap-2">
          <label for="pdf-body" class="text-sm font-medium">Text</label>
          <textarea
            id="pdf-body"
            v-model="text"
            rows="16"
            class="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm leading-relaxed text-fg outline-none transition-colors focus-visible:border-accent-soft"
          />
          <p class="text-xs text-muted">Lines that start with a number and a full stop, such as "1. Eligibility", are printed as headings.</p>
        </div>

        <div class="flex flex-wrap gap-3">
          <button type="submit" class="btn btn-primary h-13 px-7" :disabled="!ready">
            {{ busy ? 'Creating PDF…' : 'Generate PDF' }}
          </button>
          <button type="button" class="btn btn-ghost h-13 px-7" :disabled="busy" @click="loadTerms">Load promotion terms</button>
        </div>

        <p v-if="error" role="alert" class="text-sm text-down">{{ error }}</p>
      </form>
    </PageSection>
  </main>
</template>
