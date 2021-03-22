import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import {
  Deposit,
  Transaction,
  TransactionType,
  Transfer,
  Withdrawal,
} from '../../../modules/mana/types'
import './TransactionDetailModal.css'
import { getStatusMessage } from '../../../modules/mana/utils'

const TransactionDetailModal: React.FC<ModalProps> = ({
  name,
  onClose,
  metadata,
}) => {
  const {
    description,
    transaction,
  }: { description: string; transaction: Transaction } = metadata

  const { type } = transaction
  let data
  let dataComponent
  switch (transaction.type) {
    case TransactionType.DEPOSIT:
      data = transaction.data as Deposit
      dataComponent = (
        <div className="data">
          <div> {t('transaction_detail_modal.amount')} </div>
          <div> {data.amount} </div>
        </div>
      )
      break
    case TransactionType.TRANSFER:
      data = transaction.data as Transfer
      dataComponent = (
        <>
          <div className="data">
            <div> {t('transaction_detail_modal.amount')} </div>
            <div> {data.amount} </div>
          </div>
          <div className="data">
            <div> {t('transaction_detail_modal.to')} </div>
            <div> {data.to} </div>
          </div>
        </>
      )

      break
    case TransactionType.WITHDRAWAL:
      data = transaction.data as Withdrawal
      dataComponent = (
        <div className="data">
          <div> {t('transaction_detail_modal.amount')} </div>
          <div> {data.amount} </div>
        </div>
      )
      break
  }

  const datetime = data?.timestamp
    ? new Date(data?.timestamp).toLocaleString()
    : ''

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
          <div> {t('transaction_detail_modal.datetime')} </div>
          <div> {datetime} </div>
        </div>

        {dataComponent}
        <div className="status">
          <div> {t('transaction_detail_modal.status')} </div>
          <div> {data ? getStatusMessage(type, data.status) : ''}</div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
