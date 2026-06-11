'use client'

import React from 'react'
import { useEdit } from './EditContext'

// Markeringen voor bewerkbare elementen, alleen actief in bewerkmodus.
const editCss = `
  .vdd-editable { outline: 1.5px dashed rgba(255,0,0,0.35); outline-offset: 3px; border-radius: 2px; cursor: text; }
  .vdd-editable:hover { outline-color: rgba(255,0,0,0.8); }
  .vdd-editable:focus { outline: 2px solid #ff0000; outline-offset: 3px; }
  .vdd-editable-img { outline: 2px dashed rgba(255,0,0,0.5); outline-offset: -2px; cursor: pointer; }
  .vdd-editable-img:hover { outline-color: #ff0000; filter: brightness(0.92); }
`

function PencilIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Zwevende bewerkknop + opslagbalk voor ingelogde CMS-gebruikers. Voor gewone
// bezoekers rendert dit niets.
export function AdminBar() {
  const { user, editMode, setEditMode, dirtyCount, discard, save, saving, toast, notify } =
    useEdit()
  if (!user) return null

  const onSave = async (publish: boolean) => {
    if (dirtyCount === 0) {
      notify('Geen wijzigingen om op te slaan.')
      return
    }
    const ok = await save(publish)
    if (ok) {
      setEditMode(false)
      notify(
        publish
          ? 'Gepubliceerd! De wijziging staat direct op de live site.'
          : 'Concept opgeslagen. Publiceer het later hier of via het CMS.',
      )
    }
  }

  const onToggle = () => {
    if (!editMode) {
      setEditMode(true)
      return
    }
    if (dirtyCount > 0) {
      if (window.confirm('Niet-opgeslagen wijzigingen verwerpen?')) discard()
      return
    }
    setEditMode(false)
  }

  return (
    <>
      {editMode && <style>{editCss}</style>}

      {/* Zwevende potlood-knop */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={editMode ? 'Bewerkmodus sluiten' : 'Pagina bewerken'}
        title={editMode ? 'Bewerkmodus sluiten' : 'Pagina bewerken'}
        className={`fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center text-white ambient-shadow transition-colors ${
          editMode ? 'bg-secondary' : 'bg-primary hover:bg-primary-container'
        }`}
      >
        {editMode ? <CloseIcon /> : <PencilIcon />}
      </button>

      {/* Opslagbalk in bewerkmodus */}
      {editMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] bg-primary text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-4 ambient-shadow font-label text-sm">
          <span className="whitespace-nowrap">
            {dirtyCount === 0
              ? 'Klik op tekst of een afbeelding'
              : `${dirtyCount} wijziging${dirtyCount === 1 ? '' : 'en'}`}
          </span>
          <button
            type="button"
            onClick={() => onSave(false)}
            disabled={saving || dirtyCount === 0}
            className="px-4 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-colors disabled:opacity-40 whitespace-nowrap"
          >
            {saving ? 'Bezig...' : 'Concept opslaan'}
          </button>
          <button
            type="button"
            onClick={() => onSave(true)}
            disabled={saving || dirtyCount === 0}
            className="px-4 py-2 rounded-full bg-secondary text-on-secondary font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 whitespace-nowrap"
          >
            {saving ? 'Bezig...' : 'Publiceren'}
          </button>
          <a
            href="/admin"
            className="px-3 py-2 rounded-full text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            CMS
          </a>
        </div>
      )}

      {/* Melding */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] bg-primary text-white rounded-xl px-6 py-4 ambient-shadow font-body text-sm max-w-md text-center">
          {toast}
        </div>
      )}
    </>
  )
}
