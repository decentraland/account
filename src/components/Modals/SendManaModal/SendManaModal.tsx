import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './SendManaModal.css'

const TransactionDetailModal: React.FC<ModalProps> = ({ name, onClose }) => {
  const isUSDButtonAble = false
  const isManaButtonAble = !isUSDButtonAble
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
          <Button inverted disabled={isUSDButtonAble}>
            USD
          </Button>
          <Button inverted disabled={isManaButtonAble}>
            MANA
          </Button>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.operation')} </div>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.amount')} </div>
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.type')} </div>
          <div />
        </div>
        <div className="data">
          <div> {t('transaction_detail_modal.status')} </div>
          <div />
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(TransactionDetailModal)
