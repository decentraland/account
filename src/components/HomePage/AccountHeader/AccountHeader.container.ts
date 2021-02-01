import { connect } from 'react-redux'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch,
} from './AccountHeader.types'
import { RootState } from '../../../modules/reducer'
import { getProfile } from '../../../modules/profile/selectors'
import AccountHeader from './AccountHeader'

const mapState = (state: RootState): MapStateProps => ({
  avatar: getProfile(state),
})

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({
  onChangeAlias: () => {},
  onEditAvatar: () => {},
})

export default connect(mapState, mapDispatch)(AccountHeader)
