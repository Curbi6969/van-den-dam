import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { DienstenView } from '@/components/views/DienstenView'
import { pageMetadata } from '@/frontend/queries'

export const generateMetadata = () => pageMetadata('diensten')

export default async function DienstenPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'diensten', locale: 'nl', depth: 1 })
  return <DienstenView initial={initial} />
}
