import React from 'react'
import { Page } from 'decentraland-ui'
import { Footer, Navbar } from 'decentraland-dapps/dist/containers'
import { AccountHeader } from './AccountHeader'
import {
  NetworkType,
  Props,
  TransactionStatus,
  TransactionType
} from './HomePage.types'
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
            amount={200}
            transactions={[
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
            amount={300}
            transactions={[
              {
                type: TransactionType.DEPOSIT,
                description: 'Added tokens via transak',
                status: TransactionStatus.PENDING,
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
