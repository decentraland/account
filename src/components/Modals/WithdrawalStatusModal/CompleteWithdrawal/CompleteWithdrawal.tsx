import React from 'react'
import { Network } from '@dcl/schemas'
import { Checkbox, FormControlLabel } from 'decentraland-ui2'
import { getChainIdByNetwork } from '../../../../lib/utils/eth'
import { t } from '../../../../lib/utils/translation'
import { WithdrawalStatus } from '../../../../modules/mana/types'
import { getTransactionHref } from '../../../../modules/transaction/utils'
import LinkWrapper from '../LinkWrapper'
import { Props } from './CompleteWithdrawal.types'

const CompleteWithdrawal = ({ withdrawal }: Props) => {
  const { status, finalizeHash } = withdrawal

  const href = finalizeHash && getTransactionHref({ txHash: finalizeHash }, getChainIdByNetwork(Network.ETHEREUM))

  const radio = (
    <FormControlLabel
      disabled
      control={<Checkbox checked={status === WithdrawalStatus.COMPLETE} />}
      label={t('withdrawal_status_modal.status_completed')}
    />
  )

  return href ? <LinkWrapper href={href}>{radio}</LinkWrapper> : radio
}

export default React.memo(CompleteWithdrawal)
