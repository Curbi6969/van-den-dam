'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { mapPortfolio } from '@/frontend/map'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export function PortfolioView({ initial }: { initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 0 })
  const p = mapPortfolio(data)

  return (
    <>
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-40 pb-16">
        <div className="max-w-3xl">
          <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
            {p.hero.eyebrow}
          </span>
          <h1
            className="font-headline text-5xl md:text-6xl font-extrabold text-primary tracking-tight mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            {p.hero.title}
          </h1>
          <p className="font-body text-xl text-on-surface-variant leading-relaxed">{p.hero.subtitle}</p>
        </div>
      </section>

      {/* Filter Chips */}
      <section className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-3">
          {p.filters.map((filter, i) => (
            <button
              key={filter.value ?? i}
              className={
                i === 0
                  ? 'filter-btn active bg-secondary text-on-secondary px-6 py-2 rounded-full font-label text-sm font-semibold tracking-wide transition-all'
                  : 'filter-btn bg-surface-container text-on-surface px-6 py-2 rounded-full font-label text-sm font-semibold tracking-wide ghost-border hover:bg-surface-container-high transition-all'
              }
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6" style={{ gridAutoRows: '320px' }}>
          {p.projects.map((project, i) => (
            <article
              key={i}
              data-cat={project.cat}
              className={`portfolio-item ${project.colSpan} relative group overflow-hidden rounded-xl ambient-shadow ghost-border cursor-pointer`}
            >
              <img
                src={project.image}
                alt={project.imageAlt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              <div className={project.size === 'large' ? 'absolute bottom-0 p-8' : 'absolute bottom-0 p-6'}>
                <span
                  className={`inline-block bg-white/20 backdrop-blur-md text-white font-label text-xs uppercase tracking-wider px-3 py-1 rounded-sm ${
                    project.size === 'large' ? 'mb-4' : 'mb-3'
                  }`}
                >
                  {project.categoryLabel}
                </span>
                <h2
                  className={
                    project.size === 'large'
                      ? 'font-headline text-2xl md:text-3xl font-bold text-white mb-2'
                      : 'font-headline text-lg font-bold text-white mb-1'
                  }
                >
                  {project.title}
                </h2>
                <p
                  className={
                    project.size === 'large'
                      ? 'font-body text-slate-200 max-w-xl text-sm line-clamp-2'
                      : 'font-body text-sm text-slate-200 line-clamp-1'
                  }
                >
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-28 text-center">
        <div className="bg-surface-container-low p-12 md:p-16 rounded-2xl ghost-border ambient-shadow relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-container rounded-full opacity-10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-container rounded-full opacity-10 blur-3xl pointer-events-none" />
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary mb-6 relative z-10">
            {p.cta.title}
          </h2>
          <p className="font-body text-lg text-on-surface-variant mb-10 max-w-2xl mx-auto relative z-10">
            {p.cta.text}
          </p>
          <a
            href="/contact"
            className="relative z-10 inline-block bg-secondary text-on-secondary font-label font-semibold px-10 py-4 rounded-md hover:opacity-90 transition-opacity text-lg"
          >
            {p.cta.button}
          </a>
        </div>
      </section>
    </>
  )
}
