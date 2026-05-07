export type Project = {
  id: string
  title: string
  description: string
  tech: string[]

  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: "Portfolio développeur",
    title: "Portfolio développeur",
    description:
      "Portfolio moderne développé avec Next.js, Tailwind et Framer Motion.",
    tech: ["Next.js", "React", "Tailwind"],

    githubUrl: "#",
  },

  {
    id: "Museo",
    title: "Museo",
    description:
      "Galerie d'art interactive utilisant l'API de l'Art Institute of Chicago.",

    tech: ["Next.js", "React", "Tailwind", "Framer Motion"],

    liveUrl: "https://museo-app-zeta.vercel.app/",

    githubUrl: "https://github.com/MTDev2024/museo",
  },

  {
    id: "Application GameOn",
    title: "Application GameOn",
    description:
      "Formulaire interactif avec validation et logique métier en JavaScript.",

    tech: ["JavaScript", "HTML", "CSS"],

    githubUrl: "#",
  },

  {
    id: "Les Petits Plats",
    title: "Les Petits Plats",
    description:
      "Moteur de recherche performant avec algorithmes optimisés en JS.",

    tech: ["JavaScript", "Algorithmes"],

    githubUrl: "#",
  },
]
