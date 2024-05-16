import { Dispatch } from 'redux'
import { SubscriptionDetailsCamelCase } from 'modules/subscription/types'
import { saveSubscriptionEmailRequest, saveSubscriptionsRequest } from '../../../modules/subscription/actions'

export type Props = {
  email: string
  unconfirmedEmail?: string
  isLoading: boolean
  isSavingEmail: boolean
  isIgnoringAllEmail: boolean
  hasConfirmEmail: boolean
  error: string | null
  subscriptionDetails: SubscriptionDetailsCamelCase
  onChangeEmail: typeof saveSubscriptionEmailRequest
  onChangeNotificationSetting: typeof saveSubscriptionsRequest
}

export type MapStateProps = Pick<
  Props,
  'isLoading' | 'isSavingEmail' | 'email' | 'unconfirmedEmail' | 'error' | 'isIgnoringAllEmail' | 'subscriptionDetails' | 'hasConfirmEmail'
>
export type OwnProps = Pick<Props, 'isLoading' | 'hasConfirmEmail'>

export type MapDispatch = Dispatch
export type MapDispatchProps = Pick<Props, 'onChangeEmail' | 'onChangeNotificationSetting'>
