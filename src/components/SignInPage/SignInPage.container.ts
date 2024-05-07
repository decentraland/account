import { connect } from 'react-redux'

import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'

import SignInPage from './SignInPage'
import { MapStateProps } from './SignInPage.types'
import { getIsAuthDappEnabled } from '../../modules/features/selectors'
import { RootState } from '../../modules/reducer'

const mapState = (state: RootState): MapStateProps => ({
  isAuthDappEnabled: !!getIsAuthDappEnabled(state),
  isConnecting: isConnecting(state)
})

export default connect(mapState)(SignInPage)
