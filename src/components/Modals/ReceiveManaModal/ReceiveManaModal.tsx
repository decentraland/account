import * as React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close, Field } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './ReceiveManaModal.css'

const SeeAllTransactionModal = ({ name, onClose }: ModalProps) => {
  return (
    <Modal
      name={name}
      className="ReceiveManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> {t('receive_mana_modal.title')}</div>
        <div className="message"> {t('receive_mana_modal.message')} </div>
      </Modal.Header>
      <Modal.Content>
        <Field name="address" placeholder="0x0000...0000" />
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(SeeAllTransactionModal)
