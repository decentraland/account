import { ChainId, Network } from '@dcl/schemas'
import { createPublicClient, http } from 'viem'
import { mainnet, polygon, polygonAmoy, sepolia } from 'viem/chains'
import { config } from '../../config'

const viemChains: Record<number, any> = {
  1: mainnet,
  137: polygon,
  11155111: sepolia,
  80002: polygonAmoy
}

function getViemChain(chainId: number) {
  return viemChains[chainId] ?? mainnet
}

export function getChainIdByNetwork(network: Network): ChainId {
  const chainId = +(config.get('CHAIN_ID') || 1)
  if (network === Network.ETHEREUM) {
    return chainId as ChainId
  }
  if (network === Network.MATIC) {
    // If mainnet (1) → polygon (137), if sepolia (11155111) → polygonAmoy (80002)
    return chainId === 1 ? (137 as ChainId) : (80002 as ChainId)
  }
  return chainId as ChainId
}

export function getPublicClient(chainId: number) {
  const chain = getViemChain(chainId)
  return createPublicClient({
    chain,
    transport: http()
  })
}

export function getChainConfiguration(chainId: number) {
  const chain = getViemChain(chainId)
  const networkMapping: Record<string, number> = {}

  if (chainId === 1) {
    networkMapping[Network.ETHEREUM] = 1
    networkMapping[Network.MATIC] = 137
  } else if (chainId === 11155111) {
    networkMapping[Network.ETHEREUM] = 11155111
    networkMapping[Network.MATIC] = 80002
  }

  return {
    network: chainId === 1 || chainId === 137 ? Network.ETHEREUM : Network.ETHEREUM,
    chainId,
    rpcURL: chain.rpcUrls.default.http[0],
    networkMapping
  }
}
