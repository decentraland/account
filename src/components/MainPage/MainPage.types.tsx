import { ProviderType } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { ClearSaveSubscriptionErrorAction, clearSaveSubscriptionError } from '../../modules/subscription/actions'

export type Props = {
  isLoading: boolean
  providerType?: ProviderType
  notificationSettingError: string | null
  onClearChangeNotificationSettingError: typeof clearSaveSubscriptionError
}

export type MapStateProps = Pick<Props, 'isLoading' | 'providerType' | 'notificationSettingError'>
export type MapDispatchProps = Pick<Props, 'onClearChangeNotificationSettingError'>
export type MapDispatch = Dispatch<ClearSaveSubscriptionErrorAction>
