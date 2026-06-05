import type { GlobalConfig } from 'payload'

export const PortfolioPage: GlobalConfig = {
  slug: 'portfolio',
  label: 'Portfolio',
  admin: { group: "Pagina's" },
  access: { read: () => true },
  fields: [
    {
      type: 'group',
      name: 'hero',
      label: 'Hero-sectie',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'subtitle', type: 'textarea', label: 'Ondertitel' },
      ],
    },
    {
      type: 'array',
      name: 'filters',
      label: 'Filteropties',
      localized: true,
      labels: { singular: 'Filter', plural: 'Filters' },
      fields: [
        { name: 'value', type: 'text', label: 'Waarde (intern, geen spaties)' },
        { name: 'label', type: 'text', label: 'Label (weergave)' },
      ],
    },
    {
      type: 'array',
      name: 'projects',
      label: 'Projecten',
      localized: true,
      labels: { singular: 'Project', plural: 'Projecten' },
      fields: [
        { name: 'cat', type: 'text', label: 'Categorie (intern, bijv. interieur)' },
        { name: 'colSpan', type: 'text', label: 'Grid breedte (CSS klassen)' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
        { name: 'imageAlt', type: 'text', label: 'Afbeelding alt-tekst' },
        { name: 'categoryLabel', type: 'text', label: 'Categorie label (weergave)' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'description', type: 'textarea', label: 'Omschrijving' },
        { name: 'size', type: 'text', label: 'Grootte (large/medium/small)' },
      ],
    },
    {
      type: 'group',
      name: 'cta',
      label: 'Call-to-action',
      localized: true,
      fields: [
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'text', type: 'textarea', label: 'Tekst' },
        { name: 'button', type: 'text', label: 'Knoptekst' },
        { name: 'href', type: 'text', label: 'Link URL' },
      ],
    },
  ],
}
