import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Afbeelding', plural: 'Afbeeldingen' },
  // Niet los in het menu: afbeeldingen vervang je op de plek waar ze horen
  // (in een pagina-sectie of via bewerkmodus op de site), niet via een losse
  // bibliotheek waar je zomaar afbeeldingen kunt toevoegen.
  admin: { hidden: true },
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
