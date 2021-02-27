import { ethers } from 'ethers'
import { graphql } from 'decentraland-dapps/dist/lib/graph'

export const MANA_CONTRACT_ADDRESS = process.env
  .REACT_APP_MANA_CONTRACT_ADDRESS!
export const ERC20_PREDICATE_CONTRACT_ADDRESS = process.env
  .REACT_APP_ERC20_PREDICATE_CONTRACT_ADDRESS!
export const ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS = process.env
  .REACT_APP_ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS!
export const MATIC_ROOT_CHAIN_SUBGRAPH = process.env
  .REACT_APP_MATIC_ROOT_CHAIN_SUBGRAPH!

const POLL_INTERVAL = 30 * 1000 // 30 seconds

export async function waitForConfirmation(txHash: string): Promise<void> {
  try {
    console.log('hash', txHash)
    const provider = new ethers.providers.JsonRpcProvider(
      'https://rpc-mumbai.matic.today'
    )

    const tx: {
      blockNumber: string | null
    } | null = await provider.send('eth_getTransactionReceipt', [txHash])

    if (tx && tx.blockNumber) {
      const block = parseInt(tx.blockNumber, 16)
      console.log('block', block)
      const { checkpoints } = await graphql<{ checkpoints: { id: string }[] }>(
        MATIC_ROOT_CHAIN_SUBGRAPH,
        `
      {
        checkpoints(first: 1, where: { end_gt: ${block} }) { id }
      }
    `
      )

      const isConfirmed = checkpoints.length > 0
      console.log('is confirmed', isConfirmed)

      if (!isConfirmed) {
        throw new Error('Not confirmed')
      }
    } else {
      throw new Error('Tx not found')
    }
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
    return waitForConfirmation(txHash)
  }
}
