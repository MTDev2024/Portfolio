import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";

export default function Hero() {
  return (
    <Section>
      <div className="flex flex-col items-center text-center">
        <Avatar
          variant="front"
          className="mb-8 h-28 w-28"
        />

        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-(--text-secondary)">
          Portfolio développeur frontend
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
          Développeur React & Next.js
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-(--text-secondary)">
          Je conçois des interfaces modernes, accessibles et performantes avec une approche centrée UX.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="#projects">
            Voir mes projets
          </Button>

          <Button href="#contact" variant="secondary">
            Me contacter
          </Button>
        </div>
      </div>
    </Section>
  );
}