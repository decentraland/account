import userEvent from '@testing-library/user-event'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../specs/utils'
import DeleteAccount from './DeleteAccount'
import { Props } from './DeleteAccount.types'

jest.mock('decentraland-ui2', () => ({
  ...jest.requireActual('decentraland-ui2'),
  useTabletAndBelowMediaQuery: jest.fn().mockReturnValue(false)
}))

const renderDeleteAccount = (props: Partial<Props> = {}) =>
  renderWithProviders(
    <DeleteAccount address="0x1234567890abcdef" onOpenDeleteAccountModal={jest.fn()} onGoToWallets={jest.fn()} {...props} />
  )

describe('DeleteAccount', () => {
  let onOpenDeleteAccountModal: jest.Mock
  let onGoToWallets: jest.Mock

  beforeEach(() => {
    onOpenDeleteAccountModal = jest.fn()
    onGoToWallets = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when rendered', () => {
    it('should show the danger zone banner', () => {
      const { getByText } = renderDeleteAccount({ onOpenDeleteAccountModal, onGoToWallets })

      expect(getByText(t('delete_account.danger_zone'))).toBeInTheDocument()
    })

    it('should show all 6 consequence items', () => {
      const { getByText } = renderDeleteAccount({ onOpenDeleteAccountModal, onGoToWallets })

      expect(getByText(t('delete_account.consequences.profile.title'))).toBeInTheDocument()
      expect(getByText(t('delete_account.consequences.social.title'))).toBeInTheDocument()
      expect(getByText(t('delete_account.consequences.marketplace.title'))).toBeInTheDocument()
      expect(getByText(t('delete_account.consequences.credits.title'))).toBeInTheDocument()
      expect(getByText(t('delete_account.consequences.favorites.title'))).toBeInTheDocument()
      expect(getByText(t('delete_account.consequences.notifications.title'))).toBeInTheDocument()
    })

    it('should show the asset warning box', () => {
      const { getByText } = renderDeleteAccount({ onOpenDeleteAccountModal, onGoToWallets })

      expect(getByText(t('delete_account.asset_warning_title'))).toBeInTheDocument()
    })
  })

  describe('when the delete button is clicked', () => {
    it('should call onOpenDeleteAccountModal with the address', async () => {
      const address = '0xTestAddress'
      const { getByRole } = renderDeleteAccount({ address, onOpenDeleteAccountModal, onGoToWallets })

      await userEvent.click(getByRole('button', { name: t('delete_account.delete_button') }))

      expect(onOpenDeleteAccountModal).toHaveBeenCalledWith(address)
    })
  })

  describe('when the "Go to Wallets" link is clicked', () => {
    it('should call onGoToWallets', async () => {
      const { getByText } = renderDeleteAccount({ onOpenDeleteAccountModal, onGoToWallets })

      await userEvent.click(getByText(t('delete_account.export_key_link')))

      expect(onGoToWallets).toHaveBeenCalled()
    })
  })

  describe('when address is undefined', () => {
    it('should not call onOpenDeleteAccountModal when clicking delete', async () => {
      const { getByRole } = renderDeleteAccount({
        address: undefined,
        onOpenDeleteAccountModal,
        onGoToWallets
      })

      await userEvent.click(getByRole('button', { name: t('delete_account.delete_button') }))

      expect(onOpenDeleteAccountModal).not.toHaveBeenCalled()
    })
  })
})
