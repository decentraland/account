import React from 'react'
import { Network } from '@dcl/schemas'
import { getChainIdByNetwork } from 'decentraland-dapps/dist/lib/eth'
import { getTransactionHref } from 'decentraland-dapps/dist/modules/transaction/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Checkbox } from 'decentraland-ui'
import { WithdrawalStatus } from '../../../../modules/mana/types'
import LinkWrapper from '../LinkWrapper'
import { Props } from './CompleteWithdrawal.types'

const CompleteWithdrawal = ({ withdrawal }: Props) => {
  const { status, finalizeHash } = withdrawal

  const href = finalizeHash && getTransactionHref({ txHash: finalizeHash }, getChainIdByNetwork(Network.ETHEREUM))

  const radio = <Checkbox disabled label={t('withdrawal_status_modal.status_completed')} checked={status === WithdrawalStatus.COMPLETE} />

  return href ? <LinkWrapper href={href}>{radio}</LinkWrapper> : radio
}

export default React.memo(CompleteWithdrawal)
