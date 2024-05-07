import { connect } from 'react-redux'

import { openModal } from 'decentraland-dapps/dist/modules/modal/actions'
import { Networks } from 'decentraland-dapps/dist/modules/wallet'
import { getNetworks } from 'decentraland-dapps/dist/modules/wallet/selectors'

import AccountCard from './AccountCard'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './AccountCard.types'
import { RootState } from '../../../modules/reducer'

const mapState = (state: RootState, ownProps: OwnProps): MapStateProps => {
  const networks = getNetworks(state)
  const amount = networks ? networks[ownProps.network as keyof Networks].mana : 0
  return {
    amount
  }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSeeAll: (transactions, network) => dispatch(openModal('SeeAllTransactionModal', { transactions, network }))
})

export default connect(mapState, mapDispatch)(AccountCard)
