import React from 'react'
import { Page } from 'decentraland-ui'
import { Footer, Navbar } from 'decentraland-dapps/dist/containers'
import { AccountHeader } from './AccountHeader'
import {
  NetworkType,
  TransactionStatus,
  TransactionType
} from './AccountCard/AccountCard.types'
import { Props } from './HomePage.types'
import './HomePage.css'
import { AccountCard, AccountCardContainer } from './AccountCard'

const HomePage = (_props: Props) => {
  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            type={NetworkType.ETHEREUM}
            title="Mana"
            onFetchAmount={() => 200}
            onFetchTransactions={() => [
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000
              },
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000
              }
            ]}
          />
          <AccountCard
            type={NetworkType.MATIC}
            title="Matic Mana"
            onFetchAmount={() => 300}
            onFetchTransactions={() => [
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000
              },
              {
                type: TransactionType.WITHDRAWAL,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000
              },
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.CONFIRMED,
                amount: 3000
              }
            ]}
          />
        </AccountCardContainer>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
