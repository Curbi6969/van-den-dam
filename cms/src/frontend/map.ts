// Pure, client-safe transforms from raw Payload global data to the shape the
// view components render. Used both on the server (initial render) and in the
// client (live preview updates). Image/SEO fallbacks live here until media is
// managed in the CMS.
const img = {
  hero: '/resources/vakman.jpg',
  servicesCards: ['/resources/team.jpg', '/resources/vakman.jpg', '/resources/vakman.jpg'],
  about: '/resources/team.jpg',
  portfolio: ['/resources/vakman.jpg', '/resources/vakman.jpg', '/resources/vakman.jpg'],
}

export function mapHome(c: any) {
  c = c ?? {}
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

export function mapDiensten(c: any) {
  c = c ?? {}
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

export function mapPortfolio(c: any) {
  c = c ?? {}
  return {
    hero: c.hero ?? {},
    filters: (c.filters ?? []) as any[],
    projects: ((c.projects ?? []) as any[]).map((p) => ({ ...p, image: '/resources/vakman.jpg' })),
    cta: c.cta ?? {},
  }
}

export function mapOverOns(c: any) {
  c = c ?? {}
  return {
    hero: { ...(c.hero ?? {}), image: '/resources/team.jpg' },
    values: { ...(c.values ?? {}), items: (c.values?.items ?? []) as any[] },
    team: { ...(c.team ?? {}), image1: '/resources/vakman.jpg', image2: '/resources/team.jpg' },
  }
}

export function mapContact(c: any) {
  c = c ?? {}
  return {
    hero: c.hero ?? {},
    infoCard: c.infoCard ?? {},
    businessCard: c.businessCard ?? {},
    form: c.form ?? {},
  }
}

export function mapPrivacy(c: any) {
  c = c ?? {}
  return {
    eyebrow: c.eyebrow as string,
    heading: c.heading as string,
    lastUpdated: c.lastUpdated as string,
    backLink: c.backLink as string,
    sections: (c.sections ?? []) as { heading: string; html: string }[],
  }
}

export function mapNotFound(c: any) {
  c = c ?? {}
  return {
    heading: c.heading as string,
    body: c.body as string,
    linkHome: c.linkHome as string,
    linkContact: c.linkContact as string,
  }
}
