"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Section from "@/components/ui/Section"
import { projects } from "@/data/projects"

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const activeProject = projects.find((p) => p.id === activeId)!
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null)

  // Fermeture modale via Échap + blocage scroll body
  useEffect(() => {
    if (!zoomedImageUrl) return
    document.body.style.overflow = "hidden"
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomedImageUrl(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKey)
    }
  }, [zoomedImageUrl])

  return (
    <Section id="projects">
      <h2 className="text-3xl font-semibold md:text-4xl">Projets</h2>

      <p className="mt-4 text-lg text-(--text-secondary)">
        Quelques un des projets que j&aposai réalisés.
      </p>

      <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
        {/* GAUCHE : liste */}
        <ul className="flex flex-col">
          {projects.map((project, index) => {
            const isActive = project.id === activeId

            return (
              <li
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                onClick={() => setActiveId(project.id)}
                className={`cursor-pointer border-t border-(--border) py-6 transition-colors last:border-b ${
                  isActive ? "" : "hover:bg-(--surface)"
                }`}
              >
                <div className="flex items-start gap-4 px-2">
                  <span className="mt-1 shrink-0 text-xs text-(--text-secondary) tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    {/* Titre + chevron animé */}
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`text-lg font-semibold transition-colors ${
                          isActive
                            ? "text-(--foreground)"
                            : "text-(--text-secondary)"
                        }`}
                      >
                        {project.title}
                      </h3>

                      {/* rotate 0 → 180 quand actif */}
                      <motion.svg
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="shrink-0 text-(--text-secondary)"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </motion.svg>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <p className="mt-2 text-sm text-(--text-secondary)">
                            {project.description}
                          </p>

                          <div className="mt-3 flex flex-wrap gap-2">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="rounded-full border border-(--border) px-2 py-0.5 text-xs text-(--text-secondary)"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 flex gap-4">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm font-medium text-(--text-secondary) underline underline-offset-4 transition-colors hover:text-(--foreground)"
                              >
                                Live
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-sm font-medium text-(--text-secondary) underline underline-offset-4 transition-colors hover:text-(--foreground)"
                              >
                                GitHub
                              </a>
                            )}
                          </div>

                          {/* Screenshot mobile avec zoom */}
                          {project.imageUrl && (
                            <ZoomableImage
                              src={project.imageUrl}
                              alt={`Aperçu du projet ${project.title}`}
                              className="mt-4 md:hidden"
                              onZoom={() => setZoomedImageUrl(project.imageUrl!)}
                            />
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* DROITE : image sticky desktop */}
        <div className="hidden md:sticky md:top-28 md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {activeProject.imageUrl ? (
                <ZoomableImage
                  src={activeProject.imageUrl}
                  alt={`Aperçu du projet ${activeProject.title}`}
                  onZoom={() => setZoomedImageUrl(activeProject.imageUrl!)}
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-xl border border-(--border) bg-(--surface)">
                  <span className="text-sm text-(--text-secondary)">
                    {activeProject.title}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <motion.p
            key={`label-${activeId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-sm text-(--text-secondary)"
          >
            {activeProject.title}
          </motion.p>
        </div>
      </div>

      {/* Modale zoom — portée hors du flux normal via fixed */}
      <AnimatePresence>
        {zoomedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setZoomedImageUrl(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Aperçu agrandi du projet"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative h-[85vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={zoomedImageUrl}
                alt="Aperçu agrandi"
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <button
              onClick={() => setZoomedImageUrl(null)}
              aria-label="Fermer l'aperçu"
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}

/**
 * Image cliquable avec icône loupe et curseur zoom-in.
 * Loupe toujours visible sur mobile, apparaît au hover sur desktop.
 */
function ZoomableImage({
  src,
  alt,
  className = "",
  onZoom,
}: {
  src: string
  alt: string
  className?: string
  onZoom: () => void
}) {
  return (
    <div
      className={`group relative aspect-video w-full cursor-zoom-in overflow-hidden rounded-xl border border-(--border) bg-(--surface) ${className}`}
      onClick={onZoom}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-contain"
      />

      {/* Loupe : visible sur mobile, hover sur desktop */}
      <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
          <path d="M11 8v6M8 11h6" />
        </svg>
      </div>
    </div>
  )
}
