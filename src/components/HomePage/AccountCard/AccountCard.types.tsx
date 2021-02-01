import { Dispatch } from 'redux'
import { OpenModalAction } from '../../../modules/modal/actions'
import { NetworkType, Transaction } from '../HomePage.types'

export type Props = {
  type: NetworkType
  title: string
  amount: number
  transactions: Transaction[]
  onSeeAll: (transactions: Transaction[]) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onSeeAll'>
export type MapDispatch = Dispatch<OpenModalAction>
