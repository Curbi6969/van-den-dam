import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PortfolioView } from '@/components/views/PortfolioView'
import { pageMetadata } from '@/frontend/queries'

export const generateMetadata = () => pageMetadata('portfolio')

export default async function PortfolioPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'portfolio', locale: 'nl', depth: 1 })
  return <PortfolioView initial={initial} />
}
