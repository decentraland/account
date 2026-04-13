import React, { useCallback, useState } from 'react'
import { localStorageClearIdentity } from '@dcl/single-sign-on-client'
import CloseIcon from '@mui/icons-material/Close'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { createThirdwebClient } from 'thirdweb'
import { getProfiles, unlinkProfile } from 'thirdweb/wallets/in-app'
import { getConfiguration } from 'decentraland-connect'
import { config } from '../../../config'
import {
  ButtonContainer,
  CancelButton,
  CloseIconButton,
  ConfirmationInput,
  ConfirmationLabel,
  DeleteButton,
  ErrorMessage,
  ModalDescription,
  WarningIcon,
  WarningIconContainer,
  WarningTitle
} from './DeleteAccountConfirmationModal.styled'
import { Props } from './DeleteAccountConfirmationModal.types'

import './DeleteAccountConfirmationModal.css'

const CONFIRMATION_WORD = 'DELETE'

const CloseButton: React.FC<{ onClick: () => void; disabled: boolean }> = ({ onClick, disabled }) => (
  <CloseIconButton onClick={onClick} disabled={disabled}>
    <CloseIcon />
  </CloseIconButton>
)

async function deleteAccount() {
  const thirdwebConfig = getConfiguration().thirdweb
  const client = createThirdwebClient({ clientId: thirdwebConfig.clientId })

  const profiles = await getProfiles({ client })

  for (let i = 0; i < profiles.length; i++) {
    const isLast = i === profiles.length - 1
    await unlinkProfile({
      client,
      profileToUnlink: profiles[i],
      allowAccountDeletion: isLast
    })
  }
}

const DeleteAccountConfirmationModal: React.FC<Props> = ({ name, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmationText, setConfirmationText] = useState('')

  const isConfirmed = confirmationText === CONFIRMATION_WORD

  const handleDeleteAccount = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      await deleteAccount()

      const address = Object.keys(localStorage).find(key => key.startsWith('0x'))
      if (address) {
        localStorageClearIdentity(address)
      }

      onClose()

      const authUrl = config.get('AUTH_URL')
      window.location.replace(`${authUrl}/login?redirectTo=${encodeURIComponent(window.location.pathname)}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete account. Please try again.')
      setIsLoading(false)
    }
  }, [onClose])

  return (
    <Modal name={name} className="DeleteAccountConfirmationModal" closeIcon={<CloseButton onClick={onClose} disabled={isLoading} />}>
      <Modal.Content>
        <WarningIconContainer>
          <WarningIcon />
        </WarningIconContainer>
        <WarningTitle>{t('delete_account_modal.title')}</WarningTitle>
        <ModalDescription>{t('delete_account_modal.description')}</ModalDescription>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ConfirmationLabel>{t('delete_account_modal.confirmation_label')}</ConfirmationLabel>
        <ConfirmationInput
          value={confirmationText}
          onChange={e => setConfirmationText(e.target.value)}
          placeholder={t('delete_account_modal.confirmation_placeholder')}
          disabled={isLoading}
          autoComplete="off"
        />

        <ButtonContainer>
          <DeleteButton variant="contained" onClick={handleDeleteAccount} disabled={!isConfirmed || isLoading}>
            {isLoading ? t('delete_account_modal.deleting') : t('delete_account_modal.delete')}
          </DeleteButton>
          <CancelButton variant="outlined" onClick={onClose} disabled={isLoading} color="secondary">
            {t('delete_account_modal.cancel')}
          </CancelButton>
        </ButtonContainer>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(DeleteAccountConfirmationModal)
