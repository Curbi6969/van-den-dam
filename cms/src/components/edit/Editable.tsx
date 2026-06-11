'use client'

import React from 'react'
import { useEdit } from './EditContext'

type Props = {
  global?: string
  path: string
  value: React.ReactNode
  as?: React.ElementType
  className?: string
  style?: React.CSSProperties
}

// Tekstveld dat in bewerkmodus direct op de pagina aanpasbaar is. Buiten
// bewerkmodus (of zonder CMS-sessie) rendert dit exact het gewone element.
export function Editable({ global = 'home', path, value, as = 'span', className, style }: Props) {
  const { user, editMode, stage } = useEdit()
  const Tag = as
  if (!user || !editMode) {
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    )
  }
  return (
    <Tag
      className={className ? `${className} vdd-editable` : 'vdd-editable'}
      style={style}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-vdd-path={`${global}:${path}`}
      onInput={(e: React.FormEvent<HTMLElement>) => stage(global, path, e.currentTarget.innerText)}
      onClick={(e: React.MouseEvent) => {
        // Voorkom dat een omliggende link wegnavigeert tijdens het bewerken.
        e.preventDefault()
        e.stopPropagation()
      }}
    >
      {value}
    </Tag>
  )
}
