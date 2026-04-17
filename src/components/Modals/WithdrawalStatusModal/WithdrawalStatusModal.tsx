import { useCallback } from 'react'
import { Network } from '@dcl/schemas'
import CloseIcon from '@mui/icons-material/Close'
import { Box, Button, CircularProgress, IconButton, Typography } from 'decentraland-ui2'
import { useWithdrawalCost } from '../../../hooks'
import Modal from '../../../lib/utils/ModalWrapper'
import { NetworkButton } from '../../../lib/utils/noop'
import { t } from '../../../lib/utils/translation'
import { WithdrawalStatus } from '../../../modules/mana/types'
import CompleteWithdrawal from './CompleteWithdrawal'
import ReadyToWithdraw from './ReadyToWithdraw'
import { Props } from './WithdrawalStatusModal.types'
import WithdrawInitialized from './WithdrawInitialized'

import './WithdrawalStatusModal.css'

export default function WithdrawalStatusModal({
  name,
  onClose,
  withdrawal,
  isFinalizingWithdrawal,
  isLoading,
  onFinishWithdrawal
}: Props): JSX.Element | null {
  const [cost, isLoadingCost] = useWithdrawalCost()
  if (!withdrawal) {
    return null
  }

  const { status, amount } = withdrawal
  const isReadyToWithdraw = status === WithdrawalStatus.CHECKPOINT || status === WithdrawalStatus.COMPLETE
  const handleFinishWithdrawal = useCallback(() => onFinishWithdrawal(withdrawal), [withdrawal, onFinishWithdrawal])

  return (
    <Modal name={name} onClose={onClose} className="WithdrawalStatusModal">
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2 }}>
        <Typography variant="h6">{t('withdrawal_status_modal.title')}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Modal.Content>
        <div className="amount_placeholder">{t('withdrawal_status_modal.amount_placeholder')}</div>
        <div className="amount">
          {amount} {t('global.mana_symbol')}
        </div>
        <div className="status">
          <div className="status_placeholder">{t('withdrawal_status_modal.status_placeholder')}</div>
          <WithdrawInitialized withdrawal={withdrawal} />
          <ReadyToWithdraw isReadyToWithdraw={isReadyToWithdraw} />
          <CompleteWithdrawal withdrawal={withdrawal} />
        </div>

        {isReadyToWithdraw ? (
          isLoadingCost ? (
            <div className="withdrawal_cost_loader">
              <CircularProgress size={16} />
            </div>
          ) : (
            <div className="withdrawal_cost">
              <>
                {t('withdrawal_status_modal.withdrawal_cost', {
                  cost: cost ?? t('global.unknown')
                })}
                <br />
                {t('withdrawal_status_modal.withdrawal_cost_explanation')}
              </>
            </div>
          )
        ) : null}
        {status === WithdrawalStatus.COMPLETE && !isFinalizingWithdrawal ? (
          <Button variant="contained" color="primary" onClick={onClose}>
            {t('global.done')}
          </Button>
        ) : (
          <NetworkButton
            primary
            disabled={status === WithdrawalStatus.PENDING || isLoading || isFinalizingWithdrawal}
            loading={isLoading || isFinalizingWithdrawal}
            onClick={handleFinishWithdrawal}
            network={Network.ETHEREUM}
          >
            {t('withdrawal_status_modal.complete_withdrawal')}
          </NetworkButton>
        )}
      </Modal.Content>
    </Modal>
  )
}
