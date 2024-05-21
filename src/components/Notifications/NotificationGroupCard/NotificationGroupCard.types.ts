import { NotificationType } from '@dcl/schemas'
import { Dispatch } from 'redux'
import { saveSubscriptionsRequest } from '../../../modules/subscription/actions'
import { SubscriptionDetailsCamelCase, SubscriptionGroupKeys } from '../../../modules/subscription/types'

export type Props = {
  subscriptionGroupKeys: SubscriptionGroupKeys
  notificationTypesInGroup: NotificationType[]
  subscriptionDetails: SubscriptionDetailsCamelCase
  isLoading?: boolean
  isSavingSubscription?: boolean
  hasEmail: boolean
  defaultExpanded?: boolean
  isIgnoringAllEmail: boolean
  isExpanded: boolean
  panelName: string
  onChangeNotificationSetting: typeof saveSubscriptionsRequest
  onChangeAccordion: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
}

export type MapStateProps = Pick<
  Props,
  | 'isLoading'
  | 'subscriptionGroupKeys'
  | 'notificationTypesInGroup'
  | 'subscriptionDetails'
  | 'isSavingSubscription'
  | 'hasEmail'
  | 'isIgnoringAllEmail'
  | 'isExpanded'
  | 'panelName'
  | 'onChangeAccordion'
>
export type OwnProps = Pick<
  Props,
  'isLoading' | 'subscriptionGroupKeys' | 'notificationTypesInGroup' | 'onChangeAccordion' | 'isExpanded' | 'panelName'
>

export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onChangeNotificationSetting'>
