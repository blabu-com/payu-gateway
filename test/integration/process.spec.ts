import config from 'config'
import { PayUClient } from '../../src'
import { describe, it } from 'mocha'
import assert from 'assert'
import { Currency } from '../../src/types'

describe('process', () => {
  it('should return order status via real api', async () => {
    const products = [
      {
        name: 'Wireless Mouse for Laptop',
        unitPrice: '15000',
        quantity: '1'
      }
    ]

    const buyer = {
      email: 'john.doe@example.com',
      phone: '654111654',
      firstName: 'John',
      lastName: 'Doe',
      language: 'en'
    }
    const customerIp = '127.0.0.1'
    const payment = {
      currencyCode: Currency.PLN,
      totalAmount: '15000'
    }

    const cart = {
      description: 'RTV market'
    }

    const response = await (new PayUClient(config.get('payu'))).order({ payment, cart, buyer, products, customerIp })
    console.log(response)
    assert.strictEqual(response.redirectUri.indexOf('https://merch-prod.snd.payu.com/pay/?orderId='), 0)
    assert.ok(response.orderId)
    assert.deepEqual(response.status, { statusCode: 'SUCCESS' })
  })
})
