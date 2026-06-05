// Contact page content, fetched from the Payload CMS at build time.
// Text comes from the CMS; SEO meta is not managed in the CMS yet,
// so it falls back to the original to keep the page visually identical.
const CMS = process.env.CMS_URL || 'https://van-den-dam-cms.vercel.app'

const fallbackSeo = {
  title: 'Contact Van den Dam Schilderwerken',
  description:
    'Neem contact op met Van den Dam Schilderwerken voor een vrijblijvende offerte.',
}

module.exports = async function () {
  const res = await fetch(`${CMS}/api/globals/contact?locale=nl&depth=0`)
  if (!res.ok) throw new Error(`CMS contact fetch failed: HTTP ${res.status}`)
  const c = await res.json()

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    hero: c.hero || {},
    infoCard: c.infoCard || {},
    businessCard: c.businessCard || {},
    form: c.form || {},
  }
}
