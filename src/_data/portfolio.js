// Portfolio page content, fetched from the Payload CMS at build time.
// Text comes from the CMS; images and SEO meta are not managed in the CMS yet,
// so they fall back to the originals to keep the page visually identical.
const { fetchGlobal } = require('../_lib/cms')

const fallbackImages = [
  'resources/vakman.jpg',
  'resources/vakman.jpg',
  'resources/vakman.jpg',
  'resources/vakman.jpg',
  'resources/vakman.jpg',
]
const fallbackSeo = {
  title: 'Portfolio Van den Dam Schilderwerken',
  description:
    "Bekijk ons portfolio van schilderwerken van herrenhuizen in Amsterdam tot villa's en speciale afwerkingen.",
}

module.exports = async function () {
  const c = await fetchGlobal('portfolio')

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    hero: {
      eyebrow: c.hero?.eyebrow,
      title: c.hero?.title,
      subtitle: c.hero?.subtitle,
    },
    filters: c.filters || [],
    projects: (c.projects || []).map((p, i) => ({
      ...p,
      image: fallbackImages[i] || fallbackImages[0],
    })),
    cta: c.cta || {},
  }
}
