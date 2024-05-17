import React, { useEffect } from 'react'
// import { useHref, useParams } from 'react-router-dom'
import { Footer } from 'decentraland-dapps/dist/containers'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { Page } from 'decentraland-ui'
import { config } from '../../config'
import { Navbar } from '../Navbar'
import { Props } from './SignInPage.types'

import './SignInPage.css'

const SignInPage = ({ isAuthDappEnabled, isConnecting }: Props) => {
  const params = new URLSearchParams(window.location.search)
  const redirectTo = params.get('redirectTo') || '/'
  useEffect(() => {
    if (isAuthDappEnabled && !isConnecting) {
      window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${redirectTo}`)
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
