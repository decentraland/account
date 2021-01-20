import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close, ModalProps } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './TransactionDetailModal.css'
import {
  TransactionStatus,
  TransactionType
} from '../../HomePage/HomePage.types'

type Props = ModalProps

const TransactionDetailModal = ({ name, onClose, metadata }: Props) => {
  const { description, amount, type, status } = metadata
  console.log(description, amount, type, status)
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
            {type === TransactionType.DEPOSIT ? 'DEPOSIT' : 'WITHDRAWAL'}
          </div>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.status')} </div>
          <div>
            {status === TransactionStatus.CONFIRMED ? 'CONFIRMED' : 'PENDING'}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
