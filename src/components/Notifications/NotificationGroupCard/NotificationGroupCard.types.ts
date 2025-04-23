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
  isExpanded: boolean
  panelName: string
  onChangeNotificationSetting: typeof saveSubscriptionsRequest
  onChangeAccordion: (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => void
  whitelistedCreditsWallets: string[]
  address?: string
}

export type MapStateProps = Pick<
  Props,
  | 'isLoading'
  | 'subscriptionGroupKeys'
  | 'notificationTypesInGroup'
  | 'subscriptionDetails'
  | 'isSavingSubscription'
  | 'hasEmail'
  | 'isExpanded'
  | 'panelName'
  | 'onChangeAccordion'
  | 'whitelistedCreditsWallets'
  | 'address'
>
export type OwnProps = Pick<
  Props,
  'isLoading' | 'subscriptionGroupKeys' | 'notificationTypesInGroup' | 'onChangeAccordion' | 'isExpanded' | 'panelName'
>

export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onChangeNotificationSetting'>
