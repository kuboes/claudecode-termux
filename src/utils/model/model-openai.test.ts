import { afterEach, describe, expect, test } from 'bun:test'
import { getDefaultSonnetModel } from './model.js'

const KEYS = ['KUBOES_USE_OPENAI', 'KUBOES_OPENAI_BASE_URL', 'KUBOES_OPENAI_MODEL'] as const
const saved: Record<string, string | undefined> = {}
for (const k of KEYS) saved[k] = process.env[k]
afterEach(() => {
  for (const k of KEYS) {
    if (saved[k] === undefined) delete process.env[k]
    else process.env[k] = saved[k]
  }
})

describe('getDefaultSonnetModel (kuboes openai-compatible)', () => {
  test('uses sonnet-4-6, not the SDK-deprecated sonnet-4-5, as internal placeholder', () => {
    process.env.KUBOES_USE_OPENAI = '1'
    process.env.KUBOES_OPENAI_BASE_URL = 'https://example.test/v1'
    process.env.KUBOES_OPENAI_MODEL = 'agnes-3.0-flash'
    expect(getDefaultSonnetModel()).toBe('claude-sonnet-4-6')
  })
})
