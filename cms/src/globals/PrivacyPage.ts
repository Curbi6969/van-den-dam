import type { GlobalConfig } from 'payload'

export const PrivacyPage: GlobalConfig = {
  slug: 'privacyverklaring',
  label: 'Privacyverklaring',
  admin: {
    group: "Pagina's",
    description: 'Inhoud van de privacyverklaring, inclusief secties en de terugknop naar de homepage.',
  },
  access: { read: () => true },
  fields: [
    { name: 'eyebrow', type: 'text', label: 'Bovenkop', localized: true },
    { name: 'heading', type: 'text', label: 'Kop', localized: true },
    { name: 'lastUpdated', type: 'text', label: 'Datum laatste wijziging', localized: true },
    { name: 'contactEmail', type: 'text', label: 'Contact e-mailadres' },
    {
      type: 'row',
      fields: [
        { name: 'backLink', type: 'text', label: 'Tekst teruglink', localized: true, admin: { width: '60%' } },
        { name: 'backLinkHref', type: 'text', label: 'Verwijst naar (URL)', admin: { width: '40%' } },
      ],
    },
    {
      type: 'array',
      name: 'sections',
      label: 'Secties',
      localized: true,
      labels: { singular: 'Sectie', plural: 'Secties' },
      fields: [
        { name: 'heading', type: 'text', label: 'Kop' },
        { name: 'html', type: 'textarea', label: 'Inhoud (HTML)' },
      ],
    },
  ],
}
