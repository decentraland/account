import * as React from 'react'
import { Close, ModalProps } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './TransactionDetailModal.css'

type TransactionProps = {
  operation: string
  amount: number
  initialilzed: string
  status: string
}

type Props = ModalProps | TransactionProps

const TransactionDetailModal = ({ name, onClose }: Props) => {
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
          <div> Withdraw to Matic Network </div>
        </div>
        <div className="data">
          <div> Amount </div>
          <div> 15,000 USD </div>
        </div>
        <div className="data">
          <div> Initialized </div>
          <div> Dec 13 - 14pm </div>
        </div>
        <div className="data">
          <div> Status </div>
          <div> Completed </div>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
