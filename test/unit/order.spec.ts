import nock from 'nock'

import { mockOrder } from '../utils/nocks'
import { PayUClient } from '../../src'
import config from 'config'

import { afterEach, describe, it } from 'mocha'
import { Currency, Order } from '../../src/types'
import assert from 'assert'

describe('order function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    mockOrder()

    const res = await new PayUClient(config.get('payu')).order({
      payment: {
        totalAmount: '8200',
        currencyCode: Currency.PLN
      },
      cart: {},
      buyer: {},
      products: []
    } as Order, '123131=')

    assert.ok(res.redirectUri)
    assert.ok(res.status)
    assert.ok(res.orderId)
    assert.equal(nock.isDone(), true, nock.pendingMocks().toString())
  })

  it('should not allow payments with floating points', async () => {
    const request = new PayUClient(config.get('payu')).order({
      payment: {
        totalAmount: '82.15',
        currencyCode: Currency.PLN
      },
      cart: {},
      buyer: {},
      products: []
    } as Order, '123131=')

    await assert.rejects(request, err => err.message === 'No floating point is allowed, multiply by 100')
  })
})
