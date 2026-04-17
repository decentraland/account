import { getAddress as getCoreAddress, getChainId as getCoreChainId, getIsConnected, getIsConnecting } from '@dcl/core-web3'
import { ProviderType } from '@dcl/schemas'

export const getAddress = (state: any): string | undefined => getCoreAddress(state) ?? undefined
export const getChainId = (state: any): number => getCoreChainId(state) ?? 1
export const isConnected = (state: any): boolean => getCoreIsConnected(state)
export const isConnecting = (state: any): boolean => getCoreIsConnecting(state)

function getCoreIsConnected(state: any): boolean {
  return getIsConnected(state)
}

function getCoreIsConnecting(state: any): boolean {
  return getIsConnecting(state)
}

export type Networks = {
  [key: string]: {
    mana: number
    chainId: number
  }
}

export const getNetworks = (_state: any): Networks | null => {
  // Networks/balances are now fetched via wagmi hooks in components
  // This selector is kept for backward compat but returns null
  return null
}

export const getProviderType = (_state: any): ProviderType | undefined => {
  // Provider type is now managed by @dcl/core-web3
  return undefined
}

/**
 * getData returns a wallet-like object for backward compat with connect() containers.
 * It only provides the address. Use getAddress directly when possible.
 */
export const getData = (state: any): { address: string } | null => {
  const address = getAddress(state)
  return address ? { address } : null
}

export type Wallet = {
  address: string
  chainId?: number
  networks?: Networks | null
}

export type Provider = any

export async function sendTransaction(_contract: any, _fn: (c: any) => any): Promise<string> {
  throw new Error('sendTransaction: Not yet implemented with viem/wagmi')
}

export function connectWalletSuccess(wallet: { address: string }) {
  return { type: 'wallet/setAccount' as const, payload: wallet.address }
}
