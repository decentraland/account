import { ethers } from 'ethers'
import { getConnectedProvider } from 'decentraland-dapps/dist/lib/eth'

export async function getSigner(): Promise<ethers.Signer> {
  const provider = await getConnectedProvider()
  if (!provider) {
    throw new Error('Could not connect to provider')
  }

  const eth = new ethers.providers.Web3Provider(provider)
  return eth.getSigner()
}
