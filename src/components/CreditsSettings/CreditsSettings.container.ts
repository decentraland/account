import { connect } from 'react-redux'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { getUserCreditsStatusRequest } from '../../modules/creditsSettings/actions'
import {
  getCreditsSettingsError,
  getCreditsStatus,
  getOptedOutAt,
  isLoadingCreditsStatus,
  isOptingOut
} from '../../modules/creditsSettings/selectors'
import { RootState } from '../../modules/reducer'
import CreditsSettings from './CreditsSettings'
import { MapDispatch, MapDispatchProps, MapStateProps } from './CreditsSettings.types'

const mapState = (state: RootState): MapStateProps => ({
  status: getCreditsStatus(state),
  optedOutAt: getOptedOutAt(state),
  isLoading: isLoadingCreditsStatus(state),
  isOptingOut: isOptingOut(state),
  error: getCreditsSettingsError(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onGetUserCreditsStatus: () => dispatch(getUserCreditsStatusRequest()),
  onOpenOptOutModal: () => dispatch(openModal('OptOutConfirmationModal') as any)
})

export default connect(mapState, mapDispatch)(CreditsSettings)
