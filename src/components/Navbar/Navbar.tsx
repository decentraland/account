import React, { useCallback, useMemo } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'

import { locations } from '../../modules/locations'
import { config } from '../../config'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, onNavigate, isAuthDappEnabled, address } = props

  const handleOnSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${window.location.href}`)
      return
    }
    onNavigate(locations.signIn())
  }, [isAuthDappEnabled, onNavigate])

  const identity = useMemo(() => {
    if (address) {
      return localStorageGetIdentity(address)
    }

    return undefined
  }, [address])

  return (
    <BaseNavbar
      {...props}
      isSignIn={pathname === locations.signIn()}
      onSignIn={handleOnSignIn}
      withNotifications
      identity={identity}
    />
  )
}

export default React.memo(Navbar)
