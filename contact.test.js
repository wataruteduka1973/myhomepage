import { test } from 'node:test'
import assert from 'node:assert/strict'
import { onRequestPost } from './functions/api/contact.js'

test('contact validates requests and only acknowledges provider acceptance', async () => {
  const original = globalThis.fetch
  let calls = 0
  const data = { name: 'Test', email: 'test@example.com', subject: 'Question', message: 'Request details' }
  const env = { RESEND_API_KEY: 'test-only', CONTACT_FROM: 'test@example.com', CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) } }
  const run = (body = data, settings = env, origin = 'https://example.com') => onRequestPost({ env: settings, request: new Request('https://example.com/api/contact', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) })
  try {
    globalThis.fetch = async (_url, options) => {
      calls++
      const payload = JSON.parse(options.body)
      assert.deepEqual(payload.to, ['agtmpwd992@gmail.com'])
      assert.equal(payload.reply_to, data.email)
      return Response.json({ id: 'mock-accepted' })
    }
    assert.equal((await run(data, {})).status, 503)
    assert.equal((await run(data, env, 'https://other.example')).status, 403)
    assert.equal((await run({ ...data, email: 'invalid' })).status, 400)
    assert.equal((await run({ ...data, subject: 'injected\nheader' })).status, 400)
    assert.equal((await run({ ...data, message: 'a'.repeat(5001) })).status, 400)
    assert.equal((await run(data, { ...env, CONTACT_RATE_LIMITER: { limit: async () => ({ success: false }) } })).status, 429)
    assert.equal(calls, 0)
    assert.deepEqual(await (await run()).json(), { ok: true })
    assert.equal(calls, 1)
    globalThis.fetch = async () => Response.json({ error: 'internal provider detail' }, { status: 500 })
    const failure = await run()
    assert.equal(failure.status, 502)
    assert.deepEqual(await failure.json(), { ok: false })
  } finally { globalThis.fetch = original }
})
