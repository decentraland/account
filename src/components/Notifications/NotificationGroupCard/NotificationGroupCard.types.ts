import { NotificationType } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { clearSaveSubscriptionErrorRequest, saveSubscriptionsRequest } from '../../../modules/subscription/actions'
import { SubscriptionDetailsCamelCase, SubscriptionGroupKeys } from '../../../modules/subscription/types'

export type Props = {
  subscriptionGroupKeys: SubscriptionGroupKeys
  notificationTypesInGroup: NotificationType[]
  subscriptionDetails: SubscriptionDetailsCamelCase
  disabled?: boolean
  isLoading?: boolean
  isSavingSubscription?: boolean
  defaultExpanded?: boolean
  onChangeNotificationSetting: typeof saveSubscriptionsRequest
  onClearChangeNotificationSettingError: typeof clearSaveSubscriptionErrorRequest
  error: string | null
}

export type MapStateProps = Pick<
  Props,
  'isLoading' | 'subscriptionGroupKeys' | 'notificationTypesInGroup' | 'subscriptionDetails' | 'isSavingSubscription' | 'error'
>
export type OwnProps = Pick<Props, 'isLoading' | 'subscriptionGroupKeys' | 'notificationTypesInGroup'>

export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onChangeNotificationSetting' | 'onClearChangeNotificationSettingError'>
