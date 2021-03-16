import { connect } from 'react-redux'
import { TransactionStatus as TxStatus } from 'decentraland-dapps/dist/modules/transaction/types'
import { TransactionStatus, TransactionType } from '../../modules/mana/types'
import { getTransactionByNetwork } from '../../modules/mana/selectors'
import { RootState } from '../../modules/reducer'

import HomePage from './HomePage'
import { MapStateProps, MapDispatchProps, MapDispatch } from './HomePage.types'

const mapStatus = (txStatus: TxStatus | null) => {
  let resultStatus: TransactionStatus = TransactionStatus.PENDING
  if (txStatus) {
    if (txStatus === TxStatus.CONFIRMED) {
      resultStatus = TransactionStatus.CONFIRMED
    } else if (
      txStatus === TxStatus.DROPPED ||
      txStatus === TxStatus.REVERTED
    ) {
      resultStatus = TransactionStatus.REJECTED
    }
  }
  return resultStatus
}

const getTransactions = (state: RootState) => {
  const transactionsByNetwork = getTransactionByNetwork(state)
  const ethereumTransactions = transactionsByNetwork.ETHEREUM.map((tx) => {
    const { payload, status: txStatus } = tx
    const { amount, to } = payload
    let type = TransactionType.SEND
    if (to) {
      type = TransactionType.SEND
    } else {
      type = TransactionType.DEPOSIT
    }
    const status = mapStatus(txStatus)
    return { type, to, status, amount }
  })

  const maticTransactions = transactionsByNetwork.MATIC.map((tx) => {
    const { payload, status: txStatus } = tx
    const { amount, to } = payload
    let type = TransactionType.SEND
    if (to) {
      type = TransactionType.SEND
    } else {
      type = TransactionType.WITHDRAWAL
    }
    const status = mapStatus(txStatus)
    return { type, to, status, amount }
  })
  return { ethereumTransactions, maticTransactions }
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
