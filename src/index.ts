import * as assert from 'assert'
import superagent from 'superagent'
import { Config, Order } from './types'

export const PayUClient = (url) => {
  return superagent(url)
}

export const PayUFactory = (config: Config) => {
  const client = PayUClient(config.url)

  const Order = async (accessToken, order: Order) => {
    const { payment, cart, buyer, products } = order
    assert.ok(accessToken, 'accessToken should not be empty')
    assert.ok(payment, 'payment should not be empty')
    assert.ok(cart, 'cart should not be empty')
    assert.ok(buyer, 'buyer should not be empty')
    assert.ok(products, 'products should not be empty')

    return client.post(`/api/v2_1/orders`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        notifyUrl: config.notifyUrl,
        merchantPosId: config.clientId,
        ...payment,
        ...cart,
        ...buyer,
        ...products
      })
  }

  const Authorize = async () => {
    const query = {
      client_secret: config.clientSecret,
      grant_type: config.grantType,
      client_id: config.clientId
    }
    return client.query(query).post(`/pl/standard/user/oauth/authorize`).then(response => ({
      accessToken: response.access_token,
      tokenType: response.token_type,
      expiresIn: response.expires_in,
      grantType: response.grant_type
    }))
  }

  return {
    Order,
    Authorize
  }
}




