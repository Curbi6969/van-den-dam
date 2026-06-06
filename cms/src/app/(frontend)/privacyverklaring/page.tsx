import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PrivacyView } from '@/components/views/PrivacyView'

export default async function PrivacyverklaringPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'privacyverklaring', locale: 'nl', depth: 0 })
  return <PrivacyView initial={initial} />
}
