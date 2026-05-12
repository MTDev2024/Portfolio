# Portfolio — Michael Takbou

Portfolio personnel de développeur frontend React & Next.js, déployé sur [michael-takbou.fr](https://michael-takbou.fr).

## Stack

- **Framework** : Next.js 15 (App Router)
- **Language** : TypeScript
- **CSS** : Tailwind CSS v4
- **Animations** : Framer Motion
- **3D** : React Three Fiber + Drei (fond Hero)
- **Formulaire** : react-hook-form + zod + Resend
- **Déploiement** : Vercel

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL du site (ex: `https://michael-takbou.fr`) |
| `RESEND_API_KEY` | Clé API Resend pour le formulaire de contact |
| `RESEND_FROM_EMAIL` | Email expéditeur (ex: `contact@michael-takbou.fr`) |

## Structure

```
src/
├── app/          # Pages et layout Next.js App Router
├── components/
│   ├── layout/   # Navbar, Footer
│   ├── sections/ # Hero, About, Skills, Projects, Contact
│   ├── three/    # Scène R3F (HeroScene)
│   └── ui/       # Composants génériques
├── config/       # site.ts — configuration globale
├── data/         # projects.ts, skills.ts
├── hooks/        # useTheme, useScrollSpy
└── styles/       # globals.css — tokens CSS
```

## Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run lint     # ESLint
npm run format   # Prettier
```
