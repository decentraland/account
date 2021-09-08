import { connect } from 'react-redux'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
// import {
//   clearProfileError,
//   setProfileAvatarDescriptionRequest,
// } from 'decentraland-dapps/dist/modules/profile/actions'
// import {
//   getProfileError,
//   isLoadingSetProfileAvatarDescription,
// } from 'decentraland-dapps/dist/modules/profile/selectors'
import { RootState } from '../../../modules/reducer'
// import { getProfileAvatar } from '../../../modules/profile/selectors'
// import EditProfileAvatarDescriptionModal from './EditProfileAvatarDescriptionModal'
import {
  MapState,
  // MapDispatchProps,
  // MapDispatch,
  // OwnProps,
  // Props,
} from './ImportWithdrawalModal.types'
import ImportWithdrawalModal from './ImportWithdrawalModal'

const mapState = (state: RootState): MapState => ({
  address: getAddress(state)!,
})

// const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
//   onSubmit: (address: string, description: string) => {
//     dispatch(setProfileAvatarDescriptionRequest(address, description))
//   },
//   clearError: () => dispatch(clearProfileError()),
// })

export default connect(mapState)(ImportWithdrawalModal)
