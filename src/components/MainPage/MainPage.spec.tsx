import { ProviderType } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../specs/utils'
import MainPage from './MainPage'
import { Props } from './MainPage.types'

jest.mock('../DeleteAccount', () => ({
  DeleteAccount: () => <div data-testid="delete-account" />
}))

jest.mock('../Wallets', () => ({
  Wallets: () => <div data-testid="wallets" />
}))

jest.mock('../Notifications', () => ({
  Notifications: () => <div data-testid="notifications" />
}))

jest.mock('../CreditsSettings', () => ({
  CreditsSettings: () => <div data-testid="credits-settings" />
}))

jest.mock('../Navbar', () => ({
  Navbar: () => <div data-testid="navbar" />
}))

jest.mock('../Footer', () => ({
  Footer: () => <div data-testid="footer" />
}))

const renderMainPage = (props: Partial<Props> = {}) =>
  renderWithProviders(
    <MainPage isLoading={false} notificationSettingError={null} onClearChangeNotificationSettingError={jest.fn()} {...props} />
  )

describe('MainPage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when providerType is THIRDWEB', () => {
    it('should render the Delete Account tab', () => {
      const { getByText } = renderMainPage({ providerType: ProviderType.THIRDWEB })

      expect(getByText(t('main_page.delete_account'))).toBeInTheDocument()
    })
  })

  describe('when providerType is not THIRDWEB', () => {
    it('should not render the Delete Account tab', () => {
      const { queryByText } = renderMainPage({ providerType: ProviderType.INJECTED })

      expect(queryByText(t('main_page.delete_account'))).not.toBeInTheDocument()
    })
  })

  describe('when providerType is undefined', () => {
    it('should not render the Delete Account tab', () => {
      const { queryByText } = renderMainPage({ providerType: undefined })

      expect(queryByText(t('main_page.delete_account'))).not.toBeInTheDocument()
    })
  })
})
