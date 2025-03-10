import React, { useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Navbar as BaseNavbar, Navbar2 as BaseNavbar2 } from 'decentraland-dapps/dist/containers'
import { config } from '../../config'
import { locations } from '../../modules/locations'
import { Props } from './Navbar.types'

import './Navbar.css'

const Navbar = (props: Props) => {
  const { isAuthDappEnabled, address, isNavbar2Enabled } = props
  const location = useLocation()
  const { pathname } = location
  const history = useHistory()

  const handleOnSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${window.location.href}`)
      return
    }
    history.push(locations.signIn())
  }, [isAuthDappEnabled, history])

  const identity = useMemo(() => {
    if (address) {
      return localStorageGetIdentity(address)
    }

    return undefined
  }, [address])

  if (isNavbar2Enabled) {
    return <BaseNavbar2 {...props} withNotifications identity={identity} onSignIn={handleOnSignIn} />
  }

  return (
    <BaseNavbar {...props} isSignIn={pathname === locations.signIn()} onSignIn={handleOnSignIn} withNotifications identity={identity} />
  )
}

export default React.memo(Navbar)
