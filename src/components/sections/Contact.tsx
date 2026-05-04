import Section from "@/components/ui/Section";

export default function Contact() {
  return (
    <Section>
      <div className="text-center">
        <h2 className="text-3xl font-semibold md:text-4xl">
          Contact
        </h2>

        <p className="mt-4 text-(--text-secondary) text-lg max-w-2xl mx-auto">
          Vous avez un projet ou une opportunité ?
          Je suis disponible pour des missions freelance ou collaborations.
        </p>

        {/* CTA email */}
        <div className="mt-8">
          <a
            href="mailto:tonemail@example.com"
            className="text-lg font-medium underline underline-offset-4 hover:text-black transition-colors"
          >
            tonemail@example.com
          </a>
        </div>

        {/* Liens sociaux */}
        <div className="mt-8 flex justify-center gap-6 text-(--text-secondary)">
          <a href="#" target="_blank" rel="noreferrer">
            LinkedIn
          </a>

          <a href="#" target="_blank" rel="noreferrer">
            GitHub
          </a>

          <a href="#" target="_blank" rel="noreferrer">
            Malt
          </a>
        </div>
      </div>
    </Section>
  );
}