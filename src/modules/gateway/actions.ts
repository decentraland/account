import { action } from '../../lib/utils/action'
import { Purchase } from './types'

export const SET_PURCHASE = 'Set Purchase'
export const setPurchase = (purchase: Purchase) => action(SET_PURCHASE, { purchase })
export type SetPurchaseAction = ReturnType<typeof setPurchase>

export const OPEN_BUY_MANA_WITH_FIAT_MODAL_REQUEST = '[Request] Open Buy Mana With Fiat Modal'
export const openBuyManaWithFiatModalRequest = (_network?: any) => action(OPEN_BUY_MANA_WITH_FIAT_MODAL_REQUEST)
export type OpenBuyManaWithFiatModalRequestAction = ReturnType<typeof openBuyManaWithFiatModalRequest>

export const OPEN_MANA_FIAT_GATEWAY_REQUEST = '[Request] Open Mana Fiat Gateway'
export const openManaFiatGatewayRequest = (_network?: any, _gateway?: any) => action(OPEN_MANA_FIAT_GATEWAY_REQUEST)
export type OpenManaFiatGatewayRequestAction = ReturnType<typeof openManaFiatGatewayRequest>
