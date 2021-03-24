import React from 'react'
import { Network } from '@dcl/schemas'
import { Page } from 'decentraland-ui'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'
import { AccountHeader } from './AccountHeader'
import { AccountCard } from './AccountCard'
import { AccountCardContainer } from './AccountCardContainer'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage: React.FC<Props> = ({ transactionsByNetwork }) => {
  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            network={Network.ETHEREUM}
            title="Mana"
            transactions={transactionsByNetwork[Network.ETHEREUM]}
          />
          <AccountCard
            network={Network.MATIC}
            title="Matic Mana"
            transactions={transactionsByNetwork[Network.MATIC]}
          />
        </AccountCardContainer>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
