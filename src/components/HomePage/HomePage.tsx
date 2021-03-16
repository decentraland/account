import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'decentraland-ui'
import { Footer } from 'decentraland-dapps/dist/containers'
import { TransactionStatus as TxStatus } from 'decentraland-dapps/dist/modules/transaction/types'
import { TransactionStatus, TransactionType } from '../../modules/mana/types'
import { Navbar } from '../Navbar'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage: React.FC<Props> = ({ transactionsByNetwork }) => {
  const shortening = (address: string): string =>
    `${address.slice(0, 4)}...${address.slice(-4)}`

  const ethereumTransactions = transactionsByNetwork.ETHEREUM.map((tx) => {
    const { payload, status: txStatus } = tx
    const { amount, to } = payload
    let type = TransactionType.SEND
    let description = `incomplete`
    if (to) {
      type = TransactionType.SEND
      description = `Sending tokens to ${shortening(to)}`
    } else {
      type = TransactionType.DEPOSIT
      description = `Deposit to MANA Matic`
    }
    let status: TransactionStatus = TransactionStatus.PENDING
    if (txStatus === TxStatus.CONFIRMED) {
      status = TransactionStatus.CONFIRMED
    } else if (
      txStatus === TxStatus.DROPPED ||
      txStatus === TxStatus.REVERTED
    ) {
      status = TransactionStatus.REJECTED
    }

    return { type, description, status, amount }
  })

  const maticTransactions = transactionsByNetwork.MATIC.map((tx) => {
    const { payload, status: txStatus } = tx
    const { amount, to } = payload
    let type = TransactionType.SEND
    let description = `incomplete`
    if (to) {
      type = TransactionType.SEND
      description = `Sending tokens to ${shortening(to)}`
    } else {
      type = TransactionType.WITHDRAWAL
      description = `Withdrawal to MANA Ethereum`
    }
    let status: TransactionStatus = TransactionStatus.PENDING
    if (txStatus === TxStatus.CONFIRMED) {
      status = TransactionStatus.CONFIRMED
    } else if (
      txStatus === TxStatus.DROPPED ||
      txStatus === TxStatus.REVERTED
    ) {
      status = TransactionStatus.REJECTED
    }
    return { type, description, status, amount }
  })

  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            network={Network.ETHEREUM}
            title="Mana"
            transactions={ethereumTransactions}
          />
          <AccountCard
            network={Network.MATIC}
            title="Matic Mana"
            transactions={maticTransactions}
          />
        </AccountCardContainer>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
