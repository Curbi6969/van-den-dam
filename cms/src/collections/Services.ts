import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Dienst', plural: 'Diensten (detailpagina\'s)' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'De losse dienstpagina\'s (binnenschilderwerk, behangen, beglazing, ...).',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'title', type: 'text', label: 'Titel', required: true },
        {
          name: 'slug',
          type: 'text',
          label: 'URL-naam (bijv. dienst-behangen)',
          required: true,
          unique: true,
          admin: { description: 'Zonder spaties. Bepaalt het paginapad.' },
        },
      ],
    },
    { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
    { name: 'heading', type: 'text', label: 'Kop' },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Hero-afbeelding',
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Tekst',
    },
    {
      name: 'inlineImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Inline afbeelding (optioneel)',
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaPrimary', type: 'text', label: 'Primaire knoptekst' },
        { name: 'ctaSecondary', type: 'text', label: 'Secundaire knoptekst' },
      ],
    },
  ],
}
