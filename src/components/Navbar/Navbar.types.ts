import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { NavbarProps } from 'decentraland-ui'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  pathname: string
  isConnected: boolean
  isAuthDappEnabled: boolean
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<
  Props,
  | 'pathname'
  | 'hasActivity'
  | 'isConnected'
  | 'isAuthDappEnabled'
>
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
