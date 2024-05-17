import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Deposit, Transaction, Withdrawal } from '../../modules/mana/types'

export type Props = {
  transactionsByNetwork: Record<Network, Transaction[]>
  withdrawals: Withdrawal[]
  deposits: Deposit[]
  isLoading: boolean
  defaultTab: string
}

export type MapStateProps = Pick<Props, 'transactionsByNetwork' | 'withdrawals' | 'deposits' | 'isLoading' | 'defaultTab'>
export type OwnProps = Pick<Props, 'defaultTab'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
