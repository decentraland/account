import { Network } from '@dcl/schemas'
import { OpenModalAction } from 'decentraland-dapps/dist/modules/modal/actions'
import { Dispatch } from 'redux'
import { Transaction } from '../../../modules/mana/types'

export type Props = {
  network: Network
  title: string
  amount: number
  transactions: Transaction[]
  onSeeAll: (transactions: Transaction[], network: Network) => void
}

export type MapStateProps = Pick<Props, 'amount'>
export type MapDispatchProps = Pick<Props, 'onSeeAll'>
export type MapDispatch = Dispatch<OpenModalAction>
export type OwnProps = Pick<Props, 'network'>
