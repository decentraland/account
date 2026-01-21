import { connect } from 'react-redux'
import { clearCreditsSettingsError, optOutFromCreditsRequest } from '../../../modules/creditsSettings/actions'
import { getCreditsSettingsError, isOptingOut } from '../../../modules/creditsSettings/selectors'
import { RootState } from '../../../modules/reducer'
import OptOutConfirmationModal from './OptOutConfirmationModal'
import { MapDispatch, MapDispatchProps, MapStateProps } from './OptOutConfirmationModal.types'

const mapState = (state: RootState): MapStateProps => ({
  isLoading: isOptingOut(state),
  error: getCreditsSettingsError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onOptOut: () => dispatch(optOutFromCreditsRequest()),
  onClearError: () => dispatch(clearCreditsSettingsError())
})

export default connect(mapState, mapDispatch)(OptOutConfirmationModal)
