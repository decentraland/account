import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import {
  approveManaRequest,
  fetchManaPriceRequest,
} from '../../../modules/mana/actions'

export type Props = ModalProps & {
  isLoading: boolean
  manaPrice: number
  onApproveMana: typeof approveManaRequest
  onManaPrice: typeof fetchManaPriceRequest
}

export type State = {}

export type MapState = Props
export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onApproveMana' | 'onManaPrice'>
