import { Dispatch } from 'redux'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'

export type Props = ModalProps & {
  isLoading: boolean
  // TODO: change this
  avatar: any
  onSubmit: (description: string) => void
}

export type MapState = Pick<Props, 'isLoading' | 'avatar'>
export type MapDispatchProps = Pick<Props, 'onSubmit'>
// TODO: match this
export type MapDispatch = Dispatch<any>
