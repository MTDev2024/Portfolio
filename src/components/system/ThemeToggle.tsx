"use client"

import { useState, useEffect } from "react"
import { useTheme } from "@/hooks/useTheme"

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  // On attend le montage client avant de rendre le bouton
  // pour eviter la hydration mismatch (serveur = "light", client = valeur localStorage)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-14" />

  return (
    <button
      onClick={toggleTheme}
      aria-label="Changer le theme"
      className="text-sm text-(--text-secondary) transition-colors hover:text-(--foreground)"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}