import { Network, ProviderType } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { Deposit, Transaction, Withdrawal } from '../../modules/mana/types'

export type Props = {
  transactionsByNetwork: Record<Network, Transaction[]>
  withdrawals: Withdrawal[]
  deposits: Deposit[]
  address: string
  providerType?: ProviderType
}
export type MapStateProps = Pick<Props, 'transactionsByNetwork' | 'withdrawals' | 'deposits' | 'address' | 'providerType'>
export type MapDispatchProps = {}
export type MapDispatch = Dispatch
