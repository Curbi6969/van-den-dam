// Homepage content, fetched from the Payload CMS at build time.
// Text comes from the CMS; images and SEO meta are not managed in the CMS yet,
// so they fall back to the originals to keep the page visually identical.
const { fetchGlobal } = require('../_lib/cms')

const fallbackImages = {
  hero: 'resources/vakman.jpg',
  servicesCards: ['resources/team.jpg', 'resources/vakman.jpg', 'resources/vakman.jpg'],
  about: 'resources/team.jpg',
  portfolio: ['resources/vakman.jpg', 'resources/vakman.jpg', 'resources/vakman.jpg'],
}
const fallbackSeo = {
  title: 'Van den Dam Schilderwerken Vakmanschap in elke penseelstreek',
  description:
    'Van den Dam Schilderwerken familiebedrijf met meer dan 25 jaar ervaring in binnen- en buitenschilderwerk, glasservice en speciale afwerkingen.',
}

module.exports = async function () {
  const c = await fetchGlobal('home')

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    hero: {
      eyebrow: c.hero?.eyebrow,
      title: c.hero?.title,
      subtitle: c.hero?.subtitle,
      image: fallbackImages.hero,
    },
    trust: c.trust || [],
    servicesIntro: c.servicesIntro || {},
    servicesCards: (c.servicesCards || []).map((card, i) => ({
      ...card,
      image: fallbackImages.servicesCards[i] || fallbackImages.servicesCards[0],
    })),
    about: { ...(c.about || {}), image: fallbackImages.about },
    portfolioIntro: c.portfolioIntro || {},
    portfolio: (c.portfolio || []).map((p, i) => ({
      ...p,
      image: fallbackImages.portfolio[i] || fallbackImages.portfolio[0],
    })),
    reviewsIntro: c.reviewsIntro || {},
    reviews: c.reviews || [],
    reviewScore: c.reviewsIntro?.score,
    reviewCount: c.reviewsIntro?.count,
    cta: c.cta || {},
  }
}
