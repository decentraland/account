import { Dispatch } from 'redux'
import { Network } from '@dcl/schemas'
import {
  openBuyManaWithFiatModalRequest,
  OpenBuyManaWithFiatModalRequestAction,
  OpenManaFiatGatewayRequestAction,
} from 'decentraland-dapps/dist/modules/manaFiatGateway/actions'
import { OpenModalAction } from '../../../../modules/modal/actions'

export type Props = {
  address?: string
  network: Network
  title: string
  amount: number
  onTransfer: (network: Network) => void
  onReceive: (network: Network, address: string) => void
  onConvert: (network: Network) => void
  onImportWithdrawal: () => void
  onAddTokens: (
    selectedNetwork: Network
  ) => ReturnType<typeof openBuyManaWithFiatModalRequest>
}

export type MapStateProps = Pick<Props, 'address'>
export type MapDispatchProps = Pick<
  Props,
  | 'onTransfer'
  | 'onReceive'
  | 'onConvert'
  | 'onImportWithdrawal'
  | 'onAddTokens'
>
export type MapDispatch = Dispatch<
  | OpenModalAction
  | OpenBuyManaWithFiatModalRequestAction
  | OpenManaFiatGatewayRequestAction
>
