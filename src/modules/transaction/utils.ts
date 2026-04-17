import { ChainId } from '@dcl/schemas'
import { TransactionStatus } from './types'

export function buildTransactionPayload(chainId: ChainId, txHash: string, payload: Record<string, any> = {}) {
  return {
    ...payload,
    hash: txHash,
    chainId
  }
}

export function isPending(status: TransactionStatus | null): boolean {
  return status === TransactionStatus.QUEUED || status === TransactionStatus.PENDING
}

export function hasFailed(status: TransactionStatus | null): boolean {
  return status === TransactionStatus.DROPPED || status === TransactionStatus.REVERTED
}

export function hasSucceeded(status: TransactionStatus | null): boolean {
  return status === TransactionStatus.CONFIRMED || status === TransactionStatus.REPLACED
}

const ETHERSCAN_HOSTS: Record<number, string> = {
  1: 'https://etherscan.io',
  11155111: 'https://sepolia.etherscan.io',
  137: 'https://polygonscan.com',
  80002: 'https://amoy.polygonscan.com'
}

export function getTransactionHref({ txHash, address }: { txHash?: string; address?: string }, chainId: ChainId | number): string {
  const host = ETHERSCAN_HOSTS[chainId] ?? ETHERSCAN_HOSTS[1]
  if (txHash) {
    return `${host}/tx/${txHash}`
  }
  if (address) {
    return `${host}/address/${address}`
  }
  return host
}
