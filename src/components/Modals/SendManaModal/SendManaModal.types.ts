import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import { sendManaRequest } from '../../../modules/mana/actions'

export type Props = ModalProps & {
  onSendMana: typeof sendManaRequest
}

export type State = {
  currentName: string
}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onSendMana'>
