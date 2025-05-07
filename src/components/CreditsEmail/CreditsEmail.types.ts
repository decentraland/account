import { Dispatch } from 'redux'
import { validateCreditsEmailRequest } from '../../modules/subscription/actions'

export type Props = {
  onValidateCreditsEmailRequest: typeof validateCreditsEmailRequest
}

export type MapStateProps = {}

export type MapDispatchProps = {
  onValidateCreditsEmailRequest: typeof validateCreditsEmailRequest
}

export type MapDispatch = Dispatch
