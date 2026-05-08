// Variable d'environnement à définir dans .env.local et dans Vercel
// NEXT_PUBLIC_SITE_URL=https://mon-domaine.fr
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://michael-takbou.vercel.app"

export const site = {
  url: siteUrl,
  name: "Michael Takbou",
  title: "Portfolio — Développeur Frontend React & Next.js",
  description:
    "Portfolio de Michael Takbou, développeur frontend spécialisé en React et Next.js. Interfaces modernes, accessibles et performantes.",
  email: "mt.dev.2023@gmail.com",

  legal: {
    status: "Auto-entrepreneur",
    siret: "XXX XXX XXX XXXXX", // à remplir
    address: "XXX rue XXXX", // à remplir
    zipCode: "XXXXX", // à remplir
    city: "XXXXX", // à remplir
    director: "Michael Takbou",
    host: "Vercel Inc.",
    hostUrl: "https://vercel.com",
    hostAddress: "340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
    updated: "2026-05-08",
  },
}
