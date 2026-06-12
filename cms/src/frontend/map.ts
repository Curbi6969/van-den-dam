// Pure, client-safe transforms from raw Payload global data to the shape the
// view components render. Used both on the server (initial render) and in the
// client (live preview updates). Image/SEO fallbacks live here for pages whose
// media is not yet managed in the CMS; Home prefers the uploaded CMS image.
const img = {
  hero: '/resources/vakman.jpg',
  servicesCards: ['/resources/team.jpg', '/resources/vakman.jpg', '/resources/vakman.jpg'],
  about: '/resources/team.jpg',
  portfolio: ['/resources/vakman.jpg', '/resources/vakman.jpg', '/resources/vakman.jpg'],
}

// Gepopuleerd upload-veld (object met url, bij depth >= 1) of de fallback.
const mediaUrl = (m: any, fallback: string): string =>
  m && typeof m === 'object' && typeof m.url === 'string' ? m.url : fallback

export function mapHome(c: any) {
  c = c ?? {}
  return {
    hero: {
      ...(c.hero ?? {}),
      image: mediaUrl(c.hero?.image, img.hero),
      ctaPrimary: c.hero?.ctaPrimary ?? 'Offerte Aanvragen',
      ctaPrimaryHref: c.hero?.ctaPrimaryHref ?? '/contact',
      ctaSecondary: c.hero?.ctaSecondary ?? 'Bekijk Portfolio',
      ctaSecondaryHref: c.hero?.ctaSecondaryHref ?? '/portfolio',
    },
    trust: (c.trust ?? []) as any[],
    servicesIntro: {
      ...(c.servicesIntro ?? {}),
      ctaViewAll: c.servicesIntro?.ctaViewAll ?? 'Bekijk al onze diensten',
      ctaViewAllHref: c.servicesIntro?.ctaViewAllHref ?? '/diensten',
    },
    servicesCards: ((c.servicesCards ?? []) as any[]).map((card, i) => ({
      ...card,
      image: mediaUrl(card?.image, img.servicesCards[i] ?? img.servicesCards[0]),
      linkLabel: card?.linkLabel ?? 'Meer lezen',
      linkHref: card?.linkHref ?? '/diensten',
    })),
    about: {
      ...(c.about ?? {}),
      image: mediaUrl(c.about?.image, img.about),
      ctaLabel: c.about?.ctaLabel ?? 'Leer ons kennen',
      ctaHref: c.about?.ctaHref ?? '/over-ons',
    },
    portfolioIntro: {
      ...(c.portfolioIntro ?? {}),
      ctaViewAll: c.portfolioIntro?.ctaViewAll ?? 'Volledig portfolio',
      ctaViewAllHref: c.portfolioIntro?.ctaViewAllHref ?? '/portfolio',
    },
    portfolio: ((c.portfolio ?? []) as any[]).map((p, i) => ({
      ...p,
      image: mediaUrl(p?.image, img.portfolio[i] ?? img.portfolio[0]),
    })),
    reviewsIntro: c.reviewsIntro ?? {},
    reviews: (c.reviews ?? []) as any[],
    cta: { ...(c.cta ?? {}), href: c.cta?.href ?? '/contact' },
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
    items: ((group?.items ?? []) as any[]).map((it, i) => ({
      ...it,
      image: mediaUrl(it?.image, imgs[i] ?? imgs[0]),
    })),
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
    projects: ((c.projects ?? []) as any[]).map((p) => ({
      ...p,
      image: mediaUrl(p?.image, '/resources/vakman.jpg'),
    })),
    cta: { ...(c.cta ?? {}), href: c.cta?.href ?? '/contact' },
  }
}

export function mapOverOns(c: any) {
  c = c ?? {}
  return {
    hero: { ...(c.hero ?? {}), image: mediaUrl(c.hero?.image, '/resources/team.jpg') },
    values: { ...(c.values ?? {}), items: (c.values?.items ?? []) as any[] },
    team: {
      ...(c.team ?? {}),
      image1: mediaUrl(c.team?.image1, '/resources/vakman.jpg'),
      image2: mediaUrl(c.team?.image2, '/resources/team.jpg'),
    },
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
    backLinkHref: (c.backLinkHref as string) ?? '/',
    sections: (c.sections ?? []) as { heading: string; html: string }[],
  }
}

export function mapNotFound(c: any) {
  c = c ?? {}
  return {
    heading: c.heading as string,
    body: c.body as string,
    linkHome: c.linkHome as string,
    linkHomeHref: (c.linkHomeHref as string) ?? '/',
    linkContact: c.linkContact as string,
    linkContactHref: (c.linkContactHref as string) ?? '/contact',
  }
}
