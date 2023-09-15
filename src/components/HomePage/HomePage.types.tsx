import { Dispatch } from 'redux'
import { Network } from '@dcl/schemas'
import { Transaction, Deposit, Withdrawal } from '../../modules/mana/types'

export type Props = {
  transactionsByNetwork: Record<Network, Transaction[]>
  withdrawals: Withdrawal[]
  deposits: Deposit[]
}
export type MapStateProps = Pick<
  Props,
  'transactionsByNetwork' | 'withdrawals' | 'deposits'
>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
