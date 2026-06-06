// Contact page content, fetched from the Payload CMS at build time.
// Text comes from the CMS; SEO meta is not managed in the CMS yet,
// so it falls back to the original to keep the page visually identical.
const { fetchGlobal } = require('../_lib/cms')

const fallbackSeo = {
  title: 'Contact Van den Dam Schilderwerken',
  description:
    'Neem contact op met Van den Dam Schilderwerken voor een vrijblijvende offerte.',
}

module.exports = async function () {
  const c = await fetchGlobal('contact')

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    hero: c.hero || {},
    infoCard: c.infoCard || {},
    businessCard: c.businessCard || {},
    form: c.form || {},
  }
}
