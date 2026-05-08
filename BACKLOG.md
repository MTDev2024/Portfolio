# Backlog — Améliorations futures

Ce fichier recense les améliorations techniques identifiées mais non prioritaires.
Chaque item indique le fichier concerné, le problème, et la solution attendue.

---

## Dette technique

### [types] Déplacer `Project` vers `src/types/`

**Fichier concerné** : `src/data/projects.ts`
**Problème** : le type `Project` est défini dans un fichier de données. Un composant
qui n'a besoin que du type doit importer depuis un fichier de données.
**Solution** : créer `src/types/project.ts`, y déplacer le type, mettre à jour les imports.
**Priorité** : basse — à faire lors de la création de `src/types/`.

---

## Améliorations

### [mobile] Revoir les gaps entre les sections

**Fichiers concernés** : `src/components/ui/Section.tsx`, sections individuelles
**Problème** : l'espacement vertical entre les sections est trop important sur mobile
(`py-20 md:py-28`). À revoir pour un rendu plus respirant sur petit écran.
**Solution** : réduire le padding vertical sur mobile, ex. `py-14 md:py-28`.
**Priorité** : moyenne.

### [mobile] Affichage des screenshots en mobile

**Fichiers concernés** : `src/components/sections/Projects.tsx`
**Problème** : le split screen (liste à gauche / screenshot à droite) est masqué sur mobile
(`hidden md:block`). Les screenshots ne sont pas visibles sur petit écran.
**Solution** : afficher le screenshot du projet actif sous son titre en mobile,
ou ajouter un carousel horizontal. À concevoir.
**Priorité** : moyenne.

### [projects] Ajouter les screenshots manquants

**Fichiers concernés** : `public/images/projects/`, `src/data/projects.ts`
**Problème** : captures d'écran manquantes pour GameOn et Les Petits Plats.
Le placeholder s'affiche à la place dans le split screen.
**Solution** : prendre les screenshots, les nommer `gameon.png` et `les-petits-plats.png`,
les déposer dans `public/images/projects/`.
**Priorité** : moyenne.

### [projects] Ajouter les nouveaux projets

**Fichiers concernés** : `src/data/projects.ts`, `public/images/projects/`
**Problème** : des images (`artisan.png`, `renovation.png`) sont déjà dans `public/`
mais les projets correspondants ne sont pas encore dans `projects.ts`.
**Solution** : créer les entrées dans `projects.ts` quand les projets seront prêts.
**Priorité** : basse.

### [identity] Avatar illustré

**Fichiers concernés** : `public/avatar-front.svg`, `public/avatar-three-quarter.svg`
**Problème** : les placeholders SVG "MT" sont en place mais l'avatar illustré
(style ligne claire / BD franco-belge, noir et blanc) n'est pas encore créé.
**Solution** : faire créer ou illustrer l'avatar, remplacer les deux fichiers SVG.
**Priorité** : haute — impact direct sur l'identité visuelle du portfolio.

### [infra] Informations légales à compléter

**Fichier concerné** : `src/config/site.ts`
**Problème** : SIRET, adresse et statut juridique sont des placeholders.
**Solution** : remplir quand le statut auto-entrepreneur sera obtenu.
**Priorité** : basse.

### [infra] Domaine custom + email Resend

**Problème** : le site est sur `michael-takbou.vercel.app`, les emails partent
de `onboarding@resend.dev`.
**Solution** : connecter le domaine OVH à Vercel, vérifier le domaine sur Resend,
mettre à jour `RESEND_FROM_EMAIL` et `NEXT_PUBLIC_SITE_URL`.
**Priorité** : basse — à faire quand le domaine sera acheté.

---

## Fait (archivé)

- Correction `bg-white/70` dark mode (Navbar)
- Keys stables sur les cards projet (slugs)
- Typo "Écrivez-moi"
- Suppression `<header>` inutile dans About
- Setup Prettier + VS Code config
- Formulaire de contact (Resend + react-hook-form + zod + rate limiter)
- Section Skills avec badges et animations
- Split screen Projects
- SEO (metadata, OG image, sitemap, robots)
- Déploiement Vercel
- Footer + pages légales
- Menu mobile avec circular reveal
