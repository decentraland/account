import { connect } from 'react-redux'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import {
  clearProfileError,
  setProfileAvatarDescriptionRequest,
} from 'decentraland-dapps/dist/modules/profile/actions'
import {
  getProfileError,
  isLoadingSetProfileAvatarDescription,
} from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../../../modules/reducer'
import { getProfileAvatar } from '../../../modules/profile/selectors'
import EditProfileAvatarDescriptionModal from './EditProfileAvatarDescriptionModal'
import {
  MapState,
  MapDispatchProps,
  MapDispatch,
  OwnProps,
  Props,
} from './EditProfileAvatarDescriptionModal.types'

const mapState = (state: RootState): MapState => ({
  avatar: getProfileAvatar(state)!,
  address: getAddress(state)!,
  isLoading: isLoadingSetProfileAvatarDescription(state),
  error: getProfileError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSubmit: (address: string, description: string) => {
    dispatch(setProfileAvatarDescriptionRequest(address, description))
  },
  clearError: () => dispatch(clearProfileError()),
})

const mergeProps = (
  stateProps: MapState,
  dispatchProps: MapDispatchProps,
  ownProps: OwnProps
): Props => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onClose: () => {
    ownProps.onClose()
    dispatchProps.clearError()
  },
})

export default connect(
  mapState,
  mapDispatch,
  mergeProps
)(EditProfileAvatarDescriptionModal)
