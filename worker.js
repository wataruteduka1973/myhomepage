import { onRequestPost } from './functions/api/contact.js'

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname
    if (path === '/api/contact') {
      if (request.method !== 'POST') return Response.json({ ok: false }, { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } })
      return onRequestPost({ request, env })
    }
    if (path.startsWith('/api/')) return Response.json({ ok: false }, { status: 404 })
    return env.ASSETS.fetch(request)
  },
}
