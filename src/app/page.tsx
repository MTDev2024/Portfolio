import Section from "@/components/ui/Section";

export default function Home() {
  return (
    <main>
      <Section>
        <div className="flex flex-col items-center text-center">
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-(--text-secondary)">
            Portfolio développeur frontend
          </p>

          <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
            Développeur React & Next.js
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-(--text-secondary)">
            Je conçois des interfaces modernes, accessibles
            et performantes avec une approche centrée UX.
          </p>
        </div>
      </Section>
    </main>
  );
}