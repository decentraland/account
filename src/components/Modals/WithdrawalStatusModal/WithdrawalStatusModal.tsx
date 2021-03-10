import * as React from 'react'
import { Button, Close, Radio } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { isPending } from 'decentraland-dapps/dist/modules/transaction/utils'
import { WithdrawalStatus } from '../../../modules/mana/types'
import { FINISH_WITHDRAWAL_SUCCESS } from '../../../modules/mana/actions'
import { closeModal } from '../../../modules/modal/actions'
import { Props } from './WithdrawalStatusModal.types'
import './WithdrawalStatusModal.css'

export default class WithdrawalStatusModal extends React.PureComponent<Props> {
  render() {
    const {
      name,
      onClose,
      metadata,
      withdrawals,
      transactions,
      isLoading,
      onFinishWithdrawal,
    } = this.props
    const withdrawal = withdrawals.find(({ hash }) => metadata.txHash === hash)
    const isTxPending = transactions.some(
      (tx) =>
        tx.actionType === FINISH_WITHDRAWAL_SUCCESS &&
        tx.payload.withdrawal.hash === metadata.hash &&
        isPending(tx.status)
    )
    if (!withdrawal) {
      return
    }
    const { status, amount } = withdrawal
    const isWithdrawalPending = status === WithdrawalStatus.PENDING
    const isWithdrawalCheckpoint = status === WithdrawalStatus.CHECKPOINT
    const isWithdrawalCompleted = status === WithdrawalStatus.COMPLETE

    const handleFinishWithdrawal = () => onFinishWithdrawal(withdrawal)
    const handleCloseModal = () => closeModal('WithdrawalStatusModal')

    return (
      <Modal
        name={name}
        closeIcon={<Close onClick={onClose} />}
        className="WithdrawalStatusModal"
      >
        <Modal.Header>{t('withdrawal_status_modal.title')}</Modal.Header>
        <Modal.Content>
          <div className="amount_placeholder">
            {t('withdrawal_status_modal.amount_placeholder')}
          </div>
          <div className="amount">
            {amount} {t('global.mana_symbol')}
          </div>
          <div className="status">
            <div className="status_placeholder">
              {t('withdrawal_status_modal.status_placeholder')}
            </div>
            <Radio
              checked={true}
              label={t('withdrawal_status_modal.status_initialized')}
            />
            <Radio
              checked={true}
              className={isWithdrawalCheckpoint ? '' : 'yellow_check'}
              label={t('withdrawal_status_modal.status_checkpoint')}
            />
            <div className="status_checkpoint_placeholder">
              {t('withdrawal_status_modal.status_checkpoint_placeholder')}
            </div>
            <Radio
              checked={isWithdrawalCompleted}
              label={t('withdrawal_status_modal.status_completed')}
            />
          </div>
          {isWithdrawalCompleted && !isTxPending ? (
            <Button primary onClick={handleCloseModal}>
              {t('global.done')}
            </Button>
          ) : (
            <Button
              primary
              disabled={isWithdrawalPending || isLoading || isTxPending}
              loading={isLoading || isTxPending}
              onClick={handleFinishWithdrawal}
            >
              {t('global.complete_withdrawal')}
            </Button>
          )}
        </Modal.Content>
      </Modal>
    )
  }
}
