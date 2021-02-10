import { connect } from 'react-redux'
import { getLocation, push } from 'connected-react-router'
import { RootState } from '../../modules/reducer'
import { locations } from '../../modules/locations'
import { MapStateProps, MapDispatch, MapDispatchProps } from './UserMenu.types'
import UserMenu from './UserMenu'

const mapState = (state: RootState): MapStateProps => {
  return {
    isActivity: getLocation(state).pathname === locations.signIn(),
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onClickSettings: () => dispatch(push(locations.activity())),
  onClickActivity: () => dispatch(push(locations.settings())),
})

export default connect(mapState, mapDispatch)(UserMenu)
