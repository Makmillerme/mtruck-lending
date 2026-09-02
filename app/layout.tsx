import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { headers } from 'next/headers'
import { LocaleProvider } from '@/lib/locale-context'
import { DEFAULT_PUBLIC_LOCALE, PUBLIC_LOCALES, type Locale, type PublicLocale } from '@/lib/locale'
import { LOCALE_HEADER } from '@/lib/locale-path'
import { metadataForLocale } from '@/lib/site-metadata'
import './globals.css'
import './safari-fallback.css'

const interLatin = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const interUk = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  preload: false,
})

const interByLocale: Record<Locale, typeof interLatin> = {
  en: interLatin,
  uk: interUk,
  sk: interLatin,
  de: interLatin,
  pl: interLatin,
}

function interForLocale(locale: Locale) {
  return interByLocale[locale] ?? interLatin
}

async function getRequestLocale(): Promise<PublicLocale> {
  const headerStore = await headers()
  const fromHeader = headerStore.get(LOCALE_HEADER)
  if (fromHeader && PUBLIC_LOCALES.includes(fromHeader as PublicLocale)) {
    return fromHeader as PublicLocale
  }
  return DEFAULT_PUBLIC_LOCALE
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return metadataForLocale(locale)
}

export const viewport: Viewport = {
  themeColor: '#1a1f35',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialLocale = await getRequestLocale()
  const inter = interForLocale(initialLocale)

  return (
    <html lang={initialLocale} className="bg-background">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <LocaleProvider initialLocale={initialLocale}>
          {children}
          {process.env.VERCEL === "1" && <Analytics />}
        </LocaleProvider>
      </body>
    </html>
  )
}
