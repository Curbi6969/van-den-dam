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
import { AuditLog } from './collections/AuditLog'
import { SiteSettings } from './globals/SiteSettings'
import { Home } from './globals/Home'
import { DienstenPage } from './globals/DienstenPage'
import { PortfolioPage } from './globals/PortfolioPage'
import { AboutPage } from './globals/AboutPage'
import { ContactPage } from './globals/ContactPage'
import { PrivacyPage } from './globals/PrivacyPage'
import { NotFoundPage } from './globals/NotFoundPage'
import { triggerRebuild } from './hooks/triggerRebuild'
import { triggerPreviewRebuild } from './hooks/triggerPreviewRebuild'
import { revalidateSite } from './hooks/revalidateSite'
import { autoTranslate } from './hooks/autoTranslate'
import { logChange } from './hooks/logChange'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Attach the "rebuild the live site" hook to a global or collection's afterChange.
const withRebuild = <T extends { hooks?: { afterChange?: unknown[] } }>(entity: T): T => ({
  ...entity,
  hooks: {
    ...entity.hooks,
    afterChange: [...(entity.hooks?.afterChange ?? []), revalidateSite, triggerRebuild],
  },
})

// Maps each page global to its URL on the preview/live sites for the "Voorbeeld" button.
const PREVIEW_BASE = process.env.PREVIEW_SITE_URL || 'https://van-den-dam-preview.vercel.app'
const previewPath: Record<string, string> = {
  home: '/',
  diensten: '/diensten.html',
  portfolio: '/portfolio.html',
  'over-ons': '/over-ons.html',
  contact: '/contact.html',
  privacyverklaring: '/privacyverklaring.html',
  'niet-gevonden': '/404.html',
  'site-settings': '/',
}

// Live preview renders the in-app Next.js frontend inside the admin edit view and
// streams field changes to it (no save needed). Points at this same app's routes.
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const livePreviewPath: Record<string, string> = {
  home: '/',
  diensten: '/diensten',
  portfolio: '/portfolio',
  'over-ons': '/over-ons',
  contact: '/contact',
  privacyverklaring: '/privacyverklaring',
  'niet-gevonden': '/niet-gevonden',
  'site-settings': '/',
}

// Pages get a draft/publish workflow + a Voorbeeld (preview) button. Editing saves
// a draft (not live); only "Publiceren" pushes to the live site. Any save rebuilds
// the preview site so editors can see drafts before publishing.
const withPublishFlow = <
  T extends {
    slug: string
    admin?: Record<string, unknown>
    hooks?: { afterChange?: unknown[] }
    versions?: unknown
    fields: unknown[]
  },
>(
  entity: T,
): T => ({
  ...entity,
  // Directe "live bewerken op de website"-knop bovenaan elke pagina-global.
  fields: [
    {
      name: 'editLiveLink',
      type: 'ui',
      admin: { components: { Field: '@/components/admin/EditLivePill#EditLivePill' } },
    },
    ...entity.fields,
  ],
  versions: { drafts: true, max: 50 },
  admin: {
    ...entity.admin,
    preview: () => `${PREVIEW_BASE}${previewPath[entity.slug] ?? '/'}`,
  },
  hooks: {
    ...entity.hooks,
    afterChange: [
      ...(entity.hooks?.afterChange ?? []),
      autoTranslate,
      revalidateSite,
      logChange,
      triggerRebuild,
      triggerPreviewRebuild,
    ],
  },
})

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '· Van den Dam',
      title: 'Van den Dam Schilderwerken - Beheer',
      description: 'Beheerpaneel voor de website van Van den Dam Schilderwerken.',
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Icon#Icon',
      },
    },
    livePreview: {
      url: ({ globalConfig }) => `${SERVER_URL}${livePreviewPath[globalConfig?.slug ?? ''] ?? '/'}`,
      globals: [
        'home',
        'diensten',
        'portfolio',
        'over-ons',
        'contact',
        'privacyverklaring',
        'niet-gevonden',
        'site-settings',
      ],
      breakpoints: [
        { label: 'Mobiel', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
  },
  collections: [Users, Media, withRebuild(Services), AuditLog],
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
