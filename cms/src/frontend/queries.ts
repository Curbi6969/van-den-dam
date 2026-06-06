import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export type Locale = 'nl' | 'en'

const payloadClient = async () => getPayload({ config: await configPromise })

// Site-wide settings (company, contact, business). Used in the layout (Nav/Footer)
// and on the contact page. Page content transforms live in ./map.ts so they can
// run in client components for live preview; site settings render server-side only.
export async function getSite(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'site-settings', locale, depth: 0, draft })) as any
  return {
    name: c.company?.name as string,
    shortName: c.company?.shortName as string,
    tagline: c.company?.tagline as string,
    founded: c.company?.founded as string,
    contact: c.contact ?? {},
    business: c.business ?? {},
    credit: c.credit ?? {},
    services: (c.navServices ?? []) as { title: string; url: string }[],
  }
}
