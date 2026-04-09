import React, { useCallback, useMemo } from 'react'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Navbar2 as BaseNavbar2 } from 'decentraland-dapps/dist/containers'
import { config } from '../../config'
import { Props } from './Navbar.types'

const Navbar = (props: Props) => {
  const { address } = props

  const handleOnSignIn = useCallback(() => {
    window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${window.location.href}`)
    return
  }, [])

  const identity = useMemo(() => {
    if (address) {
      return localStorageGetIdentity(address)
    }

    return undefined
  }, [address])

  return <BaseNavbar2 withNotifications identity={identity ?? undefined} onSignIn={handleOnSignIn} />
}

export default React.memo(Navbar)
