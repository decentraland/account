import { connect } from 'react-redux'
import { getTransactionByNetwork } from '../../modules/mana/selectors'
import { RootState } from '../../modules/reducer'

import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'
const getTransactions = (state: RootState) => {
  const transactionsByNetwork = getTransactionByNetwork(state)
  console.log(transactionsByNetwork)
  return {
    ethereumTransactions: transactionsByNetwork.ETHEREUM,
    maticTransactions: transactionsByNetwork.MATIC,
  }
}

const mapState = (state: RootState): MapStateProps => {
  const { ethereumTransactions, maticTransactions } = getTransactions(state)
  return {
    ethereumTransactions,
    maticTransactions,
  }
}

const mapDispatch = (_dispatch: MapDispatch): MapDispatchProps => ({})

export default connect(mapState, mapDispatch)(HomePage)
