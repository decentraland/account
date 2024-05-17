import { connect } from 'react-redux'
import { getAddress, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import { validateSubscriptionEmailRequest } from '../../modules/subscription/actions'
import ConfirmPage from './ConfirmPage'
import { MapDispatch, MapDispatchProps, MapStateProps } from './ConfirmPage.types'

const mapState = (state: RootState): MapStateProps => {
  return {
    isLoading: isConnecting(state),
    address: getAddress(state)!
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onValidateSubscriptionEmailRequest: validationBody => dispatch(validateSubscriptionEmailRequest(validationBody))
})

export default connect(mapState, mapDispatch)(ConfirmPage)
