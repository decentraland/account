import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'decentraland-ui'
import { Footer } from 'decentraland-dapps/dist/containers'
import { TransactionStatus, TransactionType } from '../../modules/mana/types'
import { Navbar } from '../Navbar'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage: React.FC<Props> = ({ transactionsByNetwork }) => {
  console.log({ transactionsByNetwork })

  const ethereumTransactions = transactionsByNetwork.ETHEREUM.map((tx) => {
    console.log(tx)
    const type = TransactionType.DEPOSIT
    const description = 'Added tokens via Transak'
    const status = TransactionStatus.CONFIRMED
    const amount = 3000
    return { type, description, status, amount }
  })

  const maticTransactions = transactionsByNetwork.MATIC.map((tx) => {
    console.log(tx)
    const type = TransactionType.WITHDRAWAL
    const description = 'Added tokens via Transak'
    const status = TransactionStatus.CONFIRMED
    const amount = 3000
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
