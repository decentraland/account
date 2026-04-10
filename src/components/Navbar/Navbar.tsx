import React, { useCallback, useMemo } from 'react'
import { AuthIdentity } from '@dcl/crypto'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Navbar2 as BaseNavbar2 } from 'decentraland-dapps/dist/containers'
import { config } from '../../config'
import { Props } from './Navbar.types'

import './Navbar.css'

const Navbar = (props: Props) => {
  const { address } = props

  const handleOnSignIn = useCallback(() => {
    window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${encodeURIComponent(window.location.href)}`)
  }, [])

  const identity = useMemo((): AuthIdentity | undefined => {
    if (address) {
      return localStorageGetIdentity(address) ?? undefined
    }
    return undefined
  }, [address])

  return (
    <div className="navbar-wrapper">
      <BaseNavbar2 withChainSelector withNotifications withCredits={false} identity={identity} onSignIn={handleOnSignIn} />
    </div>
  )
}

export default React.memo(Navbar)
