import { Dispatch } from 'redux'
import { validateSubscriptionEmailRequest } from 'modules/subscription/actions'

export type Props = {
  onValidateSubscriptionEmailRequest: typeof validateSubscriptionEmailRequest
  isLoading: boolean
  address: string
}

export type MapStateProps = Pick<Props, 'isLoading' | 'address'>
export type MapDispatchProps = Pick<Props, 'onValidateSubscriptionEmailRequest'>
export type MapDispatch = Dispatch
