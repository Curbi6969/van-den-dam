import { revalidatePath } from 'next/cache'

type AfterChangeArgs = { doc?: { _status?: string } }

// The public site lives in this same Next.js app, so a publish doesn't need a
// Vercel rebuild: invalidating the route cache makes the new content live on
// the next request. Draft saves are skipped; they only matter for previews.
export const revalidateSite = async ({ doc }: AfterChangeArgs = {}): Promise<void> => {
  if (doc?._status && doc._status !== 'published') return
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Outside a request context (seed scripts, local payload run) there is no
    // cache to invalidate; ignore.
  }
}
