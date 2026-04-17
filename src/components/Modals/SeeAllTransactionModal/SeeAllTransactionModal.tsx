import * as React from 'react'
import { Network } from '@dcl/schemas'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from 'decentraland-ui2'
import Modal, { ModalProps } from '../../../lib/utils/ModalWrapper'
import { t } from '../../../lib/utils/translation'
import { Transaction } from '../../../modules/mana/types'
import { AccountTransaction } from '../../Wallets/AccountCard/AccountTransactions/AccountTransaction'

import './SeeAllTransactionModal.css'

const SeeAllTransactionModal = ({ name, onClose, metadata }: ModalProps) => {
  const { transactions, network } = metadata
  return (
    <Modal
      name={name}
      className="SeeAllTransactionModal"
      closeIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
    >
      <Modal.Header>
        {network === Network.MATIC ? t('see_all_transaction_modal.title_matic') : t('see_all_transaction_modal.title_ethereum')}
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
