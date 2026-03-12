import React, { useEffect, useState } from 'react'
import { createThirdwebClient } from 'thirdweb'
import { ConnectButton, ThirdwebProvider, useConnect } from 'thirdweb/react'
import { inAppWallet } from 'thirdweb/wallets'
import { getConfiguration } from 'decentraland-connect'

const thirdwebConfig = getConfiguration().thirdweb
const client = createThirdwebClient({ clientId: thirdwebConfig.clientId })

const ThirdwebWalletManagerContent: React.FC = () => {
  const { connect } = useConnect()
  const [isConnected, setIsConnected] = useState(false)

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
  }, [connect])

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
    <ThirdwebProvider>
      <ThirdwebWalletManagerContent />
    </ThirdwebProvider>
  )
}

export default ThirdwebWalletManager
