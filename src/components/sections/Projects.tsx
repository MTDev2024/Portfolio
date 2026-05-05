"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <Section>
      <div>
        <h2 className="text-3xl font-semibold md:text-4xl">
          Projets
        </h2>

        <p className="mt-4 text-(--text-secondary) text-lg">
          Une sélection de projets réalisés durant ma formation et en autonomie.
        </p>

        <motion.div
          className="mt-10 grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              className="rounded-2xl border border-(--border) p-6 hover:bg-(--surface) transition-colors"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <h3 className="text-xl font-semibold">
                {project.title}
              </h3>

              <p className="mt-3 text-(--text-secondary)">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs border border-(--border) px-2 py-1 rounded-full text-(--text-secondary)"
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
      className="
  text-sm
  font-medium
  text-(--text-secondary)
  underline
  underline-offset-4
  transition-colors
  hover:text-(--foreground)
"
    >
      Live
    </a>
  )}

  {project.githubUrl && (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noreferrer"
   className="
  text-sm
  font-medium
  text-(--text-secondary)
  underline
  underline-offset-4
  transition-colors
  hover:text-(--foreground)
"
    >
      GitHub
    </a>
  )}
</div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}