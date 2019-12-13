import { PayUClient } from '../../src'
import config from 'config'
import assert from 'assert'
// tslint:disable-next-line:no-require-imports
const json = require('../fixtures/notification.json')

describe('parse notification', () => {
  it('should return order id and status', async () => {
    const order = await new PayUClient(config.get('payu')).parseNotification(json)
    console.log(order)
    assert.ok(order.status)
    assert.ok(order.orderId)
  })
})
