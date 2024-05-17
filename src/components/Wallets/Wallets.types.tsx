import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Deposit, Transaction, Withdrawal } from '../../modules/mana/types'

export type Props = {
  transactionsByNetwork: Record<Network, Transaction[]>
  withdrawals: Withdrawal[]
  deposits: Deposit[]
}
export type MapStateProps = Pick<Props, 'transactionsByNetwork' | 'withdrawals' | 'deposits'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
