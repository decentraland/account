import { useEffect } from 'react'
import { useWallet } from '@dcl/core-web3'
import { localStorageGetIdentity } from '@dcl/single-sign-on-client'
import { useAccount } from 'wagmi'
import { redirectToAuth } from '../../utils/authRedirect'

const SignInPage = () => {
  const { address, isConnected, isConnecting } = useWallet()
  const { isReconnecting } = useAccount()

  const identity = address ? localStorageGetIdentity(address) : null
  const isFullyAuthenticated = isConnected && !!identity
  const isLoading = isConnecting || isReconnecting

  useEffect(() => {
    if (isLoading) return

    if (isFullyAuthenticated) {
      const params = new URLSearchParams(window.location.search)
      const redirectTo = params.get('redirectTo')
      window.location.href = redirectTo ? decodeURIComponent(redirectTo) : '/'
    } else {
      redirectToAuth()
    }
  }, [isLoading, isFullyAuthenticated])

  return null
}

export default SignInPage
