import React, { useEffect } from 'react'

import { Footer } from 'decentraland-dapps/dist/containers'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'

import { Page } from 'decentraland-ui'

import { Props } from './SignInPage.types'
import { config } from '../../config'
import { Navbar } from '../Navbar'

import './SignInPage.css'

const SignInPage = ({ isAuthDappEnabled, isConnecting }: Props) => {
  useEffect(() => {
    if (isAuthDappEnabled && !isConnecting) {
      window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${window.location.href.replace('/sign-in', '')}`)
    }
  }, [isAuthDappEnabled, isConnecting])
  return (
    <>
      <Navbar />
      <Page className="SignInPage" isFullscreen>
        <SignIn />
      </Page>
      <Footer isFullscreen />
    </>
  )
}

export default React.memo(SignInPage)
