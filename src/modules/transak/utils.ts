import { EventEmitter } from 'ws'
import transakSDK from '@transak/transak-sdk'
import { Store } from 'redux'
import { Network } from '@dcl/schemas'
import { Purchase, PurchaseStatus } from '../mana/types'
import { setPurchase } from '../mana/actions'
import { config } from '../../config'

export const TRANSAK_KEY = config.get('TRANSAK_KEY')!
export const TRANSAK_ENV = config.get('TRANSAK_ENV')!

type OrderData = {
  eventName: string
  status: {
    id: string
    autoExpiresAt: string
    conversionPrice: number
    convertedFiatAmount: number
    convertedFiatCurrency: string
    createdAt: string
    cryptoAmount: number
    cryptoCurrency: string
    cryptocurrency: string
    envName: string
    fiatAmount: number
    fiatCurrency: string
    fromWalletAddress: string
    isBuyOrSell: 'BUY' | 'SELL'
    network: 'ethereum' | 'matic'
    paymentOptionId: string
    quoteId: string
    referenceCode: number
    reservationId: string
    status: string
    totalFeeInFiat: number
    walletAddress: string
    walletLink: string
  }
}

type Transak = EventEmitter & {
  init: () => void
  partnerData: {
    defaultNetwork: string
    walletAddress: string
    partnerOrderId: string
    networks: string
  }
  EVENTS: Record<string, string>
}

let transak: Transak | null = null
export function getTransak(address: string): Transak {
  if (transak) return transak
  transak = new transakSDK({
    apiKey: TRANSAK_KEY, // Your API Key
    environment: TRANSAK_ENV || 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'MANA',
    cyptoCurrencyList: 'MANA',
    networks: 'ethereum,matic',
    walletAddress: address, // Your customer's wallet address
    fiatCurrency: '', // INR/GBP
    email: '', // Your customer's email address
    redirectURL: '',
    hostURL: window.location.origin,
    widgetHeight: '650px',
    widgetWidth: '450px',
  })
  return transak as Transak
}

function getNetwork(networkName: string) {
  const networks = Object.values(Network).filter(
    (value) => typeof value === 'string'
  ) as Network[]
  for (const network of networks) {
    if (network.toLowerCase() === networkName.toLowerCase()) {
      return network
    }
  }
  throw new Error(
    `Invalid network "${networkName}" is not part of the supported networks: ${networks.join(
      ', '
    )}`
  )
}

function createPurchase(
  orderData: OrderData,
  status: PurchaseStatus
): Purchase {
  const network = getNetwork(orderData.status.network)
  return {
    id: orderData.status.id,
    amount: orderData.status.cryptoAmount,
    network,
    timestamp: +new Date(orderData.status.createdAt),
    status,
    address: orderData.status.walletAddress,
  }
}

export function initializeTransak(store: Store, address: string) {
  transak = getTransak(address)
  transak.on(transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData: any) => {
    store.dispatch(
      setPurchase(createPurchase(orderData, PurchaseStatus.PENDING))
    )
  })
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData: any) => {
    store.dispatch(
      setPurchase(createPurchase(orderData, PurchaseStatus.COMPLETE))
    )
  })
  transak.on(transak.EVENTS.TRANSAK_ORDER_FAILED, (orderData: any) => {
    store.dispatch(
      setPurchase(createPurchase(orderData, PurchaseStatus.FAILED))
    )
  })
  transak.on(transak.EVENTS.TRANSAK_ORDER_CANCELLED, (orderData: any) => {
    store.dispatch(
      setPurchase(createPurchase(orderData, PurchaseStatus.CANCELLED))
    )
  })
}

export function openTransakWidget(address: string, network: Network) {
  const transakNetwork = network === Network.MATIC ? 'polygon' : 'ethereum'
  const transak = getTransak(address)
  transak.partnerData.walletAddress = address
  transak.partnerData.defaultNetwork = transakNetwork
  transak.partnerData.networks = transakNetwork
  transak.init()
}
