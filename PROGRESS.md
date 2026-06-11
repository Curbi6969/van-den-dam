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
| 10 | Admin visueel geverifieerd (screenshots via headless Chrome + puppeteer-core in `.claude/screenshots/`) | ✅ | Login toont huisstijl. Bug gevonden: logo was wit-op-licht; tekstkleur naar antraciet gezet. |
| 11 | Icon-font subset dynamisch | ✅ code | `(frontend)/layout.tsx` verzamelt nu `icon`-velden uit alle globals + vaste UI-iconen en bouwt de Google Fonts `icon_names`-URL. Nieuw icoon via CMS werkt vanzelf na publiceren (pagina-regeneratie). |
| 12 | Logboek (audit log) | ✅ code | Collectie `audit-log` (alleen-lezen, NL labels) + `hooks/logChange.ts` in withPublishFlow: wie/wat/wanneer bij elke opslag en publicatie. Versiehistorie per pagina van 20 naar 50. |
| 13 | Dagelijkse DB-backup | 🔄 | `.github/workflows/db-backup.yml` (pg_dump om 03:00, artifact 30 dagen). **Gebruiker moet nog 1 secret zetten** (classifier blokkeerde het): `SUPABASE_DB_URL` = DATABASE_URI uit `cms/.env` met poort 6543 vervangen door 5432. Commando staat in de chat. |
| 14 | Schema push audit_log | ✅ | Via lokale dev-run tegen productie-DB. |

## Sessielog

- **2026-06-11:** Cloud-werk gemerged (inline edit-laag: AdminBar + Editable/EditableImage op alle pagina's + catch-all `[slug]`). Lokale experimenten (wet paint button, paint drip 404) gecommit. PROGRESS.md aangemaakt. Volgende: publish-bug.
