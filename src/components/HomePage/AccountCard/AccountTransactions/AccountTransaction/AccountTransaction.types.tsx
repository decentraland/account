import { Network } from '@dcl/schemas'
import { OpenManaFiatGatewayRequestAction, openManaFiatGatewayRequest } from 'decentraland-dapps/dist/modules/gateway/actions'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { Dispatch } from 'redux'

import { NetworkGatewayType } from 'decentraland-ui'

import { Transaction } from '../../../../../modules/mana/types'

export type Props = {
  transaction: Transaction
  onPendingWithdrawal: (txHash: string) => void
  onPendingPurchase: (network: Network, gateway: NetworkGatewayType) => ReturnType<typeof openManaFiatGatewayRequest>
  onTransactionDetail: (description: string, transaction: Transaction) => void
}

export type MapStateProps = {}

export type MapDispatchProps = Pick<Props, 'onTransactionDetail' | 'onPendingWithdrawal' | 'onPendingPurchase'>
export type MapDispatch = Dispatch<OpenModalAction | OpenManaFiatGatewayRequestAction>
