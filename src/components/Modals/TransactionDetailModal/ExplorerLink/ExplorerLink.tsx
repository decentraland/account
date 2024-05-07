import React from 'react'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { getTransactionHref } from 'decentraland-dapps/dist/modules/transaction/utils'
import { Props } from './ExplorerLink.types'

const ExplorerLink = ({ network, chainId, txHash }: Props) => {
  const resolvedChainId = chainId || (network && getChainIdByNetwork(network))

  if (!resolvedChainId) {
    throw new Error('At least one of network or chainId must be provided as props')
  }

  const href = getTransactionHref({ txHash }, resolvedChainId)

  return (
    <a href={href} target="_blank" rel="noreferrer">
      {txHash}
    </a>
  )
}

export default React.memo(ExplorerLink)
