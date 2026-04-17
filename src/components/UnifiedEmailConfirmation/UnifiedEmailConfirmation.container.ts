import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { EmailConfirmationSource, validateEmailWithTurnstileRequest } from '../../modules/subscription/actions'
import { isConnecting } from '../../modules/wallet/selectors'
import UnifiedEmailConfirmation from './UnifiedEmailConfirmation'
import { MapDispatch, MapDispatchProps, MapStateProps } from './UnifiedEmailConfirmation.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isConnecting(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConfirmEmail: (address: string, token: string, source: EmailConfirmationSource, turnstileToken: string) => {
    dispatch(
      validateEmailWithTurnstileRequest({
        address,
        code: token,
        turnstileToken,
        source
      })
    )
  }
})

export default connect(mapState, mapDispatch)(UnifiedEmailConfirmation)
