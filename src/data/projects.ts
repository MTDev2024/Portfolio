export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    title: "Portfolio développeur",
    description:
      "Portfolio moderne développé avec Next.js, Tailwind et Framer Motion.",
    tech: ["Next.js", "React", "Tailwind"],
    link: "#",
  },
  {
    title: "Application GameOn",
    description:
      "Formulaire interactif avec validation et logique métier en JavaScript.",
    tech: ["JavaScript", "HTML", "CSS"],
    link: "#",
  },
  {
    title: "Les Petits Plats",
    description:
      "Moteur de recherche performant avec algorithmes optimisés en JS.",
    tech: ["JavaScript", "Algorithmes"],
    link: "#",
  },
];