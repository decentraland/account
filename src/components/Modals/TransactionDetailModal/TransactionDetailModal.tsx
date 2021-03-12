import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { TransactionStatus, TransactionType } from '../../../modules/mana/types'
import './TransactionDetailModal.css'

const TransactionDetailModal: React.FC<ModalProps> = ({
  name,
  onClose,
  metadata,
}) => {
  const { description, amount, type, status } = metadata
  return (
    <Modal
      name={name}
      className="TransactionDetailModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>{t('transaction_detail_modal.title')}</Modal.Header>
      <Modal.Content>
        <div className="data">
          <div> {t('transaction_detail_modal.operation')} </div>
          <div> {description} </div>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.amount')} </div>
          <div> {amount} </div>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.type')} </div>
          <div>
            {type === TransactionType.DEPOSIT
              ? t('transaction_type.deposit')
              : t('transaction_type.withdrawal')}
          </div>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.status')} </div>
          <div>
            {status === TransactionStatus.CONFIRMED
              ? t('transaction_status.confirmed')
              : t('transaction_status.pending')}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
