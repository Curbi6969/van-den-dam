// Diensten overview content, fetched from the Payload CMS at build time.
// Text comes from the CMS; images and SEO meta are not managed in the CMS yet,
// so they fall back to the originals to keep the page visually identical.
const CMS = process.env.CMS_URL || 'https://van-den-dam-cms.vercel.app'

const fallbackImages = {
  binnenwerk: [
    'resources/binnenschilderen-muurschildering.jpg',
    'resources/behangen.jpg',
  ],
  buitenwerk: [
    'resources/buitenschilderen-degrindhorst.jpg',
    'resources/zeil_small.jpg',
    'resources/glaszetter.jpg',
  ],
}
const fallbackImageAlts = {
  binnenwerk: [
    'Wandschilderingen binnenschilderwerk',
    'Behangen en wandafwerking',
  ],
  buitenwerk: [
    'Opschilderen villa de Grindhorst',
    'Afgeschermde werkplek met zeil',
    'Glaswerk beglazing',
  ],
}
const fallbackSeo = {
  title: 'Diensten Van den Dam Schilderwerken',
  description:
    'Ontdek onze diensten: schilderwerk binnen en buiten, behangen, glasservice en afgeschermd onderhoud.',
}

const mapItems = (items, section) =>
  (items || []).map((item, i) => ({
    ...item,
    image: fallbackImages[section][i] || fallbackImages[section][0],
    imageAlt: item.imageAlt || fallbackImageAlts[section][i] || '',
  }))

module.exports = async function () {
  const res = await fetch(`${CMS}/api/globals/diensten?locale=nl&depth=0`)
  if (!res.ok) throw new Error(`CMS diensten fetch failed: HTTP ${res.status}`)
  const c = await res.json()

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    hero: c.hero || {},
    binnenwerk: {
      ...(c.binnenwerk || {}),
      items: mapItems(c.binnenwerk?.items, 'binnenwerk'),
    },
    buitenwerk: {
      ...(c.buitenwerk || {}),
      items: mapItems(c.buitenwerk?.items, 'buitenwerk'),
    },
    cta: c.cta || {},
  }
}
