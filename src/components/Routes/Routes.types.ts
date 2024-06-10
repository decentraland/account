import { Dispatch } from 'redux'

export type Props = {
  isConnected: boolean
  isSubscriptionEnabled: boolean
  closeAllModals: () => void
}

export type MapStateProps = Pick<Props, 'isConnected' | 'isSubscriptionEnabled'>

export type MapDispatchProps = Pick<Props, 'closeAllModals'>
export type MapDispatch = Dispatch
