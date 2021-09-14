import { BigNumber, ethers } from 'ethers'
import { TransactionStatus as TxStatus } from 'decentraland-dapps/dist/modules/transaction/types'
import { graphql } from 'decentraland-dapps/dist/lib/graph'
import { Provider } from 'decentraland-transactions'
import {
  hasFailed,
  hasSucceeded,
  isPending,
} from 'decentraland-dapps/dist/modules/transaction/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { call, select } from '@redux-saga/core/effects'
import { getConnectedProvider } from 'decentraland-dapps/dist/lib/eth'
import { getAddress, getChainId } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { ChainId, Network } from '@dcl/schemas'
import { getChainConfiguration } from 'decentraland-dapps/dist/lib/chainConfiguration'
import { MaticPOSClient } from '@maticnetwork/maticjs'
import { getWithdrawals } from './selectors'
import {
  DepositStatus,
  MaticEnv,
  PurchaseStatus,
  TransactionStatus,
  TransactionType,
  TransferStatus,
  Withdrawal,
  WithdrawalStatus,
} from './types'

export const MANA_CONTRACT_ADDRESS = process.env
  .REACT_APP_MANA_CONTRACT_ADDRESS!
export const ERC20_PREDICATE_CONTRACT_ADDRESS = process.env
  .REACT_APP_ERC20_PREDICATE_CONTRACT_ADDRESS!
export const ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS = process.env
  .REACT_APP_ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS!
export const MATIC_ROOT_CHAIN_SUBGRAPH = process.env
  .REACT_APP_MATIC_ROOT_CHAIN_SUBGRAPH!
export const MATIC_ENV: MaticEnv = getMaticEnv(process.env.REACT_APP_MATIC_ENV)
export const TRANSACTIONS_API_URL = process.env.REACT_APP_TRANSACTIONS_API_URL!

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
  if (type === TransactionType.PURCHASE) {
    if (parentStatus === TransactionStatus.PENDING) {
      return t('purchase_status.pending')
    }
    if (childStatus === PurchaseStatus.COMPLETE) {
      return t('purchase_status.complete')
    }
    if (childStatus === PurchaseStatus.FAILED) {
      return t('purchase_status.failed')
    }
    if (childStatus === PurchaseStatus.CANCELLED) {
      return t('purchase_status.cancelled')
    }
    if (
      parentStatus === TransactionStatus.REJECTED &&
      childStatus === PurchaseStatus.PENDING
    ) {
      return t('purchase_status.expired')
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

function getMaticEnv(env?: string) {
  if (env && env.toLowerCase() === MaticEnv.MAINNET) {
    return MaticEnv.MAINNET
  } else {
    return MaticEnv.TESTNET
  }
}

export function* getMaticPOSClient() {
  const provider: Provider = yield call(getConnectedProvider)

  if (!provider) {
    throw new Error(`Could not connect to provider`)
  }

  const from: string | undefined = yield select(getAddress)

  if (!from) {
    throw new Error(`Could not get address`)
  }

  const chainId: ChainId = yield select(getChainId)
  const parentConfig = getChainConfiguration(chainId)
  const maticConfig = getChainConfiguration(
    parentConfig.networkMapping[Network.MATIC]
  )

  const config = {
    network: MATIC_ENV,
    version: MATIC_ENV === MaticEnv.MAINNET ? 'v1' : 'mumbai',
    parentProvider: provider,
    maticProvider: maticConfig.rpcURL,
    parentDefaultOptions: { from },
    maticDefaultOptions: { from },
  }

  return new MaticPOSClient(config)
}

export function* getStoreWithdrawalByHash(hash: string) {
  const withdrawals: Withdrawal[] = yield select(getWithdrawals)
  return withdrawals.find((w) => w.initializeHash === hash)
}

export function getTimestamp() {
  return Date.now()
}
