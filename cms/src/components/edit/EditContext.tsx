'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type EditUser = { id: string | number; name?: string; email?: string; role?: string }

// global-slug -> veldpad ("servicesCards.0.title") -> nieuwe waarde
type Changes = Record<string, Record<string, unknown>>

type EditContextValue = {
  user: EditUser | null
  editMode: boolean
  setEditMode: (on: boolean) => void
  dirtyCount: number
  stage: (global: string, path: string, value: unknown) => void
  discard: () => void
  save: (publish: boolean) => Promise<boolean>
  saving: boolean
  toast: string | null
  notify: (message: string) => void
}

const EditContext = createContext<EditContextValue | null>(null)

// Zet een waarde op een genest pad ("servicesCards.0.title") in een object.
function setDeep(target: Record<string, any>, path: string, value: unknown): void {
  const keys = path.split('.')
  let cur: any = target
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (cur[key] === null || typeof cur[key] !== 'object') {
      cur[key] = /^\d+$/.test(keys[i + 1]) ? [] : {}
    }
    cur = cur[key]
  }
  cur[keys[keys.length - 1]] = value
}

export function EditProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<EditUser | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [changes, setChanges] = useState<Changes>({})
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Detecteer een ingelogde CMS-gebruiker via de Payload sessie-cookie.
  // Bezoekers zonder sessie krijgen nooit bewerk-UI te zien.
  useEffect(() => {
    fetch('/api/users/me', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const u = data?.user ?? null
        setUser(u)
        // Vanuit de admin geopend met ?edit=1: meteen in bewerkmodus voor
        // ingelogde gebruikers (de directe "live bewerken"-knop).
        if (u && new URLSearchParams(window.location.search).get('edit') === '1') {
          setEditMode(true)
        }
      })
      .catch(() => setUser(null))
  }, [])

  const notify = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 6000)
  }, [])

  const stage = useCallback((global: string, path: string, value: unknown) => {
    setChanges((prev) => ({
      ...prev,
      [global]: { ...prev[global], [path]: value },
    }))
  }, [])

  const discard = useCallback(() => {
    // contenteditable heeft de DOM al aangepast; herladen is de betrouwbare reset.
    window.location.reload()
  }, [])

  const dirtyCount = useMemo(
    () => Object.values(changes).reduce((n, fields) => n + Object.keys(fields).length, 0),
    [changes],
  )

  const save = useCallback(
    async (publish: boolean): Promise<boolean> => {
      if (saving) return false
      setSaving(true)
      try {
        for (const [slug, fields] of Object.entries(changes)) {
          // Arrays kunnen niet gedeeltelijk via REST worden bijgewerkt: haal het
          // volledige (concept)document op, pas de wijzigingen toe en stuur het
          // geheel terug. Bewerkt wordt altijd de NL-bron; de autoTranslate-hook
          // werkt de Engelse versie automatisch bij.
          const res = await fetch(`/api/globals/${slug}?locale=nl&draft=true&depth=0`, {
            credentials: 'same-origin',
          })
          if (!res.ok) throw new Error(`Kon ${slug} niet ophalen (${res.status})`)
          const doc = await res.json()
          delete doc.id
          delete doc.createdAt
          delete doc.updatedAt
          delete doc.globalType
          delete doc._status
          for (const [path, value] of Object.entries(fields)) setDeep(doc, path, value)
          if (publish) doc._status = 'published'
          const update = await fetch(
            `/api/globals/${slug}?locale=nl${publish ? '' : '&draft=true'}`,
            {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(doc),
            },
          )
          if (!update.ok) throw new Error(`Opslaan van ${slug} mislukt (${update.status})`)
        }
        setChanges({})
        return true
      } catch (err) {
        notify(`Let op: ${err instanceof Error ? err.message : 'opslaan mislukt.'}`)
        return false
      } finally {
        setSaving(false)
      }
    },
    [changes, notify, saving],
  )

  const value = useMemo(
    () => ({
      user,
      editMode,
      setEditMode,
      dirtyCount,
      stage,
      discard,
      save,
      saving,
      toast,
      notify,
    }),
    [user, editMode, dirtyCount, stage, discard, save, saving, toast, notify],
  )

  return <EditContext.Provider value={value}>{children}</EditContext.Provider>
}

export function useEdit(): EditContextValue {
  const ctx = useContext(EditContext)
  if (!ctx) throw new Error('useEdit moet binnen een EditProvider worden gebruikt')
  return ctx
}
