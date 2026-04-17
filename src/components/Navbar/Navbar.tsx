import React, { useCallback, useMemo } from 'react'
import { useAuthIdentity, useTokenBalance, useWallet } from '@dcl/core-web3'
import { ChainId } from '@dcl/schemas'
import { Navbar as DclNavbar } from 'decentraland-ui2'
import type { NavbarProps } from 'decentraland-ui2'
import { config } from '../../config'
import { redirectToAuth } from '../../utils/authRedirect'
import type { Address } from 'viem'

import './Navbar.css'

const isProd = config.get('CHAIN_ID') === '1'

const Navbar = () => {
  const { address, isConnected, isConnecting, isDisconnecting, disconnect } = useWallet()
  useAuthIdentity()

  const { balance: manaEth } = useTokenBalance({
    tokenAddress: config.get('MANA_TOKEN_ADDRESS_ETHEREUM') as Address,
    chainId: isProd ? ChainId.ETHEREUM_MAINNET : ChainId.ETHEREUM_SEPOLIA
  })

  const { balance: manaMatic } = useTokenBalance({
    tokenAddress: config.get('MANA_TOKEN_ADDRESS_MATIC') as Address,
    chainId: isProd ? ChainId.MATIC_MAINNET : ChainId.MATIC_AMOY
  })

  const handleSignIn = useCallback(() => {
    redirectToAuth()
  }, [])

  const handleSignOut = useCallback(() => {
    disconnect()
  }, [disconnect])

  const manaBalances = useMemo(() => {
    if (!isConnected) return {}
    return {
      ethereum: parseFloat(manaEth ?? '0') || 0,
      matic: parseFloat(manaMatic ?? '0') || 0
    }
  }, [isConnected, manaEth, manaMatic])

  const navbarProps = useMemo(
    () =>
      ({
        activePage: undefined,
        isSignedIn: isConnected,
        isSigningIn: isConnecting,
        isDisconnecting,
        address: address || undefined,
        manaBalances,
        onClickSignIn: handleSignIn,
        onClickSignOut: handleSignOut,
        onClickNavbarItem: (_event: React.MouseEvent<HTMLElement>, options: { url?: string }) => {
          if (options?.url) {
            window.location.href = options.url
          }
        }
      }) as NavbarProps,
    [isConnected, isConnecting, isDisconnecting, address, manaBalances, handleSignIn, handleSignOut]
  )

  return <DclNavbar {...navbarProps} />
}

export default React.memo(Navbar)
