'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { mapOverOns } from '@/frontend/map'
import { Icon } from '@/components/Icon'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

const href = (raw: string) => {
  if (!raw) return '/'
  if (raw === 'contact.html') return '/contact'
  if (raw.endsWith('.html')) return `/${raw.replace(/\.html$/, '')}`
  return raw
}

export function OverOnsView({ initial }: { initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 0 })
  const o = mapOverOns(data)

  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
              {o.hero.eyebrow}
            </span>
            <h1
              className="font-headline text-5xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mb-8"
              style={{ letterSpacing: '-0.02em' }}
            >
              {o.hero.title}
            </h1>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10 max-w-lg">{o.hero.text}</p>
            <a
              href={href(o.hero.ctaHref)}
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label font-semibold px-7 py-3.5 rounded-md hover:opacity-90 transition-opacity"
            >
              {o.hero.ctaLabel} <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden ambient-shadow">
              <img src={o.hero.image} alt={o.hero.imageAlt} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
              {o.values.eyebrow}
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
              {o.values.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {o.values.items.map((item: any, i: number) => (
              <div
                key={i}
                className={
                  item.raised
                    ? 'bg-surface-container-lowest p-10 rounded-xl ambient-shadow ghost-border md:translate-y-8 hover:translate-y-6 transition-transform duration-300'
                    : 'bg-surface-container-lowest p-10 rounded-xl ambient-shadow ghost-border hover:-translate-y-2 transition-transform duration-300'
                }
              >
                <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center mb-6">
                  <Icon name={item.icon} className="text-secondary" />
                </div>
                <h3 className="font-headline text-xl font-bold text-primary mb-4">{item.title}</h3>
                <p className="font-body text-on-surface-variant text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team & Craftsmanship */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                <img
                  src={o.team.image1}
                  alt={o.team.image1Alt}
                  className="rounded-xl w-full h-52 object-cover ambient-shadow"
                />
                <div className="bg-surface-container-highest p-6 rounded-xl">
                  <p className="font-label text-sm text-on-surface font-medium italic">&ldquo;{o.team.quote}&rdquo;</p>
                </div>
              </div>
              <div>
                <img
                  src={o.team.image2}
                  alt={o.team.image2Alt}
                  className="rounded-xl w-full h-72 object-cover ambient-shadow"
                />
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:pl-12">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
              {o.team.eyebrow}
            </span>
            <h2 className="font-headline text-4xl font-extrabold text-primary tracking-tight mb-8">{o.team.heading}</h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-6">{o.team.paragraph1}</p>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10">{o.team.paragraph2}</p>
            <a
              href={href(o.team.ctaHref)}
              className="inline-flex items-center gap-2 text-primary font-label font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors"
            >
              {o.team.ctaLabel} <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
