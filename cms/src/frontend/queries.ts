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

const dienstenImg = {
  binnen: ['/resources/binnenschilderen-muurschildering.jpg', '/resources/behangen.jpg'],
  buiten: [
    '/resources/buitenschilderen-degrindhorst.jpg',
    '/resources/zeil_small.jpg',
    '/resources/glaszetter.jpg',
  ],
}

export async function getDiensten(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'diensten', locale, depth: 0, draft })) as any
  const withImgs = (group: any, imgs: string[]) => ({
    ...(group ?? {}),
    items: ((group?.items ?? []) as any[]).map((it, i) => ({ ...it, image: imgs[i] ?? imgs[0] })),
  })
  return {
    hero: c.hero ?? {},
    binnenwerk: withImgs(c.binnenwerk, dienstenImg.binnen),
    buitenwerk: withImgs(c.buitenwerk, dienstenImg.buiten),
    cta: c.cta ?? {},
  }
}

export async function getPortfolio(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'portfolio', locale, depth: 0, draft })) as any
  return {
    hero: c.hero ?? {},
    filters: (c.filters ?? []) as any[],
    projects: ((c.projects ?? []) as any[]).map((p) => ({ ...p, image: '/resources/vakman.jpg' })),
    cta: c.cta ?? {},
  }
}

export async function getOverOns(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'over-ons', locale, depth: 0, draft })) as any
  return {
    hero: { ...(c.hero ?? {}), image: '/resources/team.jpg' },
    values: c.values ?? {},
    team: { ...(c.team ?? {}), image1: '/resources/vakman.jpg', image2: '/resources/team.jpg' },
  }
}

export async function getContact(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'contact', locale, depth: 0, draft })) as any
  return {
    hero: c.hero ?? {},
    infoCard: c.infoCard ?? {},
    businessCard: c.businessCard ?? {},
    form: c.form ?? {},
  }
}

export async function getPrivacy(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'privacyverklaring', locale, depth: 0, draft })) as any
  return {
    eyebrow: c.eyebrow as string,
    heading: c.heading as string,
    lastUpdated: c.lastUpdated as string,
    backLink: c.backLink as string,
    sections: (c.sections ?? []) as { heading: string; html: string }[],
  }
}

export async function getNotFound(locale: Locale = 'nl', draft = false) {
  const payload = await payloadClient()
  const c = (await payload.findGlobal({ slug: 'niet-gevonden', locale, depth: 0, draft })) as any
  return {
    heading: c.heading as string,
    body: c.body as string,
    linkHome: c.linkHome as string,
    linkContact: c.linkContact as string,
  }
}
