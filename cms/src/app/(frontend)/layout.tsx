import React from 'react'
import './styles.css'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { getSite } from '@/frontend/queries'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { EditProvider } from '@/components/edit/EditContext'
import { AdminBar } from '@/components/edit/AdminBar'

export const metadata = {
  title: 'Van den Dam Schilderwerken',
  description:
    'Van den Dam Schilderwerken, familiebedrijf met meer dan 25 jaar ervaring in binnen- en buitenschilderwerk, glasservice en speciale afwerkingen.',
}

// Iconen die de site-UI zelf gebruikt (navigatie, knoppen, formulieren).
const BASE_ICONS =
  'architecture,arrow_back,arrow_forward,award_star,brush,call,check_circle,chevron_right,close,diversity_3,email,expand_more,format_paint,handshake,home,location_on,mail,menu,phone,schedule,star,verified'

// Iconen kunnen ook in het CMS staan (bijv. de vertrouwensstrook op de homepage).
// Verzamel ze uit alle pagina-globals zodat een nieuw icoon na publiceren vanzelf
// in het font-subset terechtkomt; de pagina wordt toch opnieuw gegenereerd.
const GLOBAL_SLUGS = [
  'home',
  'diensten',
  'portfolio',
  'over-ons',
  'contact',
  'privacyverklaring',
  'niet-gevonden',
  'site-settings',
] as const

function collectIcons(value: unknown, found: Set<string>): void {
  if (Array.isArray(value)) {
    for (const item of value) collectIcons(item, found)
    return
  }
  if (value && typeof value === 'object') {
    for (const [key, v] of Object.entries(value as Record<string, unknown>)) {
      if (key === 'icon' && typeof v === 'string' && /^[a-z0-9_]+$/.test(v)) found.add(v)
      else collectIcons(v, found)
    }
  }
}

async function buildIconNames(): Promise<string> {
  const found = new Set<string>(BASE_ICONS.split(','))
  try {
    const payload = await getPayload({ config: await configPromise })
    for (const slug of GLOBAL_SLUGS) {
      const doc = await payload.findGlobal({ slug, locale: 'nl', depth: 0 })
      collectIcons(doc, found)
    }
  } catch {
    // Bij een DB-storing valt het subset terug op de vaste UI-iconen.
  }
  return [...found].sort().join(',')
}

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite('nl')
  const iconNames = await buildIconNames()
  return (
    <html lang="nl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Work+Sans:wght@300;400;500;600&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=${iconNames}&display=block`}
          rel="stylesheet"
        />
      </head>
      <body>
        <EditProvider>
          <Nav site={site} />
          {children}
          <Footer site={site} />
          <AdminBar />
        </EditProvider>
      </body>
    </html>
  )
}
