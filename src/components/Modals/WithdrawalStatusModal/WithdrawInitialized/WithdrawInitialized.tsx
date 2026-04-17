import React from 'react'
import { Network } from '@dcl/schemas'
import { Checkbox, FormControlLabel } from 'decentraland-ui2'
import { getChainIdByNetwork } from '../../../../lib/utils/eth'
import { t } from '../../../../lib/utils/translation'
import { getTransactionHref } from '../../../../modules/transaction/utils'
import LinkWrapper from '../LinkWrapper'
import { Props } from './WithdrawInitialized.types'

const WithdrawInitialized = ({ withdrawal }: Props) => {
  const { initializeHash } = withdrawal

  const href = getTransactionHref({ txHash: initializeHash }, getChainIdByNetwork(Network.MATIC))

  return (
    <LinkWrapper href={href}>
      <FormControlLabel control={<Checkbox checked={true} />} label={t('withdrawal_status_modal.status_initialized')} />
    </LinkWrapper>
  )
}

export default React.memo(WithdrawInitialized)
