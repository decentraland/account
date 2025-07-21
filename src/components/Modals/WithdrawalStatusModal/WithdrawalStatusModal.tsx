import { useCallback } from 'react'
import { Network } from '@dcl/schemas'
import { NetworkButton } from 'decentraland-dapps/dist/containers'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Loader, ModalNavigation } from 'decentraland-ui'
import { useWithdrawalCost } from '../../../hooks'
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
      <ModalNavigation title={t('withdrawal_status_modal.title')} onClose={onClose} />
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
              <Loader size="tiny" inline />
            </div>
          ) : (
            <div className="withdrawal_cost">
              <>
                {t('withdrawal_status_modal.withdrawal_cost', {
                  cost: cost ?? t('global.unknown'),
                  bold: (text: string) => <b>{text}</b>
                })}
                <br />
                {t('withdrawal_status_modal.withdrawal_cost_explanation')}
              </>
            </div>
          )
        ) : null}
        {status === WithdrawalStatus.COMPLETE && !isFinalizingWithdrawal ? (
          <Button primary onClick={onClose}>
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
