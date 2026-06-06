import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { getSite } from '@/frontend/queries'
import { ContactView } from '@/components/views/ContactView'

export default async function ContactPage() {
  const payload = await getPayload({ config: await configPromise })
  const initial = await payload.findGlobal({ slug: 'contact', locale: 'nl', depth: 0 })
  const site = await getSite('nl')
  return <ContactView initial={initial} site={site} />
}
