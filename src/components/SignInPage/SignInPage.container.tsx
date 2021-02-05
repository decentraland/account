import { connect } from 'react-redux'
import { RootState } from '../../modules/reducer'
import { isLoggedIn } from '../../modules/identity/selectors'
import { loginRequest } from '../../modules/identity/actions'
import {
  MapStateProps,
  MapDispatchProps,
  MapDispatch
} from './SignInPage.types'
import SignInPage from './SignInPage'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isLoggedIn(state)
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(loginRequest())
})

export default connect(mapState, mapDispatch)(SignInPage)
