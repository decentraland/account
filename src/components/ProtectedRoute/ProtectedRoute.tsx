import React from 'react'
import { Navigate } from 'react-router-dom'
import { useWallet } from '@dcl/core-web3'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { useAccount } from 'wagmi'
import { Box, CircularProgress } from 'decentraland-ui2'
import { locations } from '../../modules/locations'

type Props = {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const { address, isConnected, isConnecting } = useWallet()
  const { isReconnecting } = useAccount()

  const identity = address ? localStorageGetIdentity(address) : null
  const isAuthenticated = isConnected && !!identity

  // If already authenticated (address + identity), proceed immediately
  // even if isConnecting/isReconnecting is still true
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Still initializing wagmi — show spinner
  if (isConnecting || isReconnecting) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    )
  }

  // Not authenticated and not loading — redirect to sign-in
  return <Navigate to={locations.signIn(`${window.location.pathname}${window.location.search}`)} replace />
}

export default React.memo(ProtectedRoute)
