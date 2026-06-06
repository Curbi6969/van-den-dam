import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { OverOnsView } from '@/components/views/OverOnsView'

export default async function OverOnsPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'over-ons', locale: 'nl', depth: 0 })
  return <OverOnsView initial={initial} />
}
