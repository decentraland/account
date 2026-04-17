import { Network } from '@dcl/schemas'

export enum PurchaseStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  COMPLETE = 'complete'
}

export enum FiatGateway {
  MOON_PAY = 'moonPay',
  TRANSAK = 'transak',
  WERT = 'wert'
}

// NetworkGatewayType is an alias for FiatGateway for backward compat
export const NetworkGatewayType = FiatGateway
export type NetworkGatewayType = FiatGateway

export type Purchase = {
  id: string
  address: string
  network: Network
  timestamp: number
  status: PurchaseStatus
  amount: number
  gateway: FiatGateway
  txHash?: string
}

export type ManaPurchase = Purchase & {
  paymentMethod: string
}

export function isManaPurchase(purchase: Purchase): purchase is ManaPurchase {
  return 'paymentMethod' in purchase
}

export const gatewaysNames: Record<string, string> = {
  [NetworkGatewayType.MOON_PAY]: 'MoonPay',
  [NetworkGatewayType.TRANSAK]: 'Transak',
  [NetworkGatewayType.WERT]: 'Wert'
}
