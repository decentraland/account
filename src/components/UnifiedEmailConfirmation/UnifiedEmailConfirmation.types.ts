import { Dispatch } from 'redux'
import { EmailConfirmationSource } from '../../modules/subscription/actions'

export type Props = {
  isLoading: boolean
  onConfirmEmail: (address: string, token: string, source: EmailConfirmationSource, turnstileToken: string) => void
}

export type MapStateProps = {
  isLoading: boolean
}

export type MapDispatchProps = {
  onConfirmEmail: (address: string, token: string, source: EmailConfirmationSource, turnstileToken: string) => void
}

export type MapDispatch = Dispatch

// Re-export the type for convenience
export type { EmailConfirmationSource }
