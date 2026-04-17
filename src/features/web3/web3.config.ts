import { createWeb3CoreConfig, magic, thirdweb } from '@dcl/core-web3'
import { config } from '../../config'

const WALLET_CONNECT_PROJECT_ID = config.get('WALLET_CONNECT_PROJECT_ID') ?? ''
const MAGIC_API_KEY = config.get('MAGIC_API_KEY') ?? ''
const THIRDWEB_CLIENT_ID = config.get('THIRDWEB_CLIENT_ID') ?? ''

const additionalConnectors = [
  ...(MAGIC_API_KEY ? [magic({ apiKey: MAGIC_API_KEY })] : []),
  ...(THIRDWEB_CLIENT_ID ? [thirdweb({ clientId: THIRDWEB_CLIENT_ID })] : [])
]

export const web3Config = createWeb3CoreConfig({
  walletConnectProjectId: WALLET_CONNECT_PROJECT_ID,
  appMetadata: {
    name: 'Decentraland Account',
    description: 'Manage your Decentraland account, MANA, and settings',
    url: typeof window !== 'undefined' ? window.location.origin : 'https://decentraland.org/account'
  },
  additionalConnectors
})
