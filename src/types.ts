export type Config = {
  url: string
  clientId: string
  clientSecret: string
  grantType: 'client_credentials'
  notifyUrl: string
}

export type Order = {
  accessToken: string
  payment: Payment
  cart: Cart
  buyer: Buyer
  products: Product[]
  customerIp: string
}

export type Payment = {
  currencyCode: Currency
  totalAmount: string
}

export type Currency = 'PLN' | 'CZK' | 'EUR'

export type Cart = {
  description: string
}

export type Buyer = {
  email: string
  phone: string
  firstName: string
  lastName: string
}

export type Product = {
  name: string
  unitPrice: string
  quantity: string
}

export type Notification = {

  "order": Order,
  "localReceiptDateTime": "2016-03-02T12:58:14.828+01:00",
  "properties": [
    {
      "name": "PAYMENT_ID",
      "value": "151471228"
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

export type OrderStatus = 'COMPLETED' | 'PENDING' | 'WAITING_FOR_CONFIRMATION' | 'CANCELED'
