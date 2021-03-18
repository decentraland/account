import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Transaction } from '../../modules/mana/types'

export type Props = {
  transactionsByNetwork: Record<Network, Transaction[]>
}
export type MapStateProps = Props
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
