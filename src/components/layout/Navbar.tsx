"use client"

import Link from "next/link"
import ThemeToggle from "@/components/system/ThemeToggle"
import { useScrollSpy } from "@/hooks/useScrollSpy"

export default function Navbar() {
  const activeSection = useScrollSpy(["hero", "about", "skills", "projects", "contact"])

  const linkClass = (id: string) =>
    `transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      activeSection === id ? "text-(--foreground)" : "text-(--text-secondary)"
    }`

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed top-0 z-50 w-full border-b border-(--border) bg-(--background)/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#hero" className="text-sm font-semibold tracking-wide">
          Michael Takbou
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link href="#about" className={linkClass("about")}>
              À propos
            </Link>
          </li>

          <li>
            <Link href="#skills" className={linkClass("skills")}>
              Compétences
            </Link>
          </li>

          <li>
            <Link href="#projects" className={linkClass("projects")}>
              Projets
            </Link>
          </li>

          <li>
            <Link href="#contact" className={linkClass("contact")}>
              Contact
            </Link>
          </li>
        </ul>

        <ThemeToggle />
      </div>
    </nav>
  )
}
