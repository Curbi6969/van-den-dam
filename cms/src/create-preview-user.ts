import { getPayload } from 'payload'
import config from './payload.config'
import crypto from 'crypto'

// Creates (or updates) a dedicated service user with an API key. The preview
// site build uses this key to read DRAFT content from the CMS.
// Run with: npx tsx --env-file=.env src/create-preview-user.ts
const run = async (): Promise<void> => {
  const payload = await getPayload({ config })
  const email = 'preview-bot@vandendam.local'

  const apiKey = crypto.randomBytes(24).toString('hex')

  const existing = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (existing.docs.length) {
    await payload.update({
      collection: 'users',
      id: existing.docs[0].id,
      data: { enableAPIKey: true, apiKey } as never,
    })
  } else {
    await payload.create({
      collection: 'users',
      data: {
        email,
        password: crypto.randomBytes(24).toString('hex'),
        name: 'Preview Bot',
        role: 'editor',
        enableAPIKey: true,
        apiKey,
      } as never,
    })
  }

  payload.logger.info('PREVIEW_API_KEY=' + apiKey)
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
