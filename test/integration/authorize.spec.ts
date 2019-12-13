import config from 'config'
import { PayUClient } from '../../src'
import { describe, it } from 'mocha'
import assert from 'assert'

describe('authorization', () => {
  it('should authorize via real api', async () => {
    const res = await new PayUClient(config.get('payu')).Authorize()

    assert.ok(res.accessToken)
    assert.ok(res.tokenType)
    assert.ok(res.expiresIn)
  })
})
