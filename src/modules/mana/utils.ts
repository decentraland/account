import { BigNumber, ethers } from 'ethers'
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

function instantiateStateReceiver(rpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  return new ethers.Contract(
    '0x0000000000000000000000000000000000001001',
    [
      {
        constant: true,
        inputs: [],
        name: 'lastStateId',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
      },
    ] as any,
    provider
  )
}

export async function isWithdrawalSynced(txHash: string, maticRpcUrl: string) {
  const provider = new ethers.providers.JsonRpcProvider(maticRpcUrl)

  const tx = await provider.send('eth_getTransactionReceipt', [txHash])
  if (!tx || !tx.blockNumber) return false

  const block = parseInt(tx.blockNumber, 16)
  const { checkpoints } = await graphql<{ checkpoints: { id: string }[] }>(
    MATIC_ROOT_CHAIN_SUBGRAPH,
    `{ checkpoints(first: 1, where: { end_gt: ${block} }) { id } }`
  )

  const isSynced = checkpoints.length > 0
  return isSynced
}

export async function isDepositSynced(
  txHash: string,
  ethereumRpcUrl: string,
  maticRpcUrl: string
) {
  // get root counter
  const provider = new ethers.providers.JsonRpcProvider(ethereumRpcUrl)
  const tx = await provider.send('eth_getTransactionReceipt', [txHash])
  if (!tx) return false
  const { 2: stateSync } = tx.logs
  const { 1: stateSyncId } = stateSync.topics
  const rootCounter = parseInt(stateSyncId, 16)

  // get child counter
  const stateReceiver = instantiateStateReceiver(maticRpcUrl)
  const lastStateId: BigNumber = await stateReceiver.lastStateId()
  const childCounter = lastStateId.toNumber()

  // check if synced
  const isSynced = childCounter >= rootCounter
  return isSynced
}

export async function waitForSync(
  txHash: string,
  isSynced: (txHash: string) => Promise<boolean>
): Promise<void> {
  try {
    const isConfirmed = await isSynced(txHash)
    if (!isConfirmed) {
      throw new Error('Not confirmed')
    }
  } catch (error) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
    return waitForSync(txHash, isSynced)
  }
}
