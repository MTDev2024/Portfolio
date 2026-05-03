import Section from "@/components/ui/Section";
import Avatar from "@/components/ui/Avatar";

export default function About() {
  return (
    <Section split>
      {/* LEFT */}
      <div>
        <h2 className="text-3xl font-semibold md:text-4xl">
          À propos de moi
        </h2>

        <p className="mt-6 text-(--text-secondary) text-lg leading-relaxed">
          Je suis développeur frontend spécialisé en React et Next.js.
          Je conçois des interfaces modernes, performantes et accessibles,
          avec une attention particulière à l’UX et à la qualité du code.
        </p>

        <p className="mt-4 text-(--text-secondary) text-lg leading-relaxed">
          J’aime travailler sur des produits où le design system,
          la performance et l’expérience utilisateur sont au centre.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex justify-center md:justify-end">
        <Avatar
          variant="three-quarter"
          className="h-64 w-64"
        />
      </div>
    </Section>
  );
}