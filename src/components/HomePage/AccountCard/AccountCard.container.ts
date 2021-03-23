import { getNetworks } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { connect } from 'react-redux'
import { openModal } from '../../../modules/modal/actions'
import { RootState } from '../../../modules/reducer'
import AccountCard from './AccountCard'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
  OwnProps,
} from './AccountCard.types'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const networks = getNetworks(state)
  const amount = networks ? networks[ownProps.network].mana : 0
  return {
    amount,
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSeeAll: (transactions, network) =>
    dispatch(openModal('SeeAllTransactionModal', { transactions, network })),
})

export default connect(mapState, mapDispatch)(AccountCard)
