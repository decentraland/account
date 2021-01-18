import { Dispatch } from 'redux'
import { CallHistoryMethodAction } from 'connected-react-router'
import {
  ConnectWalletRequestAction,
  DisconnectWalletAction,
} from 'decentraland-dapps/dist/modules/wallet/actions'
import { Profile } from 'decentraland-dapps/dist/modules/profile/types'

export type Props = {
  isLoggedIn: boolean
  isLoggingIn: boolean
  address?: string
  mana?: number
  profile?: Profile
  onLogout: () => void
  onLogin: () => void
  hasPendingTransactions: boolean
  isActivityPage: boolean
  onNavigateToActivityPage: () => void
  onNavigateToSettingsPage: () => void
  menuItems?: React.ReactNode[]
}

export type State = {
  isOpen: boolean
}

export type MapStateProps = Pick<
  Props,
  | 'isLoggedIn'
  | 'isLoggingIn'
  | 'address'
  | 'profile'
  | 'mana'
  | 'hasPendingTransactions'
  | 'isActivityPage'
>
export type MapDispatchProps = Pick<
  Props,
  | 'onLogin'
  | 'onLogout'
  | 'onNavigateToActivityPage'
  | 'onNavigateToSettingsPage'
>
export type MapDispatch = Dispatch<
  ConnectWalletRequestAction | DisconnectWalletAction | CallHistoryMethodAction
>
export type OwnProps = Partial<Props>
