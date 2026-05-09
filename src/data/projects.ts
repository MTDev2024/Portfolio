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
    imageUrl: "/images/projects/portfolio.png",
    liveUrl: "https://michael-takbou.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/Portfolio",
  },

  {
    id: "museo",
    title: "Museo",
    description:
      "Galerie d'art interactive utilisant l'API de l'Art Institute of Chicago.",
    tech: [
      "React",
      "Vite",
      "Tailwind",
      "Framer Motion",
      "React Three Fiber",
      "Chicago Art Institute API",
    ],
    imageUrl: "/images/projects/museo.png",

    liveUrl: "https://museo-app-zeta.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/museo",
  },

  {
    id: "artisan",
    title: "Dupont Plomberie",
    description: "Site vitrine pour un artisan plombier",
    tech: ["React", "Tailwind", "Framer Motion", "Leaflet", "Resend"],
    imageUrl: "/images/projects/artisan.png",

    liveUrl: "https://starter-artisan.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/starter-artisan",
  },
  {
    id: "renovation",
    title: "Cap Renov",
    description: "Site vitrine pour une entreprise de rénovation",
    tech: ["React", "Tailwind", "Framer Motion", "Leaflet", "Resend"],
    imageUrl: "/images/projects/renovation.png",

    liveUrl: "https://starter-renovation.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/starter-renovation",
  },
  {
    id: "slider",
    title: "animated_slider",
    description: "Slider animé",
    tech: ["HTML", "CSS", "JavaScript"],
    imageUrl: "/images/projects/slider.jpg",
    liveUrl: "https://starter-beaute.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/starter-beaute",
  },
  {
    id: "beaute",
    title: "Iris & Co",
    description: "Site vitrine pour un institut de beauté",
    tech: ["React", "Tailwind", "Framer Motion", "Leaflet", "Resend"],
    imageUrl: "/images/projects/beaute.png",
    liveUrl: "https://starter-beaute.vercel.app/",
    githubUrl: "https://github.com/MTDev2024/starter-beaute",
  },
]
