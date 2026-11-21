import { SITE_URL } from '#shared/routes'

const OG_IMAGE = `${SITE_URL}/og/artix-capital.jpg?v=2`
const OG_ALT = 'Artix Capital — Trade forex, stocks, indices, commodities and crypto on nTrader with spreads from 0.0 pips.'
const DEFAULT_KEYWORDS =
  'Artix Capital, online forex broker, trade forex, stocks trading, indices trading, commodities trading, crypto CFD, nTrader, MetaTrader 5, 0.0 pip spreads, multi-asset trading'

export const usePageSeo = ({ title, description, keywords = DEFAULT_KEYWORDS }: { title: string; description: string; keywords?: string }) => {
  const route = useRoute()
  const url = `${SITE_URL}${route.path === '/' ? '/' : `${route.path.replace(/\/?$/, '/')}`}`
  useSeoMeta({
    title,
    description,
    keywords,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    themeColor: '#0b0c0e',
    ogType: 'website',
    ogSiteName: 'Artix Capital',
    ogLocale: 'en_US',
    ogTitle: title,
    ogDescription: description,
    ogUrl: url,
    ogImage: OG_IMAGE,
    ogImageSecureUrl: OG_IMAGE,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: OG_ALT,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: OG_IMAGE,
    twitterImageAlt: OG_ALT
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
