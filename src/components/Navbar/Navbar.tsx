import React, { useCallback } from 'react'
import { Navbar as BaseNavbar } from 'decentraland-dapps/dist/containers'

import { locations } from '../../modules/locations'
import { config } from '../../config'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, onNavigate, isAuthDappEnabled } = props

  const handleOnSignIn = useCallback(() => {
    if (isAuthDappEnabled) {
      window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${window.location.href}`)
      return
    }
    onNavigate(locations.signIn())
  }, [isAuthDappEnabled, onNavigate])

  return <BaseNavbar {...props} isSignIn={pathname === locations.signIn()} onSignIn={handleOnSignIn} />
}

export default React.memo(Navbar)
