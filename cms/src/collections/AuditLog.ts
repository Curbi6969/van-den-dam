import type { CollectionConfig } from 'payload'

// Automatisch logboek: elke opslag/publicatie schrijft hier een regel.
// Alleen-lezen in de admin; regels worden door de logChange-hook aangemaakt.
export const AuditLog: CollectionConfig = {
  slug: 'audit-log',
  labels: { singular: 'Logregel', plural: 'Logboek' },
  admin: {
    description:
      'Hier zie je wie wat wanneer heeft gewijzigd. Iets terugzetten? Open de pagina, klik op het tabblad Versies en herstel een eerdere versie.',
    defaultColumns: ['createdAt', 'page', 'action', 'user'],
    useAsTitle: 'page',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'page', type: 'text', label: 'Pagina' },
    { name: 'action', type: 'text', label: 'Actie' },
    { name: 'user', type: 'text', label: 'Gebruiker' },
  ],
  timestamps: true,
}
