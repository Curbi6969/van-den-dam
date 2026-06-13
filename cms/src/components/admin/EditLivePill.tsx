'use client'

import React from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

// Frontend-URL per pagina-global. Komt overeen met livePreviewPath in payload.config.ts.
const livePath: Record<string, string> = {
  home: '/',
  diensten: '/diensten',
  portfolio: '/portfolio',
  'over-ons': '/over-ons',
  contact: '/contact',
  privacyverklaring: '/privacyverklaring',
  'niet-gevonden': '/niet-gevonden',
  'site-settings': '/',
}

function PencilIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0 0-3L17 5a2.1 2.1 0 0 0-3 0L3.5 15.5 4 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="m12.5 6.5 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

// Directe knop naar de live pagina in bewerkmodus, op elke pagina-global in de admin.
// Opent de echte website met ?edit=1 zodat de inline-bewerkbalk meteen aanstaat.
export const EditLivePill: React.FC = () => {
  const { globalSlug } = useDocumentInfo()
  const slug = globalSlug ?? ''
  if (!(slug in livePath)) return null

  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const href = `${base}${livePath[slug]}?edit=1`

  return (
    <div style={{ margin: '0 0 28px' }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 16px',
          borderRadius: '8px',
          background: '#ff0000',
          color: '#ffffff',
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 600,
          fontSize: '14px',
          textDecoration: 'none',
          boxShadow: '0 2px 8px rgba(255,0,0,0.2)',
        }}
      >
        <PencilIcon />
        Deze pagina live bewerken op de website
      </a>
      <p
        style={{
          margin: '8px 2px 0',
          fontFamily: "'Work Sans', sans-serif",
          fontSize: '12.5px',
          color: '#75777d',
        }}
      >
        Opent de echte pagina in een nieuw tabblad. Klik daar direct op teksten, knoppen en
        afbeeldingen om ze aan te passen.
      </p>
    </div>
  )
}
