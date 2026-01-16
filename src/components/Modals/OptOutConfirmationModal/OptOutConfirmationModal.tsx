import React, { useEffect } from 'react'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button, Close } from 'decentraland-ui'
import { Props } from './OptOutConfirmationModal.types'

import './OptOutConfirmationModal.css'

const OptOutConfirmationModal: React.FC<Props> = ({ name, isLoading, error, onClose, onClearError, onOptOut }) => {
  useEffect(() => {
    onClearError()
  }, [onClearError])

  const handleOptOut = () => {
    onOptOut()
  }

  return (
    <Modal name={name} className="OptOutConfirmationModal" closeIcon={<Close onClick={onClose} />}>
      <Modal.Header>
        <div className="title">{t('opt_out_confirmation_modal.title')}</div>
      </Modal.Header>
      <Modal.Content>
        <div className="warning-icon">
          <WarningAmberRoundedIcon />
        </div>
        <div className="warning-title">{t('opt_out_confirmation_modal.warning')}</div>
        <p className="description">{t('opt_out_confirmation_modal.description')}</p>

        {error && <div className="error-message">{error}</div>}

        <div className="button-container">
          <Button className="cancel-button" onClick={onClose} disabled={isLoading}>
            {t('opt_out_confirmation_modal.cancel')}
          </Button>
          <Button className="confirm-button" primary onClick={handleOptOut} loading={isLoading} disabled={isLoading}>
            {t('opt_out_confirmation_modal.confirm')}
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(OptOutConfirmationModal)
