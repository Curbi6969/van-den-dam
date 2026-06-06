// Global site settings (nav, contact, footer), fetched from the Payload CMS at
// build time. Used by every page via base.njk.
const { fetchGlobal } = require('../_lib/cms')

module.exports = async function () {
  const c = await fetchGlobal('site-settings')

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
