type SiteFooter = {
  name: string
  founded: string
  credit: { name?: string; url?: string }
  contact: {
    addressLine1?: string
    addressLine2?: string
    phoneDisplay?: string
    phoneHref?: string
    email?: string
  }
  business: { kvk?: string; bankName?: string; bankAccount?: string }
}

export function Footer({ site }: { site: SiteFooter }) {
  return (
    <footer style={{ background: '#232227' }} className="text-slate-100 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-1">
          <p className="font-headline text-lg font-extrabold text-white mb-4">{site.name}</p>
          <p className="font-body text-sm text-slate-300 leading-relaxed mb-6">
            Het creëren van prachtige ruimtes met precisie en passie. Familiebedrijf sinds {site.founded}.
          </p>
          <p className="font-body text-xs text-slate-400">
            &copy; 2026 {site.name}.<br />
            Alle rechten voorbehouden.
          </p>
          {site.credit?.url && (
            <p className="font-body text-xs text-slate-500 mt-2">
              Website gemaakt door{' '}
              <a
                href={site.credit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-300 transition-colors"
              >
                {site.credit.name}
              </a>
            </p>
          )}
        </div>
        <div>
          <p className="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
            Navigatie
          </p>
          <ul className="space-y-2 font-body text-sm">
            <li><a href="/diensten" className="text-slate-300 hover:text-white transition-colors">Diensten</a></li>
            <li><a href="/portfolio" className="text-slate-300 hover:text-white transition-colors">Portfolio</a></li>
            <li><a href="/over-ons" className="text-slate-300 hover:text-white transition-colors">Over Ons</a></li>
            <li><a href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
            Contact
          </p>
          <ul className="space-y-3 font-body text-sm text-slate-300">
            <li>{site.contact.addressLine1}<br />{site.contact.addressLine2}</li>
            <li><a href={`tel:${site.contact.phoneHref}`} className="hover:text-white transition-colors">{site.contact.phoneDisplay}</a></li>
            <li><a href={`mailto:${site.contact.email}`} className="hover:text-white transition-colors break-all">{site.contact.email}</a></li>
          </ul>
        </div>
        <div>
          <p className="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
            Bedrijfsgegevens
          </p>
          <ul className="space-y-3 font-body text-sm text-slate-300">
            <li><span className="text-slate-500 text-xs uppercase tracking-wide block mb-0.5">KvK</span>{site.business.kvk}</li>
            <li><span className="text-slate-500 text-xs uppercase tracking-wide block mb-0.5">{site.business.bankName}</span>{site.business.bankAccount}</li>
          </ul>
          <p className="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-2 mt-6">Juridisch</p>
          <ul className="space-y-2 font-body text-sm">
            <li><a href="/privacyverklaring" className="text-slate-300 hover:text-white transition-colors">Privacyverklaring</a></li>
          </ul>
        </div>
        <div>
          <p className="font-label text-xs font-semibold tracking-widest text-slate-500 uppercase mb-4">
            Erkend Vakbedrijf
          </p>
          <img
            src="/resources/onderhoudnl-logo.png"
            alt="OnderhoudNL keurmerk"
            loading="lazy"
            className="h-16 w-auto mb-4 rounded"
          />
          <p className="font-body text-xs text-slate-300 leading-relaxed">
            Van den Dam is aangesloten bij{' '}
            <a
              href="https://www.onderhoudnl.nl/over-onderhoudnl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-slate-300 transition-colors"
            >
              OnderhoudNL (FOSAG)
            </a>{' '}
            de branchevereniging voor erkende schilders- en afwerkingsbedrijven.
          </p>
        </div>
      </div>
    </footer>
  )
}
