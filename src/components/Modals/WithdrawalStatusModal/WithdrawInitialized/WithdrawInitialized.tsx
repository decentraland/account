import React from 'react'
import { Network } from '@dcl/schemas'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { getTransactionHref } from 'decentraland-dapps/dist/modules/transaction/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Checkbox } from 'decentraland-ui'
import LinkWrapper from '../LinkWrapper'
import { Props } from './WithdrawInitialized.types'

const WithdrawInitialized = ({ withdrawal }: Props) => {
  const { initializeHash } = withdrawal

  const href = getTransactionHref({ txHash: initializeHash }, getChainIdByNetwork(Network.MATIC))

  return (
    <LinkWrapper href={href}>
      <Checkbox checked={true} label={t('withdrawal_status_modal.status_initialized')} />
    </LinkWrapper>
  )
}

export default React.memo(WithdrawInitialized)
