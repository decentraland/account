import * as React from 'react'

import { Network } from '@dcl/schemas'

import { Props } from './WithdrawalDataComponent.types'
import Data from '../Data'
import ExplorerLink from '../ExplorerLink'

const WithdrawalDataComponent = ({ withdrawals, data }: Props) => {
  const withdrawal = withdrawals.find(w => w.initializeHash === data.initializeHash)

  if (!withdrawal) {
    return null
  }

  const { initializeHash, finalizeHash } = withdrawal

  return (
    <>
      <Data label={'initialize_tx'}>
        <ExplorerLink network={Network.MATIC} txHash={initializeHash} />
      </Data>
      {finalizeHash && (
        <Data label={'finalize_tx'}>
          <ExplorerLink network={Network.ETHEREUM} txHash={finalizeHash} />
        </Data>
      )}
    </>
  )
}

export default React.memo(WithdrawalDataComponent)
