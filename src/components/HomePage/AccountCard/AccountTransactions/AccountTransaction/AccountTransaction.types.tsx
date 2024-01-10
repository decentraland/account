import { Dispatch } from 'redux'
import { Network } from '@dcl/schemas'
import { NetworkGatewayType } from 'decentraland-ui'
import {
  openManaFiatGatewayRequest,
  OpenManaFiatGatewayRequestAction,
} from 'decentraland-dapps/dist/modules/gateway/actions'
import { Transaction } from '../../../../../modules/mana/types'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'

export type Props = {
  transaction: Transaction
  onPendingWithdrawal: (txHash: string) => void
  onPendingPurchase: (
    network: Network,
    gateway: NetworkGatewayType
  ) => ReturnType<typeof openManaFiatGatewayRequest>
  onTransactionDetail: (description: string, transaction: Transaction) => void
}

export type MapStateProps = {}

export type MapDispatchProps = Pick<
  Props,
  'onTransactionDetail' | 'onPendingWithdrawal' | 'onPendingPurchase'
>
export type MapDispatch = Dispatch<
  OpenModalAction | OpenManaFiatGatewayRequestAction
>
