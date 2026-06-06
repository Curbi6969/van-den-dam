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
