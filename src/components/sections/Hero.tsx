"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import Section from "@/components/ui/Section"
import Button from "@/components/ui/Button"
import Avatar from "@/components/ui/Avatar"

// ssr: false — WebGL n'existe pas côté serveur Node.js
const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
})

export default function Hero() {
  return (
    // Wrapper relatif : sert de containing block pour le canvas
    // Le canvas est ici et non dans Section pour éviter la contrainte max-w-6xl du Container
    <div className="relative overflow-hidden">
      {/* Fade-in du canvas — delay pour laisser Three.js initialiser la scène */}
      <motion.div
        className="absolute inset-0"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
      >
        <HeroScene />
      </motion.div>

      <Section id="hero" className="min-h-svh flex items-center">
        {/* z-10 : passe au-dessus du canvas pour que les boutons restent cliquables */}
        <div className="relative z-10 w-full">
          <motion.div
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Avatar variant="front" className="mb-8 h-28 w-28" />
            </motion.div>

            <motion.p
              className="mb-4 text-sm uppercase tracking-[0.2em] text-(--text-secondary)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Portfolio développeur frontend
            </motion.p>

            <motion.h1
              className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Développeur React & Next.js
            </motion.h1>

            <motion.p
              className="mt-6 max-w-2xl text-lg text-(--text-secondary)"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Je conçois des interfaces modernes, accessibles et performantes
              avec une approche centrée UX.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button href="#projects">Voir mes projets</Button>

              <Button href="#contact" variant="secondary">
                Me contacter
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  )
}
