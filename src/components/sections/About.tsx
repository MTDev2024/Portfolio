import Section from "@/components/ui/Section"
import Avatar from "@/components/ui/Avatar"

export default function About() {
  return (
    <Section id="about" split>
      {/* LEFT */}
      <article>
        <h2 className="text-3xl font-semibold md:text-4xl">À propos de moi</h2>
        {/* Ligne décorative accent — ancre visuelle sous le titre */}
        <div className="mt-3 h-0.5 w-10 bg-(--accent)" />

        <p className="mt-6 text-lg leading-relaxed text-(--text-secondary)">
          Je suis développeur frontend spécialisé en{" "}
          <span className="font-medium text-(--accent)">React et Next.js</span>.
          Je conçois des interfaces web modernes, performantes et accessibles,
          avec une attention particulière à l’UX et à la qualité du code.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-(--text-secondary)">
          J’intègre des bonnes pratiques de développement, d’accessibilité et
          d’éco-conception dans chacun de mes projets afin de créer des
          expériences utilisateur durables et efficaces.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-(--text-secondary)">
          Mon objectif est de transformer des besoins métiers en interfaces
          claires, rapides et maintenables avec un code propre et scalable.
        </p>
      </article>

      {/* RIGHT */}
      <div className="flex justify-center md:justify-end">
        <Avatar variant="three-quarter" className="h-64 w-64" />
      </div>
    </Section>
  )
}
