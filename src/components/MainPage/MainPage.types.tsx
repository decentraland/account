import { ProviderType } from '@dcl/schemas'
import { Dispatch } from 'redux'
import {
  ClearSaveSubscriptionErrorAction,
  GetSubscriptionsRequestAction,
  clearSaveSubscriptionError,
  getSubscriptionsRequest
} from '../../modules/subscription/actions'

export type Props = {
  isLoading: boolean
  providerType?: ProviderType
  notificationSettingError: string | null
  onGetNotificationSetting: typeof getSubscriptionsRequest
  onClearChangeNotificationSettingError: typeof clearSaveSubscriptionError
}

export type MapStateProps = Pick<Props, 'isLoading' | 'providerType' | 'notificationSettingError'>
export type MapDispatchProps = Pick<Props, 'onGetNotificationSetting' | 'onClearChangeNotificationSettingError'>
export type MapDispatch = Dispatch<GetSubscriptionsRequestAction | ClearSaveSubscriptionErrorAction>
