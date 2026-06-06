// On ANY content save (draft or publish), rebuild the PREVIEW site so editors
// can see their unpublished changes. Separate from the live-site rebuild, which
// only fires on publish. No-ops if PREVIEW_DEPLOY_HOOK_URL is unset.
export const triggerPreviewRebuild = async (): Promise<void> => {
  const url = process.env.PREVIEW_DEPLOY_HOOK_URL
  if (!url) return
  try {
    await fetch(url, { method: 'POST' })
  } catch {
    // Don't fail the save if the preview rebuild ping fails.
  }
}
