export type Config = {
  url: string
  clientId: string
  clientSecret: string
  grantType: 'client_credentials'
  notifyUrl: string
}

export type Order = {
  payment: Payment
  cart: Cart
  continueUrl: string
  products: Product[]
  customerIp: string
  extOrderId?: string
  buyer?: Buyer
}

/**
 * totalAmount must be passed using the lowest currency unit. That means * 100. No floating point is allowed
 */
export type Payment = {
  currencyCode: Currency
  totalAmount: number
}

// might be good enough to just type this to string and leave it up to implementer?
export enum Currency {
  PLN = 'PLN',
  CZK = 'CZK',
  EUR = 'EUR'
}

export type Cart = {
  description: string
}

export type Buyer = {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  language?: string
}

export type Product = {
  name: string
  unitPrice: number
  quantity: string
}

export type Notification = {

  order: OrderPayload,
  localReceiptDateTime: string,
  properties: [
    {
      name: string,
      value: string
    }
  ]
}

export type OrderPayload = Order & Buyer & Payment & Cart & {
  orderId: string
  orderCreateDate: string // date string
  notifyUrl: string
  merchantPosId: string
  buyer: Buyer,
  payMethod: {
    type: 'PBL' | 'CARD_TOKEN' | 'INSTALLMENTS'
  },
  products: Product[],
  status: OrderStatus
}

export type OrderResponse = {
  status: { statusCode: string },
  redirectUri: string,
  orderId: string
}

export type PaymentType = 'PBL' | 'CARD_TOKEN' | 'INSTALLMENTS'
export type OrderStatus = 'COMPLETED' | 'PENDING' | 'WAITING_FOR_CONFIRMATION' | 'CANCELED'

export type OrderResult = {
  // minimal data from notification order status update
  orderId: string
  extOrderId: string
  merchantPosId: string // in case of multiple POS
  status: OrderStatus
  paymentType: PaymentType
  properties: any
}

export type PayUToken = {
  accessToken: string
  tokenType: string
  expiresIn: string
  grantType: string
}
