import React from 'react'
import { Checkbox, FormControlLabel } from 'decentraland-ui2'
import { t } from '../../../../lib/utils/translation'

import './ReadyToWithdraw.css'

const ReadyToWithdraw = ({ isReadyToWithdraw }: { isReadyToWithdraw: boolean }) => {
  return (
    <div className="ReadyToWithdraw">
      <FormControlLabel control={<Checkbox checked={isReadyToWithdraw} />} label={t('withdrawal_status_modal.status_checkpoint')} />
      <div className="status_checkpoint_placeholder">{t('withdrawal_status_modal.status_checkpoint_placeholder')}</div>
    </div>
  )
}

export default React.memo(ReadyToWithdraw)
