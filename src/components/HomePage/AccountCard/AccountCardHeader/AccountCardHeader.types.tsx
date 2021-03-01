import { Network } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { OpenModalAction } from '../../../../modules/modal/actions'

export type Props = {
  wallet?: string
  type: Network
  title: string
  amount: number
  onSendMana: () => void
  onReceiveMana: (walletAddress: string) => void
  onConvertToMaticMana: () => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<
  Props,
  'onSendMana' | 'onReceiveMana' | 'onConvertToMaticMana'
>
export type MapDispatch = Dispatch<OpenModalAction>
