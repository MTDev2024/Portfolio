"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "@/hooks/useTheme"

// useSyncExternalStore retourne false côté serveur (getServerSnapshot)
// et true côté client (getSnapshot) — sans setState ni useEffect
const useIsMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const mounted = useIsMounted()

  if (!mounted) return <div className="w-14" />

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
      className="text-sm text-(--text-secondary) transition-colors hover:text-(--foreground)"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  )
}