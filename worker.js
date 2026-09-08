export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname.startsWith('/api/')) return Response.json({ ok: false }, { status: 404, headers: { 'Cache-Control': 'no-store' } })
    return env.ASSETS.fetch(request)
  },
}
