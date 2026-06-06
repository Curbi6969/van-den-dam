'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { mapHome } from '@/frontend/map'
import { Icon } from '@/components/Icon'

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

export function HomeView({ initial }: { initial: any }) {
  const { data } = useLivePreview<any>({ initialData: initial, serverURL, depth: 0 })
  const home = mapHome(data)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={home.hero.image} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
          <div className="max-w-2xl">
            <span className="font-label text-xs font-semibold tracking-widest text-white/70 uppercase mb-6 block tracking-[0.2em]">
              {home.hero.eyebrow}
            </span>
            <h1
              className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-8"
              style={{ letterSpacing: '-0.02em' }}
            >
              {home.hero.title}
            </h1>
            <p className="font-body text-xl text-white/80 leading-relaxed mb-10 max-w-xl">{home.hero.subtitle}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/contact"
                className="bg-secondary text-on-secondary font-label font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity ambient-shadow"
              >
                Offerte Aanvragen
              </a>
              <a
                href="/portfolio"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-label font-semibold px-8 py-4 rounded-md hover:bg-white/20 transition-colors"
              >
                Bekijk Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface-container-lowest relative z-20 -mt-6 mx-4 md:mx-auto max-w-4xl rounded-2xl ambient-shadow ghost-border px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center md:text-left">
          {home.trust.map((item: any, i: number) => (
            <div key={i} className="flex items-center gap-4">
              <Icon name={item.icon} className="text-4xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }} />
              <div>
                <p className="font-headline font-bold text-primary">{item.title}</p>
                <p className="font-body text-sm text-on-surface-variant">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
              {home.servicesIntro.eyebrow}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-4">
              {home.servicesIntro.title}
            </h2>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">{home.servicesIntro.text}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.servicesCards.map((card: any, i: number) => (
              <div
                key={i}
                className={`group bg-surface-container-lowest rounded-xl overflow-hidden ambient-shadow ghost-border flex flex-col hover:-translate-y-1 transition-transform duration-300${card.raised ? ' md:-translate-y-6' : ''}`}
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-headline text-xl font-bold text-primary mb-3">{card.title}</h3>
                  <p className="font-body text-on-surface-variant mb-6 flex-1 text-sm leading-relaxed">{card.text}</p>
                  <a
                    href="/diensten"
                    className="font-label text-sm text-secondary font-semibold inline-flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Meer lezen <Icon name="arrow_forward" className="text-base" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="/diensten"
              className="inline-flex items-center gap-2 bg-secondary text-on-secondary font-label font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity"
            >
              Bekijk al onze diensten <Icon name="arrow_forward" className="text-sm" />
            </a>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="bg-surface-container-low py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-xl overflow-hidden ambient-shadow aspect-[4/3]">
                <img src={home.about.image} alt="Ons team" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-surface-container-lowest rounded-xl p-6 ambient-shadow ghost-border hidden md:block">
                <p className="font-headline text-4xl font-extrabold text-primary">{home.about.badgeNumber}</p>
                <p className="font-body text-sm text-on-surface-variant">{home.about.badgeLabel}</p>
              </div>
            </div>
            <div>
              <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
                {home.about.eyebrow}
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-6">
                {home.about.title}
              </h2>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-6">{home.about.paragraph1}</p>
              <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10">{home.about.paragraph2}</p>
              <a
                href="/over-ons"
                className="inline-flex items-center gap-2 text-primary font-label font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors"
              >
                Leer ons kennen <Icon name="arrow_forward" className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Teaser */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
                {home.portfolioIntro.eyebrow}
              </span>
              <h2 className="font-headline text-4xl font-extrabold text-primary tracking-tight">
                {home.portfolioIntro.title}
              </h2>
            </div>
            <a
              href="/portfolio"
              className="hidden md:inline-flex items-center gap-2 font-label text-sm text-secondary font-semibold hover:text-primary transition-colors"
            >
              Volledig portfolio <Icon name="arrow_forward" className="text-base" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[480px]">
            {home.portfolio[0] && (
              <article className="md:col-span-8 relative group overflow-hidden rounded-xl ambient-shadow ghost-border cursor-pointer">
                <img
                  src={home.portfolio[0].image}
                  alt={home.portfolio[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 p-8">
                  <span className="text-white/70 font-label text-xs uppercase tracking-wider mb-2 block">
                    {home.portfolio[0].category}
                  </span>
                  <h3 className="font-headline text-2xl font-bold text-white">{home.portfolio[0].title}</h3>
                </div>
              </article>
            )}
            <div className="md:col-span-4 flex flex-col gap-6">
              {home.portfolio.slice(1).map((item: any, i: number) => (
                <article
                  key={i}
                  className="flex-1 relative group overflow-hidden rounded-xl ambient-shadow ghost-border cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <span className="text-white/70 font-label text-xs uppercase tracking-wider mb-1 block">
                      {item.category}
                    </span>
                    <h3 className="font-headline text-lg font-bold text-white">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
              {home.reviewsIntro.eyebrow}
            </span>
            <h2
              className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {home.reviewsIntro.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {home.reviews.map((review: any, i: number) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-xl p-8 ambient-shadow ghost-border flex flex-col gap-4"
              >
                <div className="flex gap-1 text-secondary">★★★★★</div>
                <p className="font-body text-on-surface-variant leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <p className="font-label text-sm font-semibold text-primary mt-auto">{review.name}</p>
              </div>
            ))}
          </div>
          <p className="text-center font-body text-sm text-on-surface-variant mt-10">
            Gemiddeld <strong className="text-primary">{home.reviewsIntro.score}</strong> op basis van{' '}
            {home.reviewsIntro.count} beoordelingen
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface-container-low py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-6">
            {home.cta.title}
          </h2>
          <p className="font-body text-xl text-on-surface-variant mb-10">{home.cta.text}</p>
          <a
            href="/contact"
            className="inline-block bg-secondary text-on-secondary font-label font-semibold text-lg px-10 py-4 rounded-md hover:opacity-90 transition-opacity ambient-shadow"
          >
            {home.cta.button}
          </a>
        </div>
      </section>
    </>
  )
}
