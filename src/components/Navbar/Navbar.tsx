import React, { useCallback } from 'react'
import { Navbar as BaseNavbar, UserMenu } from 'decentraland-dapps/dist/containers'

import { locations } from '../../modules/locations'
import { Props } from './Navbar.types'
import './Navbar.css'

const Navbar = (props: Props) => {
  const { pathname, onNavigate, isConnected } = props

  if (isConnected) {
    props = { ...props, rightMenu: <UserMenu /> }
  }

  const handleOnSignIn = useCallback(() => {
    onNavigate(locations.signIn())
  }, [onNavigate])

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
