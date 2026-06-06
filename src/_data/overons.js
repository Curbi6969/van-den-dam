// Over Ons content, fetched from the Payload CMS at build time.
// Text comes from the CMS; images and SEO meta are not managed in the CMS yet,
// so they fall back to the originals to keep the page visually identical.
const { fetchGlobal } = require('../_lib/cms')

const fallbackImages = {
  hero: 'resources/team.jpg',
  team1: 'resources/vakman.jpg',
  team2: 'resources/team.jpg',
}
const fallbackSeo = {
  title: 'Over Ons Van den Dam Schilderwerken',
  description:
    'Maak kennis met Van den Dam Schilderwerken een familiebedrijf met 25+ jaar vakmanschap in schilder- en renovatiewerk.',
}

module.exports = async function () {
  const c = await fetchGlobal('over-ons')

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    hero: {
      eyebrow: c.hero?.eyebrow,
      title: c.hero?.title,
      text: c.hero?.text,
      ctaLabel: c.hero?.ctaLabel,
      ctaHref: c.hero?.ctaHref,
      image: fallbackImages.hero,
      imageAlt: c.hero?.imageAlt,
    },
    values: {
      eyebrow: c.values?.eyebrow,
      heading: c.values?.heading,
      items: c.values?.items || [],
    },
    team: {
      eyebrow: c.team?.eyebrow,
      heading: c.team?.heading,
      paragraph1: c.team?.paragraph1,
      paragraph2: c.team?.paragraph2,
      ctaLabel: c.team?.ctaLabel,
      ctaHref: c.team?.ctaHref,
      quote: c.team?.quote,
      image1: fallbackImages.team1,
      image1Alt: c.team?.image1Alt,
      image2: fallbackImages.team2,
      image2Alt: c.team?.image2Alt,
    },
  }
}
