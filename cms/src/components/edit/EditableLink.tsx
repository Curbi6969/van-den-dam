'use client'

import React, { useState } from 'react'
import { useEdit } from './EditContext'

type Props = {
  global?: string
  path: string
  href: string
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

// Vaste pagina's van de site als snelkeuze in de link-popover.
const PAGES = [
  { label: 'Homepage', value: '/' },
  { label: 'Diensten', value: '/diensten' },
  { label: 'Portfolio', value: '/portfolio' },
  { label: 'Over ons', value: '/over-ons' },
  { label: 'Contact', value: '/contact' },
  { label: 'Privacyverklaring', value: '/privacyverklaring' },
]

function LinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M10 14a4.5 4.5 0 0 0 6.4.4l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.7 1.7M14 10a4.5 4.5 0 0 0-6.4-.4l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.7-1.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Link (knop, teruglink, "meer lezen") waarvan in bewerkmodus ook de
// bestemming aanpasbaar is via een klein kettingknopje met popover.
// Buiten bewerkmodus rendert dit een gewone link.
export function EditableLink({
  global = 'home',
  path,
  href,
  as = 'a',
  className,
  style,
  children,
}: Props) {
  const { user, editMode, stage } = useEdit()
  const [current, setCurrent] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const Tag = as
  const shown = current ?? href

  if (!user || !editMode) {
    return (
      <Tag href={shown} className={className} style={style}>
        {children}
      </Tag>
    )
  }

  const apply = () => {
    const value = draft.trim() || '/'
    setCurrent(value)
    stage(global, path, value)
    setOpen(false)
  }

  return (
    <span
      className="vdd-linkwrap"
      onClickCapture={(e) => {
        // In bewerkmodus mag de link niet wegnavigeren; de popover-velden en
        // het kettingknopje moeten wel gewoon blijven werken.
        const t = e.target as HTMLElement
        if (t.closest('.vdd-linkpop') || t.closest('.vdd-linkbtn')) return
        e.preventDefault()
      }}
    >
      <Tag href={shown} className={className} style={style}>
        {children}
      </Tag>
      <button
        type="button"
        className="vdd-linkbtn"
        title={`Link aanpassen (nu: ${shown})`}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setDraft(shown)
          setOpen((v) => !v)
        }}
      >
        <LinkIcon />
      </button>
      {open && (
        <span className="vdd-linkpop" onClick={(e) => e.stopPropagation()}>
          <span className="vdd-linkpop-title">Deze knop verwijst naar</span>
          <select
            value={PAGES.some((p) => p.value === draft) ? draft : ''}
            onChange={(e) => {
              if (e.target.value) setDraft(e.target.value)
            }}
          >
            <option value="">Eigen adres...</option>
            {PAGES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={draft}
            placeholder="/contact, https://..., tel: of mailto:"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') apply()
              if (e.key === 'Escape') setOpen(false)
            }}
          />
          <span className="vdd-linkpop-row">
            <button type="button" className="vdd-pop-primary" onClick={apply}>
              Toepassen
            </button>
            <button type="button" className="vdd-pop-ghost" onClick={() => setOpen(false)}>
              Annuleren
            </button>
          </span>
        </span>
      )}
    </span>
  )
}
