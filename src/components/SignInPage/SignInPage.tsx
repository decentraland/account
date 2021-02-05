import React from 'react'
import { Page } from 'decentraland-ui'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { Props } from './SignInPage.types'

export default class SignInPage extends React.PureComponent<Props> {
  render() {
    const { isConnected, onConnect } = this.props
    return (
      <>
        <Page>
          <SignIn isConnected={isConnected} onConnect={onConnect} />
        </Page>
      </>
    )
  }
}
