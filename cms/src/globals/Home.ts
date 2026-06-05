import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Homepage',
  access: {
    read: () => true,
  },
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
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
      ],
    },
    {
      type: 'array',
      name: 'trust',
      label: 'Vertrouwensstrook',
      localized: true,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'icon', type: 'text', label: 'Icoon (Material Symbol naam)' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'subtitle', type: 'text', label: 'Ondertitel' },
      ],
    },
    {
      type: 'group',
      name: 'servicesIntro',
      label: 'Intro diensten',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'text', type: 'textarea', label: 'Tekst' },
      ],
    },
    {
      type: 'array',
      name: 'servicesCards',
      label: 'Dienstenkaarten',
      localized: true,
      labels: { singular: 'Kaart', plural: 'Kaarten' },
      fields: [
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'text', type: 'textarea', label: 'Tekst' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
        { name: 'raised', type: 'checkbox', label: 'Uitgelicht' },
      ],
    },
    {
      type: 'group',
      name: 'about',
      label: 'Over ons sectie',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
        { name: 'badgeNumber', type: 'text', label: 'Badge getal (bijv. 25+)' },
        { name: 'badgeLabel', type: 'text', label: 'Badge label' },
        { name: 'paragraph1', type: 'textarea', label: 'Alinea 1' },
        { name: 'paragraph2', type: 'textarea', label: 'Alinea 2' },
      ],
    },
    {
      type: 'group',
      name: 'portfolioIntro',
      label: 'Intro portfolio',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'title', type: 'text', label: 'Titel' },
      ],
    },
    {
      type: 'array',
      name: 'portfolio',
      label: 'Portfolio items (homepage)',
      localized: true,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        { name: 'category', type: 'text', label: 'Categorie' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'image', type: 'upload', relationTo: 'media', label: 'Afbeelding' },
      ],
    },
    {
      type: 'group',
      name: 'reviewsIntro',
      label: 'Intro recensies',
      localized: true,
      fields: [
        { name: 'eyebrow', type: 'text', label: 'Bovenkop' },
        { name: 'title', type: 'text', label: 'Titel' },
        { name: 'score', type: 'text', label: 'Beoordelingsscore (bijv. 9.2/10)' },
        { name: 'count', type: 'text', label: 'Aantal beoordelingen (bijv. 27+)' },
      ],
    },
    {
      type: 'array',
      name: 'reviews',
      label: 'Recensies',
      localized: true,
      labels: { singular: 'Recensie', plural: 'Recensies' },
      fields: [
        { name: 'quote', type: 'textarea', label: 'Citaat' },
        { name: 'name', type: 'text', label: 'Naam klant' },
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
      ],
    },
  ],
}
