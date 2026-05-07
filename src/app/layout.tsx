import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { Inter } from "next/font/google"
import { site } from "@/config/site"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    title: site.title,
    description: site.description,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={inter.className}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
          try {
            const theme = localStorage.getItem('theme')
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (theme === 'dark' || (!theme && prefersDark)) {
              document.documentElement.classList.add('dark')
            }
          } catch {}
        `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  )
}
