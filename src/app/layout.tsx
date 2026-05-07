import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title: "Portfolio Développeur Frontend",
  description:
    "Portfolio de développeur React / Next.js spécialisé en interfaces modernes, accessibles et performantes.",
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
