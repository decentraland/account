import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Network } from '@dcl/schemas'
import { AccountTransaction } from '../../HomePage/AccountCard/AccountTransactions/AccountTransaction'
import { Transaction } from '../../../modules/mana/types'
import './SeeAllTransactionModal.css'

const SeeAllTransactionModal = ({ name, onClose, metadata }: ModalProps) => {
  const { transactions, network } = metadata
  return (
    <Modal
      name={name}
      className="SeeAllTransactionModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        {network === Network.MATIC
          ? t('see_all_transaction_modal.title_matic')
          : t('see_all_transaction_modal.title_ethereum')}
      </Modal.Header>
      <Modal.Content>
        {transactions.map((transaction: Transaction, index: number) => (
          <AccountTransaction transaction={transaction} key={index} />
        ))}
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(SeeAllTransactionModal)
