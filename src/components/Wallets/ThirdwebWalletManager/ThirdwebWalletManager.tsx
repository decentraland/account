import React, { useEffect, useState } from 'react'
import { createThirdwebClient } from 'thirdweb'
import { ConnectButton, ThirdwebProvider, useConnect } from 'thirdweb/react'
import { inAppWallet } from 'thirdweb/wallets'
import { getConfiguration } from 'decentraland-connect'
import { Container, LoadingSkeleton } from './ThirdwebWalletManager.styled'

const thirdwebConfig = getConfiguration().thirdweb
const client = createThirdwebClient({ clientId: thirdwebConfig.clientId })

const ThirdwebWalletManagerContent: React.FC = () => {
  const { connect } = useConnect()
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    connect(async () => {
      const wallet = inAppWallet()
      await wallet.autoConnect({ client })
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
    return <LoadingSkeleton animation="wave" width="100%" height={50} />
  }

  if (!isConnected) {
    return null
  }

  return (
    <ConnectButton
      client={client}
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
