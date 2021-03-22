import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import {
  Deposit,
  DepositStatus,
  Transaction,
  TransactionStatus,
  TransactionType,
  Transfer,
  Withdrawal,
  WithdrawalStatus,
} from '../../../modules/mana/types'
import './TransactionDetailModal.css'

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

  const getStatus = (type: TransactionType, status: any) => {
    if (type === TransactionType.WITHDRAWAL) {
      if (status === WithdrawalStatus.COMPLETE) {
        return t('withdrawal_status.complete')
      } else if (status === WithdrawalStatus.CHECKPOINT) {
        return t('withdrawal_status.checkpoint')
      } else {
        return t('withdrawal_status.pending')
      }
    } else if (type === TransactionType.DEPOSIT) {
      if (status === DepositStatus.COMPLETE) {
        return t('deposit_status.complete')
      } else if (status === DepositStatus.PENDING) {
        return t('deposit_status.pending')
      }
    } else if (type === TransactionType.TRANSFER) {
      if (status === TransactionStatus.CONFIRMED) {
        return t('send_status.complete')
      } else if (status === TransactionStatus.REJECTED) {
        return t('send_status.rejected')
      } else {
        return t('send_status.pending')
      }
    }
  }

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
          <div> {data ? getStatus(type, data.status) : ''}</div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
