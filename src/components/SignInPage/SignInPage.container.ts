import { connect } from 'react-redux'

import { RootState } from '../../modules/reducer'
import { MapStateProps } from './SignInPage.types'
import SignInPage from './SignInPage'
import { getIsAuthDappEnabled } from '../../modules/features/selectors'
import { isConnecting } from 'decentraland-dapps/dist/modules/wallet/selectors'

const mapState = (state: RootState): MapStateProps => ({
  isAuthDappEnabled: !!getIsAuthDappEnabled(state),
  isConnecting: isConnecting(state)
})

export default connect(mapState)(SignInPage)
