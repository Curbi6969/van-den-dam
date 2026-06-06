import type { GlobalAfterChangeHook } from 'payload'

// Field names whose string values are real prose and should be auto-translated.
// Everything else (icon names, URLs, slugs, person names, CSS classes, numbers,
// image refs) is deliberately left untouched.
const TRANSLATE_KEYS = new Set<string>([
  'eyebrow', 'title', 'subtitle', 'text', 'heading', 'intro', 'body', 'quote',
  'paragraph1', 'paragraph2', 'button', 'label', 'description', 'category',
  'categoryLabel', 'linkLabel', 'imageAlt', 'image1Alt', 'image2Alt', 'badgeLabel',
  'ctaLabel', 'tagline', 'addressLabel', 'phoneLabel', 'emailLabel', 'kvkLabel',
  'bankLabel', 'accountLabel', 'lastUpdated', 'backLink', 'linkHome', 'linkContact',
  'submitButton', 'labelName', 'labelPhone', 'labelMobile', 'labelEmail', 'labelCopy',
  'labelCity', 'labelUitvoeringMonth', 'labelWerkzaamheden', 'optionChoose',
  'optionSchilderen', 'optionBehangen', 'optionOnderhoud', 'optionAfgeschermd',
  'optionBeglazing', 'optionRamen', 'labelMessage', 'labelPrivacy', 'labelPrivacyLink',
  'html',
])
const HTML_KEYS = new Set<string>(['html'])

const deeplEndpoint = (key: string) =>
  key.trim().endsWith(':fx')
    ? 'https://api-free.deepl.com/v2/translate'
    : 'https://api.deepl.com/v2/translate'

async function deepl(texts: string[], html: boolean, key: string): Promise<string[]> {
  if (texts.length === 0) return []
  const body = new URLSearchParams()
  body.set('source_lang', 'NL')
  body.set('target_lang', 'EN-GB')
  if (html) body.set('tag_handling', 'html')
  texts.forEach((t) => body.append('text', t))
  const res = await fetch(deeplEndpoint(key), {
    method: 'POST',
    headers: {
      Authorization: `DeepL-Auth-Key ${key}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })
  if (!res.ok) throw new Error(`DeepL HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const json = (await res.json()) as { translations: { text: string }[] }
  return json.translations.map((t) => t.text)
}

function collect(node: unknown, key: string, plain: Set<string>, html: Set<string>): void {
  if (Array.isArray(node)) {
    node.forEach((n) => collect(n, key, plain, html))
  } else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) collect(v, k, plain, html)
  } else if (typeof node === 'string' && node.trim() && TRANSLATE_KEYS.has(key)) {
    ;(HTML_KEYS.has(key) ? html : plain).add(node)
  }
}

function apply(node: unknown, key: string, map: Map<string, string>): unknown {
  if (Array.isArray(node)) return node.map((n) => apply(n, key, map))
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(node)) {
      // Drop row IDs (top-level and nested array items): the English locale has
      // its own rows, so reusing the Dutch IDs is invalid.
      if (k === 'id') continue
      out[k] = apply(v, k, map)
    }
    return out
  }
  if (typeof node === 'string' && TRANSLATE_KEYS.has(key) && map.has(node)) return map.get(node)
  return node
}

// On a Dutch save, translate the prose fields and write them to the English
// locale. Dutch is the single source of truth; English is always derived.
export const autoTranslate: GlobalAfterChangeHook = async ({ doc, req, global, context }) => {
  try {
    if (req.locale && req.locale !== 'nl') return doc
    if (context?.skipAutoTranslate) return doc
    const key = process.env.DEEPL_API_KEY
    if (!key) return doc

    const plain = new Set<string>()
    const html = new Set<string>()
    collect(doc, '__root__', plain, html)
    if (plain.size === 0 && html.size === 0) return doc

    const plainArr = [...plain]
    const htmlArr = [...html]
    const [plainT, htmlT] = await Promise.all([
      deepl(plainArr, false, key),
      deepl(htmlArr, true, key),
    ])
    const map = new Map<string, string>()
    plainArr.forEach((s, i) => map.set(s, plainT[i] ?? s))
    htmlArr.forEach((s, i) => map.set(s, htmlT[i] ?? s))

    const translated = apply(doc, '__root__', map) as Record<string, unknown>
    delete translated.id
    delete translated.createdAt
    delete translated.updatedAt
    delete translated.globalType
    delete translated._status

    await req.payload.updateGlobal({
      slug: (global as { slug: string }).slug as never,
      locale: 'en',
      data: translated as never,
      req, // share the parent transaction to avoid a version-table deadlock
      context: { skipAutoTranslate: true },
      draft: (doc as { _status?: string })._status !== 'published',
    })
  } catch (err) {
    req.payload.logger.error('autoTranslate failed: ' + (err as Error).message)
  }
  return doc
}
