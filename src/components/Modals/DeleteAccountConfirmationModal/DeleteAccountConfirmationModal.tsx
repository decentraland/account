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
  DeleteButton,
  ErrorMessage,
  ModalDescription,
  WarningIcon,
  WarningIconCircle,
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

/**
 * Deletes the user's thirdweb in-app wallet account by unlinking all profiles.
 * The last profile is unlinked with allowAccountDeletion set to true,
 * which triggers thirdweb's backend account deletion.
 */
async function deleteAccount() {
  const thirdwebConfig = getConfiguration().thirdweb
  const client = createThirdwebClient({ clientId: thirdwebConfig.clientId })

  // Fetch all authentication profiles linked to the in-app wallet
  const profiles = await getProfiles({ client })

  // Unlink each profile; allowAccountDeletion on the last one deletes the account
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

      // Clear Decentraland SSO identity
      const address = Object.keys(localStorage).find(key => key.startsWith('0x'))
      if (address) {
        localStorageClearIdentity(address)
      }

      // Clear thirdweb session data (auth cookies, device shares, wallet user ID)
      Object.keys(localStorage)
        .filter(key => key.startsWith('thirdweb'))
        .forEach(key => localStorage.removeItem(key))

      // Clear decentraland-connect connection
      localStorage.removeItem('decentraland-connect-storage-key')

      onClose()

      // Redirect to login page; full page reload destroys all in-memory state
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
          <WarningIconCircle>
            <WarningIcon />
          </WarningIconCircle>
        </WarningIconContainer>
        <WarningTitle>{t('delete_account_modal.title')}</WarningTitle>
        <ModalDescription>{t('delete_account_modal.description')}</ModalDescription>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ConfirmationInput
          label={t('delete_account_modal.input_label')}
          value={confirmationText}
          onChange={e => setConfirmationText(e.target.value)}
          placeholder={t('delete_account_modal.confirmation_placeholder')}
          disabled={isLoading}
          autoComplete="off"
          variant="outlined"
        />

        <ButtonContainer>
          <CancelButton variant="contained" onClick={onClose} disabled={isLoading} color="secondary">
            {t('delete_account_modal.cancel')}
          </CancelButton>
          <DeleteButton variant="contained" onClick={handleDeleteAccount} disabled={!isConfirmed || isLoading}>
            {isLoading ? t('delete_account_modal.deleting') : t('delete_account_modal.delete')}
          </DeleteButton>
        </ButtonContainer>
      </Modal.Content>
    </Modal>
  )
}

export default React.memo(DeleteAccountConfirmationModal)
