import { Dispatch } from 'redux'
import { Avatar } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import {
  ClearProfileErrorAction,
  SetProfileDescriptionRequestAction,
} from 'decentraland-dapps/dist/modules/profile/actions'

export type Props = Omit<ModalProps, 'onClose'> & {
  isLoading: boolean
  address: string
  avatar: Avatar
  error: string | null
  onSubmit: (address: string, description: string) => void
  onClose: () => void
}

export type OwnProps = ModalProps
export type MapState = Pick<Props, 'isLoading' | 'avatar' | 'address' | 'error'>
export type MapDispatchProps = Pick<Props, 'onSubmit'> & {
  clearError: () => void
}
export type MapDispatch = Dispatch<
  SetProfileDescriptionRequestAction | ClearProfileErrorAction
>
