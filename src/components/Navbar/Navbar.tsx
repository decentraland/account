import React, { useCallback, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { Navbar2 as BaseNavbar2 } from 'decentraland-dapps/dist/containers'
import { config } from '../../config'
import { Props } from './Navbar.types'

import './Navbar.css'

const Navbar = (props: Props) => {
  const { address } = props
  const history = useHistory()

  const handleOnSignIn = useCallback(() => {
    window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${window.location.href}`)
    return
  }, [history])

  const identity = useMemo(() => {
    if (address) {
      return localStorageGetIdentity(address)
    }

    return undefined
  }, [address])

  return <BaseNavbar2 {...props} withNotifications identity={identity} onSignIn={handleOnSignIn} />
}

export default React.memo(Navbar)
