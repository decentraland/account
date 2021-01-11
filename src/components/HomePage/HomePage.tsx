import React from 'react'
import { Page } from 'decentraland-ui'
import { Footer, Navbar } from 'decentraland-dapps/dist/containers'
import { AccountHeader } from '../AccountHeader'
import { AccountCardContainer, AccountCard } from '../AccountCard'
import { Props } from './HomePage.types'
import './HomePage.css'

const HomePage = (_props: Props) => {
  return (
    <>
      <Navbar />
      <Page className="HomePage">
        <AccountHeader />
        <AccountCardContainer>
          <AccountCard
            type="mana"
            title="Mana"
            onFetchAmount={() => '200,000'}
            onFetchTransactions={() => ({
              latest: [
                {
                  type: 'input',
                  description: 'Added tokens via transak',
                  status: 'Completed',
                  amount: '3,000',
                },
                {
                  type: 'input',
                  description: 'Added tokens via transak',
                  status: 'Completed',
                  amount: '3,000',
                },
                {
                  type: 'output',
                  description: 'Added tokens via transak',
                  status: 'Completed',
                  amount: '3,000',
                },
              ],
              pending: [],
            })}
          />
          <AccountCard
            type="matic"
            title="Matic Mana"
            onFetchAmount={() => '300,000'}
            onFetchTransactions={() => ({
              latest: [
                {
                  type: 'input',
                  description: 'Added tokens via transak',
                  status: 'Completed',
                  amount: '3,000',
                },
                {
                  type: 'input',
                  description: 'Added tokens via transak',
                  status: 'Completed',
                  amount: '3,000',
                },
                {
                  type: 'output',
                  description: 'Added tokens via transak',
                  status: 'Completed',
                  amount: '3,000',
                },
              ],
              pending: [
                {
                  type: 'pending',
                  description: 'Added tokens via transak',
                  status: 'Pending',
                  amount: '3,000',
                },
              ],
            })}
          />
        </AccountCardContainer>
      </Page>
      <Footer />
    </>
  )
}

export default React.memo(HomePage)
