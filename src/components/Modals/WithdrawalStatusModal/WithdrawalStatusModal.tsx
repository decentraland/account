import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close, Radio } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './WithdrawalStatusModal.css'
import { WithdrawalStatus } from '../../../modules/mana/types'
import { Props } from './WithdrawalStatusModal.types'

export default class WithdrawalStatusModal extends React.PureComponent<Props> {
  render() {
    const {
      name,
      onClose,
      metadata,
      withdrawals,
      isLoading,
      onFinishWithdrawal
    } = this.props
    const withdrawal = withdrawals.find(({ hash }) => metadata.txHash === hash)
    if (!withdrawal) {
      return
    }
    const { status, amount } = withdrawal
    const isPending = status === WithdrawalStatus.PENDING
    const isCheckpoint = status === WithdrawalStatus.CHECKPOINT

    const handleFinishWithdrawal = () => onFinishWithdrawal(withdrawal)

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
              className={isCheckpoint ? '' : 'yellow_check'}
              label={t('withdrawal_status_modal.status_checkpoint')}
            />
            <div className="status_checkpoint_placeholder">
              {t('withdrawal_status_modal.status_checkpoint_placeholder')}
            </div>
            <Radio
              checked={false}
              label={t('withdrawal_status_modal.status_completed')}
            />
          </div>
          <Button
            primary
            disabled={isPending || isLoading}
            loading={isLoading}
            onClick={handleFinishWithdrawal}
          >
            {t('global.done')}
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}
