import { Dispatch } from 'redux'

export type Props = {
  isConnected: boolean
  isSubscriptionEnabled: boolean
}
export type MapStateProps = Pick<Props, 'isConnected' | 'isSubscriptionEnabled'>

export type MapDispatchProps = Props
export type MapDispatch = Dispatch
