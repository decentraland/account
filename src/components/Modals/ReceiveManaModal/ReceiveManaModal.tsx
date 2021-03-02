import React, { useState } from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Close, Field } from 'decentraland-ui'
import { ModalProps } from 'decentraland-dapps/dist/providers/ModalProvider/ModalProvider.types'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import './ReceiveManaModal.css'

const ReceiveManaModal = ({ name, onClose, metadata }: ModalProps) => {
  const [isCopied, setIsCopied] = useState(false)
  const { address } = metadata
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address)
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 5000)
  }

  return (
    <Modal
      name={name}
      className="ReceiveManaModal"
      closeIcon={<Close onClick={onClose} />}
    >
      <Modal.Header>
        <div className="title"> {t('receive_mana_modal.title')}</div>
      </Modal.Header>
      <Modal.Content>
        <div className="message"> {t('receive_mana_modal.message')} </div>
        <Field
          value={`${address.slice(0, 6)}...${address.slice(-4)}`}
          placeholder="0x0000...0000"
          action={t('receive_mana_modal.copy')}
          onAction={copyToClipboard}
          message={isCopied ? t('receive_mana_modal.copied') : ''}
        />
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(ReceiveManaModal)
