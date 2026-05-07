export type Project = {
  id: string
  title: string
  description: string
  tech: string[]

  // Chemin relatif depuis /public → ex: /images/projects/museo.jpg
  imageUrl?: string

  liveUrl?: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    id: "portfolio-developpeur",
    title: "Portfolio développeur",
    description:
      "Portfolio moderne développé avec Next.js, Tailwind et Framer Motion.",
    tech: ["Next.js", "React", "Tailwind"],
    imageUrl: "/images/projects/portfolio-developpeur.jpg",

    githubUrl: "#",
  },

  {
    id: "museo",
    title: "Museo",
    description:
      "Galerie d'art interactive utilisant l'API de l'Art Institute of Chicago.",
    tech: ["Next.js", "React", "Tailwind", "Framer Motion"],
    imageUrl: "/images/projects/museo.jpg",

    liveUrl: "https://museo-app-zeta.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/museo",
  },

  {
    id: "gameon",
    title: "Application GameOn",
    description:
      "Formulaire interactif avec validation et logique métier en JavaScript.",
    tech: ["JavaScript", "HTML", "CSS"],
    imageUrl: "/images/projects/gameon.jpg",

    githubUrl: "#",
  },

  {
    id: "les-petits-plats",
    title: "Les Petits Plats",
    description:
      "Moteur de recherche performant avec algorithmes optimisés en JS.",
    tech: ["JavaScript", "Algorithmes"],
    imageUrl: "/images/projects/les-petits-plats.jpg",

    githubUrl: "#",
  },
]
