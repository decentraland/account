import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { IconButton } from 'decentraland-ui2'
import {
  ButtonContainer,
  CancelButton,
  ConfirmButton,
  ErrorMessage,
  ModalDescription,
  WarningIconContainer,
  WarningTitle
} from './OptOutConfirmationModal.styled'
import { Props } from './OptOutConfirmationModal.types'

import './OptOutConfirmationModal.css'

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: 10,
      right: 10,
      padding: '10px',
      backgroundColor: '#ffffff17',
      color: '#FCFCFC',
      '&:hover': {
        backgroundColor: '#ffffff30'
      }
    }}
  >
    <CloseIcon />
  </IconButton>
)

const getErrorMessage = (error: string | null): string | null => {
  if (!error) return null

  // Check for specific error patterns from the API
  if (error.toLowerCase().includes('already claimed') || error.toLowerCase().includes('claimed credits')) {
    return t('leave_confirmation_modal.errors.already_claimed')
  }

  // Default to generic error message
  return t('leave_confirmation_modal.errors.generic')
}

const OptOutConfirmationModal: React.FC<Props> = ({ name, isLoading, error, onClose, onClearError, onOptOut }) => {
  useEffect(() => {
    onClearError()
  }, [onClearError])

  const handleOptOut = () => {
    onOptOut()
  }

  const translatedError = getErrorMessage(error)

  return (
    <Modal name={name} className="OptOutConfirmationModal" closeIcon={<CloseButton onClick={onClose} />}>
      <Modal.Content>
        <WarningIconContainer>
          <WarningAmberRoundedIcon sx={{ fontSize: 48, color: '#FF2D55' }} />
        </WarningIconContainer>
        <WarningTitle>{t('leave_confirmation_modal.warning')}</WarningTitle>
        <ModalDescription>{t('leave_confirmation_modal.description')}</ModalDescription>

        {translatedError && <ErrorMessage>{translatedError}</ErrorMessage>}

        <ButtonContainer>
          <CancelButton variant="outlined" onClick={onClose} disabled={isLoading} color="secondary">
            {t('leave_confirmation_modal.cancel')}
          </CancelButton>
          <ConfirmButton variant="contained" onClick={handleOptOut} disabled={isLoading}>
            {isLoading ? 'Loading...' : t('leave_confirmation_modal.confirm')}
          </ConfirmButton>
        </ButtonContainer>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(OptOutConfirmationModal)
