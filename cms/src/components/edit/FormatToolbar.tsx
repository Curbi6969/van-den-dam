'use client'

import React, { useEffect, useState } from 'react'
import { useEdit } from './EditContext'
import { sanitizeRich, valueFromElement } from './Editable'

// Zwevende opmaak-werkbalk: verschijnt boven geselecteerde tekst in een
// bewerkbaar veld. Vet/cursief/onderstrepen/link werken via execCommand op de
// contenteditable; het input-event dat daarbij afgaat zorgt dat de wijziging
// via Editable wordt klaargezet om op te slaan. De HTML-knop opent een
// venster met de onderliggende opmaakcode van het hele veld.
export function FormatToolbar() {
  const { editMode, stage } = useEdit()
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [htmlOpen, setHtmlOpen] = useState(false)
  const [htmlDraft, setHtmlDraft] = useState('')

  useEffect(() => {
    if (!editMode) {
      setPos(null)
      setHtmlOpen(false)
      return
    }
    const onSelection = () => {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setPos(null)
        return
      }
      const node = sel.anchorNode
      const el = node instanceof Element ? node : node?.parentElement
      const editable = el?.closest('.vdd-editable') as HTMLElement | null
      if (!editable) {
        setPos(null)
        return
      }
      const rect = sel.getRangeAt(0).getBoundingClientRect()
      setTarget(editable)
      setPos({
        top: Math.max(rect.top - 48, 8),
        left: Math.min(Math.max(rect.left + rect.width / 2, 130), window.innerWidth - 130),
      })
    }
    document.addEventListener('selectionchange', onSelection)
    return () => document.removeEventListener('selectionchange', onSelection)
  }, [editMode])

  if (!editMode) return null

  // Houd focus en selectie in het veld vast terwijl er op de werkbalk wordt geklikt.
  const keepSelection = (e: React.MouseEvent) => e.preventDefault()

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg)
  }

  const addLink = () => {
    const url = window.prompt('Linkadres (bijv. /contact of https://...)')
    if (url && url.trim()) exec('createLink', url.trim())
  }

  const stageTarget = (el: HTMLElement) => {
    const dataPath = el.getAttribute('data-vdd-path')
    if (!dataPath) return
    const idx = dataPath.indexOf(':')
    stage(dataPath.slice(0, idx), dataPath.slice(idx + 1), valueFromElement(el))
  }

  const openHtml = () => {
    if (!target) return
    setHtmlDraft(target.innerHTML)
    setHtmlOpen(true)
    setPos(null)
  }

  const applyHtml = () => {
    if (!target) return
    target.innerHTML = sanitizeRich(htmlDraft)
    stageTarget(target)
    setHtmlOpen(false)
  }

  return (
    <>
      {pos && !htmlOpen && (
        <div className="vdd-fmtbar" style={{ top: pos.top, left: pos.left }}>
          <button type="button" title="Vet" onMouseDown={keepSelection} onClick={() => exec('bold')}>
            <strong>B</strong>
          </button>
          <button
            type="button"
            title="Cursief"
            onMouseDown={keepSelection}
            onClick={() => exec('italic')}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            title="Onderstrepen"
            onMouseDown={keepSelection}
            onClick={() => exec('underline')}
          >
            <u>U</u>
          </button>
          <button type="button" title="Link maken" onMouseDown={keepSelection} onClick={addLink}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M10 14a4.5 4.5 0 0 0 6.4.4l3-3a4.5 4.5 0 0 0-6.4-6.4l-1.7 1.7M14 10a4.5 4.5 0 0 0-6.4-.4l-3 3a4.5 4.5 0 0 0 6.4 6.4l1.7-1.7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            title="Opmaak wissen"
            onMouseDown={keepSelection}
            onClick={() => {
              exec('removeFormat')
              exec('unlink')
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M6 6h12M9 6l3 12m-5 2h6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="m17 15 4 4m0-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" title="HTML bewerken" onMouseDown={keepSelection} onClick={openHtml}>
            {'</>'}
          </button>
        </div>
      )}

      {htmlOpen && (
        <div className="vdd-htmlmodal-overlay" onClick={() => setHtmlOpen(false)}>
          <div className="vdd-htmlmodal" onClick={(e) => e.stopPropagation()}>
            <span className="vdd-htmlmodal-title">HTML van dit tekstveld</span>
            <textarea
              value={htmlDraft}
              onChange={(e) => setHtmlDraft(e.target.value)}
              spellCheck={false}
            />
            <span className="vdd-htmlmodal-hint">
              Toegestaan: &lt;strong&gt;, &lt;em&gt;, &lt;u&gt;, &lt;s&gt;, &lt;a href&gt; en
              &lt;br&gt;. Andere tags worden bij toepassen verwijderd.
            </span>
            <span className="vdd-linkpop-row">
              <button type="button" className="vdd-pop-primary" onClick={applyHtml}>
                Toepassen
              </button>
              <button type="button" className="vdd-pop-ghost" onClick={() => setHtmlOpen(false)}>
                Annuleren
              </button>
            </span>
          </div>
        </div>
      )}
    </>
  )
}
