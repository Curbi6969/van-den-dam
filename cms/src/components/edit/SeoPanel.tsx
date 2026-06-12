'use client'

import React, { useEffect, useState } from 'react'
import { useEdit } from './EditContext'

// Pagina's waarvoor de SEO-plugin meta-velden beheert (zie payload.config.ts).
export const SEO_GLOBALS = new Set([
  'home',
  'diensten',
  'portfolio',
  'over-ons',
  'contact',
  'privacyverklaring',
  'niet-gevonden',
])

const TITLE_MAX = 60
const DESC_MAX = 160

// Paneel om de zoekmachine-instellingen (paginatitel en omschrijving) van de
// huidige pagina aan te passen tijdens het live bewerken. Wijzigingen lopen
// mee in dezelfde concept/publiceer-flow als tekstwijzigingen.
export function SeoPanel({ global: slug, onClose }: { global: string; onClose: () => void }) {
  const { stage, notify } = useEdit()
  const [loaded, setLoaded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    fetch(`/api/globals/${slug}?locale=nl&draft=true&depth=0`, { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((doc) => {
        setTitle(doc?.meta?.title ?? '')
        setDescription(doc?.meta?.description ?? '')
        setLoaded(true)
      })
      .catch(() => notify('Let op: SEO-gegevens konden niet worden geladen.'))
  }, [slug, notify])

  const onTitle = (v: string) => {
    setTitle(v)
    stage(slug, 'meta.title', v)
  }
  const onDescription = (v: string) => {
    setDescription(v)
    stage(slug, 'meta.description', v)
  }

  const count = (n: number, max: number) => (
    <span className={`vdd-seo-count${n > max ? ' over' : ''}`}>
      {n}/{max}
    </span>
  )

  return (
    <div className="vdd-seopanel">
      <div className="vdd-seopanel-head">
        <span>Vindbaarheid (SEO)</span>
        <button type="button" aria-label="Sluiten" onClick={onClose}>
          ✕
        </button>
      </div>

      {!loaded ? (
        <p className="vdd-seopanel-loading">Laden...</p>
      ) : (
        <>
          <label>
            <span className="vdd-seo-labelrow">
              Paginatitel in Google {count(title.length, TITLE_MAX)}
            </span>
            <input
              type="text"
              value={title}
              placeholder="Bijv. Schilderwerk binnen en buiten | Van den Dam"
              onChange={(e) => onTitle(e.target.value)}
            />
          </label>

          <label>
            <span className="vdd-seo-labelrow">
              Omschrijving in Google {count(description.length, DESC_MAX)}
            </span>
            <textarea
              value={description}
              rows={4}
              placeholder="Korte tekst die onder de titel in de zoekresultaten verschijnt."
              onChange={(e) => onDescription(e.target.value)}
            />
          </label>

          {/* Voorbeeld zoals het er in de zoekresultaten uit komt te zien */}
          <div className="vdd-seo-preview">
            <span className="vdd-seo-preview-title">
              {title || 'Van den Dam Schilderwerken'}
            </span>
            <span className="vdd-seo-preview-url">van-den-dam.vercel.app</span>
            <span className="vdd-seo-preview-desc">
              {description || 'Nog geen omschrijving ingevuld.'}
            </span>
          </div>

          <p className="vdd-seopanel-hint">
            Wijzigingen sla je op met Concept opslaan of zet je live met Publiceren, samen met je
            tekstwijzigingen.
          </p>
        </>
      )}
    </div>
  )
}
