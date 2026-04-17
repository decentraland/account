import { connect } from 'react-redux'
import { openModal } from '../../../modules/modal/actions'
import { RootState } from '../../../modules/reducer'
import { Networks, getNetworks } from '../../../modules/wallet/selectors'
import AccountCard from './AccountCard'
import { MapDispatch, MapDispatchProps, MapStateProps, OwnProps } from './AccountCard.types'

const mapState = (state: RootState, ownProps: OwnProps & { amount?: number }): MapStateProps => {
  if (ownProps.amount !== undefined) {
    return { amount: ownProps.amount }
  }
  const networks = getNetworks(state)
  const amount = networks ? (networks[ownProps.network as keyof Networks]?.mana ?? 0) : 0
  return { amount }
}

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onSeeAll: (transactions, network) => dispatch(openModal('SeeAllTransactionModal', { transactions, network }))
})

export default connect(mapState, mapDispatch)(AccountCard)
