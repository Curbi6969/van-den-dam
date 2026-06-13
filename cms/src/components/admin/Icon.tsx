'use client'

import React from 'react'

// Klein icoon voor de browser tab / favicon-zone van de Payload admin.
// Toont een minimalistische "VD" monogram in de huisstijlkleuren.
export const Icon: React.FC = () => (
  <div
    aria-label="Van den Dam"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      borderRadius: '6px',
      background: '#232227',
      flexShrink: 0,
    }}
  >
    <span
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 800,
        fontSize: '12px',
        color: '#ff0000',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}
    >
      VD
    </span>
  </div>
)
