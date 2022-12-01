import { Dispatch } from 'redux'
import { Network } from '@dcl/schemas'
import { NetworkGatewayType } from 'decentraland-ui'
import {
  openManaFiatGateway,
  OpenManaFiatGatewayAction,
} from 'decentraland-dapps/dist/modules/manaFiatGateway/actions'
import { Transaction } from '../../../../../modules/mana/types'
import { OpenModalAction } from '../../../../../modules/modal/actions'

export type Props = {
  transaction: Transaction
  onPendingWithdrawal: (txHash: string) => void
  onPendingPurchase: (
    network: Network,
    gateway: NetworkGatewayType
  ) => ReturnType<typeof openManaFiatGateway>
  onTransactionDetail: (description: string, transaction: Transaction) => void
}

export type MapStateProps = {}

export type MapDispatchProps = Pick<
  Props,
  'onTransactionDetail' | 'onPendingWithdrawal' | 'onPendingPurchase'
>
export type MapDispatch = Dispatch<OpenModalAction | OpenManaFiatGatewayAction>
