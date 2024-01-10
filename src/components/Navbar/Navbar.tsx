import React, { useCallback } from 'react'
import {
  Navbar as BaseNavbar,
  Navbar2 as BaseNavbar2,
  UserInformation,
} from 'decentraland-dapps/dist/containers'

import { locations } from '../../modules/locations'
import { config } from '../../config'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const {
    pathname,
    onNavigate,
    isConnected,
    isAuthDappEnabled,
    isNavbarV2Enabled,
  } = props

  if (isConnected) {
    props = {
      ...props,
      rightMenu: <UserInformation />,
    }
  }

  const handleOnSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(
        `${config.get('AUTH_URL')}/login?redirectTo=${window.location.href}`
      )
      return
    }
    onNavigate(locations.signIn())
  }, [isAuthDappEnabled, onNavigate])

  const handleOnClickAccount = useCallback(() => {
    onNavigate(locations.settings())
  }, [onNavigate])

  return isNavbarV2Enabled ? (
    <BaseNavbar2
      {...props}
      isSignIn={pathname === locations.signIn()}
      onSignIn={handleOnSignIn}
    />
  ) : (
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
