'use client'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

type NavService = { title: string; url: string }
type SiteNav = { services: NavService[] }

const links = [
  { href: '/', label: 'Home', key: 'home' },
  { href: '/diensten', label: 'Diensten', key: 'diensten' },
  { href: '/portfolio', label: 'Portfolio', key: 'portfolio' },
  { href: '/over-ons', label: 'Over Ons', key: 'over-ons' },
  { href: '/contact', label: 'Contact', key: 'contact' },
]

export function Nav({ site }: { site: SiteNav }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const active =
    pathname === '/' ? 'home' : links.find((l) => l.href !== '/' && pathname.startsWith(l.href))?.key
  const linkClass = (key: string) =>
    active === key
      ? 'text-primary border-b-2 border-primary pb-0.5'
      : 'text-on-surface-variant hover:text-primary transition-colors'

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300"
      style={{
        background: 'rgba(251,248,255,0.85)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 10px 40px rgba(35,34,39,0.06)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/">
          <img
            src="/resources/vandenDam-logo.jpg"
            alt="Van den Dam Schilderwerken"
            className="h-14 w-auto"
          />
        </a>
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold text-sm tracking-tight">
          <a href="/" className={linkClass('home')}>
            Home
          </a>
          <div className="relative group">
            <a href="/diensten" className={`${linkClass('diensten')} flex items-center gap-0.5`}>
              Diensten{' '}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '16px', lineHeight: 1, verticalAlign: 'middle' }}
              >
                expand_more
              </span>
            </a>
            <div className="absolute top-full left-0 pt-3 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
              <div className="bg-white rounded-xl py-1" style={{ boxShadow: '0 8px 30px rgba(35,34,39,0.12)' }}>
                {site.services.map((s) => (
                  <a
                    key={s.url}
                    href={`/${s.url.replace(/\.html$/, '')}`}
                    className="block px-4 py-2.5 font-body text-sm text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
          {links.slice(2).map((l) => (
            <a key={l.key} href={l.href} className={linkClass(l.key)}>
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="/contact"
          className="hidden md:inline-block bg-secondary text-on-secondary font-label font-semibold text-sm px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
        >
          Offerte Aanvragen
        </a>
        <button className="md:hidden text-primary" aria-label="Menu" onClick={() => setOpen((v) => !v)}>
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-outline-variant/20">
          <div className="px-6 py-4 flex flex-col gap-4 font-headline font-semibold text-sm bg-surface/95">
            {links.map((l) => (
              <a
                key={l.key}
                href={l.href}
                className={active === l.key ? 'text-primary' : 'text-on-surface-variant'}
              >
                {l.label}
              </a>
            ))}
            <a
              href="/contact"
              className="bg-secondary text-on-secondary font-label px-5 py-2.5 rounded-md text-center mt-2"
            >
              Offerte Aanvragen
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
