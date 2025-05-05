import { connect } from 'react-redux'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { getData as getWallet, isConnected, isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState } from '../../modules/reducer'
import SignInPage from './SignInPage'
import { MapStateProps } from './SignInPage.types'

const mapState = (state: RootState): MapStateProps => {
  const wallet = getWallet(state)
  const identity = wallet ? localStorageGetIdentity(wallet?.address) : null
  return {
    isConnecting: isConnecting(state),
    isConnected: isConnected(state) && !!identity
  }
}

export default connect(mapState)(SignInPage)
