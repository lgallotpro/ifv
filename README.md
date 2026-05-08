# Dashboard Contrib (Vite)

## Installation

```bash
npm install
```

## Variables d'environnement

Copiez `.env.example` vers `.env` puis renseignez :

- `VITE_PUBLIC_EXPERIENCE_URL`
- `VITE_CONTRIBUTOR_EXPERIENCE_URL`

## Lancement local

```bash
npm run dev
```

## Build production

```bash
npm run build
```

Le build statique sera genere dans `dist/`.

## GitHub Pages

Le projet est configure avec `base: "./"` dans `vite.config.js`, ce qui est compatible avec un deploiement GitHub Pages.

Le workflow `.github/workflows/deploy.yml` deploie automatiquement sur GitHub Pages a chaque push sur `main`.

Avant le premier deploy, ajoutez dans **Settings > Secrets and variables > Actions > Variables** :

- `VITE_PUBLIC_EXPERIENCE_URL`
- `VITE_CONTRIBUTOR_EXPERIENCE_URL`
