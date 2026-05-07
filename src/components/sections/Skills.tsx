"use client"

import { motion, type Variants } from "framer-motion"
import Section from "@/components/ui/Section"
import { skills } from "@/data/skills"

// Stagger sur les rangées (catégories)
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

// Stagger sur les badges à l'intérieur de chaque rangée
const badgeContainerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const badgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
}

export default function Skills() {
  return (
    <Section id="skills" className="bg-(--surface)">
      <h2 className="text-3xl font-semibold md:text-4xl">Compétences</h2>

      <p className="mt-4 text-lg text-(--text-secondary)">
        Les technologies que j'utilise au quotidien.
      </p>

      <motion.div
        className="mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((category, index) => (
          <motion.div
            key={category.title}
            variants={rowVariants}
            className={`flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-12 ${
              index !== 0 ? "border-t border-(--border)" : ""
            }`}
          >
            {/* Numéro + titre de catégorie */}
            <div className="flex items-baseline gap-3 sm:w-40 sm:shrink-0">
              <span className="text-xs tabular-nums text-(--text-secondary)">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold">{category.title}</span>
            </div>

            {/* Badges avec stagger individuel */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={badgeContainerVariants}
            >
              {category.items.map((skill) => (
                <motion.span
                  key={skill.label}
                  variants={badgeVariants}
                  // Bump au hover
                  whileHover={{ scale: 1.07 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={[
                    "cursor-default rounded-full border border-(--border)",
                    "bg-(--background) px-3 py-1 text-sm text-(--text-secondary)",
                    "transition-colors hover:border-(--foreground) hover:text-(--foreground)",
                    // Effet glossy : reflet lumineux en haut du badge au hover
                    // box-shadow inset simule une surface en verre sans affecter le layout
                    "hover:[box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.18),inset_0_0_12px_0_rgba(255,255,255,0.04)]",
                  ].join(" ")}
                >
                  {skill.label}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
