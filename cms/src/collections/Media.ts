import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Afbeelding', plural: 'Afbeeldingen' },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Alt-tekst (voor SEO en toegankelijkheid)',
      required: true,
    },
  ],
  upload: true,
}
