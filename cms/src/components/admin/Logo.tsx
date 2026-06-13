'use client'

import React from 'react'

// Volledig huisstijl-logo op het inlogscherm en accountscherm van de admin.
// Hergebruikt het echte Van den Dam-logo van de website (in /public/resources).
export const Logo: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      padding: '8px 0',
      userSelect: 'none',
    }}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="/resources/vandenDam-logo.jpg"
      alt="Van den Dam Schilderwerken"
      style={{
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        display: 'block',
      }}
    />
  </div>
)
