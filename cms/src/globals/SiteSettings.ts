import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Algemene instellingen',
  admin: {
    description: 'Bedrijfsgegevens, contactinformatie en algemene site-instellingen die op meerdere paginas worden gebruikt.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'group',
      name: 'company',
      label: 'Bedrijfsgegevens',
      fields: [
        { name: 'name', type: 'text', label: 'Bedrijfsnaam', required: true },
        { name: 'shortName', type: 'text', label: 'Korte naam' },
        { name: 'tagline', type: 'text', label: 'Tagline', localized: true },
        { name: 'founded', type: 'text', label: 'Oprichtingsjaar' },
        { name: 'yearsExperience', type: 'text', label: 'Jaren ervaring' },
      ],
    },
    {
      type: 'group',
      name: 'contact',
      label: 'Contactgegevens',
      fields: [
        { name: 'addressLine1', type: 'text', label: 'Adresregel 1' },
        { name: 'addressLine2', type: 'text', label: 'Adresregel 2 (postcode, plaats)' },
        { name: 'phoneDisplay', type: 'text', label: 'Telefoonnummer (weergave)' },
        { name: 'phoneHref', type: 'text', label: 'Telefoonnummer (tel: link)' },
        { name: 'email', type: 'email', label: 'E-mailadres' },
      ],
    },
    {
      type: 'group',
      name: 'business',
      label: 'Zakelijke gegevens',
      fields: [
        { name: 'kvk', type: 'text', label: 'KvK-nummer' },
        { name: 'bankName', type: 'text', label: 'Banknaam' },
        { name: 'bankAccount', type: 'text', label: 'Rekeningnummer' },
      ],
    },
    {
      type: 'array',
      name: 'navServices',
      label: 'Navigatie: diensten',
      labels: { singular: 'Dienst', plural: 'Diensten' },
      fields: [
        { name: 'title', type: 'text', label: 'Titel', required: true, localized: true },
        { name: 'url', type: 'text', label: 'URL (bijv. dienst-behangen.html)', required: true },
      ],
    },
    {
      type: 'group',
      name: 'credit',
      label: 'Website credits',
      fields: [
        { name: 'name', type: 'text', label: 'Naam' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
  ],
}
