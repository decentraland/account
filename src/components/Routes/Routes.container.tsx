import { connect } from 'react-redux'

import { isConnected } from 'decentraland-dapps/dist/modules/wallet/selectors'

import Routes from './Routes'
import { MapStateProps } from './Routes.types'
import { RootState } from '../../modules/reducer'

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state)
})

const mapDispatch = () => ({})

export default connect(mapState, mapDispatch)(Routes)
