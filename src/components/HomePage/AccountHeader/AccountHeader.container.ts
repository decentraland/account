import { RootState } from '../../../modules/reducer'
import { getData as getProfiles } from 'decentraland-dapps/dist/modules/profile/selectors'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch,
} from './AccountHeader.types'
import { getAddress } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { connect } from 'react-redux'
import AccountHeader from './AccountHeader'

const mapState = (state: RootState): MapStateProps => {
  const address = getAddress(state)
  const profiles = getProfiles(state)
  const profile = address && address in profiles ? profiles[address] : null
  return {
    avatar: profile && profile.avatars.length > 0 ? profile.avatars[0] : null,
  }
}

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({
  onChangeAlias: () => {},
  onEditAvatar: () => {},
})

export default connect(mapState, mapDispatch)(AccountHeader)
