import React, { useEffect } from 'react'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { Footer } from 'decentraland-dapps/dist/containers'
import { Page } from 'decentraland-ui'
import { config } from '../../config'
import { Navbar } from '../Navbar'
import { Props } from './SignInPage.types'
import './SignInPage.css'

const SignInPage = ({ isAuthDappEnabled, isConnecting }: Props) => {
  useEffect(() => {
    if (isAuthDappEnabled && !isConnecting) {
      window.location.replace(
        `${config.get(
          'AUTH_URL'
        )}/login?redirectTo=${window.location.href.replace('/sign-in', '')}`
      )
    }
  }, [isAuthDappEnabled, isConnecting])
  return (
    <>
      <Navbar isFullscreen />
      <Page className="SignInPage" isFullscreen>
        <SignIn />
      </Page>
      <Footer isFullscreen />
    </>
  )
}

export default React.memo(SignInPage)
