import React, { useEffect, useState } from 'react'
import { ConnectButton, ThirdwebProvider, useConnect } from 'thirdweb/react'
import { inAppWallet } from 'thirdweb/wallets'
import { Skeleton } from 'decentraland-ui2'
import { thirdwebClient } from '../../../lib/thirdweb'
import { Container } from './ThirdwebWalletManager.styled'

const ThirdwebWalletManagerContent: React.FC = () => {
  const { connect } = useConnect()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    connect(async () => {
      const wallet = inAppWallet()
      await wallet.autoConnect({ client: thirdwebClient })
      return wallet
    })
      .then(wallet => {
        if (wallet) {
          setIsConnected(true)
        }
      })
      .catch(() => {
        // Session not available — user may need to re-authenticate
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [connect])

  if (isLoading) {
    return <Skeleton animation="wave" width="100%" height={50} />
  }

  if (!isConnected) {
    return null
  }

  return (
    <ConnectButton
      client={thirdwebClient}
      wallets={[inAppWallet()]}
      theme="dark"
      connectModal={{ size: 'compact' }}
      detailsButton={{ style: { width: '100%' } }}
    />
  )
}

const ThirdwebWalletManager: React.FC = () => {
  return (
    <Container>
      <ThirdwebProvider>
        <ThirdwebWalletManagerContent />
      </ThirdwebProvider>
    </Container>
  )
}

export default ThirdwebWalletManager
