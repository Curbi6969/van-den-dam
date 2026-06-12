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

// Herkent of een opgeslagen waarde opmaak (HTML-tags) bevat.
export const HTML_RE = /<[a-z][^>]*>/i

// Houdt alleen eenvoudige opmaak over: vet, cursief, onderstreept,
// doorgehaald, links en regelafbrekingen. Alle andere tags worden uitgepakt
// (tekst blijft staan), blok-elementen worden regelafbrekingen, en attributen
// verdwijnen behalve href op links.
export function sanitizeRich(html: string): string {
  const ALLOWED = new Set(['B', 'STRONG', 'I', 'EM', 'U', 'S', 'A', 'BR'])
  const box = document.createElement('div')
  box.innerHTML = html
  const walk = (node: ParentNode) => {
    for (const child of [...node.children]) {
      walk(child)
      if (!ALLOWED.has(child.tagName)) {
        if (/^(DIV|P|LI|H[1-6])$/.test(child.tagName) && child.previousSibling) {
          child.before(document.createElement('br'))
        }
        child.replaceWith(...child.childNodes)
      } else {
        for (const attr of [...child.attributes]) {
          if (!(child.tagName === 'A' && attr.name === 'href')) child.removeAttribute(attr.name)
        }
      }
    }
  }
  walk(box)
  return box.innerHTML.trim()
}

// De waarde die voor een bewerkt element wordt opgeslagen: opgemaakte HTML,
// of platte tekst zodra er geen opmaak (meer) in zit.
export function valueFromElement(el: HTMLElement): string {
  const clean = sanitizeRich(el.innerHTML)
  return HTML_RE.test(clean) ? clean : el.innerText
}

// Tekstveld dat in bewerkmodus direct op de pagina aanpasbaar is, inclusief
// opmaak (vet/cursief via de zwevende werkbalk). Buiten bewerkmodus (of
// zonder CMS-sessie) rendert dit exact het gewone element.
export function Editable({ global = 'home', path, value, as = 'span', className, style }: Props) {
  const { user, editMode, stage } = useEdit()
  const Tag = as
  const isHtml = typeof value === 'string' && HTML_RE.test(value)

  if (!user || !editMode) {
    if (isHtml) {
      return (
        <Tag
          className={className}
          style={style}
          dangerouslySetInnerHTML={{ __html: value as string }}
        />
      )
    }
    return (
      <Tag className={className} style={style}>
        {value}
      </Tag>
    )
  }

  const editProps = {
    className: className ? `${className} vdd-editable` : 'vdd-editable',
    style,
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    'data-vdd-path': `${global}:${path}`,
    onInput: (e: React.FormEvent<HTMLElement>) =>
      stage(global, path, valueFromElement(e.currentTarget)),
    onClick: (e: React.MouseEvent) => {
      // Voorkom dat een omliggende link wegnavigeert tijdens het bewerken.
      e.preventDefault()
      e.stopPropagation()
    },
  }

  if (isHtml) {
    return <Tag {...editProps} dangerouslySetInnerHTML={{ __html: value as string }} />
  }
  return <Tag {...editProps}>{value}</Tag>
}
