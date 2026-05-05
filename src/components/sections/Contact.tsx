import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section>
      <div className="text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Contact
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-(--text-secondary)">
          Vous avez un projet ou une opportunité ?
          Je suis disponible pour des missions freelance
          ou collaborations.
        </p>

        {/* CTA email */}
        <div className="mt-8">
          <a
            href="mailto:mt.dev.2023@gmail.com"
            className="
              text-lg
              font-medium
              text-(--text-secondary)
              underline
              underline-offset-4
              transition-colors
              hover:text-(--foreground)
            "
          >
            Ecrivez-moi
          </a>
        </div>

        {/* Liens sociaux */}
        <div className="mt-8 flex justify-center gap-6 text-(--text-secondary)">
          <a
            href="https://www.linkedin.com/in/michael-takbou"
            target="_blank"
            rel="noreferrer"
            className="
              underline
              underline-offset-4
              transition-colors
              hover:text-(--foreground)
            "
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/MTDev2024"
            target="_blank"
            rel="noreferrer"
            className="
              underline
              underline-offset-4
              transition-colors
              hover:text-(--foreground)
            "
          >
            GitHub
          </a>

          <a
            href="https://www.malt.fr/profile/michaeltakbou"
            target="_blank"
            rel="noreferrer"
            className="
              underline
              underline-offset-4
              transition-colors
              hover:text-(--foreground)
            "
          >
            Malt
          </a>
        </div>
      </div>
    </Section>
  );
}