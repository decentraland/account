import React from 'react'

import { Network } from '@dcl/schemas'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { getTransactionHref } from 'decentraland-dapps/dist/modules/transaction/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'

import { Radio } from 'decentraland-ui'

import { Props } from './CompleteWithdrawal.types'
import { WithdrawalStatus } from '../../../../modules/mana/types'
import LinkWrapper from '../LinkWrapper'

const CompleteWithdrawal = ({ withdrawal }: Props) => {
  const { status, finalizeHash } = withdrawal

  const href = finalizeHash && getTransactionHref({ txHash: finalizeHash }, getChainIdByNetwork(Network.ETHEREUM))

  const radio = (
    <Radio
      className={!href ? 'default_cursor' : undefined}
      checked={status === WithdrawalStatus.COMPLETE}
      label={t('withdrawal_status_modal.status_completed')}
    />
  )

  return href ? <LinkWrapper href={href}>{radio}</LinkWrapper> : radio
}

export default React.memo(CompleteWithdrawal)
