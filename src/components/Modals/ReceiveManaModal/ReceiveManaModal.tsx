import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { IconButton, TextField } from 'decentraland-ui2'
import Modal, { ModalProps } from '../../../lib/utils/ModalWrapper'
import { t } from '../../../lib/utils/translation'

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
      closeIcon={
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      }
    >
      <Modal.Header>
        <div className="title"> {t('receive_mana_modal.title')}</div>
      </Modal.Header>
      <Modal.Content>
        <div className="message"> {t('receive_mana_modal.message')} </div>
        <TextField
          value={`${address.slice(0, 6)}...${address.slice(-4)}`}
          placeholder="0x0000...0000"
          helperText={isCopied ? t('receive_mana_modal.copied') : ''}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <span style={{ cursor: 'pointer' }} onClick={copyToClipboard}>
                {t('receive_mana_modal.copy')}
              </span>
            )
          }}
        />
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(ReceiveManaModal)
