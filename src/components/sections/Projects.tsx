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

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-(--border) p-6 hover:bg-(--surface) transition-colors"
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
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}