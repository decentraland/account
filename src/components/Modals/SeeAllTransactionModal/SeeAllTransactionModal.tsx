import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { AccountTransaction } from '../../HomePage/AccountCard/AccountTransactions/AccountTransaction'
import './SeeAllTransactionModal.css'
import { Transaction } from '../../HomePage/HomePage.types'

const SeeAllTransactionModal = ({ name, onClose, metadata }: ModalProps) => {
  const { transactions } = metadata
  return (
    <Modal
      name={name}
      className="SeeAllTransactionModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>{t('see_all_transaction_modal.title')}</Modal.Header>
      <Modal.Content>
        {transactions.map(
          (
            { type, status, description, amount }: Transaction,
            index: number
          ) => (
            <AccountTransaction
              type={type}
              status={status}
              description={description}
              amount={amount}
              key={index}
            />
          )
        )}
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(SeeAllTransactionModal)
