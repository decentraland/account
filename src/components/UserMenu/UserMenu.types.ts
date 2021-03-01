import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { UserMenuProps } from 'decentraland-ui'

export type Props = UserMenuProps

export type MapStateProps = {}
export type MapDispatchProps = Pick<Props, 'onClickSettings'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
export type OwnProps = Partial<Props>
