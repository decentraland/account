import { EventEmitter } from 'ws'
import transakSDK from '@transak/transak-sdk'
import { Store } from 'redux'
import { Purchase, PurchaseStatus } from '../mana/types'
import { setPurchase } from '../mana/actions'
import { Network } from '@dcl/schemas'

export const TRANSAK_KEY = process.env.REACT_APP_TRANSAK_KEY!

type Transak = EventEmitter & {
  init: () => void
  partnerData: { defaultNetwork: Network; walletAddress: string }
  EVENTS: Record<string, string>
}

let transak: Transak | null = null
export function getTransak(address: string): Transak {
  if (transak) return transak
  transak = new transakSDK({
    apiKey: TRANSAK_KEY, // Your API Key
    environment: 'STAGING', // STAGING/PRODUCTION
    defaultCryptoCurrency: 'MANA',
    cyptoCurrencyList: 'MANA,USDT',
    networks: 'ETHEREUM,MATIC',
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

function createPurchase(orderData: any, status: PurchaseStatus): Purchase {
  return {
    id: orderData.id,
    amount: orderData.cryptoAmount,
    network: orderData.network,
    timestamp: +new Date(orderData.createAt),
    status: status,
    orderData,
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
  const transak = getTransak(address)
  transak.partnerData.walletAddress = address
  transak.partnerData.defaultNetwork = network
  transak.init()
}
