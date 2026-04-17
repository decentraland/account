import { Network } from '@dcl/schemas'
import { select } from '@redux-saga/core/effects'
import { formatEther } from 'viem'
import { Provider } from 'decentraland-transactions'
import { config } from '../../config'
import { getChainConfiguration, getChainIdByNetwork } from '../../lib/utils/eth'
import { t } from '../../lib/utils/translation'
import { PurchaseStatus } from '../gateway/types'
import { TransactionStatus as TxStatus } from '../transaction/types'
import { hasFailed, hasSucceeded, isPending } from '../transaction/utils'
import { getAddress } from '../wallet/selectors'
import { getWithdrawals } from './selectors'
import { DepositStatus, MaticEnv, TransactionStatus, TransactionType, TransferStatus, Withdrawal, WithdrawalStatus } from './types'

export const MANA_CONTRACT_ADDRESS = config.get('MANA_CONTRACT_ADDRESS')
export const ERC20_PREDICATE_CONTRACT_ADDRESS = config.get('ERC20_PREDICATE_CONTRACT_ADDRESS')
export const ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS = config.get('ROOT_CHAIN_MANAGER_CONTRACT_ADDRESS')
export const MATIC_ENV: MaticEnv = getMaticEnv(config.get('MATIC_ENV'))
export const TRANSACTIONS_API_URL = config.get('TRANSACTIONS_API_URL')
const CHAIN_ID = +(config.get('CHAIN_ID') || 1)

const POLL_INTERVAL = 30 * 1000 // 30 seconds

export async function isDepositSynced(txHash: string, ethereumProvider: Provider, maticProvider: Provider) {
  // get root counter
  const tx = await ethereumProvider.send!('eth_getTransactionReceipt', [txHash])
  if (!tx) return false
  const { 2: stateSync } = tx.logs
  const { 1: stateSyncId } = stateSync.topics
  const rootCounter = parseInt(stateSyncId, 16)

  // get child counter - call lastStateId on the state receiver contract
  const lastStateIdResult: string = await maticProvider.send!('eth_call', [
    {
      to: '0x0000000000000000000000000000000000001001',
      data: '0xc87d42e1' // keccak256("lastStateId()") selector
    },
    'latest'
  ])
  const childCounter = Number(BigInt(lastStateIdResult))

  // check if synced
  const isSynced = childCounter >= rootCounter
  return isSynced
}

export async function waitForSync(txHash: string, isSynced: (txHash: string) => Promise<boolean>): Promise<void> {
  try {
    const isConfirmed = await isSynced(txHash)
    if (!isConfirmed) {
      throw new Error('Not confirmed')
    }
  } catch (error) {
    await new Promise(resolve => setTimeout(() => resolve(void 0), POLL_INTERVAL))
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

export const mapStatusWithdrawal = (status: WithdrawalStatus): TransactionStatus => {
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

export const getStatusMessage = (type: TransactionType, parentStatus: TransactionStatus, childStatus: any) => {
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
    if (childStatus === PurchaseStatus.REFUNDED) {
      return t('purchase_status.refunded')
    }
    if (childStatus === PurchaseStatus.FAILED) {
      return t('purchase_status.failed')
    }
    if (childStatus === PurchaseStatus.CANCELLED) {
      return t('purchase_status.cancelled')
    }
    if (parentStatus === TransactionStatus.REJECTED && childStatus === PurchaseStatus.PENDING) {
      return t('purchase_status.expired')
    }

    return t('send_status.pending')
  }

  return t('transaction_status.pending')
}

export const isPendingAccountTransaction = (type: TransactionType, parentStatus: TransactionStatus, childStatus: any) => {
  if (parentStatus === TransactionStatus.PENDING) {
    return true
  }
  if (type === TransactionType.WITHDRAWAL) {
    if (childStatus === WithdrawalStatus.CHECKPOINT || childStatus === WithdrawalStatus.PENDING) {
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

// TODO: Reimplement with viem/wagmi - maticjs has been removed
export function* getMaticPOSClient(): Generator<any, any, any> {
  const from: string | undefined = yield select(getAddress)

  if (!from) {
    throw new Error('Could not get address')
  }

  const parentConfig = getChainConfiguration(CHAIN_ID)
  void getChainConfiguration(parentConfig.networkMapping?.[Network.MATIC] ?? 137)

  // TODO: Reimplement with viem - POSClient from @maticnetwork/maticjs has been removed
  throw new Error('getMaticPOSClient: Not yet implemented with viem')
}

export function* getStoreWithdrawalByHash(hash: string) {
  const withdrawals: Withdrawal[] = yield select(getWithdrawals)
  return withdrawals.find(w => w.initializeHash === hash)
}

const EXIT_CONTRACT_GAS_CONSUMPTION = 260670n // gas in wei

export async function getEstimatedExitTransactionCost(): Promise<string> {
  // TODO: Reimplement with viem public client
  const { createPublicClient, http } = await import('viem')
  const { mainnet, sepolia } = await import('viem/chains')

  const appChainId = getChainIdByNetwork(Network.ETHEREUM)
  const chain = appChainId === 1 ? mainnet : sepolia

  const client = createPublicClient({
    chain,
    transport: http()
  })

  const gasPrice = await client.getGasPrice()
  const estimatedTxGasWei = gasPrice * EXIT_CONTRACT_GAS_CONSUMPTION
  const estimatedTxGasEther = formatEther(estimatedTxGasWei)
  return estimatedTxGasEther
}
