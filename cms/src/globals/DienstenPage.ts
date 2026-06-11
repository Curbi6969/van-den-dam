import type { GlobalConfig } from 'payload'

const serviceItems = (singular: string) => ({
  type: 'array' as const,
  name: 'items',
  label: 'Items',
  localized: true,
  labels: { singular, plural: 'Items' },
  fields: [
    { name: 'categoryLabel', type: 'text' as const, label: 'Categorie label' },
    { name: 'title', type: 'text' as const, label: 'Titel' },
    { name: 'image', type: 'upload' as const, relationTo: 'media' as const, label: 'Afbeelding' },
    { name: 'imageAlt', type: 'text' as const, label: 'Afbeelding alt-tekst' },
    { name: 'text', type: 'textarea' as const, label: 'Tekst' },
    { name: 'linkHref', type: 'text' as const, label: 'Link URL' },
    { name: 'linkLabel', type: 'text' as const, label: 'Link tekst' },
  ],
})

export const DienstenPage: GlobalConfig = {
  slug: 'diensten',
  label: 'Diensten (overzicht)',
  admin: {
    group: "Pagina's",
    description: 'Teksten en afbeeldingen op de dienstenpagina: hero, binnenwerk, buitenwerk en de call-to-action.',
  },
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
      type: 'group',
      name: 'binnenwerk',
      label: 'Binnenwerk sectie',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'heading', type: 'text', label: 'Kop' },
        serviceItems('Item'),
      ],
    },
    {
      type: 'group',
      name: 'buitenwerk',
      label: 'Buitenwerk sectie',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'heading', type: 'text', label: 'Kop' },
        serviceItems('Item'),
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
