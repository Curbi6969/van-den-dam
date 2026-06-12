import './styles.css'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { HomeView } from '@/components/views/HomeView'
import { pageMetadata } from '@/frontend/queries'

export const generateMetadata = () => pageMetadata('home')

export default async function HomePage() {
  const payload = await getPayload({ config: await configPromise })
  // depth 1 zodat upload-velden (media) gepopuleerd worden met hun url
  const initial = await payload.findGlobal({ slug: 'home', locale: 'nl', depth: 1 })
  return <HomeView initial={initial} />
}
