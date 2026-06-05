import type { GlobalConfig } from 'payload'

export const NotFoundPage: GlobalConfig = {
  slug: 'niet-gevonden',
  label: '404 pagina',
  admin: { group: "Pagina's" },
  access: { read: () => true },
  fields: [
    { name: 'heading', type: 'text', label: 'Kop', localized: true },
    { name: 'body', type: 'textarea', label: 'Bodytekst', localized: true },
    { name: 'linkHome', type: 'text', label: 'Tekst link naar home', localized: true },
    { name: 'linkContact', type: 'text', label: 'Tekst link naar contact', localized: true },
  ],
}
