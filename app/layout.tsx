import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { cookies, headers } from 'next/headers'
import { LocaleProvider } from '@/lib/locale-context'
import { LOCALE_COOKIE, resolveInitialLocale } from '@/lib/locale-cookie'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin", "latin-ext"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EuroTruck CZ | Commercial Vehicles from Europe',
  description: 'Premium commercial trucks, trailers and cargo vehicles from Europe. Quality vehicles with full service and warranty.',
  generator: 'v0.app',
  keywords: ['trucks', 'trailers', 'commercial vehicles', 'Europe', 'Czech Republic', 'cargo'],
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1f35',
  width: 'device-width',
  initialScale: 1,
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

  return (
    <html lang={initialLocale} className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        <LocaleProvider initialLocale={initialLocale}>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </LocaleProvider>
      </body>
    </html>
  )
}
