'use client'

import React, { useRef, useState } from 'react'
import { useEdit } from './EditContext'

type Props = {
  global?: string
  path: string
  src: string
  alt?: string
  className?: string
  style?: React.CSSProperties
}

// Afbeelding die in bewerkmodus klikbaar is: kies een bestand, het wordt direct
// naar de mediabibliotheek geupload en aan dit veld gekoppeld. De pagina toont
// meteen een lokale preview; definitief wordt het pas bij opslaan/publiceren.
export function EditableImage({ global = 'home', path, src, alt = '', className, style }: Props) {
  const { user, editMode, stage, notify } = useEdit()
  const [preview, setPreview] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const shown = preview ?? src

  if (!user || !editMode) {
    return <img src={shown} alt={alt} className={className} style={style} />
  }

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    const body = new FormData()
    body.append('file', file)
    body.append('_payload', JSON.stringify({ alt: alt || file.name }))
    const res = await fetch('/api/media', { method: 'POST', credentials: 'same-origin', body })
    if (!res.ok) {
      notify(`Let op: afbeelding uploaden mislukt (${res.status})`)
      return
    }
    const data = await res.json()
    const id = data?.doc?.id
    if (id == null) {
      notify('Let op: upload gaf geen media-id terug.')
      return
    }
    stage(global, path, id)
    setPreview(URL.createObjectURL(file))
  }

  return (
    <>
      <img
        src={shown}
        alt={alt}
        className={className ? `${className} vdd-editable-img` : 'vdd-editable-img'}
        style={style}
        title="Klik om deze afbeelding te vervangen"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.click()
        }}
      />
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onPick}
      />
    </>
  )
}
