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

---

## Fait (archivé)

*(items résolus déplacés ici)*
