import { getDiensten } from '@/frontend/queries'

const Icon = ({ name, className, style }: { name: string; className?: string; style?: React.CSSProperties }) => (
  <span className={`material-symbols-outlined ${className ?? ''}`} style={style}>
    {name}
  </span>
)

const href = (raw: string) => {
  if (!raw) return '/'
  if (raw === 'contact.html') return '/contact'
  if (raw.endsWith('.html')) return `/${raw.replace(/\.html$/, '')}`
  return raw
}

export default async function DienstenPage() {
  const d = await getDiensten('nl')

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#232227 0%,#3a393e 100%)' }}
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-6 block">
            {d.hero.eyebrow}
          </span>
          <h1
            className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 max-w-4xl"
            style={{ letterSpacing: '-0.02em' }}
          >
            {d.hero.title}
          </h1>
          <p className="font-body text-xl text-primary-fixed-dim max-w-2xl leading-relaxed">{d.hero.subtitle}</p>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
      </section>

      {/* Binnenwerk */}
      <section className="py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase">
              {d.binnenwerk.eyebrow}
            </span>
            <h2 className="font-headline text-3xl font-extrabold text-primary mt-2" style={{ letterSpacing: '-0.01em' }}>
              {d.binnenwerk.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {d.binnenwerk.items.map((item: any, i: number) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col">
                <div className="overflow-hidden h-56">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-3">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-headline text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="font-body text-on-surface-variant leading-relaxed flex-grow">{item.text}</p>
                  <a
                    href={href(item.linkHref)}
                    className="mt-6 inline-flex items-center gap-2 font-label text-sm font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    {item.linkLabel} <Icon name="arrow_forward" className="text-base" />
                  </a>
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
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase">
              {d.buitenwerk.eyebrow}
            </span>
            <h2 className="font-headline text-3xl font-extrabold text-primary mt-2" style={{ letterSpacing: '-0.01em' }}>
              {d.buitenwerk.heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {d.buitenwerk.items.map((item: any, i: number) => (
              <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow flex flex-col">
                <div className="overflow-hidden h-48">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-3">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-headline text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="font-body text-sm text-on-surface-variant leading-relaxed flex-grow">{item.text}</p>
                  <a
                    href={href(item.linkHref)}
                    className="mt-5 inline-flex items-center gap-2 font-label text-sm font-semibold text-secondary hover:text-primary transition-colors"
                  >
                    {item.linkLabel} <Icon name="arrow_forward" className="text-base" />
                  </a>
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
            {d.cta.title}
          </h2>
          <p className="font-body text-xl text-on-surface-variant mb-10">{d.cta.text}</p>
          <a
            href={href(d.cta.href)}
            className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity"
          >
            {d.cta.button} <Icon name="arrow_forward" className="text-sm" />
          </a>
        </div>
      </section>
    </>
  )
}
