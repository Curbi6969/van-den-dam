import { Icon } from '@/components/Icon'
import { getContact, getSite } from '@/frontend/queries'

export default async function ContactPage() {
  const c = await getContact('nl')
  const site = await getSite('nl')

  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="bg-surface-container-low pt-36 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          <div className="flex flex-col justify-center">
            <span className="font-label text-xs font-semibold tracking-widest text-secondary uppercase mb-4 block">
              {c.hero.eyebrow}
            </span>
            <h1
              className="font-headline text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight mb-6 leading-tight"
              style={{ letterSpacing: '-0.02em' }}
            >
              {c.hero.heading}
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed">
              {c.hero.intro}
            </p>
          </div>
        </div>
        <div
          className="absolute right-0 top-0 w-1/3 h-full opacity-40"
          style={{
            background: 'linear-gradient(to left,rgba(35,34,39,0.15),transparent)',
            transform: 'skewX(12deg) translateX(25%)',
          }}
        />
      </section>

      {/* Contact Split */}
      <section className="px-6 -mt-20 relative z-20 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="rounded-xl overflow-hidden ambient-shadow">
              <img src="/resources/team.jpg" alt="Ons team" className="w-full h-48 object-cover" />
            </div>
            <div className="bg-surface-container-lowest rounded-xl ambient-shadow ghost-border p-8">
              <h2 className="font-headline text-xl font-bold text-primary mb-6">{c.infoCard.heading}</h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Icon name="location_on" className="text-secondary text-2xl mt-0.5" />
                  <div>
                    <p className="font-label text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {c.infoCard.addressLabel}
                    </p>
                    <p className="font-body text-on-surface-variant">
                      {site.contact.addressLine1}
                      <br />
                      {site.contact.addressLine2}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="call" className="text-secondary text-2xl mt-0.5" />
                  <div>
                    <p className="font-label text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {c.infoCard.phoneLabel}
                    </p>
                    <a
                      href={`tel:${site.contact.phoneHref}`}
                      className="font-body text-on-surface-variant hover:text-secondary transition-colors"
                    >
                      {site.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Icon name="mail" className="text-secondary text-2xl mt-0.5" />
                  <div>
                    <p className="font-label text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {c.infoCard.emailLabel}
                    </p>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="font-body text-on-surface-variant hover:text-secondary transition-colors"
                    >
                      {site.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl ambient-shadow ghost-border p-8">
              <h2 className="font-headline text-xl font-bold text-primary mb-6">{c.businessCard.heading}</h2>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <p className="font-label text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {c.businessCard.kvkLabel}
                  </p>
                  <p className="font-body text-on-surface-variant text-sm">{site.business.kvk}</p>
                </div>
                <div>
                  <p className="font-label text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {c.businessCard.bankLabel}
                  </p>
                  <p className="font-body text-on-surface-variant text-sm">{site.business.bankName}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-label text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                    {c.businessCard.accountLabel}
                  </p>
                  <p className="font-body text-on-surface-variant text-sm">{site.business.bankAccount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-surface-container-lowest rounded-xl ambient-shadow p-10 md:p-14 relative overflow-hidden">
              <div
                className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: '#c5c5c7' }}
              />
              <h3 className="font-headline text-2xl font-bold text-primary mb-2">{c.form.heading}</h3>
              <p className="font-body text-on-surface-variant text-sm mb-8">{c.form.intro}</p>
              <form className="space-y-6" id="contact-form">
                {/* Naam */}
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body pt-6 pb-2 px-4 rounded-t-md transition-colors peer placeholder-transparent"
                    id="name"
                    name="name"
                    placeholder=" "
                    type="text"
                    required
                  />
                  <label
                    className="absolute left-4 top-2 text-on-surface-variant font-label text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-secondary"
                    htmlFor="name"
                  >
                    {c.form.labelName}
                  </label>
                </div>
                {/* Telefoon + Mobiel */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body pt-6 pb-2 px-4 rounded-t-md transition-colors peer placeholder-transparent"
                      id="phone"
                      name="phone"
                      placeholder=" "
                      type="tel"
                      required
                    />
                    <label
                      className="absolute left-4 top-2 text-on-surface-variant font-label text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-secondary"
                      htmlFor="phone"
                    >
                      {c.form.labelPhone}
                    </label>
                  </div>
                  <div className="relative group">
                    <input
                      className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body pt-6 pb-2 px-4 rounded-t-md transition-colors peer placeholder-transparent"
                      id="mobile"
                      name="mobile"
                      placeholder=" "
                      type="tel"
                    />
                    <label
                      className="absolute left-4 top-2 text-on-surface-variant font-label text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-secondary"
                      htmlFor="mobile"
                    >
                      {c.form.labelMobile}
                    </label>
                  </div>
                </div>
                {/* E-mail */}
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body pt-6 pb-2 px-4 rounded-t-md transition-colors peer placeholder-transparent"
                    id="email"
                    name="email"
                    placeholder=" "
                    type="email"
                    required
                  />
                  <label
                    className="absolute left-4 top-2 text-on-surface-variant font-label text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-secondary"
                    htmlFor="email"
                  >
                    {c.form.labelEmail}
                  </label>
                </div>
                {/* Kopie checkbox */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="copy"
                    name="copy"
                    className="rounded border-outline text-secondary focus:ring-secondary"
                  />
                  <label htmlFor="copy" className="font-body text-sm text-on-surface-variant">
                    {c.form.labelCopy}
                  </label>
                </div>
                {/* Woonplaats */}
                <div className="relative group">
                  <input
                    className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body pt-6 pb-2 px-4 rounded-t-md transition-colors peer placeholder-transparent"
                    id="city"
                    name="city"
                    placeholder=" "
                    type="text"
                  />
                  <label
                    className="absolute left-4 top-2 text-on-surface-variant font-label text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-secondary"
                    htmlFor="city"
                  >
                    {c.form.labelCity}
                  </label>
                </div>
                {/* Gewenste uitvoermaand + Werkzaamheden */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-2"
                      htmlFor="uitvoer"
                    >
                      {c.form.labelUitvoeringMonth}
                    </label>
                    <input
                      type="month"
                      id="uitvoer"
                      name="uitvoer"
                      className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body py-3 px-4 rounded-t-md transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      className="font-label text-xs font-semibold text-on-surface-variant uppercase tracking-wider block mb-2"
                      htmlFor="werkzaamheden"
                    >
                      {c.form.labelWerkzaamheden}
                    </label>
                    <select
                      id="werkzaamheden"
                      name="werkzaamheden"
                      className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body py-3 px-4 rounded-t-md transition-colors appearance-none"
                    >
                      <option value="">{c.form.optionChoose}</option>
                      <option value="schilderen">{c.form.optionSchilderen}</option>
                      <option value="behangen">{c.form.optionBehangen}</option>
                      <option value="onderhoud">{c.form.optionOnderhoud}</option>
                      <option value="afgeschermd-onderhoud">{c.form.optionAfgeschermd}</option>
                      <option value="beglazing">{c.form.optionBeglazing}</option>
                      <option value="ramen-zetten">{c.form.optionRamen}</option>
                    </select>
                  </div>
                </div>
                {/* Aanvullende informatie */}
                <div className="relative group">
                  <textarea
                    className="w-full bg-surface-container border-0 border-b-2 border-outline focus:border-secondary focus:ring-0 text-on-surface font-body pt-6 pb-2 px-4 rounded-t-md transition-colors peer resize-none placeholder-transparent"
                    id="message"
                    name="message"
                    placeholder=" "
                    rows={4}
                  />
                  <label
                    className="absolute left-4 top-2 text-on-surface-variant font-label text-xs transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-focus:text-xs peer-focus:top-2 peer-focus:text-secondary"
                    htmlFor="message"
                  >
                    {c.form.labelMessage}
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    required
                    className="mt-1 rounded border-outline text-secondary focus:ring-secondary"
                  />
                  <label htmlFor="privacy" className="font-body text-sm text-on-surface-variant">
                    {c.form.labelPrivacy}{' '}
                    <a
                      href="/privacyverklaring"
                      className="text-secondary hover:text-primary transition-colors underline"
                    >
                      {c.form.labelPrivacyLink}
                    </a>
                    .
                  </label>
                </div>
                <button
                  type="submit"
                  className="bg-secondary text-on-secondary font-label font-semibold px-8 py-4 rounded-md w-full md:w-auto hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  {c.form.submitButton}
                  <Icon name="arrow_forward" className="text-sm" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
