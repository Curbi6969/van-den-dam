# CMS setup, Van den Dam

Deze site draait op **Eleventy** (statische build) met **Sveltia CMS** als content-editor.
Content staat in `src/_data/*.json`, de opmaak in `src/_includes/base.njk` en `src/*.njk`.
De editor commit wijzigingen naar GitHub, Vercel bouwt de site opnieuw. De content komt zo
in statische HTML terecht, goed voor SEO.

## Lokaal ontwikkelen

```
npm install
npm run dev      # live preview op http://localhost:8080
npm run build    # productie-build naar dist/
```

`node_modules/` en `dist/` staan in `.gitignore` en worden niet gecommit.

## Hosting op Vercel

`vercel.json` regelt de build:

```
buildCommand: npm run build
outputDirectory: dist
```

In het Vercel-project (gekoppeld aan de repo `Curbi6969/van-den-dam`):
- Root Directory: de repo-root (waar `package.json` staat)
- Framework Preset: Other
- Build & Output worden uit `vercel.json` gelezen

Elke push naar `main` triggert een nieuwe build en deploy.

## CMS-login activeren (eenmalig)

De editor zit op `/admin`. Sveltia gebruikt de GitHub-backend en heeft een kleine
auth-helper nodig (GitHub staat geen pure browser-login toe). Stappen:

### 1. GitHub OAuth App aanmaken
GitHub, Settings, Developer settings, OAuth Apps, New OAuth App:
- Application name: `Van den Dam CMS`
- Homepage URL: de productie-URL van de site
- Authorization callback URL: `https://<auth-worker-url>/callback` (zie stap 2)

Noteer **Client ID** en **Client Secret**.

### 2. Sveltia auth-worker deployen (Cloudflare, gratis)
Deploy `sveltia-cms-auth` (https://github.com/sveltia/sveltia-cms-auth) als Cloudflare Worker.
Zet als worker-variabelen:
- `GITHUB_CLIENT_ID` = client id uit stap 1
- `GITHUB_CLIENT_SECRET` = client secret uit stap 1
- `ALLOWED_DOMAINS` = het Vercel-domein van de site

De worker krijgt een URL zoals `https://van-den-dam-auth.<account>.workers.dev`.
Vul die in stap 1 in als callback (`/callback`) en hieronder.

### 3. base_url invullen
In `src/admin/config.yml`, vervang `https://AUTH_WORKER_URL` door de worker-URL uit stap 2.
Commit en push. Daarna werkt de login op `/admin`.

### 4. Editors toegang geven
De GitHub-backend commit namens de ingelogde gebruiker. Geef elke editor (bijv. de klant)
**write-toegang** tot de repo `Curbi6969/van-den-dam` (GitHub, repo Settings, Collaborators).
Beau blijft eigenaar en beheert de structuur; editors passen alleen content aan via `/admin`.

## Content bewerken

1. Ga naar `<site-url>/admin`, log in met GitHub.
2. Kies een pagina onder **Pagina's**, **Diensten (detailpagina's)** of **Algemene instellingen**.
3. Pas tekst of afbeeldingen aan, klik Opslaan/Publiceren.
4. Vercel bouwt automatisch opnieuw, binnen ~1 minuut staat het live.

Afbeeldingen die je uploadt komen in `src/resources/` en worden als `resources/<bestand>` gebruikt.

## Schrijfregel

Gebruik nooit het em-dash teken in content. Gebruik een komma, dubbele punt of punt.
