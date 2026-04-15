import { createThirdwebClient } from 'thirdweb'
import { getConfiguration } from 'decentraland-connect'

const thirdwebConfig = getConfiguration().thirdweb

/**
 * Singleton thirdweb client instance shared across the application.
 * Uses the clientId from decentraland-connect configuration.
 */
export const thirdwebClient = createThirdwebClient({ clientId: thirdwebConfig.clientId })
