import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { OpenManaFiatGatewayRequestAction, openManaFiatGatewayRequest } from '../../../../../modules/gateway/actions'
import { NetworkGatewayType } from '../../../../../modules/gateway/types'
import { Transaction } from '../../../../../modules/mana/types'
import { OpenModalAction } from '../../../../../modules/modal/actions'

export type Props = {
  transaction: Transaction
  onPendingWithdrawal: (txHash: string) => void
  onPendingPurchase: (network: Network, gateway: NetworkGatewayType) => ReturnType<typeof openManaFiatGatewayRequest>
  onTransactionDetail: (description: string, transaction: Transaction) => void
}

export type MapStateProps = {}

export type MapDispatchProps = Pick<Props, 'onTransactionDetail' | 'onPendingWithdrawal' | 'onPendingPurchase'>
export type MapDispatch = Dispatch<OpenModalAction | OpenManaFiatGatewayRequestAction>
