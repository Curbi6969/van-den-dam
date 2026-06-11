import type { GlobalAfterChangeHook } from 'payload'

// Schrijft bij elke opslag/publicatie een regel in het Logboek (audit-log).
// Deelt de transactie via req (zelfde patroon als autoTranslate) en mag
// nooit de opslag zelf laten mislukken.
export const logChange: GlobalAfterChangeHook = async ({ doc, req, global }) => {
  try {
    const label =
      typeof global?.label === 'string' ? global.label : (global?.slug ?? 'onbekend')
    await req.payload.create({
      collection: 'audit-log',
      data: {
        page: label,
        action: doc?._status === 'published' ? 'Gepubliceerd' : 'Concept opgeslagen',
        user: req.user?.email ?? 'systeem',
      },
      req,
    })
  } catch {
    // Loggen mag een save nooit blokkeren.
  }
  return doc
}
