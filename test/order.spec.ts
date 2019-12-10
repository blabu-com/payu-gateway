import nock from 'nock'

import { mockOrder } from './utils/server'
import { PayUFactory } from '../src'
import config from 'config'

import { afterEach, describe, it } from 'mocha'

describe('order function', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should return order status', async () => {
    mockOrder()

    const response = await PayUFactory(config.get()).Order( '123131=',{
      payment: {},
      cart: {},
      buyer: {},
      products: []
    })

    response.should.have.property('redirectUri')
    response.should.have.property('status')
    response.should.have.property('orderId')
  })
})
