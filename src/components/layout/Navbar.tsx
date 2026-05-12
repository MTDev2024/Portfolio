"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import Link from "next/link"
import ThemeToggle from "@/components/system/ThemeToggle"
import { useScrollSpy } from "@/hooks/useScrollSpy"

const navLinks = [
  { href: "#about", label: "À propos", id: "about" },
  { href: "#skills", label: "Compétences", id: "skills" },
  { href: "#projects", label: "Projets", id: "projects" },
  { href: "#contact", label: "Contact", id: "contact" },
]

// Stagger sur les liens à l'intérieur de l'overlay
const listVariants: Variants = {
  closed: {},
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
}

const itemVariants: Variants = {
  closed: { opacity: 0, y: 24 },
  open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const activeSection = useScrollSpy([
    "hero",
    "about",
    "skills",
    "projects",
    "contact",
  ])

  // Bloque le scroll de la page quand le menu est ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const close = () => setIsOpen(false)

  const linkClass = (id: string) =>
    `transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
      activeSection === id
        ? "text-(--accent)"
        : "text-(--text-secondary) hover:text-(--foreground)"
    }`

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed top-0 z-50 w-full"
    >
      {/* Barre — le backdrop-blur est sur ce div, pas sur le nav
          pour éviter qu'il crée un contexte d'empilement qui casse
          le positionnement fixed de l'overlay */}
      <div className="relative z-10 border-b border-(--border) bg-(--background)/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#hero"
          onClick={close}
          className="relative z-10 font-semibold tracking-wide"
        >
          Michael Takbou
        </Link>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map(({ href, label, id }) => (
            <li key={id}>
              <Link href={href} className={linkClass(id)}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Burger animé → croix — visible uniquement sur mobile */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            className="relative z-10 flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-px w-6 bg-(--foreground) origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block h-px w-6 bg-(--foreground)"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block h-px w-6 bg-(--foreground) origin-center"
            />
          </button>
        </div>
      </div>
      </div>

      {/*
        Overlay mobile — circular reveal depuis le bouton burger (coin supérieur droit)
        clip-path part de 0% (invisible) à 150% (couvre tout l'écran)
        L'easing [0.76, 0, 0.24, 1] donne un effet élastique premium
      */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/*
              Anneau : cercle légèrement plus grand que l'overlay (151% vs 150%)
              La différence de 1% crée un liseré visible au bord du cercle
              Couleur blanche à 8% d'opacité — subtil mais perceptible
            */}
            <motion.div
              key="ring"
              initial={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
              animate={{ clipPath: "circle(151% at calc(100% - 32px) 28px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-white/8 md:hidden"
            />

            <motion.div
              key="mobile-menu"
              initial={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
              animate={{ clipPath: "circle(150% at calc(100% - 32px) 28px)" }}
              exit={{ clipPath: "circle(0% at calc(100% - 32px) 28px)" }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-0 bg-(--surface) md:hidden"
              aria-modal="true"
              role="dialog"
            >
            <motion.ul
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex h-full flex-col justify-center px-8 gap-8"
            >
              {navLinks.map(({ href, label, id }, index) => (
                <motion.li key={id} variants={itemVariants}>
                  <Link
                    href={href}
                    onClick={close}
                    className="group flex items-baseline gap-5"
                  >
                    {/* Numéro éditorial — cohérent avec Skills et Projects */}
                    <span className="text-xs tabular-nums text-(--accent)">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-4xl font-semibold transition-colors group-hover:text-(--text-secondary)">
                      {label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
