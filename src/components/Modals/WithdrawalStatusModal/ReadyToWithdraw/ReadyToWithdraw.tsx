import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Checkbox } from 'decentraland-ui'

import './ReadyToWithdraw.css'

const ReadyToWithdraw = ({ isReadyToWithdraw }: { isReadyToWithdraw: boolean }) => {
  return (
    <div className="ReadyToWithdraw">
      <Checkbox checked={isReadyToWithdraw} label={t('withdrawal_status_modal.status_checkpoint')} />
      <div className="status_checkpoint_placeholder">{t('withdrawal_status_modal.status_checkpoint_placeholder')}</div>
    </div>
  )
}

export default React.memo(ReadyToWithdraw)
