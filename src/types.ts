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
  buyer: Buyer
  products: Product[]
  customerIp: string
  extOrderId?: string
}

export type Payment = {
  currencyCode: Currency
  totalAmount: string
}

export enum Currency {
  PLN = 'PLN',
  CZK = 'CZK',
  EUR = 'EUR'
}

export type Cart = {
  description: string
}

export type Buyer = {
  email: string
  phone: string
  firstName: string
  lastName: string
  language: string
}

export type Product = {
  name: string
  unitPrice: string
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
