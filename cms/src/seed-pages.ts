import { getPayload } from 'payload'
import config from './payload.config'

// Seed the page globals (Diensten, Portfolio, Over Ons, Contact, Privacy, 404)
// with the current site's Dutch content. Image fields are left empty for now.
// Run with: npx tsx --env-file=.env src/seed-pages.ts
const seed = async (): Promise<void> => {
  const payload = await getPayload({ config })
  const nl = 'nl' as const

  await payload.updateGlobal({
    slug: 'diensten',
    locale: nl,
    data: {
      hero: {
        eyebrow: 'Wat wij bieden',
        title: 'Ons Vakmanschap',
        subtitle:
          'Van decoratief binnenschilderwerk tot weersbestendig buitenonderhoud wij leveren vakwerk voor elk project.',
      },
      binnenwerk: {
        eyebrow: 'Binnenwerk',
        heading: 'Binnen',
        items: [
          { categoryLabel: 'Binnenwerk', title: 'Schilderen', imageAlt: 'Wandschilderingen binnenschilderwerk', text: 'Binnen beperken we onze schilderwerkzaamheden niet tot kozijnen en deuren alleen. Ook maken we diverse decoratieve schilderwerken op muren, plafonds en vloeren.', linkHref: 'dienst-binnenschilderwerk.html', linkLabel: 'Lees meer' },
          { categoryLabel: 'Binnenwerk', title: 'Behangen', imageAlt: 'Behangen en wandafwerking', text: 'Naast schilderwerk verzorgen we ook uw behangwerk. Van Engelse stijl tot Laura Ashley wij houden rekening met doorlopende patronen en perfecte afwerking.', linkHref: 'dienst-behangen.html', linkLabel: 'Lees meer' },
        ],
      },
      buitenwerk: {
        eyebrow: 'Buitenwerk',
        heading: 'Buiten',
        items: [
          { categoryLabel: 'Buitenwerk', title: 'Onderhoud', imageAlt: 'Opschilderen villa de Grindhorst', text: 'Het onderhoud van buitenschilderwerk is van groot belang voor uw woning, kantoor of appartement zowel esthetisch als technisch.', linkHref: 'dienst-buitenschilderwerk.html', linkLabel: 'Lees meer' },
          { categoryLabel: 'Buitenwerk', title: 'Afgeschermd Onderhoud', imageAlt: 'Afgeschermde werkplek met zeil', text: 'Ook in herfst en winter kunt u uw woning laten schilderen. Dankzij seizoenverlengende verfsystemen werken wij vrijwel het gehele koude seizoen door.', linkHref: 'dienst-afgeschermd-onderhoud.html', linkLabel: 'Lees meer' },
          { categoryLabel: 'Buitenwerk', title: 'Beglazing', imageAlt: 'Glaswerk beglazing', text: 'Isolerende beglazing van uw woonhuis, bedrijfspand of keuken. Wij zijn een OnderhoudNL-erkende glaszetter.', linkHref: 'dienst-beglazing.html', linkLabel: 'Lees meer' },
        ],
      },
      cta: { title: 'Een vakman in uw buurt?', text: 'Vraag vrijblijvend een offerte aan. Wij denken graag met u mee over de beste aanpak.', button: 'Offerte Aanvragen', href: 'contact.html' },
    },
  })

  await payload.updateGlobal({
    slug: 'portfolio',
    locale: nl,
    data: {
      hero: { eyebrow: 'Onze realisaties', title: 'Ons Portfolio', subtitle: 'Een selectie van onze meest verfijnde projecten. Van naadloze interieurs tot weerbestendige exterieurs vakmanschap dat de tand des tijds doorstaat.' },
      filters: [
        { value: 'all', label: 'Alles' },
        { value: 'interieur', label: 'Interieur' },
        { value: 'exterieur', label: 'Exterieur' },
        { value: 'speciaal', label: 'Speciaal Lakwerk' },
      ],
      projects: [
        { cat: 'interieur', colSpan: 'md:col-span-8 md:row-span-2', imageAlt: 'Herenhuis Amsterdam', categoryLabel: 'Interieur', title: 'Herenhuis Amsterdam-Zuid', description: 'Complete renovatie van het interieur schilderwerk, met een focus op historische details en een ultramatte afwerking.', size: 'large' },
        { cat: 'exterieur', colSpan: 'md:col-span-4 md:row-span-2', imageAlt: 'Villa Bloemendaal', categoryLabel: 'Exterieur', title: 'Villa Bloemendaal', description: 'Duurzaam exterieur schilderwerk dat de architectuur beschermt en accentueert.', size: 'medium' },
        { cat: 'speciaal', colSpan: 'md:col-span-4', imageAlt: 'Klassiek houtwerk', categoryLabel: 'Speciaal Lakwerk', title: 'Klassiek Houtwerk', description: 'Hoogglans restauratie van monumentaal houtwerk.', size: 'small' },
        { cat: 'interieur', colSpan: 'md:col-span-4', imageAlt: 'Design keuken', categoryLabel: 'Interieur', title: 'Design Keuken Laren', description: 'Strak spuitwerk voor een naadloos, modern keukenontwerp.', size: 'small' },
        { cat: 'exterieur', colSpan: 'md:col-span-4', imageAlt: 'Kantoorpand Zuidas', categoryLabel: 'Exterieur', title: 'Kantoorpand Zuidas', description: 'Grootschalig onderhoud en representatieve gevelafwerking.', size: 'small' },
      ],
      cta: { title: 'Ziet u uw woning hier ook bij?', text: 'Bespreek uw wensen en wij geven u een eerlijk advies op maat, zonder verplichtingen.', button: 'Offerte Aanvragen', href: 'contact.html' },
    },
  })

  await payload.updateGlobal({
    slug: 'over-ons',
    locale: nl,
    data: {
      hero: { eyebrow: 'Sinds 1997', title: 'Vakmanschap in het DNA.', text: 'Wat begon als een gedeelde passie is uitgegroeid tot een referentie in hoogwaardig schilder- en renovatiewerk. Wij geloven dat kleur en textuur de architectuur van een ruimte definiëren.', ctaLabel: 'Kom in contact', ctaHref: 'contact.html', imageAlt: 'Ons team' },
      values: {
        eyebrow: 'Onze waarden',
        heading: 'Wat ons drijft',
        items: [
          { icon: 'architecture', title: 'Architecturaal Inzicht', text: 'Wij kijken verder dan de verf. We begrijpen hoe licht, ruimte en materiaal interageren, en adviseren afwerkingen die de ruimtelijke ervaring versterken.', raised: false },
          { icon: 'verified', title: '25+ Jaar Ervaring', text: 'Een kwarteeuw aan opgebouwde expertise. Van historische restauraties tot strakke, moderne nieuwbouwprojecten we beheersen elke techniek tot in de perfectie.', raised: true },
          { icon: 'diversity_3', title: 'Familiale Waarden', text: 'Als familiebedrijf staan we voor direct contact, absolute betrouwbaarheid en een persoonlijke benadering bij elk project, groot of klein.', raised: false },
        ],
      },
      team: {
        eyebrow: 'Ons team',
        heading: 'Meesters in het Vak.',
        paragraph1: 'Ons team bestaat uitsluitend uit gediplomeerde vakmensen die onze visie op kwaliteit delen. Wij werken uitsluitend met premium materialen en volgen de nieuwste innovaties in verf- en afwerkingstechnieken op de voet.',
        paragraph2: 'Van minutieus voorbereidend werk tot de finale, feilloze afwerkingslaag: wij behandelen uw eigendom met het uiterste respect, alsof het ons eigen atelier is.',
        ctaLabel: 'Neem contact op',
        ctaHref: 'contact.html',
        quote: 'Elke streek is een handtekening van onze toewijding aan perfectie.',
        image1Alt: 'Detail verfkwast',
        image2Alt: 'Vakman aan het werk',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'contact',
    locale: nl,
    data: {
      hero: { eyebrow: 'Laten we praten', heading: 'Neem Contact Op', intro: 'Klaar om uw ruimte te transformeren? Bespreek uw visie met onze experts en ontvang een advies op maat.' },
      infoCard: { heading: 'Contactgegevens', addressLabel: 'Adres', phoneLabel: 'Telefoon', emailLabel: 'Email' },
      businessCard: { heading: 'Bedrijfsgegevens', kvkLabel: 'KvK', bankLabel: 'Bank', accountLabel: 'Rekeningnummer' },
      form: {
        heading: 'Offerte Aanvragen', intro: 'Vul uw gegevens in en wij nemen zo spoedig mogelijk contact met u op.',
        labelName: 'Naam *', labelPhone: 'Telefoonnummer *', labelMobile: 'Mobiel nummer', labelEmail: 'E-mailadres *',
        labelCopy: 'Stuur me een kopie van de aanvraag', labelCity: 'Woonplaats', labelUitvoeringMonth: 'Gewenste maand van uitvoer',
        labelWerkzaamheden: 'Werkzaamheden', optionChoose: 'Maak een keuze', optionSchilderen: 'Schilderen', optionBehangen: 'Behangen',
        optionOnderhoud: 'Onderhoud', optionAfgeschermd: 'Afgeschermd onderhoud', optionBeglazing: 'Beglazing', optionRamen: 'Ramen zetten',
        labelMessage: 'Aanvullende informatie', labelPrivacy: 'Ik ga akkoord met de', labelPrivacyLink: 'privacyverklaring', submitButton: 'Verstuur Aanvraag',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'privacyverklaring',
    locale: nl,
    data: {
      eyebrow: 'Juridisch',
      heading: 'Privacyverklaring',
      lastUpdated: 'Laatst bijgewerkt: april 2025',
      contactEmail: 'info@vandendam.nl',
      backLink: 'Terug naar home',
      sections: [
        { heading: '1. Wie zijn wij?', html: '<p>Van den Dam Schilderwerken is een familiebedrijf dat schilder-, glas- en afwerkingsdiensten aanbiedt. Wij zijn verantwoordelijk voor de verwerking van de persoonsgegevens die via onze website worden verzameld.</p><p><strong>Contactgegevens:</strong><br/>Van den Dam Schilderwerken<br/>E-mail: <a href="mailto:info@vandendam.nl">info@vandendam.nl</a></p>' },
        { heading: '2. Welke gegevens verzamelen wij?', html: '<p>Wij verzamelen alleen gegevens die u zelf aan ons verstrekt, namelijk via het contactformulier op onze website:</p><ul><li>Naam</li><li>E-mailadres</li><li>Telefoonnummer (optioneel)</li><li>Project type en beschrijving</li></ul><p>Wij verzamelen geen gegevens via cookies, tracking-pixels of andere technische middelen, tenzij dit expliciet vermeld staat.</p>' },
        { heading: '3. Waarvoor gebruiken wij uw gegevens?', html: '<p>Uw gegevens worden uitsluitend gebruikt voor:</p><ul><li>Het beantwoorden van uw vraag of offerte-aanvraag</li><li>Het versturen van informatie over uw project</li><li>Het plannen van een afspraak of offertegesprek</li></ul><p>Wij gebruiken uw gegevens <strong>nooit</strong> voor marketingdoeleinden of het doorverkopen aan derden.</p>' },
        { heading: '4. Grondslag voor verwerking', html: '<p>De verwerking van uw gegevens is gebaseerd op uw toestemming, die u geeft door het contactformulier in te vullen en het hokje bij de privacyverklaring aan te vinken. U kunt deze toestemming te allen tijde intrekken door contact met ons op te nemen.</p>' },
        { heading: '5. Hoe lang bewaren wij uw gegevens?', html: '<p>Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor het doel waarvoor ze zijn verzameld. In de praktijk betekent dit dat gegevens worden verwijderd zodra het contact of de opdracht is afgerond, tenzij een wettelijke bewaarplicht anders vereist.</p>' },
        { heading: '6. Delen wij uw gegevens?', html: '<p>Wij delen uw gegevens niet met derden, tenzij dit noodzakelijk is voor de uitvoering van een opdracht (bijvoorbeeld een onderaannemer), of wij wettelijk verplicht zijn dit te doen. In geval van inschakeling van derden sluiten wij passende verwerkersovereenkomsten.</p>' },
        { heading: '7. Beveiliging', html: '<p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of misbruik.</p>' },
        { heading: '8. Uw rechten', html: '<p>Op grond van de Algemene Verordening Gegevensbescherming (AVG) heeft u de volgende rechten:</p><ul><li><strong>Inzage:</strong> u kunt opvragen welke gegevens wij van u hebben</li><li><strong>Correctie:</strong> u kunt onjuiste gegevens laten aanpassen</li><li><strong>Verwijdering:</strong> u kunt verzoeken uw gegevens te laten wissen</li><li><strong>Bezwaar:</strong> u kunt bezwaar maken tegen de verwerking van uw gegevens</li><li><strong>Overdraagbaarheid:</strong> u kunt uw gegevens in een gangbaar formaat opvragen</li></ul><p>Om een van deze rechten uit te oefenen, neemt u contact op via <a href="mailto:info@vandendam.nl">info@vandendam.nl</a>. Wij reageren binnen 4 weken.</p>' },
        { heading: '9. Klacht indienen', html: '<p>Als u van mening bent dat wij uw persoonsgegevens niet correct verwerken, kunt u een klacht indienen bij de Autoriteit Persoonsgegevens via <a href="https://www.autoriteitpersoonsgegevens.nl" target="_blank" rel="noopener noreferrer">www.autoriteitpersoonsgegevens.nl</a>.</p>' },
        { heading: '10. Wijzigingen', html: '<p>Wij behouden het recht deze privacyverklaring te wijzigen. Wijzigingen worden gepubliceerd op deze pagina met vermelding van de nieuwe datum. Wij raden u aan deze pagina regelmatig te raadplegen.</p>' },
      ],
    },
  })

  await payload.updateGlobal({
    slug: 'niet-gevonden',
    locale: nl,
    data: {
      heading: 'Deze muur is nog niet geschilderd.',
      body: 'De pagina die u zoekt bestaat niet of is verplaatst. Misschien helpt een van de onderstaande links u verder.',
      linkHome: 'Terug naar home',
      linkContact: 'Contact',
    },
  })

  payload.logger.info('Seed complete: all page globals (NL) populated.')
  process.exit(0)
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
