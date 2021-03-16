import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Transaction } from 'decentraland-dapps/dist/modules/transaction/types'

export type Props = {
  transactionsByNetwork: Record<Network, Transaction[]>
}
export type MapStateProps = Props
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
