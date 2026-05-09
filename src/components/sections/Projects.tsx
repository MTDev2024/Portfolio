"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Section from "@/components/ui/Section"
import { projects } from "@/data/projects"

export default function Projects() {
  // Projet actif - initialisé sur le premier par défaut
  const [activeId, setActiveId] = useState(projects[0].id)
  const activeProject = projects.find((p) => p.id === activeId)!

  return (
    <Section id="projects">
      <h2 className="text-3xl font-semibold md:text-4xl">Projets</h2>

      <p className="mt-4 text-lg text-(--text-secondary)">
        Quelques un des projets que j&aposai réalisés.
      </p>

      {/*
        Layout split : 2 colonnes sur desktop
        - Colonne gauche (fr) : liste des projets
        - Colonne droite (1.2fr) : image du projet actif
        Sur mobile : empilé verticalement (grid-cols-1)
      */}
      <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_1.2fr] md:gap-16">
        {/* - GAUCHE : liste des projets - */}
        <ul className="flex flex-col">
          {projects.map((project, index) => {
            const isActive = project.id === activeId

            return (
              <li
                key={project.id}
                onMouseEnter={() => setActiveId(project.id)}
                className={`group cursor-default border-t border-(--border) py-6 transition-colors last:border-b ${
                  isActive ? "" : "hover:bg-(--surface)"
                }`}
              >
                <div className="flex items-start gap-4 px-2">
                  {/* Numéro */}
                  <span className="mt-1 shrink-0 text-xs text-(--text-secondary) tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="flex-1">
                    {/* Titre - foreground si actif, secondaire sinon */}
                    <h3
                      className={`text-lg font-semibold transition-colors ${
                        isActive
                          ? "text-(--foreground)"
                          : "text-(--text-secondary)"
                      }`}
                    >
                      {project.title}
                    </h3>

                    {/*
                      Détails animés - visibles uniquement sur le projet actif
                      AnimatePresence gère l'entrée/sortie proprement
                    */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          {/* Description */}
                          <p className="mt-2 text-sm text-(--text-secondary)">
                            {project.description}
                          </p>

                          {/* Tech badges */}
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

                          {/* Liens */}
                          <div className="mt-4 flex gap-4">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
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
                                className="text-sm font-medium text-(--text-secondary) underline underline-offset-4 transition-colors hover:text-(--foreground)"
                              >
                                GitHub
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        {/* - DROITE : image du projet actif - */}
        {/*
          sticky top-28 : l'image reste visible pendant qu'on scroll la liste
          top-28 = hauteur du Navbar (pt-20) + un peu de marge
        */}
        <div className="hidden md:sticky md:top-28 md:block">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-(--border) bg-(--surface)">
            {/*
              AnimatePresence mode="wait" : attend que l'ancienne image
              finisse de sortir avant d'afficher la nouvelle
              key={activeId} : force le remontage du composant à chaque changement
            */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {activeProject.imageUrl ? (
                  <Image
                    src={activeProject.imageUrl}
                    alt={`Aperçu du projet ${activeProject.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-sm text-(--text-secondary)">
                      {activeProject.title}
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Titre du projet sous l'image */}
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
    </Section>
  )
}
