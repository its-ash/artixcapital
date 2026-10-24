import type { Component } from 'vue'
import {
  PhAndroidLogo, PhAppleLogo, PhWindowsLogo,
  PhArrowsLeftRight, PhBarbell, PhBrowser, PhBuildings, PhCalendarBlank, PhChartBar, PhChartLineUp, PhClockCountdown,
  PhCoins, PhCrown, PhCube, PhGift, PhCurrencyBtc, PhDesktop, PhDeviceMobile, PhFlask, PhHandshake,
  PhHourglassMedium, PhIdentificationCard, PhInfo, PhLightning, PhPaperPlaneTilt, PhRocketLaunch,
  PhShieldCheck, PhStack, PhTable, PhUserPlus
} from '@phosphor-icons/vue'

export const SITE = 'https://artixcapital.com'
export const PORTAL = 'https://my.artixcapital.com'
export const SIGNUP = `${PORTAL}/#/client/signup`
export const LOGIN = `${PORTAL}/#/login`
export const PHONE = '+44 7822 018441'
export const EMAIL = 'support@artixcapital.com'
export const COMPANY = 'Artix Capital Ltd'
export const REG_NO = '2023-00122'
export const OFFICE = 'Unit 1, La Place Creole Building, Rodney Village, Rodney Bay, Gros-Islet, Saint Lucia'
export const RESTRICTED: { name: string; code: string }[] = [
  { name: 'the United States', code: 'us' },
  { name: 'Cuba', code: 'cu' },
  { name: 'Iraq', code: 'iq' },
  { name: 'Myanmar', code: 'mm' },
  { name: 'North Korea', code: 'kp' },
  { name: 'Sudan', code: 'sd' },
  { name: 'the United Arab Emirates', code: 'ae' },
  { name: 'India', code: 'in' }
]
export const RESTRICTED_LIST = `${RESTRICTED.slice(0, -1).map(r => r.name).join(', ')} and ${RESTRICTED.at(-1)?.name}`

const page = (slug: string) => `/${slug}/`

export type NavItem = { label: string; href: string; desc: string; icon: Component }
export type NavGroup = { label: string; items: NavItem[] }

export const NAV: NavGroup[] = [
  {
    label: 'Markets',
    items: [
      { label: 'Forex', href: page('forex-trading'), desc: 'Major and minor currency pairs', icon: PhArrowsLeftRight },
      { label: 'Commodities', href: page('commodities-trading'), desc: 'Metals and energy', icon: PhBarbell },
      { label: 'Stocks', href: page('stocks-trading'), desc: 'Global company shares', icon: PhBuildings },
      { label: 'Indices', href: page('indices-trading'), desc: 'Benchmark market indices', icon: PhChartBar },
      { label: 'Crypto', href: page('crypto-trading'), desc: 'Major digital assets', icon: PhCurrencyBtc },
      { label: 'Futures', href: page('futures-trading'), desc: 'Energy, metal and index futures', icon: PhClockCountdown }
    ]
  },
  {
    label: 'Platforms',
    items: [
      { label: 'MetaTrader 5', href: page('meta-trader-5'), desc: 'The industry-standard terminal', icon: PhStack },
      { label: 'MetaTrader 5 for Mobile', href: page('meta-trader-5-mobile'), desc: 'iPhone, iPad and Android', icon: PhDeviceMobile },
      { label: 'nTrader for Windows', href: page('ntrader-for-windows'), desc: 'Full desktop workstation', icon: PhDesktop },
      { label: 'nTrader for Mobile', href: page('ntrader-for-mobile'), desc: 'Trade from your phone', icon: PhDeviceMobile }
    ]
  },
  {
    label: 'Accounts',
    items: [
      { label: 'Artix Core', href: page('artix-core'), desc: 'From $500, no FX commission', icon: PhCube },
      { label: 'Artix Edge', href: page('artix-edge'), desc: 'Zero spreads for active traders', icon: PhLightning },
      { label: 'Artix Elite', href: page('artix-elite'), desc: 'Lowest commission tier', icon: PhCrown },
      { label: 'Artix Coverage', href: page('artix-coverage-account'), desc: 'Built for capital preservation', icon: PhShieldCheck },
      { label: 'Artix Demo', href: page('artix-demo-account'), desc: 'Practise with virtual funds', icon: PhFlask },
      { label: 'Promotion', href: page('promotion'), desc: '2% USDT deposit cashback', icon: PhGift }
    ]
  },
  {
    label: 'Partners',
    items: [
      { label: 'Introducing Broker', href: page('introducing-broker'), desc: 'Earn by referring clients', icon: PhHandshake },
      { label: 'White Label', href: page('white-label-solution'), desc: 'Launch your own brokerage', icon: PhRocketLaunch }
    ]
  },
  {
    label: 'Trading',
    items: [
      { label: 'Economic Calendar', href: page('economic-calendar'), desc: 'Events that move markets', icon: PhCalendarBlank },
      { label: 'Spread Table', href: page('spread-table'), desc: 'Typical spreads by symbol', icon: PhTable },
      { label: 'Futures Expiry Dates', href: page('expiry-dates-of-futures-contracts'), desc: 'Contract rollover schedule', icon: PhHourglassMedium }
    ]
  },
  {
    label: 'Company',
    items: [
      { label: 'About', href: page('about'), desc: 'Who we are', icon: PhInfo },
      { label: 'Contact Us', href: page('contact-us'), desc: 'Talk to a real person, 24/5', icon: PhPaperPlaneTilt }
    ]
  }
]

