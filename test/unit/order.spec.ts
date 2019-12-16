import nock from 'nock'

import { mockOrder } from '../utils/nocks'
import { PayUClient } from '../../src'
import config from 'config'

import { afterEach, describe, it } from 'mocha'
import { Order } from '../../src/types'
import assert from 'assert'

describe('order function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    mockOrder()

    const res = await new PayUClient(config.get('payu')).order({
      payment: {},
      cart: {},
      buyer: {},
      products: []
    } as Order, '123131=')

    assert.ok(res.redirectUri)
    assert.ok(res.status)
    assert.ok(res.orderId)
    assert.equal(nock.isDone(), true, nock.pendingMocks().toString())
  })
})
