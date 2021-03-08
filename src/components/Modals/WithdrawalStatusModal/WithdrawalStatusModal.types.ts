import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { Withdrawal } from '../../../modules/mana/types'

export type Props = ModalProps & {
  withdrawal: Withdrawal
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