export type Market = { id: string; name: string; desc: string; sym: string; popular: string[]; href: string; icon: Component; tint: string; hue: string }

export const MARKETS: Market[] = [
  { id: 'forex', name: 'Forex', desc: 'Major and minor currency pairs priced continuously across every session.', sym: 'EUR/USD', popular: ['EUR/USD', 'GBP/USD', 'USD/JPY'], href: page('forex-trading'), icon: PhArrowsLeftRight, tint: '20% 0%', hue: '#c41e2a' },
  { id: 'commodities', name: 'Commodities', desc: 'Metals and energy benchmarks that follow global supply and demand.', sym: 'XAU/USD', popular: ['XAU/USD', 'XAG/USD', 'WTI'], href: page('commodities-trading'), icon: PhBarbell, tint: '90% 10%', hue: '#d8535f' },
  { id: 'stocks', name: 'Stocks', desc: 'Equity CFDs on companies that anchor the global indices.', sym: 'AAPL', popular: ['AAPL', 'NVDA', 'TSLA'], href: page('stocks-trading'), icon: PhBuildings, tint: '10% 100%', hue: '#7d8da8' },
  { id: 'indices', name: 'Indices', desc: 'Benchmark index CFDs tracking whole economies in one position.', sym: 'US500', popular: ['US500', 'NAS100', 'GER40'], href: page('indices-trading'), icon: PhChartBar, tint: '100% 90%', hue: '#c41e2a' },
  { id: 'crypto', name: 'Crypto', desc: 'Major digital assets, quoted against the US dollar around the clock.', sym: 'BTC/USD', popular: ['BTC/USD', 'ETH/USD'], href: page('crypto-trading'), icon: PhCurrencyBtc, tint: '50% 0%', hue: '#a8b4c9' }
]

export const ASSET_CLASSES: { label: string; icon: Component; hue: string }[] = [
  { label: 'Forex', icon: PhArrowsLeftRight, hue: '#c41e2a' },
  { label: 'Stocks', icon: PhBuildings, hue: '#7d8da8' },
  { label: 'Indices', icon: PhChartBar, hue: '#c41e2a' },
  { label: 'Commodities', icon: PhBarbell, hue: '#d8535f' },
  { label: 'Crypto', icon: PhCurrencyBtc, hue: '#a8b4c9' },
  { label: 'CFDs', icon: PhCoins, hue: '#e0525c' }
]

export type Platform = { id: string; label: string; title: string; desc: string; href: string; cta: string; icon: Component; hue: string }

export const PLATFORMS: Platform[] = [
  { id: 'desktop', label: 'Desktop', title: 'A full workstation on Windows', desc: 'Every tool nTrader offers, with layouts you can shape around the way you trade.', href: page('ntrader-for-windows'), cta: 'nTrader for Windows', icon: PhDesktop, hue: '#c41e2a' },
  { id: 'web', label: 'Web', title: 'Open a browser and trade', desc: 'Sign in from any computer and pick up where you left off. Nothing to install.', href: LOGIN, cta: 'Open web platform', icon: PhBrowser, hue: '#c41e2a' },
  { id: 'mobile', label: 'Mobile', title: 'Markets in your pocket', desc: 'Real-time prices, charts and order entry, wherever the day takes you.', href: page('ntrader-for-mobile'), cta: 'nTrader for Mobile', icon: PhDeviceMobile, hue: '#7d8da8' }
]

export const MT5_DOWNLOADS: { id: string; label: string; title: string; href: string; icon: Component }[] = [
  { id: 'windows', label: 'Windows', title: 'Desktop terminal', href: 'https://download.terminal.free/cdn/web/artix.capital.ltd/mt5/artixcapital5setup.exe', icon: PhWindowsLogo },
  { id: 'web', label: 'Web', title: 'Trade in your browser', href: 'https://web.artixcapital.com/terminal', icon: PhBrowser },
  { id: 'ios', label: 'iOS', title: 'iPhone and iPad', href: 'https://download.terminal.free/cdn/mobile/mt5/ios?server=ArtixCapital-Server', icon: PhAppleLogo },
  { id: 'android', label: 'Android', title: 'Phone and tablet', href: 'https://download.terminal.free/cdn/web/metaquotes.software.corp/mt5/metatrader5.apk?utm_source=www.metatrader5.com&utm_campaign=install.metaquotes', icon: PhAndroidLogo },
  { id: 'playstore', label: 'Google Play', title: 'Android app', href: 'https://download.terminal.free/cdn/mobile/mt5/android?server=ArtixCapital-Server', icon: PhAndroidLogo }
]

