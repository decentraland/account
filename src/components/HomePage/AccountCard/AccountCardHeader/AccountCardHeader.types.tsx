import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { OpenModalAction } from '../../../../modules/modal/actions'
import { OpenManaFiatGatewayRequestAction } from 'decentraland-dapps/dist/modules/manaFiatGateway/actions'

export type Props = {
  address?: string
  network: Network
  title: string
  amount: number
  onTransfer: (network: Network) => void
  onReceive: (network: Network, address: string) => void
  onConvert: (network: Network) => void
  onImportWithdrawal: () => void
}

export type MapStateProps = Pick<Props, 'address'>
export type MapDispatchProps = Pick<
  Props,
  'onTransfer' | 'onReceive' | 'onConvert' | 'onImportWithdrawal'
>
export type MapDispatch = Dispatch<
  OpenModalAction | OpenManaFiatGatewayRequestAction
>
