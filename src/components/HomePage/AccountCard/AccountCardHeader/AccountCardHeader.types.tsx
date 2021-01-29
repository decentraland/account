import { Dispatch } from 'redux'
import { NetworkType } from '../../HomePage.types'
import { OpenModalAction } from '../../../../modules/modal/actions'

export type Props = {
  type: NetworkType
  title: string
  amount: number
  onSendMana: () => void
}

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onSendMana'>
export type MapDispatch = Dispatch<OpenModalAction>
