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

*(à compléter au fil du développement)*

---

## Fait (archivé)

*(items résolus déplacés ici)*
