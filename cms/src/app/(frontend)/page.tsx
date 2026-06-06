import './styles.css'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { HomeView } from '@/components/views/HomeView'

export default async function HomePage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'home', locale: 'nl', depth: 0 })
  return <HomeView initial={initial} />
}
