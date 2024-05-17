import { connect } from 'react-redux'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { validateSubscriptionEmailRequest } from '../../modules/subscription/actions'
import HomePage from './ConfirmPage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './ConfirmPage.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isConnecting(state)
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onValidateSubscriptionEmailRequest: validationBody => dispatch(validateSubscriptionEmailRequest(validationBody))
})

export default connect(mapState, mapDispatch)(HomePage)
