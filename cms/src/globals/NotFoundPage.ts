import type { GlobalConfig } from 'payload'

export const NotFoundPage: GlobalConfig = {
  slug: 'niet-gevonden',
  label: '404 pagina',
  admin: {
    group: "Pagina's",
    description: 'Teksten op de pagina die verschijnt als een bezoeker een onbekende URL opent.',
  },
  access: { read: () => true },
  fields: [
    { name: 'heading', type: 'text', label: 'Kop', localized: true },
    { name: 'body', type: 'textarea', label: 'Bodytekst', localized: true },
    {
      type: 'row',
      fields: [
        { name: 'linkHome', type: 'text', label: 'Tekst link naar home', localized: true, admin: { width: '60%' } },
        { name: 'linkHomeHref', type: 'text', label: 'Verwijst naar (URL)', admin: { width: '40%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'linkContact', type: 'text', label: 'Tekst link naar contact', localized: true, admin: { width: '60%' } },
        { name: 'linkContactHref', type: 'text', label: 'Verwijst naar (URL)', admin: { width: '40%' } },
      ],
    },
  ],
}
