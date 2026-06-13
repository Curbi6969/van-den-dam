'use client'

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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

const POP_WIDTH = 280

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
// De popover wordt via een portal in document.body gerenderd met vaste
// positionering, zodat hij nooit door een kaart met overflow:hidden of een
// stacking-context wordt afgekapt. Buiten bewerkmodus rendert dit een gewone link.
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
  const [coords, setCoords] = useState<{
    top: number
    left: number
    above: boolean
    width: number
  } | null>(null)
  const btnRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLSpanElement>(null)
  const Tag = as
  const shown = current ?? href

  const place = useCallback(() => {
    const btn = btnRef.current
    if (!btn) return
    const r = btn.getBoundingClientRect()
    const width = Math.min(POP_WIDTH, window.innerWidth - 24)
    const half = width / 2
    const left = Math.min(Math.max(r.left + r.width / 2, half + 8), window.innerWidth - half - 8)
    const spaceBelow = window.innerHeight - r.bottom
    const above = spaceBelow < 240
    const top = above ? r.top - 10 : r.bottom + 10
    setCoords({ top, left, above, width })
  }, [])

  useLayoutEffect(() => {
    if (open) place()
  }, [open, place])

  useEffect(() => {
    if (!open) return
    const reposition = () => place()
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node
      if (popRef.current?.contains(t) || btnRef.current?.contains(t)) return
      setOpen(false)
    }
    window.addEventListener('scroll', reposition, true)
    window.addEventListener('resize', reposition)
    document.addEventListener('pointerdown', onDown, true)
    return () => {
      window.removeEventListener('scroll', reposition, true)
      window.removeEventListener('resize', reposition)
      document.removeEventListener('pointerdown', onDown, true)
    }
  }, [open, place])

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
        // In bewerkmodus mag de link niet wegnavigeren; het kettingknopje en de
        // popover (die nu in een portal zit) blijven gewoon werken.
        const t = e.target as HTMLElement
        if (t.closest('.vdd-linkbtn')) return
        e.preventDefault()
      }}
    >
      <Tag href={shown} className={className} style={style}>
        {children}
      </Tag>
      <button
        ref={btnRef}
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
      {open &&
        coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <span
            ref={popRef}
            className="vdd-linkpop"
            style={{
              position: 'fixed',
              top: coords.top,
              left: coords.left,
              width: coords.width,
              transform: coords.above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
              autoFocus
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
          </span>,
          document.body,
        )}
    </span>
  )
}
