import { Dispatch } from 'redux'
import { OpenModalAction } from '../../../../../modules/modal/actions'
import { TransactionStatus, TransactionType } from '../../../HomePage.types'

export type Props = {
  type: TransactionType
  status: TransactionStatus
  description: string
  amount: number
  onTransactionDetail: () => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onTransactionDetail'>
export type MapDispatch = Dispatch<OpenModalAction>
