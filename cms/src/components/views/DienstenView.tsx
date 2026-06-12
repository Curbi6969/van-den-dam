'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { mapDiensten } from '@/frontend/map'
import { Icon } from '@/components/Icon'
import { Editable } from '@/components/edit/Editable'
import { EditableImage } from '@/components/edit/EditableImage'
import { EditableLink } from '@/components/edit/EditableLink'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

const href = (raw: string) => {
  if (!raw) return '/'
  if (raw === 'contact.html') return '/contact'
  if (raw.endsWith('.html')) return `/${raw.replace(/\.html$/, '')}`
  return raw
}

export function DienstenView({ initial }: { initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 1 })
  const d = mapDiensten(data)

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#232227 0%,#3a393e 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Editable
            global="diensten"
            path="hero.eyebrow"
            value={d.hero.eyebrow}
            as="span"
            className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-6 block"
          />
          <h1
            className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            <Editable global="diensten" path="hero.title" value={d.hero.title} />
          </h1>
          <p className="font-body text-xl text-primary-fixed-dim max-w-2xl leading-relaxed">
            <Editable global="diensten" path="hero.subtitle" value={d.hero.subtitle} />
          </p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      </section>

      {/* Binnenwerk */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <Editable
              global="diensten"
              path="binnenwerk.eyebrow"
              value={d.binnenwerk.eyebrow}
              as="span"
              className="font-label text-xs font-semibold tracking-widest text-secondary uppercase"
            />
            <h2 className="font-headline text-3xl font-extrabold text-primary mt-2" style={{ letterSpacing: '-0.01em' }}>
              <Editable global="diensten" path="binnenwerk.heading" value={d.binnenwerk.heading} />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {d.binnenwerk.items.map((item: any, i: number) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col">
                <div className="overflow-hidden h-56">
                  <EditableImage
                    global="diensten"
                    path={`binnenwerk.items.${i}.image`}
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <Editable
                    global="diensten"
                    path={`binnenwerk.items.${i}.categoryLabel`}
                    value={item.categoryLabel}
                    as="span"
                    className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-3"
                  />
                  <h3 className="font-headline text-2xl font-bold text-primary mb-3">
                    <Editable global="diensten" path={`binnenwerk.items.${i}.title`} value={item.title} />
                  </h3>
                  <p className="font-body text-on-surface-variant leading-relaxed flex-grow">
                    <Editable global="diensten" path={`binnenwerk.items.${i}.text`} value={item.text} />
                  </p>
                  <EditableLink
                    global="diensten"
                    path={`binnenwerk.items.${i}.linkHref`}
                    href={href(item.linkHref)}
                    className="mt-6 inline-flex items-center gap-2 font-label text-sm font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    <Editable global="diensten" path={`binnenwerk.items.${i}.linkLabel`} value={item.linkLabel} />
                    <Icon name="arrow_forward" className="text-base" />
                  </EditableLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buitenwerk */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <Editable
              global="diensten"
              path="buitenwerk.eyebrow"
              value={d.buitenwerk.eyebrow}
              as="span"
              className="font-label text-xs font-semibold tracking-widest text-secondary uppercase"
            />
            <h2 className="font-headline text-3xl font-extrabold text-primary mt-2" style={{ letterSpacing: '-0.01em' }}>
              <Editable global="diensten" path="buitenwerk.heading" value={d.buitenwerk.heading} />
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {d.buitenwerk.items.map((item: any, i: number) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col">
                <div className="overflow-hidden h-48">
                  <EditableImage
                    global="diensten"
                    path={`buitenwerk.items.${i}.image`}
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <Editable
                    global="diensten"
                    path={`buitenwerk.items.${i}.categoryLabel`}
                    value={item.categoryLabel}
                    as="span"
                    className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-3"
                  />
                  <h3 className="font-headline text-xl font-bold text-primary mb-3">
                    <Editable global="diensten" path={`buitenwerk.items.${i}.title`} value={item.title} />
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-grow">
                    <Editable global="diensten" path={`buitenwerk.items.${i}.text`} value={item.text} />
                  </p>
                  <EditableLink
                    global="diensten"
                    path={`buitenwerk.items.${i}.linkHref`}
                    href={href(item.linkHref)}
                    className="mt-5 inline-flex items-center gap-2 font-label text-sm font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    <Editable global="diensten" path={`buitenwerk.items.${i}.linkLabel`} value={item.linkLabel} />
                    <Icon name="arrow_forward" className="text-base" />
                  </EditableLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            <Editable global="diensten" path="cta.title" value={d.cta.title} />
          </h2>
          <p className="font-body text-xl text-on-surface-variant mb-10">
            <Editable global="diensten" path="cta.text" value={d.cta.text} />
          </p>
          <EditableLink
            global="diensten"
            path="cta.href"
            href={href(d.cta.href)}
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity"
          >
            <Editable global="diensten" path="cta.button" value={d.cta.button} />
            <Icon name="arrow_forward" className="text-sm" />
          </EditableLink>
        </div>
      </section>
    </>
  )
}
