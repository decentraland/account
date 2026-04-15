import { waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../../specs/utils'
import DeleteAccountConfirmationModal from './DeleteAccountConfirmationModal'
import { Props } from './DeleteAccountConfirmationModal.types'

const mockGetProfiles = jest.fn()
const mockUnlinkProfile = jest.fn()
const mockCreateThirdwebClient = jest.fn()
const mockGetConfiguration = jest.fn()
const mockConnectionDisconnect = jest.fn()
const mockLocalStorageClearIdentity = jest.fn()

jest.mock('thirdweb/wallets/in-app', () => ({
  getProfiles: (...args: unknown[]) => mockGetProfiles(...args),
  unlinkProfile: (...args: unknown[]) => mockUnlinkProfile(...args)
}))

jest.mock('thirdweb', () => ({
  createThirdwebClient: (...args: unknown[]) => mockCreateThirdwebClient(...args)
}))

jest.mock('decentraland-connect', () => ({
  ...jest.requireActual('decentraland-connect'),
  getConfiguration: () => mockGetConfiguration(),
  connection: {
    disconnect: () => mockConnectionDisconnect()
  }
}))

jest.mock('@dcl/single-sign-on-client', () => ({
  localStorageClearIdentity: (...args: unknown[]) => mockLocalStorageClearIdentity(...args)
}))

const renderModal = (props: Partial<Props> = {}) =>
  renderWithProviders(
    <DeleteAccountConfirmationModal
      name="DeleteAccountConfirmationModal"
      metadata={{ address: '0x1234567890abcdef' }}
      onClose={jest.fn()}
      {...props}
    />
  )

describe('DeleteAccountConfirmationModal', () => {
  let onClose: jest.Mock
  const originalLocation = window.location

  beforeEach(() => {
    onClose = jest.fn()
    mockGetProfiles.mockResolvedValue([{ type: 'google', details: { email: 'test@test.com' } }])
    mockUnlinkProfile.mockResolvedValue(undefined)
    mockCreateThirdwebClient.mockReturnValue({ clientId: 'test-client' })
    mockGetConfiguration.mockReturnValue({ thirdweb: { clientId: 'test-client' } })
    mockConnectionDisconnect.mockResolvedValue(undefined)
    mockLocalStorageClearIdentity.mockReturnValue(undefined)

    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, replace: jest.fn(), pathname: '/account' },
      writable: true,
      configurable: true
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true
    })
  })

  describe('when the modal renders', () => {
    it('should show the title, description, input, and buttons', () => {
      const { getByText, getByRole } = renderModal({ onClose })

      expect(getByText(t('delete_account_modal.title'))).toBeInTheDocument()
      expect(getByText(t('delete_account_modal.description'))).toBeInTheDocument()
      expect(getByRole('textbox')).toBeInTheDocument()
      expect(getByText(t('delete_account_modal.cancel'))).toBeInTheDocument()
      expect(getByText(t('delete_account_modal.delete'))).toBeInTheDocument()
    })
  })

  describe('when confirmation text is empty', () => {
    it('should have the delete button disabled', () => {
      const { getByText } = renderModal({ onClose })

      const deleteButton = getByText(t('delete_account_modal.delete')).closest('button')
      expect(deleteButton).toBeDisabled()
    })
  })

  describe('when confirmation text is "DELETE"', () => {
    it('should have the delete button enabled', async () => {
      const { getByText, getByRole } = renderModal({ onClose })

      await userEvent.type(getByRole('textbox'), 'DELETE')

      const deleteButton = getByText(t('delete_account_modal.delete')).closest('button')
      expect(deleteButton).toBeEnabled()
    })
  })

  describe('when confirmation text is "delete" (lowercase)', () => {
    it('should have the delete button disabled', async () => {
      const { getByText, getByRole } = renderModal({ onClose })

      await userEvent.type(getByRole('textbox'), 'delete')

      const deleteButton = getByText(t('delete_account_modal.delete')).closest('button')
      expect(deleteButton).toBeDisabled()
    })
  })

  describe('when the cancel button is clicked', () => {
    it('should call onClose', async () => {
      const { getByText } = renderModal({ onClose })

      await userEvent.click(getByText(t('delete_account_modal.cancel')))

      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('when deletion succeeds', () => {
    beforeEach(() => {
      mockGetProfiles.mockResolvedValue([{ type: 'google', details: { email: 'test@test.com' } }])
      mockUnlinkProfile.mockResolvedValue(undefined)
    })

    it('should clear SSO identity, thirdweb storage, and call connection.disconnect()', async () => {
      const { getByText, getByRole } = renderModal({ onClose, metadata: { address: '0xABC' } })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      await waitFor(() => {
        expect(mockLocalStorageClearIdentity).toHaveBeenCalledWith('0xABC')
      })
      expect(mockConnectionDisconnect).toHaveBeenCalled()
    })

    it('should redirect to the login page', async () => {
      const { getByText, getByRole } = renderModal({ onClose, metadata: { address: '0xABC' } })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      await waitFor(() => {
        expect(window.location.replace).toHaveBeenCalledWith(expect.stringContaining('/login'))
      })
    })
  })

  describe('when deletion fails', () => {
    beforeEach(() => {
      mockGetProfiles.mockRejectedValue(new Error('Network error'))
    })

    it('should show the localized error message', async () => {
      const { getByText, getByRole } = renderModal({ onClose })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      await waitFor(() => {
        expect(getByText(t('delete_account_modal.generic_error'))).toBeInTheDocument()
      })
    })

    it('should re-enable the modal (isLoading false)', async () => {
      const { getByText, getByRole } = renderModal({ onClose })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      await waitFor(() => {
        const cancelButton = getByText(t('delete_account_modal.cancel')).closest('button')
        expect(cancelButton).toBeEnabled()
      })
    })
  })

  describe('when deletion is in progress', () => {
    beforeEach(() => {
      mockGetProfiles.mockReturnValue(new Promise(() => {}))
    })

    it('should disable the cancel button', async () => {
      const { getByText, getByRole } = renderModal({ onClose })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      await waitFor(() => {
        const cancelButton = getByText(t('delete_account_modal.cancel')).closest('button')
        expect(cancelButton).toBeDisabled()
      })
    })
  })

  describe('when no address is provided in metadata', () => {
    it('should not proceed when clicking delete', async () => {
      const { getByText, getByRole } = renderModal({ onClose, metadata: {} })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      expect(mockGetProfiles).not.toHaveBeenCalled()
    })
  })

  describe('when getProfiles returns empty array', () => {
    beforeEach(() => {
      mockGetProfiles.mockResolvedValue([])
    })

    it('should show an error', async () => {
      const { getByText, getByRole } = renderModal({ onClose })

      await userEvent.type(getByRole('textbox'), 'DELETE')
      await userEvent.click(getByText(t('delete_account_modal.delete')))

      await waitFor(() => {
        expect(getByText(t('delete_account_modal.generic_error'))).toBeInTheDocument()
      })
    })
  })
})
