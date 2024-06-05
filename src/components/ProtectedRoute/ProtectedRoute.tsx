import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { locations } from '../../modules/locations'
import { Props } from './ProtectedRoute.types'

const ProtectedRoute = (props: Props) => {
  const { isConnecting, isConnected, ...rest } = props
  const { pathname, search } = useLocation()

  if (!isConnecting && !isConnected) {
    return <Redirect to={locations.signIn(`${pathname}${search}`)} />
  }

  return <Route {...rest} />
}

export default React.memo(ProtectedRoute)
