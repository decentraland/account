import React, { useCallback } from 'react'
import { Footer } from 'decentraland-dapps/dist/containers'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { Page } from 'decentraland-ui'
import { config } from '../../config'
import { Navbar } from '../Navbar'
import { Props } from './SignInPage.types'

import './SignInPage.css'

const SignInPage = ({ isConnecting, isConnected }: Props) => {
  const handleConnect = useCallback(() => {
    if (!isConnected && !isConnecting) {
      const params = new URLSearchParams(window.location.search)
      const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/account' : ''
      window.location.replace(
        `${config.get('AUTH_URL')}/login?redirectTo=${encodeURIComponent(`${basename}${params.get('redirectTo') || '/'}`)}`
      )
    }
  }, [isConnected, isConnecting])

  return (
    <>
      <Navbar />
      <Page className="SignInPage" isFullscreen>
        <SignIn onConnect={handleConnect} />
      </Page>
      <Footer isFullscreen />
    </>
  )
}

export default React.memo(SignInPage)
