import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { UserMenuProps } from 'decentraland-ui'

export type Props = UserMenuProps

export type MapStateProps = Pick<Props, 'isActivity'>
export type MapDispatchProps = Pick<
  Props,
  'onClickSettings' | 'onClickActivity'
>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
export type OwnProps = Partial<Props>
