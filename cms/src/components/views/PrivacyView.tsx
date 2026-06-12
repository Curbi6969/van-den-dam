'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { mapPrivacy } from '@/frontend/map'
import { Icon } from '@/components/Icon'
import { Editable } from '@/components/edit/Editable'
import { EditableLink } from '@/components/edit/EditableLink'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export function PrivacyView({ initial }: { initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 0 })
  const pv = mapPrivacy(data)

  return (
    <>
      <style>{`
        .prose h2 { font-family: 'Manrope', sans-serif; font-size: 1.375rem; font-weight: 700; color: #232227; margin-top: 2.5rem; margin-bottom: 0.75rem; }
        .prose p, .prose li { font-family: 'Work Sans', sans-serif; color: #45474d; line-height: 1.8; margin-bottom: 1rem; font-size: 0.9375rem; }
        .prose ul { list-style: disc; padding-left: 1.5rem; }
        .prose a { color: #ff0000; text-decoration: underline; }
        .prose a:hover { color: #232227; }
      `}</style>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 pt-36 pb-24">
        <Editable
          global="privacyverklaring"
          path="eyebrow"
          value={pv.eyebrow}
          as="span"
          className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block"
        />
        <h1
          className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          <Editable global="privacyverklaring" path="heading" value={pv.heading} />
        </h1>
        <p className="font-body text-on-surface-variant mb-12">
          <Editable global="privacyverklaring" path="lastUpdated" value={pv.lastUpdated} />
        </p>

        <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 ambient-shadow prose">
          {pv.sections.map((section, i) => (
            <div key={i}>
              <h2>{section.heading}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.html }} />
            </div>
          ))}
        </div>

        <div className="mt-10">
          <EditableLink
            global="privacyverklaring"
            path="backLinkHref"
            href={pv.backLinkHref}
            className="inline-flex items-center gap-2 font-label text-sm text-secondary font-semibold hover:text-primary transition-colors"
          >
            <Icon name="arrow_back" className="text-base" />
            <Editable global="privacyverklaring" path="backLink" value={pv.backLink} />
          </EditableLink>
        </div>
      </main>
    </>
  )
}
