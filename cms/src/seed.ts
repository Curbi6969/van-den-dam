import { getPayload } from 'payload'
import config from './payload.config'

// One-off seed: load the current site's Dutch content into the CMS globals so
// the admin shows real text instead of blank fields. Image fields are left
// empty for now (media storage comes later); the public site keeps its local
// images until those are uploaded. Run with: npm run payload -- run src/seed.ts
const seed = async (): Promise<void> => {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'nl',
    data: {
      company: {
        name: 'Van den Dam Schilderwerken',
        shortName: 'Van den Dam',
        tagline: 'Vakmanschap in elke penseelstreek',
        founded: '1997',
        yearsExperience: '25+',
      },
      contact: {
        addressLine1: 'De Tamboer 4',
        addressLine2: '6921 TD Duiven',
        phoneDisplay: '0316 281013',
        phoneHref: '+310316281013',
        email: 'vandendamschilderwerken@live.nl',
      },
      business: {
        kvk: 'Arnhem nr. 09094924',
        bankName: 'Rabobank Duiven',
        bankAccount: 'Rek. nr. 3154 88 980',
      },
      navServices: [
        { title: 'Schilderen', url: 'dienst-binnenschilderwerk.html' },
        { title: 'Behangen', url: 'dienst-behangen.html' },
        { title: 'Onderhoud', url: 'dienst-buitenschilderwerk.html' },
        { title: 'Afgeschermd Onderhoud', url: 'dienst-afgeschermd-onderhoud.html' },
        { title: 'Beglazing', url: 'dienst-beglazing.html' },
      ],
      credit: {
        name: 'Beau Nolten',
        url: 'https://nl.linkedin.com/in/beau-nolten-a98a89a7',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'home',
    locale: 'nl',
    data: {
      hero: {
        eyebrow: 'Familiebedrijf · Sinds 1997',
        title: 'Meesterlijk Schilderwerk & Afwerking',
        subtitle:
          'Met meer dan 25 jaar expertise brengen wij precisie en passie in elke penseelstreek. Voor uw woning, kantoor of monument.',
      },
      trust: [
        { icon: 'verified', title: 'Familiebedrijf', subtitle: 'Opgericht in 1997' },
        { icon: 'award_star', title: 'Kwaliteit Gegarandeerd', subtitle: '25+ jaar vakmanschap' },
        { icon: 'handshake', title: 'Persoonlijk Contact', subtitle: 'Direct met de vakman' },
      ],
      servicesIntro: {
        eyebrow: 'Wat wij doen',
        title: 'Onze Expertise',
        text: 'Het verfijnen van ruimtes met nauwgezette zorg en hoogwaardige materialen.',
      },
      servicesCards: [
        { title: 'Schilderwerk', text: 'Binnen en buiten vlekkeloze afwerkingen met uitsluitend hoogwaardige, duurzame materialen.', raised: false },
        { title: 'Glasservice', text: 'Deskundige installatie en reparatie van glas snel, veilig en nauwkeurig uitgevoerd.', raised: true },
        { title: 'Wandafwerking & Decoratie', text: 'Op maat gemaakte decoratieve technieken en hoogwaardige behanginstallatie voor elk interieur.', raised: false },
      ],
      about: {
        eyebrow: 'Over ons',
        title: 'Vakmanschap in het DNA.',
        badgeNumber: '25+',
        badgeLabel: 'jaar ervaring',
        paragraph1:
          'Wat begon als een gedeelde passie is uitgegroeid tot een referentie in hoogwaardig schilder- en renovatiewerk. Wij geloven dat kleur en textuur de architectuur van een ruimte definiëren.',
        paragraph2:
          'Als familiebedrijf staan we voor direct contact, absolute betrouwbaarheid en een persoonlijke benadering bij elk project, groot of klein.',
      },
      portfolioIntro: { eyebrow: 'Onze realisaties', title: 'Recent Werk' },
      portfolio: [
        { category: 'Interieur', title: 'Herenhuis Amsterdam-Zuid' },
        { category: 'Exterieur', title: 'Villa Bloemendaal' },
        { category: 'Speciaal lakwerk', title: 'Klassiek Houtwerk' },
      ],
      reviewsIntro: {
        eyebrow: 'Wat klanten zeggen',
        title: 'Beoordeeld door tevreden klanten',
        score: '9.2/10',
        count: '27+',
      },
      reviews: [
        { quote: 'Dit is een top bedrijf met vakkundig personeel. 4 jaar geleden de buitenkant laten doen en vorig jaar binnen, waar we elke dag van genieten.', name: 'Frank' },
        { quote: 'Super strak werk, ze denken altijd mee. Alleen maar lof!', name: 'Karin' },
        { quote: 'Ik kan alleen maar zeggen SUPER! Dit zijn echte schilders! Ze denken mee en leveren geweldig werk.', name: 'Bert' },
        { quote: 'Vriendelijk, denken mee, prijs-kwaliteitverhouding super en alles altijd in goed overleg.', name: 'Peter' },
        { quote: 'Mensen die meedenken. Eerlijk en een goede ploeg.', name: 'John' },
        { quote: 'Top bedrijf. Daar kan je op bouwen.', name: 'Petra' },
      ],
      cta: {
        title: 'Klaar om uw ruimte te transformeren?',
        text: 'Neem contact met ons op voor een vrijblijvend adviesgesprek.',
        button: 'Neem Contact Op',
      },
    },
  })

  payload.logger.info('Seed complete: site-settings + home (NL) populated.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
