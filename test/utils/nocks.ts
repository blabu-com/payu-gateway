import nock from 'nock'
import config from 'config'

export const mockAuthorize = () => nock(config.get('payu.url')).log(console.error)
  .post('/pl/standard/user/oauth/authorize')
  .query(() => true)
  .reply(200, {
    access_token: '8f79c971-195e-43f5-bd83-ad2104414acc',
    token_type: 'bearer',
    expires_in: 43199,
    grant_type: 'client_credentials'
  })

export const mockOrder = () => nock(config.get('payu.url')).log(console.error)
  .post('/api/v2_1/orders')
  .query(() => true)
  .reply(200, {
    status: {
      statusCode: 'SUCCESS'
    },
    redirectUri: '{redirect_url}',
    orderId: 'WZHF5FFDRJ140731GUEST000P01',
    extOrderId: '{internal_id}'
  })
