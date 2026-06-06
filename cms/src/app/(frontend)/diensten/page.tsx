import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { DienstenView } from '@/components/views/DienstenView'

export default async function DienstenPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'diensten', locale: 'nl', depth: 0 })
  return <DienstenView initial={initial} />
}
