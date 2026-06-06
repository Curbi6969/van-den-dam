type AfterChangeArgs = { doc?: { _status?: string } }

// When content is PUBLISHED in the CMS, ping the painter site's Vercel Deploy
// Hook so the static site rebuilds (~1 min later). Draft saves do NOT rebuild,
// so editors can work without affecting the live site until they publish.
// The hook URL is stored in DEPLOY_HOOK_URL (a secret URL). If unset, this no-ops.
export const triggerRebuild = async ({ doc }: AfterChangeArgs = {}): Promise<void> => {
  const url = process.env.DEPLOY_HOOK_URL
  if (!url) return
  // With drafts enabled, only rebuild for the published version.
  if (doc?._status && doc._status !== 'published') return
  try {
    await fetch(url, { method: 'POST' })
  } catch {
    // Don't fail the save if the rebuild ping fails.
  }
}
