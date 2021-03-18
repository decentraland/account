import { connect } from 'react-redux'
import { getTransactionByNetwork } from '../../modules/mana/selectors'
import { RootState } from '../../modules/reducer'

import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'
const getTransactions = (state: RootState) => {
  return {
    transactionsByNetwork: getTransactionByNetwork(state),
  }
}

const mapState = (state: RootState): MapStateProps => getTransactions(state)

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
