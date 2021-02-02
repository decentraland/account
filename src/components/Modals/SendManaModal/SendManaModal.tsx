import React, { useEffect } from 'react'
import { Button, Close, Field } from 'decentraland-ui'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './SendManaModal.css'
import { Props } from './SendManaModal.types'

const TransactionDetailModal: React.FC<Props> = ({
  name,
  onClose,
  manaPrice,
  onManaPrice
}) => {
  const isUsdButtonDisabled = true
  const isManaButtonDisabled = !isUsdButtonDisabled

  useEffect(() => {
    onManaPrice()
  })
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
        <div className="button-group">{manaPrice}</div>
        <Field label="Amount" placeholder="0" />
        <Field label="Wallet" placeholder="0x0000...0000" />
        <Button primary> Send Tokens </Button>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
