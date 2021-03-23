import { BigNumber, ethers } from 'ethers'
import { TransactionStatus as TxStatus } from 'decentraland-dapps/dist/modules/transaction/types'
import { graphql } from 'decentraland-dapps/dist/lib/graph'
import { Provider } from 'decentraland-transactions/dist'
import {
  DepositStatus,
  TransactionStatus,
  TransactionType,
  TransferStatus,
  WithdrawalStatus,
} from './types'
import {
  hasFailed,
  hasSucceeded,
  isPending,
} from 'decentraland-dapps/dist/modules/transaction/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

export const MANA_CONTRACT_ADDRESS = process.env
  .REACT_APP_MANA_CONTRACT_ADDRESS!
export const ERC20_PREDICATE_CONTRACT_ADDRESS = process.env
  .REACT_APP_ERC20_PREDICATE_CONTRACT_ADDRESS!
export const ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS = process.env
  .REACT_APP_ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS!
export const MATIC_ROOT_CHAIN_SUBGRAPH = process.env
  .REACT_APP_MATIC_ROOT_CHAIN_SUBGRAPH!

const POLL_INTERVAL = 30 * 1000 // 30 seconds

function instantiateStateReceiver(provider: Provider) {
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
    new ethers.providers.Web3Provider(provider as any)
  )
}

export async function isWithdrawalSynced(
  txHash: string,
  maticProvider: Provider
) {
  const tx = await maticProvider.send!('eth_getTransactionReceipt', [txHash])
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
  ethereumProvider: Provider,
  maticProvider: Provider
) {
  // get root counter
  const tx = await ethereumProvider.send!('eth_getTransactionReceipt', [txHash])
  if (!tx) return false
  const { 2: stateSync } = tx.logs
  const { 1: stateSyncId } = stateSync.topics
  const rootCounter = parseInt(stateSyncId, 16)

  // get child counter
  const stateReceiver = instantiateStateReceiver(maticProvider)
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
    await new Promise((resolve) =>
      setTimeout(() => resolve(void 0), POLL_INTERVAL)
    )
    return waitForSync(txHash, isSynced)
  }
}

export const mapStatus = (txStatus: TxStatus | null) => {
  if (isPending(txStatus)) {
    return TransactionStatus.PENDING
  } else if (hasFailed(txStatus)) {
    return TransactionStatus.REJECTED
  } else if (hasSucceeded(txStatus)) {
    return TransactionStatus.CONFIRMED
  } else {
    throw new Error(`Invalid transaction status: ${txStatus}`)
  }
}

export const mapStatusWithdrawal = (
  status: WithdrawalStatus
): TransactionStatus => {
  switch (status) {
    case WithdrawalStatus.COMPLETE:
      return TransactionStatus.CONFIRMED
    case WithdrawalStatus.PENDING:
    case WithdrawalStatus.CHECKPOINT:
      return TransactionStatus.PENDING
    default:
      return TransactionStatus.PENDING
  }
}

export const getStatusMessage = (
  type: TransactionType,
  parentStatus: TransactionStatus,
  childStatus: any
) => {
  if (type === TransactionType.WITHDRAWAL) {
    if (childStatus === WithdrawalStatus.COMPLETE) {
      return t('withdrawal_status.complete')
    }
    if (childStatus === WithdrawalStatus.CHECKPOINT) {
      return t('withdrawal_status.checkpoint')
    }
    return t('withdrawal_status.pending')
  }
  if (type === TransactionType.DEPOSIT) {
    if (childStatus === DepositStatus.COMPLETE) {
      return t('deposit_status.complete')
    }
    return t('deposit_status.pending')
  }
  if (type === TransactionType.TRANSFER) {
    if (parentStatus === TransactionStatus.PENDING) {
      return t('send_status.pending')
    }
    if (childStatus === TransferStatus.CONFIRMED) {
      return t('send_status.complete')
    }
    if (childStatus === TransferStatus.REJECTED) {
      return t('send_status.rejected')
    }
    return t('send_status.pending')
  }
  return t('transaction_status.pending')
}

export const isPendingAccountTransaction = (
  type: TransactionType,
  parentStatus: TransactionStatus,
  childStatus: any
) => {
  if (parentStatus === TransactionStatus.PENDING) {
    return true
  }
  if (type === TransactionType.WITHDRAWAL) {
    if (
      childStatus === WithdrawalStatus.CHECKPOINT ||
      childStatus === WithdrawalStatus.PENDING
    ) {
      return true
    }
  } else if (type === TransactionType.DEPOSIT) {
    if (childStatus === DepositStatus.PENDING) {
      return true
    }
  } else if (type === TransactionType.TRANSFER) {
    if (childStatus === TransferStatus.PENDING) {
      return true
    }
  }
  return false
}
