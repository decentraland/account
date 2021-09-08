import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { Network } from '@dcl/schemas'
import {
  Deposit,
  Purchase,
  Transaction,
  TransactionType,
  Transfer,
  Withdrawal,
} from '../../../modules/mana/types'
import { getStatusMessage } from '../../../modules/mana/utils'
import Data from './Data'
import ExplorerLink from './ExplorerLink'
import WithdrawalDataComponent from './WithdrawalDataComponent'
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

  const { type, status, amount } = transaction
  let data
  let dataComponent
  switch (transaction.type) {
    case TransactionType.DEPOSIT:
      data = transaction.data as Deposit
      dataComponent = (
        <Data label={'tx'}>
          <ExplorerLink network={Network.ETHEREUM} txHash={data.hash} />
        </Data>
      )
      break
    case TransactionType.WITHDRAWAL:
      data = transaction.data as Withdrawal
      dataComponent = <WithdrawalDataComponent data={transaction.data} />
      break
    case TransactionType.PURCHASE:
      data = transaction.data as Purchase
      break
    case TransactionType.TRANSFER:
      data = transaction.data as Transfer
      dataComponent = (
        <>
          <Data label={'to'}>{data.to}</Data>
          <Data label={'tx'}>
            <ExplorerLink chainId={data.chainId} txHash={data.hash} />
          </Data>
        </>
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
        <Data label={'operation'}>{description}</Data>
        <Data label={'datetime'}>{datetime}</Data>
        <Data label={'amount'}>{amount.toLocaleString()}</Data>
        {dataComponent}
        <Data label={'status'}>
          {data ? getStatusMessage(type, status, data.status) : ''}
        </Data>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
