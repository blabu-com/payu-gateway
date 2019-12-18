import assert from 'assert'
import fetch from 'node-fetch'
import { Config, Notification, Order, OrderResponse, OrderResult, PayUToken } from './types'

const DEBUG = process.env.PAYU_DEBUG === 'true'

export interface Logger {
  trace(obj: any, msg?: string)

  info(obj: any, msg?: string)

  error(obj: any, msg?: string)

  warning(obj: any, msg?: string)

  fatal(obj: any, msg?: string)
}

export class PayUError extends Error {
  request: any
  response: any
}

class MiniLogger implements Partial<Logger> {
  trace(obj, msg) {
    DEBUG && console.dir({ ...obj, msg }, { depth: 5 })
  }

  error(obj, msg) {
    DEBUG && console.log(obj, msg)
  }
}

export class PayUClient {
  private accessToken: string

  constructor(private readonly options: Config, private readonly logger: Partial<Logger> = new MiniLogger()) {

  }

  public defaultResponseHandler = async (response): Promise<Object> => {
    if (!response.ok && response.status >= 400) {
      let res = await response.text()
      if (res[0] === '{') {
        res = JSON.parse(res)
      }
      if (res.status) {
        throw (new PayUError(response.statusText + ' ' + res.status.statusCode).response = res)
      }
      this.logger.error({ res, status: response.status, text: response.statusText }, 'order failed response')
      throw (new PayUError(response.statusText + ' ' + res).response = res)
    }
    return response.json()
  }

  /**
   * accessToken is variable parameter, for high performance, I suggest doing auth and order flow separately.
   */
  async order(order: Order, accessToken?: string): Promise<OrderResponse> {
    const { payment, cart, buyer, products, customerIp, continueUrl } = order
    assert.ok(payment, 'payment should not be empty')
    assert.ok(cart, 'cart should not be empty')
    assert.ok(products, 'products should not be empty')

    if (!accessToken) {
      if (!this.accessToken) {
        const auth = await this.authorize()
        this.logger.trace({ auth }, 'Authorize')
        this.accessToken = auth.accessToken
      }
    } else {
      this.accessToken = accessToken
    }
    this.logger.trace({ accessToken: this.accessToken, options: this.options }, 'Access Token')
    const params = {
      notifyUrl: this.options.notifyUrl || undefined,
      merchantPosId: this.options.clientId,
      ...payment,
      ...cart,
      customerIp,
      buyer,
      products,
      continueUrl
    }
    this.logger.trace({ params }, 'create order')
    return fetch(this.options.url + `/api/v2_1/orders`, {
      method: 'POST',
      body: JSON.stringify(params),
      redirect: 'manual',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this.defaultResponseHandler)
      .then(response => {
        this.logger.trace({ response, params }, 'order response')
        return response
      })
      .catch(err => {
        err.request = params
        throw err
      })
  }

  async authorize(): Promise<PayUToken> {
    const query = {
      client_secret: this.options.clientSecret,
      grant_type: this.options.grantType,
      client_id: this.options.clientId
    }

    return fetch(this.options.url + `/pl/standard/user/oauth/authorize`, {
      method: 'POST',
      redirect: 'manual',
      body: new URLSearchParams(query)
    })
      .then(this.defaultResponseHandler)
      .then(response => {
        this.logger.trace({ query, response })
        return {
          accessToken: response.access_token,
          tokenType: response.token_type,
          expiresIn: response.expires_in,
          grantType: response.grant_type
        }
      })
      .catch(err => {
        err.request = 'credentials'
        throw err
      })
  }

  parseNotification(data: Notification): OrderResult {
    assert.ok(data.order.status, 'missing order status')
    assert.ok(data.order.orderId, 'missing order id')

    return {
      orderId: data.order.orderId,
      status: data.order.status,
      extOrderId: data.order.extOrderId,
      merchantPosId: data.order.merchantPosId,
      paymentType: data.order.payMethod.type,
      properties: data.properties
    }
  }
}
