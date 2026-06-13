# PROGRESS.md — sessie-brain voor Van den Dam CMS

> **Voor Claude:** lees dit bestand aan het begin van elke sessie over Van den Dam.
> Werk het bij na elke afgeronde stap (status omzetten, datum erbij). Commit het mee.
> Actieve stack = Payload v3 + Next.js in `cms/`. Root Eleventy-site is legacy, niet aankomen.

## Doel (opdracht 2026-06-11)

1. **Inline editing op de live site** — ingelogde CMS-gebruiker ziet een widget/balk op de site en kan tekst en afbeeldingen direct aanklikken en bewerken. (Cloud-agent heeft dit gebouwd: `cms/src/components/edit/` — AdminBar, EditContext, Editable, EditableImage.)
2. **Publish-bug fixen** — gepubliceerde wijziging verscheen na 30+ min nog niet op de live site.
3. **Knoppen bewerkbaar** — knopteksten (CTA's) moeten in het CMS aanpasbaar zijn.
4. **Afbeeldingen: alleen vervangen** — bestaande afbeelding in een sectie mag vervangen worden, maar geen "afbeelding toevoegen" die de layout sloopt.
5. **Admin-UI rebranding + versimpeling** — zelfde kleuren/fonts/look als de site, begrijpelijk voor niet-technische mensen.

## Status

| # | Stap | Status | Notities |
|---|------|--------|----------|
| 1 | Cloud-branch `claude/implement-todo-item-SvCln` gemergd in main | ✅ 2026-06-11 | Inline editing van cloud-agent binnen. Conflict in HomeView opgelost (WetPaintButton + Editable imports samen). |
| 2 | PROGRESS.md aangemaakt | ✅ 2026-06-11 | Dit bestand. |
| 3 | Publish-bug fixen | ✅ code 2026-06-11 | Oorzaak: pagina's statisch bevroren bij build, DEPLOY_HOOK_URL wees nergens heen. Fix: `cms/src/hooks/revalidateSite.ts` (revalidatePath bij publiceren) gekoppeld in payload.config.ts. Nog live verifieren na deploy. |
| 4 | Inline editing reviewen + lokaal builden | ✅ 2026-06-11 | Code gereviewd, `npm run build` slaagt. Let op: nieuwe Payload-velden bestaan pas in Supabase na een keer `npm run dev` draaien (drizzle schema push); anders faalt de build op ontbrekende kolommen. |
| 5 | Knopteksten bewerkbaar in CMS | ✅ 2026-06-11 | 6 nieuwe velden in Home (hero.ctaPrimary/ctaSecondary, servicesIntro.ctaViewAll, servicesCards[].linkLabel, about.ctaLabel, portfolioIntro.ctaViewAll) + defaults in map.ts + Editable in HomeView. Andere pagina's hadden alles al bewerkbaar. Alle globals hebben nu een NL admin.description. |
| 6 | Add-image weg, alleen replace | ✅ 2026-06-11 | Media-collectie verborgen in admin-nav (`collections/Media.ts` admin.hidden). Upload-velden per sectie blijven werken (= vervangen kan, los toevoegen niet). |
| 7 | Admin-UI rebranding + versimpeling | ✅ 2026-06-11 | `(payload)/custom.scss`: site-palet (antraciet #232227, rood #ff0000, surface #fbf8ff), Manrope/Work Sans/Inter, donkere sidebar, rode knoppen, dark mode uit, API-tab verborgen. Logo/Icon in `components/admin/`, admin.meta NL. Commit `01c754f`, gepusht. |
| 8 | Deploy + live verificatie | ✅ 2026-06-11 | Git-push triggerde een succesvolle productie-deploy (Root Directory staat inmiddels op `cms` in het Vercel-dashboard, dus pushes bouwen nu gewoon de Next.js-app). Live geverifieerd: homepage 200 met content, /admin 200 met nieuwe branding-titel. Nog door gebruiker te testen: inloggen, potlood-knop, publiceren = direct live. |
| 9 | Git-push clobber definitief gefixt | ✅ 2026-06-11 | Root `vercel.json` heeft nu `"ignoreCommand": "exit 0"`: alle git-getriggerde Vercel-builds worden overgeslagen. Pushen is veilig; deployen blijft via CLI. |

## Vaste valkuilen (niet vergeten)

- **Deployen = gewoon `git push`.** Root Directory van het Vercel-project staat op `cms`, dus elke push naar main bouwt en deployt de Next.js-app automatisch (geverifieerd 2026-06-11). Het oude clobber-risico bestaat niet meer; CLI-deploy (`npx vercel deploy --prod`) is alleen nog een fallback.
- **Nieuwe Payload-velden = eerst lokaal `npm run dev`** draaien en 1 request doen tegen de productie-DB, anders mist de kolom in Supabase en faalt de volgende build op "column does not exist".
- **`NEXT_PUBLIC_SERVER_URL`** is build-time: lokaal `http://localhost:3000`, prod `https://van-den-dam.vercel.app`.
- **Geen em-dash** in website-content. Geen Claude-attributie in commits.
- Lokaal draaien: `npm run dev` in `cms/` (heeft `.env` nodig met DATABASE_URI etc.).

## Ronde 2 (2026-06-11, zelfde dag)

| # | Stap | Status | Notities |
|---|------|--------|----------|
| 10 | Admin visueel geverifieerd (screenshots via puppeteer-core in `.claude/screenshots/`, Edge als browser is stabieler dan Chrome) | ✅ | Login toont huisstijl. Bug gevonden en gefixt: logo was wit-op-licht, nu antraciet; fix live geverifieerd met nieuwe screenshot. |
| 11 | Icon-font subset dynamisch | ✅ code | `(frontend)/layout.tsx` verzamelt nu `icon`-velden uit alle globals + vaste UI-iconen en bouwt de Google Fonts `icon_names`-URL. Nieuw icoon via CMS werkt vanzelf na publiceren (pagina-regeneratie). |
| 12 | Logboek (audit log) | ✅ code | Collectie `audit-log` (alleen-lezen, NL labels) + `hooks/logChange.ts` in withPublishFlow: wie/wat/wanneer bij elke opslag en publicatie. Versiehistorie per pagina van 20 naar 50. |
| 13 | Dagelijkse DB-backup | ✅ 2026-06-11 | `.github/workflows/db-backup.yml`: pg_dump (v17-binary, sessie-pooler poort 5432) om 03:00, artifact 30 dagen bewaard, handmatig te draaien via Actions. Secret `SUPABASE_DB_URL` staat op de repo (via `gh secret set --body`, NIET via pipe: PowerShell 5.1 pipe-encoding verminkt de waarde). Testrun geslaagd (run 27365860835). |
| 14 | Schema push audit_log | ✅ | Via lokale dev-run tegen productie-DB. |

## Ronde 3 (2026-06-12): live bewerken uitgebreid

| # | Stap | Status | Notities |
|---|------|--------|----------|
| 15 | Knop-links bewerkbaar | ✅ 2026-06-12 | Alle knoppen/links hebben nu een href-veld in het CMS (Home 7x nieuw, 404 2x, privacy-teruglink; diensten/over-ons/portfolio hadden ze al). Nieuw `components/edit/EditableLink.tsx`: kettingknopje op elke knop in bewerkmodus, popover met paginakeuze + vrij URL-veld. |
| 16 | Opmaak bij live bewerken | ✅ 2026-06-12 | `FormatToolbar.tsx`: zwevende werkbalk bij tekstselectie (vet, cursief, onderstrepen, link, opmaak wissen, HTML-venster). `Editable` slaat gesaneerde HTML op (alleen strong/em/u/s/a/br; zonder opmaak blijft het platte tekst) en rendert HTML-waarden via dangerouslySetInnerHTML. autoTranslate stuurt velden met opmaak als HTML naar DeepL (tag_handling). |
| 17 | SEO bewerkbaar op de pagina zelf | ✅ 2026-06-12 | SEO-knop in de bewerkbalk opent `SeoPanel.tsx`: paginatitel + omschrijving met tekenteller en Google-voorbeeld, loopt mee in concept/publiceer-flow (staged als `meta.title`/`meta.description`). Belangrijk: de plugin-seo meta-velden werden nergens gerenderd; nu hebben alle pagina-routes `generateMetadata` via `pageMetadata()` in `frontend/queries.ts`. |
| 18 | Schema push + build + smoke test | ✅ 2026-06-12 | Nieuwe kolommen via lokale dev-run naar Supabase gepusht, `npm run build` slaagt, alle 7 routes 200, knop-hrefs gecontroleerd in de HTML. |

## Ronde 4 (2026-06-13): admin-UI responsive + grouping + live-edit-knop

| # | Stap | Status | Notities |
|---|------|--------|----------|
| 19 | Echt logo op inlogscherm | ✅ 2026-06-13 | `components/admin/Logo.tsx` toont nu `/resources/vandenDam-logo.jpg` i.p.v. de tekst-versie. |
| 20 | Dashboard-icoon werd afgekapt | ✅ 2026-06-13 | Het VD-icoon zit in `.step-nav__home` (breadcrumb-home, smal slot). Icoon naar 28px + `custom.scss` zet `overflow:visible` op de hele app-header/step-nav-keten en forceert 28px. Geverifieerd via screenshot: volledig "VD" zichtbaar. |
| 21 | Zoektekst stond achter het vergrootglas | ✅ 2026-06-13 | Globale input-padding overschreef Payloads linker-ruimte voor het zoek-icoon. `.search-filter__input` krijgt `padding-left:2.6rem`, icoon absoluut gepositioneerd. |
| 22 | Velden gegroepeerd (label + link naast elkaar) | ✅ 2026-06-13 | Alle knoptekst+URL-paren in `type:'row'` gezet (Home, Diensten, Portfolio, Over Ons, Privacy, 404, SiteSettings). Puur presentatie: types-diff = alleen volgorde, geen nieuwe kolommen, dus GEEN schema-push nodig. |
| 23 | Directe "live bewerken"-knop op elke pagina-global | ✅ 2026-06-13 | `components/admin/EditLivePill.tsx` (ui-veld, geïnjecteerd via `withPublishFlow` in payload.config.ts) toont bovenaan elke pagina een rode knop naar de live pagina met `?edit=1`. `EditContext` zet bewerkmodus meteen aan bij `?edit=1`. Import-map opnieuw gegenereerd. |
| 24 | Lokaal builden + screenshots alle admin-pagina's | ✅ 2026-06-13 | `npm run build` (tegen lokale sqlite) slaagt, 11 routes. Screenshots desktop+mobiel van alle 14 admin-views in `.claude/screenshots/cms-audit/`. Edge headless 'new' crasht vaak bij fullPage; script `cms-audit.js` herstart de browser per crash en gebruikt cookie-auth (REST `first-register`). |

> Mobiel-aandachtspunt voor later: de doc-controls-knop "Publiceer wijzigingen" kan op 390px nog licht afgekapt zijn (Payload-eigen gedrag); `flex-wrap` toegevoegd maar niet perfect.

## Ronde 5 (2026-06-13): live inline-editor popover + responsive

| # | Stap | Status | Notities |
|---|------|--------|----------|
| 25 | Link-popover werd door kaart afgekapt | ✅ 2026-06-13 | Oorzaak: servicekaart-`div` heeft `overflow-hidden` (HomeView.tsx) en de popover stond `position:absolute` binnen de kaart. Fix: `EditableLink.tsx` rendert de popover nu via een React-**portal naar document.body** met `position:fixed`, herpositioneert bij scroll/resize en sluit bij klik-buiten. z-index naar 10002. Popover-breedte schaalt mee op smal scherm. |
| 26 | Inline-editor responsive | ✅ 2026-06-13 | `AdminBar.tsx`: opslagbalk wrapt en staat op mobiel boven de sluitknop (`bottom-24 md:bottom-6`, `flex-wrap`, compacte tekst); SEO-paneel/opmaakbalk krijgen mobiele breedtes via media-query in `editCss`. |

> **HERVATTEN — nog te doen:** Visueel testen van de live inline-functies kon NIET af: headless Edge op deze machine crasht bij elke klik-interactie (resource-uitputting, `0xc0000142` / "session closed"). Geverifieerd: bewerkmodus homepage desktop+mobiel + responsive opslagbalk (screenshots in `.claude/screenshots/inline-test/`). NIET met screenshot bevestigd (wel via code + bevestigde `overflow-hidden`-oorzaak): de popover open op een kaart, SEO-paneel, opmaakbalk bij tekstselectie, afbeelding-vervangen. Lokaal testen: `npm run build` + `npx next start -p 3030` met `DATABASE_URI=file:./screenshot.db` (seed via `.claude/screenshots/seed-rest.mjs`, user audit@local.test / AuditTest12345!). Productie-build slaagt; geen schema-push nodig (geen nieuwe kolommen).

## Sessielog

- **2026-06-11:** Cloud-werk gemerged (inline edit-laag: AdminBar + Editable/EditableImage op alle pagina's + catch-all `[slug]`). Lokale experimenten (wet paint button, paint drip 404) gecommit. PROGRESS.md aangemaakt. Volgende: publish-bug.
