import { SITE_URL } from '#shared/routes'

const OG_IMAGE = `${SITE_URL}/og.png`

export const usePageSeo = ({ title, description }: { title: string; description: string }) => {
  const route = useRoute()
  const url = `${SITE_URL}${route.path === '/' ? '/' : `${route.path.replace(/\/?$/, '/')}`}`
  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: OG_IMAGE,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: 'Artix Capital',
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: OG_IMAGE
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
