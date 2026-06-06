// Privacyverklaring content, fetched from the Payload CMS at build time.
// Text comes from the CMS; SEO meta is not managed in the CMS yet,
// so it falls back to the originals to keep the page identical.
const { fetchGlobal } = require('../_lib/cms')

const fallbackSeo = {
  title: 'Privacyverklaring Van den Dam Schilderwerken',
  description:
    'Privacyverklaring van Van den Dam Schilderwerken: hoe wij omgaan met uw persoonsgegevens.',
}

module.exports = async function () {
  const c = await fetchGlobal('privacyverklaring')

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    eyebrow: c.eyebrow,
    heading: c.heading,
    lastUpdated: c.lastUpdated,
    backLink: c.backLink,
    sections: (c.sections || []).map((s) => ({
      heading: s.heading,
      html: s.html,
    })),
  }
}
