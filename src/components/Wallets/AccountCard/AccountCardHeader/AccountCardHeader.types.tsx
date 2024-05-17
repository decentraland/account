import { Network } from '@dcl/schemas'
import {
  OpenBuyManaWithFiatModalRequestAction,
  OpenManaFiatGatewayRequestAction,
  openBuyManaWithFiatModalRequest
} from 'decentraland-dapps/dist/modules/gateway/actions'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { Dispatch } from 'redux'

export type Props = {
  address?: string
  network: Network
  title: string
  amount: number
  onTransfer: (network: Network) => void
  onReceive: (network: Network, address: string) => void
  onConvert: (network: Network) => void
  onImportWithdrawal: () => void
  onAddTokens: (selectedNetwork: Network) => ReturnType<typeof openBuyManaWithFiatModalRequest>
}

export type MapStateProps = Pick<Props, 'address'>
export type MapDispatchProps = Pick<Props, 'onTransfer' | 'onReceive' | 'onConvert' | 'onImportWithdrawal' | 'onAddTokens'>
export type MapDispatch = Dispatch<OpenModalAction | OpenBuyManaWithFiatModalRequestAction | OpenManaFiatGatewayRequestAction>
