import React from 'react'
import { Header, Page } from 'decentraland-ui'
import { Footer, Navbar } from 'decentraland-dapps/dist/containers'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage = (props: Props) => {
  return (
    <>
      <Navbar />
      <Page>
        <Header>HomePage</Header>
        <p>Some stuff bla bla bla</p>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
