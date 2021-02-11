import { Dispatch } from 'redux'
import { NetworkType } from '../../HomePage.types'
import { OpenModalAction } from '../../../../modules/modal/actions'

export type Props = {
  wallet?: string
  type: NetworkType
  title: string
  amount: number
  onSendMana: () => void
  onReceiveMana: (walletAddress: string) => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onSendMana' | 'onReceiveMana'>
export type MapDispatch = Dispatch<OpenModalAction>
