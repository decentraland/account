import { connect } from 'react-redux'
// import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../../modules/reducer'
import { getProfileAvatar } from '../../../modules/profile/selectors'
import EditProfileAvatarDescriptionModal from './EditProfileAvatarDescriptionModal'
import {
  // MapDispatch,
  MapState,
  MapDispatchProps,
} from './EditProfileAvatarDescriptionModal.types'

const mapState = (state: RootState): MapState => {
  return {
    avatar: getProfileAvatar(state),
    isLoading: false,
  }
}

const mapDispatch = (): MapDispatchProps => ({
  onSubmit: () => undefined,
})

// const mapDispatch = (
//   dispatch: MapDispatch,
//   _: any,
//   state: RootState
// ): MapDispatchProps => ({
//   onSubmit: (description: string) =>
//     dispatch(setProfileAvatarDescription(getAddress(state), description)),
// })

export default connect(mapState, mapDispatch)(EditProfileAvatarDescriptionModal)
