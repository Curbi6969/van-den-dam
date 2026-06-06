import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { nl } from '@payloadcms/translations/languages/nl'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { SiteSettings } from './globals/SiteSettings'
import { Home } from './globals/Home'
import { DienstenPage } from './globals/DienstenPage'
import { PortfolioPage } from './globals/PortfolioPage'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { PrivacyPage } from './globals/PrivacyPage'
import { NotFoundPage } from './globals/NotFoundPage'
import { triggerRebuild } from './hooks/triggerRebuild'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Attach the "rebuild the live site" hook to a global or collection's afterChange.
const withRebuild = <T extends { hooks?: { afterChange?: unknown[] } }>(entity: T): T => ({
  ...entity,
  hooks: {
    ...entity.hooks,
    afterChange: [...(entity.hooks?.afterChange ?? []), triggerRebuild],
  },
})

// Pages get a draft/publish workflow on top of the rebuild hook: editing saves a
// draft (not live), and only "Publiceren" pushes it to the static site.
const withPublishFlow = <T extends { hooks?: { afterChange?: unknown[] }; versions?: unknown }>(
  entity: T,
): T => withRebuild({ ...entity, versions: { drafts: true } })

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '· Van den Dam CMS',
    },
  },
  collections: [Users, Media, withRebuild(Services)],
  globals: [
    Home,
    DienstenPage,
    PortfolioPage,
    AboutPage,
    ContactPage,
    PrivacyPage,
    NotFoundPage,
    SiteSettings,
  ].map(withPublishFlow),
  editor: lexicalEditor(),
  // Admin interface language: Dutch (separate from the NL/EN content above).
  i18n: {
    supportedLanguages: { nl },
    fallbackLanguage: 'nl',
  },
  // Bilingual content: editors fill each localized field in both NL and EN,
  // and the public site renders per-locale (the language toggle).
  localization: {
    locales: [
      { label: 'Nederlands', code: 'nl' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'nl',
    fallback: true,
  },
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Postgres in production (Vercel), SQLite for quick local dev. Chosen by the
  // shape of DATABASE_URI so the same config works in both places.
  db: (process.env.DATABASE_URI || '').startsWith('postgres')
    ? postgresAdapter({
        pool: { connectionString: process.env.DATABASE_URI as string },
      })
    : sqliteAdapter({
        client: { url: process.env.DATABASE_URI || 'file:./vandendam.db' },
      }),
  sharp,
  plugins: [
    seoPlugin({
      collections: ['services'],
      globals: ['home', 'diensten', 'portfolio', 'over-ons', 'contact', 'privacyverklaring', 'niet-gevonden'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }: { doc?: { title?: string } }) =>
        doc?.title ? `${doc.title} | Van den Dam Schilderwerken` : 'Van den Dam Schilderwerken',
    }),
  ],
})
