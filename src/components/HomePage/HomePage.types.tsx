import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Transaction as RealTransaction } from 'decentraland-dapps/dist/modules/transaction/types'

export type Props = {
  transactionsByNetwork: Record<Network, RealTransaction[]>
}
export type MapStateProps = Props
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
