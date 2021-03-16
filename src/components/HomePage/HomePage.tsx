import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'decentraland-ui'
import { Footer } from 'decentraland-dapps/dist/containers'
import { Navbar } from '../Navbar'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage: React.FC<Props> = ({
  maticTransactions,
  ethereumTransactions,
}) => {
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
