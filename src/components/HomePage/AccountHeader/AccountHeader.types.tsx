import { Avatar } from '@dcl/schemas'
import { Dispatch, AnyAction } from 'redux'

export type Props = {
  avatar: Avatar | null
  onOpenEditProfileAvatarModal: () => void
}

export type MapStateProps = Pick<Props, 'avatar'>
export type MapDispatchProps = Pick<Props, 'onOpenEditProfileAvatarModal'>
export type MapDispatch = Dispatch<AnyAction>
