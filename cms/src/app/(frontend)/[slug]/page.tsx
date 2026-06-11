import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { AutoEditablePage } from '@/components/views/AutoEditablePage'
import { notFound } from 'next/navigation'

// Catch-all for any Payload global that doesn't have a hand-crafted view.
// Specific routes (diensten, portfolio, …) take priority in Next.js routing;
// this only fires for newly added globals.
export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const payload = await getPayload({ config: await configPromise })
  try {
    const initial = await payload.findGlobal({ slug: slug as any, locale: 'nl', depth: 1 })
    if (!initial) notFound()
    return <AutoEditablePage global={slug} initial={initial} />
  } catch {
    notFound()
  }
}
