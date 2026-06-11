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
| 8 | Deploy + live verificatie | 🔄 | Build OK, code gepusht. Productie-deploy (`npx vercel deploy --prod` vanuit `cms/`) werd door de permission-classifier geblokkeerd; opnieuw proberen of door gebruiker laten draaien. Daarna verifieren: site live, admin-styling zichtbaar, titelwijziging van gebruiker zichtbaar, publiceren = direct live. |
| 9 | Git-push clobber definitief gefixt | ✅ 2026-06-11 | Root `vercel.json` heeft nu `"ignoreCommand": "exit 0"`: alle git-getriggerde Vercel-builds worden overgeslagen. Pushen is veilig; deployen blijft via CLI. |

## Vaste valkuilen (niet vergeten)

- **Git-push clobber:** Vercel-project `van-den-dam` is git-connected met Root Directory = repo-root. Een `git push` triggert een kapotte root-build die de goede deploy overschrijft. Na elke push: meteen `vercel deploy --prod` vanuit `cms/`. Definitieve fix = Root Directory op `cms` zetten (dashboard of Vercel API).
- **`NEXT_PUBLIC_SERVER_URL`** is build-time: lokaal `http://localhost:3000`, prod `https://van-den-dam.vercel.app`.
- **Geen em-dash** in website-content. Geen Claude-attributie in commits.
- Lokaal draaien: `npm run dev` in `cms/` (heeft `.env` nodig met DATABASE_URI etc.).

## Sessielog

- **2026-06-11:** Cloud-werk gemerged (inline edit-laag: AdminBar + Editable/EditableImage op alle pagina's + catch-all `[slug]`). Lokale experimenten (wet paint button, paint drip 404) gecommit. PROGRESS.md aangemaakt. Volgende: publish-bug.
