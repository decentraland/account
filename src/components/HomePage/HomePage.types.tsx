import { Dispatch } from 'redux'
import { Transaction } from '../../modules/mana/types'

export type Props = {
  ethereumTransactions: Transaction[]
  maticTransactions: Transaction[]
}
export type MapStateProps = Props
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
