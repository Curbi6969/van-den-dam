// 404 page content, fetched from the Payload CMS at build time.
// Text comes from the CMS; SEO meta is not managed in the CMS yet,
// so it falls back to the originals to keep the page visually identical.
const CMS = process.env.CMS_URL || 'https://van-den-dam-cms.vercel.app'

const fallbackSeo = {
  title: 'Pagina niet gevonden: Van den Dam Schilderwerken',
  description: 'De pagina die u zoekt bestaat niet of is verplaatst.',
}

module.exports = async function () {
  const res = await fetch(`${CMS}/api/globals/niet-gevonden?locale=nl&depth=0`)
  if (!res.ok) throw new Error(`CMS niet-gevonden fetch failed: HTTP ${res.status}`)
  const c = await res.json()

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    heading: c.heading,
    body: c.body,
    linkHome: c.linkHome,
    linkContact: c.linkContact,
  }
}
