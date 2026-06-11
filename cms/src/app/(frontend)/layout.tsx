import React from 'react'
import './styles.css'
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

const ICON_NAMES =
  'architecture,arrow_back,arrow_forward,award_star,brush,call,check_circle,chevron_right,close,diversity_3,email,expand_more,format_paint,handshake,home,location_on,mail,menu,phone,schedule,star,verified'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite('nl')
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
          href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&icon_names=${ICON_NAMES}&display=block`}
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
