import nock from 'nock'

import { mockAuthorize } from '../utils/nocks'
import { PayUClient } from '../../src'
import config from 'config'
import assert from 'assert'

describe('authorize function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return oauth token', async () => {
    mockAuthorize()

    const response = await new PayUClient(config.get('payu')).Authorize()
    assert.ok(response.accessToken)
    assert.ok(response.tokenType)
    assert.ok(response.expiresIn)
    assert.ok(response.grantType)
    assert.equal(nock.isDone(), true, nock.pendingMocks().toString())
  })
})
