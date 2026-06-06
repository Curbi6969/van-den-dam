import { getPayload } from 'payload'
import config from './payload.config'

// After enabling drafts, the existing global content has no published version,
// so the public API (which serves published only) would return empty. This
// re-saves each global's current content as PUBLISHED so the live site keeps
// working. Run with: npx tsx --env-file=.env src/publish-all.ts
const slugs = [
  'home',
  'diensten',
  'portfolio',
  'over-ons',
  'contact',
  'privacyverklaring',
  'niet-gevonden',
  'site-settings',
] as const

const run = async (): Promise<void> => {
  const payload = await getPayload({ config })
  for (const slug of slugs) {
    const cur = (await payload.findGlobal({
      slug,
      locale: 'nl',
      depth: 0,
      draft: true,
    })) as unknown as Record<string, unknown>
    const { id, createdAt, updatedAt, globalType, _status, ...data } = cur
    void id
    void createdAt
    void updatedAt
    void globalType
    void _status
    await payload.updateGlobal({
      slug,
      locale: 'nl',
      data: { ...data, _status: 'published' } as never,
    })
    payload.logger.info(`Published: ${slug}`)
  }
  payload.logger.info('All globals published.')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
