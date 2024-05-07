import { CallHistoryMethodAction } from 'connected-react-router'
import { NavbarProps } from 'decentraland-ui/dist/components/Navbar/Navbar.types'
import { Dispatch } from 'redux'

export type Props = Partial<NavbarProps> & {
  hasActivity: boolean
  pathname: string
  isConnected: boolean
  isAuthDappEnabled: boolean
  address?: string
  onNavigate: (path: string) => void
}

export type MapStateProps = Pick<Props, 'pathname' | 'hasActivity' | 'isConnected' | 'isAuthDappEnabled' | 'address'>
export type MapDispatchProps = Pick<Props, 'onNavigate'>
export type MapDispatch = Dispatch<CallHistoryMethodAction>
