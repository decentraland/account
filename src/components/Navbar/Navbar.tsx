import React, { useCallback } from 'react'
import {
  Navbar as BaseNavbar,
  UserInformation,
} from 'decentraland-dapps/dist/containers'

import { locations } from '../../modules/locations'
import { config } from '../../config'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, onNavigate, isConnected, isAuthDappEnabled } = props

  if (isConnected) {
    props = {
      ...props,
      rightMenu: <UserInformation />,
    }
  }

  const handleOnSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(
        `${config.get('AUTH_URL')}/login?redirectTo=${
          window.location.href
        }`
      )
      return
    }
    onNavigate(locations.signIn())
  }, [isAuthDappEnabled, onNavigate])

  const handleOnClickAccount = useCallback(() => {
    onNavigate(locations.settings())
  }, [onNavigate])

  return (
    <BaseNavbar
      {...props}
      isFullscreen={props.isFullscreen}
      isSignIn={pathname === locations.signIn()}
      onSignIn={handleOnSignIn}
      onClickAccount={handleOnClickAccount}
    />
  )
}

export default React.memo(Navbar)
