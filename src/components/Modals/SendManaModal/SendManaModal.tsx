import * as React from 'react'
import { Button, Close, Field } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './SendManaModal.css'

const TransactionDetailModal: React.FC<ModalProps> = ({ name, onClose }) => {
  const isUsdButtonDisabled = true
  const isManaButtonDisabled = !isUsdButtonDisabled
  return (
    <Modal
      name={name}
      className="SendManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> Send Tokens </div>
        <div className="subtitle"> Send Tokens to the desired Wallet </div>
      </Modal.Header>
      <Modal.Content>
        <div className="button-group">
          <Button inverted disabled={isManaButtonDisabled}>
            MANA
          </Button>
          <Button inverted disabled={isUsdButtonDisabled}>
            USD
          </Button>
        </div>
        <Field label="Amount" placeholder="0" />
        <Field label="Wallet" placeholder="0x0000...0000" />
        <Button primary> Send Tokens </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
