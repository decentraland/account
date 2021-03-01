import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import { NavbarProps } from 'decentraland-ui'

export type Props = Partial<NavbarProps> & {
  pathname: string
  isConnected: boolean
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'pathname' | 'isConnected'>
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
