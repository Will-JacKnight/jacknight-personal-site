import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { config } from "@/lib/config"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  keywords: config.site.keywords,
  manifest: config.site.manifest,
  icons: {
    icon: [
      { url: config.site.favicon.ico },
      { url: config.site.favicon.svg, type: 'image/svg+xml' },
    ],
    apple: [
      { url: config.site.favicon.appleTouchIcon }
    ]
  },
  appleWebApp: {
    capable: true,
    title: config.site.title,
    startupImage: [
      { url: config.site.favicon.appleTouchIcon }
    ]
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  viewportFit: 'cover',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  colorScheme: 'light dark'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/rss.xml" />
        <link rel="alternate" type="application/atom+xml" title="Atom" href="/atom.xml" />
        <link rel="alternate" type="application/json" title="JSON" href="/feed.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content={config.site.title} />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
} 