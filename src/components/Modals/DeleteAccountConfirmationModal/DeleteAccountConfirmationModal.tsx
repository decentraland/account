import React, { useCallback, useRef, useState } from 'react'
import { localStorageClearIdentity } from '@dcl/single-sign-on-client'
import CloseIcon from '@mui/icons-material/Close'
import Modal from 'decentraland-dapps/dist/containers/Modal'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { getProfiles, unlinkProfile } from 'thirdweb/wallets/in-app'
import { connection } from 'decentraland-connect'
import { config } from '../../../config'
import { thirdwebClient } from '../../../lib/thirdweb'
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

/**
 * Deletes the user's thirdweb in-app wallet account by unlinking all profiles.
 * The last profile is unlinked with allowAccountDeletion set to true,
 * which triggers thirdweb's backend account deletion.
 *
 * @throws If no profiles are linked or if any unlinkProfile call fails.
 */
async function deleteThirdwebAccount() {
  // Fetch all authentication profiles linked to the in-app wallet
  const profiles = await getProfiles({ client: thirdwebClient })

  if (profiles.length === 0) {
    throw new Error('No profiles linked to this account')
  }

  // Unlink each profile; allowAccountDeletion on the last one deletes the account
  for (let i = 0; i < profiles.length; i++) {
    const isLast = i === profiles.length - 1
    await unlinkProfile({
      client: thirdwebClient,
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

  // Clear thirdweb session data from localStorage (auth cookies, device shares, wallet user ID)
  Object.keys(localStorage)
    .filter(key => key.startsWith('thirdweb'))
    .forEach(key => localStorage.removeItem(key))

  // Clear thirdweb session data from sessionStorage
  Object.keys(sessionStorage)
    .filter(key => key.startsWith('thirdweb'))
    .forEach(key => sessionStorage.removeItem(key))

  // Clear thirdweb IndexedDB databases (device shares, wallet encryption keys)
  if (typeof indexedDB.databases === 'function') {
    indexedDB
      .databases()
      .then(databases =>
        databases
          .filter(db => db.name?.includes('thirdweb'))
          .forEach(db => {
            if (db.name) indexedDB.deleteDatabase(db.name)
          })
      )
      .catch(() => {
        // Best-effort: not all browsers support indexedDB.databases()
      })
  }

  // Disconnect via decentraland-connect (clears its storage key)
  connection.disconnect().catch(() => {
    // Best-effort: page is about to redirect anyway
  })
}

const DeleteAccountConfirmationModal: React.FC<Props> = ({ name, metadata, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [confirmationText, setConfirmationText] = useState('')
  const isDeleting = useRef(false)

  const address: string | undefined = metadata?.address
  const isConfirmed = confirmationText === CONFIRMATION_WORD

  const handleDeleteAccount = useCallback(async () => {
    if (!address || isDeleting.current) return

    isDeleting.current = true
    setIsLoading(true)
    setError(null)

    const analytics = getAnalytics()
    analytics?.track('Delete Account Request', { address })

    try {
      await deleteThirdwebAccount()
      analytics?.track('Delete Account Success', { address })
    } catch (err) {
      console.error('Account deletion failed:', err)
      analytics?.track('Delete Account Failure', { address, error: err instanceof Error ? err.message : 'Unknown error' })
      setError(t('delete_account_modal.generic_error'))
      setIsLoading(false)
      isDeleting.current = false
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
  const canDismiss = !isLoading

  return (
    <Modal
      name={name}
      className="DeleteAccountConfirmationModal"
      closeIcon={
        <CloseIconButton onClick={onClose} disabled={!canDismiss}>
          <CloseIcon />
        </CloseIconButton>
      }
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
