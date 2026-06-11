import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { cookies, headers } from 'next/headers'
import { LocaleProvider } from '@/lib/locale-context'
import { LOCALE_COOKIE, resolveInitialLocale } from '@/lib/locale-cookie'
import type { Locale } from '@/lib/locale'
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
}

function interForLocale(locale: Locale) {
  return interByLocale[locale] ?? interLatin
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const headerStore = await headers()
  const locale = resolveInitialLocale(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headerStore.get('accept-language'),
  )
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
  const cookieStore = await cookies()
  const headerStore = await headers()
  const initialLocale = resolveInitialLocale(
    cookieStore.get(LOCALE_COOKIE)?.value,
    headerStore.get('accept-language'),
  )
  const inter = interForLocale(initialLocale)

  return (
    <html lang={initialLocale} className="bg-background">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <LocaleProvider initialLocale={initialLocale}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LocaleProvider>
      </body>
    </html>
  )
}
