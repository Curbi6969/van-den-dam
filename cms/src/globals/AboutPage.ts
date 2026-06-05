import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'over-ons',
  label: 'Over Ons',
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
        { name: 'text', type: 'textarea', label: 'Tekst' },
        { name: 'ctaLabel', type: 'text', label: 'Knoptekst' },
        { name: 'ctaHref', type: 'text', label: 'Knop URL' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
        { name: 'imageAlt', type: 'text', label: 'Afbeelding alt-tekst' },
      ],
    },
    {
      type: 'group',
      name: 'values',
      label: 'Waarden sectie',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'heading', type: 'text', label: 'Kop' },
        {
          type: 'array',
          name: 'items',
          label: 'Waarden',
          labels: { singular: 'Waarde', plural: 'Waarden' },
          fields: [
            { name: 'icon', type: 'text', label: 'Icoon (Material Symbol naam)' },
            { name: 'title', type: 'text', label: 'Titel' },
            { name: 'text', type: 'textarea', label: 'Tekst' },
            { name: 'raised', type: 'checkbox', label: 'Uitgelicht' },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'team',
      label: 'Team sectie',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'heading', type: 'text', label: 'Kop' },
        { name: 'paragraph1', type: 'textarea', label: 'Alinea 1' },
        { name: 'paragraph2', type: 'textarea', label: 'Alinea 2' },
        { name: 'ctaLabel', type: 'text', label: 'Knoptekst' },
        { name: 'ctaHref', type: 'text', label: 'Knop URL' },
        { name: 'quote', type: 'textarea', label: 'Citaat' },
        { name: 'image1', type: 'upload', relationTo: 'media', label: 'Afbeelding 1' },
        { name: 'image1Alt', type: 'text', label: 'Afbeelding 1 alt-tekst' },
        { name: 'image2', type: 'upload', relationTo: 'media', label: 'Afbeelding 2' },
        { name: 'image2Alt', type: 'text', label: 'Afbeelding 2 alt-tekst' },
      ],
    },
  ],
}
