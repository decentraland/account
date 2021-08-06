import { connect } from 'react-redux'
import { RootState } from '../../../modules/reducer'
import { getProfileAvatar } from '../../../modules/profile/selectors'
import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch,
} from './AccountHeader.types'
import AccountHeader from './AccountHeader'

const mapState = (state: RootState): MapStateProps => ({
  avatar: getProfileAvatar(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onOpenEditProfileAvatarModal: () =>
    dispatch(openModal('EditProfileAvatarDescriptionModal')),
})

export default connect(mapState, mapDispatch)(AccountHeader)
