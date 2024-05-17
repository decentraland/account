import { Dispatch } from 'redux'
import { validateSubscriptionEmailRequest } from 'modules/subscription/actions'

export type Props = {
  onValidateSubscriptionEmailRequest: typeof validateSubscriptionEmailRequest
  isLoading: boolean
}

export type MapStateProps = Pick<Props, 'isLoading'>
export type MapDispatchProps = Pick<Props, 'onValidateSubscriptionEmailRequest'>
export type MapDispatch = Dispatch
