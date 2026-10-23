export const useJsonLd = (key: string, data: Record<string, unknown>) =>
  useHead({ script: [{ key, type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }) }] })

export const useFaqLd = (items: readonly (readonly [string, string])[]) =>
  useJsonLd('ld-faq', {
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  })
