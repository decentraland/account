import React from 'react'
import { Page } from 'decentraland-ui'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'
import { Wallets } from '../Wallets'

import './HomePage.css'

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <Wallets />
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
