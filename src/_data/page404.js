// 404 page content, fetched from the Payload CMS at build time.
// Text comes from the CMS; SEO meta is not managed in the CMS yet,
// so it falls back to the originals to keep the page visually identical.
const { fetchGlobal } = require('../_lib/cms')

const fallbackSeo = {
  title: 'Pagina niet gevonden: Van den Dam Schilderwerken',
  description: 'De pagina die u zoekt bestaat niet of is verplaatst.',
}

module.exports = async function () {
  const c = await fetchGlobal('niet-gevonden')

  return {
    title: c.meta?.title || fallbackSeo.title,
    description: c.meta?.description || fallbackSeo.description,
    heading: c.heading,
    body: c.body,
    linkHome: c.linkHome,
    linkContact: c.linkContact,
  }
}
