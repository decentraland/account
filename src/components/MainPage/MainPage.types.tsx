import { Dispatch } from 'redux'
import {
  ClearSaveSubscriptionErrorAction,
  GetSubscriptionsRequestAction,
  clearSaveSubscriptionError,
  getSubscriptionsRequest
} from '../../modules/subscription/actions'

export type Props = {
  isLoading: boolean
  error: string | null
  onGetNotificationSetting: typeof getSubscriptionsRequest
  onClearChangeNotificationSettingError: typeof clearSaveSubscriptionError
}

export type MapStateProps = Pick<Props, 'isLoading' | 'error'>
export type MapDispatchProps = Pick<Props, 'onGetNotificationSetting' | 'onClearChangeNotificationSettingError'>
export type MapDispatch = Dispatch<GetSubscriptionsRequestAction | ClearSaveSubscriptionErrorAction>
