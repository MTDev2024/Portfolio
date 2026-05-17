// Source de vérité pour la section Skills
// Pour ajouter une compétence : ajouter un item dans le tableau "items" de la bonne catégorie

export type Skill = {
  label: string
}

export type SkillCategory = {
  title: string
  items: Skill[]
}

export const skills: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      { label: "React" },
      { label: "Next.js" },
      { label: "TypeScript" },
      { label: "JavaScript" },
      { label: "HTML / CSS" },
      { label: "Tailwind CSS" },
      { label: "Framer Motion" },
      { label: "React Three Fiber" },
      { label: "Zod" },
    ],
  },
  {
    title: "State",
    items: [
      { label: "Zustand" },
      { label: "Redux" },
      { label: "Redux Toolkit" },
    ],
  },
  {
    title: "Backend / BDD",
    items: [
      { label: "Firebase" },
      { label: "Firestore" },
      { label: "Firebase Auth" },
    ],
  },
  {
    title: "Outils",
    items: [
      { label: "Git" },
      { label: "VS Code" },
      { label: "Figma" },
    ],
  },
]
