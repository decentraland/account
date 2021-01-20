import * as React from 'react'
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
      <Modal.Header>Transaction Detail</Modal.Header>
      <Modal.Content>
        <div className="data">
          <div> Operation </div>
          <div> {description} </div>
        </div>
        <div className="data">
          <div> Amount </div>
          <div> {amount} </div>
        </div>
        <div className="data">
          <div> Type </div>
          <div>
            {type === TransactionType.DEPOSIT ? 'DEPOSIT' : 'WITHDRAWAL'}
          </div>
        </div>
        <div className="data">
          <div> Status </div>
          <div>
            {status === TransactionStatus.CONFIRMED ? 'CONFIRMED' : 'PENDING'}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
