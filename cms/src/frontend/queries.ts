import { getPayload } from 'payload'
import configPromise from '@/payload.config'

export type Locale = 'nl' | 'en'

const payloadClient = async () => getPayload({ config: await configPromise })

// Images and SEO meta are not in the CMS yet; fall back to the originals so the
// page is visually identical until media management (Vercel Blob) is added.
const img = {
  hero: '/resources/vakman.jpg',
  servicesCards: ['/resources/team.jpg', '/resources/vakman.jpg', '/resources/vakman.jpg'],
  about: '/resources/team.jpg',
  portfolio: ['/resources/vakman.jpg', '/resources/vakman.jpg', '/resources/vakman.jpg'],
}

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

export async function getHome(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'home', locale, depth: 0, draft })) as any
  return {
    hero: { ...(c.hero ?? {}), image: img.hero },
    trust: (c.trust ?? []) as any[],
    servicesIntro: c.servicesIntro ?? {},
    servicesCards: ((c.servicesCards ?? []) as any[]).map((card, i) => ({
      ...card,
      image: img.servicesCards[i] ?? img.servicesCards[0],
    })),
    about: { ...(c.about ?? {}), image: img.about },
    portfolioIntro: c.portfolioIntro ?? {},
    portfolio: ((c.portfolio ?? []) as any[]).map((p, i) => ({
      ...p,
      image: img.portfolio[i] ?? img.portfolio[0],
    })),
    reviewsIntro: c.reviewsIntro ?? {},
    reviews: (c.reviews ?? []) as any[],
    cta: c.cta ?? {},
  }
}
