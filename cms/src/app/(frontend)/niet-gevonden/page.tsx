import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { NotFoundView } from '@/components/views/NotFoundView'

// Reachable route used purely so the "niet-gevonden" global has a live-preview
// target (Next's not-found.tsx has no URL of its own). Renders the same view.
export default async function NietGevondenPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'niet-gevonden', locale: 'nl', depth: 0 })
  return <NotFoundView initial={initial} />
}
