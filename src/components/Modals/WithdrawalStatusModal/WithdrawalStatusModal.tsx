import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close, Radio } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './WithdrawalStatusModal.css'
import { WithdrawalStatus } from '../../../modules/mana/types'

export default class WithdrawalStatusModal extends React.PureComponent<ModalProps> {
  render() {
    console.log(this.props)
    const { name, onClose, metadata } = this.props
    const { withdrawal } = metadata
    const { amount, status } = withdrawal

    const isPending = status === WithdrawalStatus.PENDING

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
            {amount} {t('global.usd_symbol')}
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
              className="yellow_check"
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
          <Button primary disabled={isPending}>
            {t('global.done')}
          </Button>
        </Modal.Content>
      </Modal>
    )
  }
}
