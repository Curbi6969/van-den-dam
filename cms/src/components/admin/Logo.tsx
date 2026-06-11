'use client'

import React from 'react'

export const Logo: React.FC = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      userSelect: 'none',
    }}
  >
    {/* Rode verfstreep */}
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: '4px',
        height: '28px',
        borderRadius: '2px',
        background: '#ff0000',
        flexShrink: 0,
      }}
    />
    <span
      style={{
        fontFamily: "'Manrope', sans-serif",
        fontWeight: 800,
        fontSize: '15px',
        lineHeight: 1.1,
        color: '#ffffff',
        letterSpacing: '-0.01em',
      }}
    >
      Van den Dam
      <span
        style={{
          display: 'block',
          fontFamily: "'Work Sans', sans-serif",
          fontWeight: 400,
          fontSize: '11px',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          marginTop: '1px',
        }}
      >
        Schilderwerken
      </span>
    </span>
  </div>
)
