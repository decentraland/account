import { Dispatch } from 'redux'
import { GetSubscriptionsRequestAction, SaveSubscriptionsRequestAction, getSubscriptionsRequest } from '../../modules/subscription/actions'

export type Props = {
  isLoading: boolean
  onGetSubscription: typeof getSubscriptionsRequest
  address?: string
  whitelistedCreditsWallets?: string[]
  isStreamingEnabled: boolean
  isReferralEnabled: boolean
}

export type MapStateProps = Pick<Props, 'isLoading' | 'address' | 'whitelistedCreditsWallets' | 'isStreamingEnabled' | 'isReferralEnabled'>
export type OwnProps = Pick<Props, 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onGetSubscription'>
export type MapDispatch = Dispatch<SaveSubscriptionsRequestAction | GetSubscriptionsRequestAction>
