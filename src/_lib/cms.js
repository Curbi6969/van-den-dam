// Shared CMS fetch helper used by all _data files.
// - Production build: fetches the PUBLISHED version (public, no auth).
// - Preview build (PREVIEW=1): fetches the latest DRAFT version, authenticated
//   with a CMS API key, so editors can see unpublished changes.
const CMS = process.env.CMS_URL || 'https://van-den-dam-cms.vercel.app'
const PREVIEW = process.env.PREVIEW === '1' || process.env.PREVIEW === 'true'
const API_KEY = process.env.CMS_API_KEY

async function fetchGlobal(slug, { locale = 'nl' } = {}) {
  const params = new URLSearchParams({ locale, depth: '0' })
  if (PREVIEW) params.set('draft', 'true')
  const headers = {}
  if (PREVIEW && API_KEY) headers.Authorization = `users API-Key ${API_KEY}`
  const res = await fetch(`${CMS}/api/globals/${slug}?${params.toString()}`, { headers })
  if (!res.ok) throw new Error(`CMS ${slug} fetch failed: HTTP ${res.status}`)
  return res.json()
}

module.exports = { fetchGlobal, PREVIEW, CMS }
