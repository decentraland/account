import { Avatar } from 'decentraland-ui'
import { Dispatch, AnyAction } from 'redux'

export type Props = {
  avatar: Avatar | null
  onChangeAlias: () => void
  onEditAvatar: () => void
}

export type MapStateProps = Pick<Props, 'avatar'>
export type MapDispatchProps = Pick<Props, 'onChangeAlias' | 'onEditAvatar'>
export type MapDispatch = Dispatch<AnyAction>
