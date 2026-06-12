'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useEdit } from './EditContext'
import { FormatToolbar } from './FormatToolbar'
import { SeoPanel, SEO_GLOBALS } from './SeoPanel'

// Markeringen voor bewerkbare elementen + alle bewerk-UI (linkpopover,
// opmaak-werkbalk, HTML-venster, SEO-paneel), alleen actief in bewerkmodus.
const editCss = `
  .vdd-editable { outline: 1.5px dashed rgba(255,0,0,0.35); outline-offset: 3px; border-radius: 2px; cursor: text; }
  .vdd-editable:hover { outline-color: rgba(255,0,0,0.8); }
  .vdd-editable:focus { outline: 2px solid #ff0000; outline-offset: 3px; }
  .vdd-editable-img { outline: 2px dashed rgba(255,0,0,0.5); outline-offset: -2px; cursor: pointer; }
  .vdd-editable-img:hover { outline-color: #ff0000; filter: brightness(0.92); }

  .vdd-linkwrap { position: relative; display: inline-block; }
  .vdd-linkbtn { position: absolute; top: -10px; right: -10px; z-index: 9998; width: 24px; height: 24px; border-radius: 9999px; background: #ff0000; color: #fff; display: flex; align-items: center; justify-content: center; border: 2px solid #fff; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }
  .vdd-linkbtn:hover { background: #232227; }
  .vdd-linkpop { position: absolute; top: calc(100% + 10px); left: 50%; transform: translateX(-50%); z-index: 9999; display: flex; flex-direction: column; gap: 8px; width: 280px; background: #232227; color: #fff; border-radius: 12px; padding: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.35); font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: normal; text-transform: none; text-align: left; cursor: default; white-space: normal; }
  .vdd-linkpop-title { font-weight: 600; }
  .vdd-linkpop select, .vdd-linkpop input { width: 100%; border-radius: 8px; border: 1px solid rgba(255,255,255,0.25); background: #fff; color: #232227; padding: 7px 10px; font: inherit; }
  .vdd-linkpop-row { display: flex; gap: 8px; justify-content: flex-end; }
  .vdd-pop-primary { background: #ff0000; color: #fff; border: none; border-radius: 8px; padding: 7px 14px; font: inherit; font-weight: 600; cursor: pointer; }
  .vdd-pop-primary:hover { opacity: 0.9; }
  .vdd-pop-ghost { background: transparent; color: rgba(255,255,255,0.7); border: none; padding: 7px 10px; font: inherit; cursor: pointer; }
  .vdd-pop-ghost:hover { color: #fff; }

  .vdd-fmtbar { position: fixed; transform: translateX(-50%); z-index: 10000; display: flex; gap: 2px; background: #232227; border-radius: 10px; padding: 4px; box-shadow: 0 6px 20px rgba(0,0,0,0.35); }
  .vdd-fmtbar button { width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; background: transparent; color: #fff; border: none; border-radius: 7px; font-family: 'Inter', sans-serif; font-size: 14px; cursor: pointer; }
  .vdd-fmtbar button:hover { background: rgba(255,255,255,0.15); }

  .vdd-htmlmodal-overlay { position: fixed; inset: 0; z-index: 10001; background: rgba(35,34,39,0.5); display: flex; align-items: center; justify-content: center; padding: 24px; }
  .vdd-htmlmodal { width: 100%; max-width: 560px; background: #232227; color: #fff; border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 10px; font-family: 'Inter', sans-serif; font-size: 13px; box-shadow: 0 14px 40px rgba(0,0,0,0.4); }
  .vdd-htmlmodal-title { font-weight: 600; font-size: 14px; }
  .vdd-htmlmodal textarea { width: 100%; min-height: 160px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.25); background: #fff; color: #232227; padding: 10px 12px; font-family: ui-monospace, Consolas, monospace; font-size: 12.5px; line-height: 1.5; resize: vertical; }
  .vdd-htmlmodal-hint { color: rgba(255,255,255,0.6); font-size: 12px; }

  .vdd-seopanel { position: fixed; right: 24px; bottom: 96px; z-index: 9999; width: 340px; max-height: calc(100vh - 140px); overflow-y: auto; background: #232227; color: #fff; border-radius: 14px; padding: 18px; display: flex; flex-direction: column; gap: 14px; font-family: 'Inter', sans-serif; font-size: 13px; box-shadow: 0 14px 40px rgba(0,0,0,0.4); }
  .vdd-seopanel-head { display: flex; align-items: center; justify-content: space-between; font-weight: 700; font-size: 15px; }
  .vdd-seopanel-head button { background: transparent; border: none; color: rgba(255,255,255,0.7); font-size: 14px; cursor: pointer; }
  .vdd-seopanel-head button:hover { color: #fff; }
  .vdd-seopanel label { display: flex; flex-direction: column; gap: 6px; font-weight: 600; }
  .vdd-seo-labelrow { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; }
  .vdd-seopanel input, .vdd-seopanel textarea { border-radius: 8px; border: 1px solid rgba(255,255,255,0.25); background: #fff; color: #232227; padding: 8px 10px; font: inherit; font-weight: 400; resize: vertical; }
  .vdd-seo-count { font-weight: 400; color: rgba(255,255,255,0.6); white-space: nowrap; }
  .vdd-seo-count.over { color: #ffb4ab; font-weight: 600; }
  .vdd-seo-preview { display: flex; flex-direction: column; gap: 2px; background: #fff; border-radius: 10px; padding: 12px 14px; }
  .vdd-seo-preview-title { color: #1a0dab; font-size: 16px; font-family: Arial, sans-serif; line-height: 1.3; overflow-wrap: anywhere; }
  .vdd-seo-preview-url { color: #006621; font-size: 12px; font-family: Arial, sans-serif; }
  .vdd-seo-preview-desc { color: #545454; font-size: 13px; font-family: Arial, sans-serif; line-height: 1.4; }
  .vdd-seopanel-hint, .vdd-seopanel-loading { color: rgba(255,255,255,0.6); font-size: 12px; margin: 0; }

  .vdd-linkpop :focus, .vdd-fmtbar :focus, .vdd-htmlmodal :focus, .vdd-seopanel :focus { outline: none; }
  .vdd-linkpop input:focus, .vdd-linkpop select:focus, .vdd-htmlmodal textarea:focus, .vdd-seopanel input:focus, .vdd-seopanel textarea:focus { border-color: #ff0000; }
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
  const [seoOpen, setSeoOpen] = useState(false)
  const pathname = usePathname()
  if (!user) return null

  // De pagina-global die bij de huidige URL hoort, voor het SEO-paneel.
  const seoGlobal = pathname === '/' ? 'home' : (pathname ?? '').replace(/^\//, '').split('/')[0]
  const hasSeo = SEO_GLOBALS.has(seoGlobal)

  const onSave = async (publish: boolean) => {
    if (dirtyCount === 0) {
      notify('Geen wijzigingen om op te slaan.')
      return
    }
    const ok = await save(publish)
    if (ok) {
      setEditMode(false)
      setSeoOpen(false)
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
    setSeoOpen(false)
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
              ? 'Klik op tekst, een knop of een afbeelding'
              : `${dirtyCount} wijziging${dirtyCount === 1 ? '' : 'en'}`}
          </span>
          {hasSeo && (
            <button
              type="button"
              onClick={() => setSeoOpen((v) => !v)}
              className={`px-4 py-2 rounded-full border border-white/30 transition-colors whitespace-nowrap ${
                seoOpen ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              SEO
            </button>
          )}
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

      {/* Opmaak-werkbalk bij geselecteerde tekst */}
      {editMode && <FormatToolbar />}

      {/* SEO-paneel voor de huidige pagina */}
      {editMode && seoOpen && hasSeo && (
        <SeoPanel global={seoGlobal} onClose={() => setSeoOpen(false)} />
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