export type Spec = { k: string; v: string }
export type Account = { id: string; name: string; tag: string; href: string; icon: Component; specs: Spec[]; featured?: boolean; span: string; hue: string }

export const ACCOUNTS: Account[] = [
  {
    id: 'core', name: 'Core', tag: 'A low-cost start for new and growing traders.', href: page('artix-core'), icon: PhCube, span: 'lg:col-span-2', hue: '#7d8da8',
    specs: [{ k: 'Min. deposit', v: '$500' }, { k: 'Spreads from', v: '1.5 pips' }, { k: 'FX commission', v: 'None' }, { k: 'Leverage', v: '1:200' }]
  },
  {
    id: 'edge', name: 'Edge', tag: 'Raw pricing for experienced, active traders.', href: page('artix-edge'), icon: PhLightning, span: 'lg:col-span-2', hue: '#a9b7cf',
    specs: [{ k: 'Min. deposit', v: '$10,000' }, { k: 'Spreads from', v: '0.0 pips' }, { k: 'FX commission', v: '$5 / lot' }, { k: 'Leverage', v: '1:200' }]
  },
  {
    id: 'elite', name: 'Elite', tag: 'Priority conditions for high-volume trading.', href: page('artix-elite'), icon: PhCrown, span: 'lg:col-span-2', featured: true, hue: '#c41e2a',
    specs: [{ k: 'Min. deposit', v: '$25,000' }, { k: 'Spreads from', v: '0.0 pips' }, { k: 'FX commission', v: '$3.5 / lot' }, { k: 'Leverage', v: '1:200' }]
  },
  {
    id: 'coverage', name: 'Coverage', tag: 'For disciplined traders who put capital preservation first.', href: page('artix-coverage-account'), icon: PhShieldCheck, span: 'lg:col-span-4', hue: '#9a1c26',
    specs: [{ k: 'Min. deposit', v: '$50,000' }, { k: 'Spreads from', v: '0.0 pips' }, { k: 'FX commission', v: '$3.5 / lot' }, { k: 'Leverage', v: '1:200' }]
  },
  {
    id: 'demo', name: 'Demo', tag: 'Test strategies on live prices with virtual funds. No risk, no deposit.', href: page('artix-demo-account'), icon: PhFlask, span: 'lg:col-span-2', hue: '#c41e2a',
    specs: []
  }
]

export const ACCOUNT_NOTES = ['Commission charged per side', 'Crypto: 0.10% of notional', '30% stop-out level', 'USD account currency']

export const STEPS: { title: string; desc: string; icon: Component; hue: string }[] = [
  { title: 'Register', desc: 'Create your profile with an email address and a few basic details.', icon: PhUserPlus, hue: '#7d8da8' },
  { title: 'Verify', desc: 'Complete KYC by uploading your identity documents for review.', icon: PhIdentificationCard, hue: '#c41e2a' },
  { title: 'Trade', desc: 'Fund your account and place your first trade on nTrader.', icon: PhChartLineUp, hue: '#e0525c' }
]

export const FAQS: { q: string; a: string }[] = [
  { q: 'Is Artix Capital regulated?', a: 'Artix Capital Ltd is an International Business Company registered in Saint Lucia under number 2023-00122. It is an offshore company and is not licensed or regulated as a financial services provider in Saint Lucia.' },
  { q: 'What can I trade?', a: 'Currencies, commodities, indices, stocks and cryptocurrencies, all from one account on nTrader.' },
  { q: 'Which platforms can I use?', a: 'nTrader and MetaTrader 5. nTrader runs on desktop, in the browser and on mobile.' },
  { q: 'How can I deposit and withdraw?', a: 'We accept Visa, Mastercard, Neteller, Skrill, crypto wallets and other methods. Choose the one that suits you in your client area.' },
  { q: 'Who can not open an account?', a: `Artix Capital Ltd does not provide services for citizens or residents of ${RESTRICTED_LIST}.` }
]

export const POLICIES: { label: string; href: string }[] = [
  { label: 'Complaints Management', href: `${SITE}/wp-content/uploads/2026/04/Complaints-Management-Policy.pdf` },
  { label: 'Conflicts of Interest', href: `${SITE}/wp-content/uploads/2026/04/Conflicts-of-Interest-Policy.pdf` },
  { label: 'Privacy Policy', href: `${SITE}/wp-content/uploads/2026/04/Privacy-Policy.pdf` },
  { label: 'Risk Disclosure', href: `${SITE}/wp-content/uploads/2026/04/Risk-Disclosure-Policy.pdf` },
  { label: 'Risk Management', href: `${SITE}/wp-content/uploads/2026/04/Risk-Management-Policy.pdf` },
  { label: 'Safeguarding of Client Funds', href: `${SITE}/wp-content/uploads/2026/04/Safeguarding-of-Clients-Funds.pdf` },
  { label: 'Fraud Alert', href: `${SITE}/wp-content/uploads/2026/09/Fraud-Alert.pdf` }
]
