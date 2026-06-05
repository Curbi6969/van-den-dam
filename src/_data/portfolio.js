// Portfolio page content, fetched from the Payload CMS at build time.
// Text comes from the CMS; images and SEO meta are not managed in the CMS yet,
// so they fall back to the originals to keep the page visually identical.
const CMS = process.env.CMS_URL || 'https://van-den-dam-cms.vercel.app'

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
  const res = await fetch(`${CMS}/api/globals/portfolio?locale=nl&depth=0`)
  if (!res.ok) throw new Error(`CMS portfolio fetch failed: HTTP ${res.status}`)
  const c = await res.json()

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
