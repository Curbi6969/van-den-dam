'use client'
import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { Editable } from '@/components/edit/Editable'
import { EditableImage } from '@/components/edit/EditableImage'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

const SKIP = new Set(['id', 'updatedAt', 'createdAt', 'globalType', '_status'])

// Keys whose string values are used as HTML attributes, not display text.
const ATTR_RE = /^(href|url|src|alt|icon|cat|type|colSpan|size|slug|value|raised|linkHref|imageAlt)$/i

function Field({ g, path, value }: { g: string; path: string; value: unknown }) {
  if (value == null || value === '') return null
  if (typeof value === 'boolean' || typeof value === 'number') return <>{String(value)}</>

  if (typeof value === 'string') {
    return <Editable global={g} path={path} value={value} />
  }

  if (!Array.isArray(value) && typeof value === 'object') {
    const obj = value as Record<string, unknown>
    if (typeof obj.url === 'string') {
      return (
        <EditableImage
          global={g}
          path={path}
          src={obj.url}
          alt={(obj.alt as string) ?? ''}
          className="rounded-xl object-cover max-h-72 w-full"
        />
      )
    }
    const entries = Object.entries(obj).filter(
      ([k]) => !SKIP.has(k) && !ATTR_RE.test(k),
    )
    if (entries.length === 0) return null
    return (
      <div className="space-y-3">
        {entries.map(([k, v]) => (
          <Field key={k} g={g} path={`${path}.${k}`} value={v} />
        ))}
      </div>
    )
  }

  if (Array.isArray(value)) {
    return (
      <div className="space-y-4">
        {value.map((item, i) => (
          <div key={i} className="p-4 bg-surface-container-low rounded-lg">
            <Field g={g} path={`${path}.${i}`} value={item} />
          </div>
        ))}
      </div>
    )
  }

  return null
}

// Generic fully-editable page for any Payload global. Used by the catch-all
// route so any new global is immediately editable on the live site without
// needing a hand-crafted view component.
export function AutoEditablePage({ global: g, initial }: { global: string; initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 1 })
  const sections = Object.entries(data ?? {}).filter(([k]) => !SKIP.has(k))

  return (
    <main className="max-w-4xl mx-auto px-6 pt-36 pb-24 space-y-16">
      {sections.map(([key, value]) => (
        <section key={key} className="space-y-4">
          <Field g={g} path={key} value={value} />
        </section>
      ))}
    </main>
  )
}
