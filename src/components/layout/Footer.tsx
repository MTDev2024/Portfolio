import Link from "next/link"
import { site } from "@/config/site"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-(--border) py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-(--text-secondary) sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {year} {site.name}
        </p>

        <div className="flex gap-6">
          <Link
            href="/mentions-legales"
            className="transition-colors hover:text-(--foreground)"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="transition-colors hover:text-(--foreground)"
          >
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  )
}
