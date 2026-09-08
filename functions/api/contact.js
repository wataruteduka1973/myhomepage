const reply = (status, ok = false) => Response.json({ ok }, { status, headers: { 'Cache-Control': 'no-store' } })
export async function onRequestPost({ request, env }) {
  if (request.headers.get('Origin') !== new URL(request.url).origin) return reply(403)
  if (!request.headers.get('Content-Type')?.includes('application/json')) return reply(415)
  if (!env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_RATE_LIMITER) return reply(503)
  try {
    const limit = await env.CONTACT_RATE_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') || 'unknown' })
    if (!limit.success) return reply(429)
    const reader = request.body?.getReader()
    if (!reader) return reply(400)
    let length = 0
    const chunks = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.length
      if (length > 32768) { await reader.cancel(); return reply(413) }
      chunks.push(value)
    }
    const bytes = new Uint8Array(length)
    let offset = 0
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length }
    let data
    try { data = JSON.parse(new TextDecoder().decode(bytes)) } catch { return reply(400) }
    if (!data || typeof data !== 'object') return reply(400)
    for (const [field, max] of [['name', 100], ['email', 254], ['subject', 150], ['message', 5000]]) {
      if (typeof data[field] !== 'string' || !data[field].trim() || data[field].length > max) return reply(400)
    }
    if (/[\r\n]/.test(data.name + data.email + data.subject) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return reply(400)
    const payload = { from: env.CONTACT_FROM, to: ['agtmpwd992@gmail.com'], reply_to: data.email, subject: data.subject, text: 'お名前: ' + data.name + '\nメールアドレス: ' + data.email + '\n\n' + data.message }
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(payload)))
    const key = Array.from(new Uint8Array(digest), value => value.toString(16).padStart(2, '0')).join('')
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json', 'Idempotency-Key': 'contact/' + key },
      body: JSON.stringify(payload), signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) return reply(502)
    const result = await response.json()
    return typeof result.id === 'string' ? reply(200, true) : reply(502)
  } catch { return reply(502) }
}
