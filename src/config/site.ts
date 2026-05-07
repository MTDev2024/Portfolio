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
}
