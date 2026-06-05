// Global site settings (nav, contact, footer), fetched from the Payload CMS at
// build time. Used by every page via base.njk.
const CMS = process.env.CMS_URL || 'https://van-den-dam-cms.vercel.app'

module.exports = async function () {
  const res = await fetch(`${CMS}/api/globals/site-settings?locale=nl&depth=0`)
  if (!res.ok) throw new Error(`CMS site-settings fetch failed: HTTP ${res.status}`)
  const c = await res.json()

  return {
    name: c.company?.name,
    shortName: c.company?.shortName,
    tagline: c.company?.tagline,
    founded: c.company?.founded,
    yearsExperience: c.company?.yearsExperience,
    contact: c.contact || {},
    business: c.business || {},
    credit: c.credit || {},
    services: c.navServices || [],
  }
}
