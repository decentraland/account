import React, { useCallback, useState } from 'react'
import { localStorageClearIdentity } from '@dcl/single-sign-on-client'
import CloseIcon from '@mui/icons-material/Close'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { createThirdwebClient } from 'thirdweb'
import { getProfiles, unlinkProfile } from 'thirdweb/wallets/in-app'
import { connection, getConfiguration } from 'decentraland-connect'
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

// The confirmation word must remain as the literal "DELETE" across all locales.
// Do not translate this value — the locale files reference it verbatim.
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
 *
 * @throws If no profiles are linked or if any unlinkProfile call fails.
 */
async function deleteThirdwebAccount() {
  const thirdwebConfig = getConfiguration().thirdweb
  const client = createThirdwebClient({ clientId: thirdwebConfig.clientId })

  // Fetch all authentication profiles linked to the in-app wallet
  const profiles = await getProfiles({ client })

  if (profiles.length === 0) {
    throw new Error('No profiles linked to this account')
  }

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

/**
 * Clears all local session data: SSO identity, thirdweb storage,
 * and decentraland-connect connection state.
 * This runs regardless of whether the redirect succeeds, to ensure
 * no stale session persists after account deletion.
 */
function clearLocalSession(address: string) {
  // Clear Decentraland SSO identity for the connected address
  localStorageClearIdentity(address)

  // Clear thirdweb session data (auth cookies, device shares, wallet user ID)
  Object.keys(localStorage)
    .filter(key => key.startsWith('thirdweb'))
    .forEach(key => localStorage.removeItem(key))

  // Disconnect via decentraland-connect (clears its storage key)
  connection.disconnect().catch(() => {
    // Best-effort: page is about to redirect anyway
  })
}

const DeleteAccountConfirmationModal: React.FC<Props> = ({ name, metadata, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmationText, setConfirmationText] = useState('')
  // Once the thirdweb account is deleted server-side, we're past the point of no return
  const [isPastPointOfNoReturn, setIsPastPointOfNoReturn] = useState(false)

  const address: string | undefined = metadata?.address
  const isConfirmed = confirmationText === CONFIRMATION_WORD

  const handleDeleteAccount = useCallback(async () => {
    if (!address) return

    setIsLoading(true)
    setError(null)
    try {
      await deleteThirdwebAccount()
      setIsPastPointOfNoReturn(true)
    } catch (err) {
      console.error('Account deletion failed:', err)
      setError(t('delete_account_modal.generic_error'))
      setIsLoading(false)
      return
    }

    // Past point of no return: always clear local session and redirect,
    // even if individual cleanup steps fail
    try {
      clearLocalSession(address)
    } catch (err) {
      console.error('Local session cleanup failed:', err)
    }

    // Redirect to login page; full page reload destroys all in-memory state
    const authUrl = config.get('AUTH_URL')
    window.location.replace(`${authUrl}/login?redirectTo=${encodeURIComponent(window.location.pathname)}`)
  }, [address])

  // Prevent dismissal via ESC or backdrop click while deletion is in flight
  const canDismiss = !isLoading && !isPastPointOfNoReturn

  return (
    <Modal
      name={name}
      className="DeleteAccountConfirmationModal"
      closeIcon={<CloseButton onClick={onClose} disabled={!canDismiss} />}
      closeOnDimmerClick={canDismiss}
      closeOnDocumentClick={false}
    >
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
          <CancelButton variant="contained" onClick={onClose} disabled={!canDismiss} color="secondary">
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

export default DeleteAccountConfirmationModal
