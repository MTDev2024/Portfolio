import Link from "next/link"
import { site } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${site.name}`,
  description: `Politique de confidentialité et gestion des données personnelles de ${site.name}.`,
  robots: { index: false, follow: false },
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-(--text-secondary)">
        RGPD
      </p>
      <h1 className="mt-3 text-3xl font-semibold">
        Politique de confidentialité
      </h1>

      <div className="mt-12 space-y-10 text-(--text-secondary)">
        <Section title="Responsable du traitement">
          <p>
            {site.name} — {site.legal.status}
            <br />
            {site.legal.address}, {site.legal.zipCode} {site.legal.city}
            <br />
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 transition-colors hover:text-(--foreground)"
            >
              {site.email}
            </a>
          </p>
        </Section>

        <Section title="Données collectées">
          <p>
            Le formulaire de contact collecte uniquement les données suivantes :
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5">
            <li>Nom</li>
            <li>Adresse email</li>
            <li>Message</li>
          </ul>
          <p className="mt-3">
            Aucun cookie de tracking, pixel publicitaire ou outil d&apos;analytics
            n&apos;est utilisé sur ce site.
          </p>
        </Section>

        <Section title="Finalité du traitement">
          <p>
            Les données collectées sont utilisées exclusivement pour répondre à
            vos demandes de contact. Elles ne sont ni vendues, ni transmises à
            des tiers.
          </p>
        </Section>

        <Section title="Base légale">
          <p>
            Le traitement repose sur votre consentement (article 6.1.a du RGPD),
            matérialisé par l&apos;envoi volontaire du formulaire.
          </p>
        </Section>

        <Section title="Durée de conservation">
          <p>
            Vos données sont conservées pendant 3 ans à compter de votre dernier
            contact, puis supprimées.
          </p>
        </Section>

        <Section title="Vos droits">
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, d&apos;effacement et d&apos;opposition. Pour exercer ces
            droits, contactez :{" "}
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 transition-colors hover:text-(--foreground)"
            >
              {site.email}
            </a>
          </p>
          <p className="mt-3">
            En cas de réponse insatisfaisante, vous pouvez saisir la{" "}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-(--foreground)"
            >
              CNIL
            </a>
            .
          </p>
        </Section>

        <Section title="Hébergement">
          <p>
            Ce site est hébergé par {site.legal.host} ({site.legal.hostAddress}).
            Les données transitent via une connexion sécurisée HTTPS.
          </p>
        </Section>

        <Section title="Mise à jour">
          <p>Dernière mise à jour : {site.legal.updated}.</p>
        </Section>
      </div>

      <div className="mt-12 flex flex-col gap-3 border-t border-(--border) pt-6 sm:flex-row sm:gap-8">
        <Link
          href="/"
          className="text-sm text-(--text-secondary) transition-colors hover:text-(--foreground)"
        >
          ← Retour à l&apos;accueil
        </Link>
        <Link
          href="/mentions-legales"
          className="text-sm text-(--text-secondary) transition-colors hover:text-(--foreground)"
        >
          Mentions légales →
        </Link>
      </div>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="mb-4 border-b border-(--border) pb-3 text-lg font-semibold text-(--foreground)">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </div>
  )
}
