import type { CollectionConfig } from 'payload'

// Only admins (Beau) may create/edit/delete users. Editors (the client) can
// sign in and edit content but cannot manage other accounts.
const isAdmin = ({ req }: { req: { user?: { role?: string } | null } }) =>
  req.user?.role === 'admin'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Gebruiker', plural: 'Gebruikers' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  auth: true,
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Naam',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rol',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Beheerder (volledige toegang)', value: 'admin' },
        { label: 'Redacteur (alleen content bewerken)', value: 'editor' },
      ],
      access: {
        // only admins may change someone's role
        update: ({ req }) => req.user?.role === 'admin',
      },
      admin: {
        description: 'Beheerders kunnen alles. Redacteuren bewerken alleen de pagina-inhoud.',
      },
    },
  ],
}
