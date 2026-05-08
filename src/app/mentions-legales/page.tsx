import Link from "next/link"
import { site } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: `Mentions légales | ${site.name}`,
  description: `Mentions légales du site portfolio de ${site.name}.`,
  robots: { index: false, follow: false },
}

export default function MentionsLegales() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold">Mentions légales</h1>

      <div className="mt-12 space-y-10">
        <Section title="Éditeur du site">
          <Row label="Nom">{site.name}</Row>
          <Row label="Statut">{site.legal.status}</Row>
          <Row label="SIRET">{site.legal.siret}</Row>
          <Row label="Adresse">
            {site.legal.address}, {site.legal.zipCode} {site.legal.city}
          </Row>
          <Row label="Email">
            <a
              href={`mailto:${site.email}`}
              className="underline underline-offset-4 transition-colors hover:text-(--foreground)"
            >
              {site.email}
            </a>
          </Row>
          <Row label="Directeur de la publication">{site.legal.director}</Row>
        </Section>

        <Section title="Hébergeur">
          <Row label="Société">{site.legal.host}</Row>
          <Row label="Adresse">{site.legal.hostAddress}</Row>
          <Row label="Site web">
            <a
              href={site.legal.hostUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-(--foreground)"
            >
              {site.legal.hostUrl}
            </a>
          </Row>
        </Section>

        <Section title="Propriété intellectuelle">
          <p>
            L&apos;ensemble du contenu de ce site (textes, code, visuels) est la propriété
            exclusive de {site.name}. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </Section>

        <Section title="Données personnelles">
          <p>
            Pour toute information sur le traitement de vos données personnelles, consultez la{" "}
            <Link
              href="/politique-confidentialite"
              className="underline underline-offset-4 transition-colors hover:text-(--foreground)"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </Section>
      </div>

      <div className="mt-12 border-t border-(--border) pt-6">
        <Link
          href="/"
          className="text-sm text-(--text-secondary) transition-colors hover:text-(--foreground)"
        >
          ← Retour à l&apos;accueil
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
      <h2 className="mb-4 border-b border-(--border) pb-3 text-lg font-semibold">
        {title}
      </h2>
      <div className="space-y-3 text-(--text-secondary)">{children}</div>
    </div>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
      <span className="w-56 shrink-0 text-sm font-medium text-(--foreground)">
        {label}
      </span>
      <span className="text-sm">{children}</span>
    </div>
  )
}
