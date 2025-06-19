import { renderWithProviders } from '../../specs/utils'
import { NOTIFICATION_EMAIL_CARD_TITLE_TEST_ID } from './NotificationEmailCard/NotificationEmailCard'
import { NOTIFICATION_CARD_TITLE_TEST_ID } from './NotificationGroupCard/NotificationGroupCard'
import Notifications, { NOTIFICATION_DESCRIPTION_TEST_ID, NOTIFICATION_TITLE_TEST_ID } from './Notifications'
import { Props } from './Notifications.types'

const renderNotifications = (props: Partial<Props>) =>
  renderWithProviders(
    <Notifications
      isLoading={false}
      onGetSubscription={() => undefined as any}
      {...props}
      isStreamingEnabled={true}
      isReferralEnabled={true}
    />
  )

describe('when the component has finished loading and is connected', () => {
  it('should render the Title component in it', () => {
    const { getByTestId } = renderNotifications({})
    expect(getByTestId(NOTIFICATION_TITLE_TEST_ID)).toBeInTheDocument()
  })

  it('should render the Description component in it', () => {
    const { getByTestId } = renderNotifications({})
    expect(getByTestId(NOTIFICATION_DESCRIPTION_TEST_ID)).toBeInTheDocument()
  })

  it('should render the NotificationEmailCard component in it', () => {
    const { getByTestId } = renderNotifications({})
    expect(getByTestId(NOTIFICATION_EMAIL_CARD_TITLE_TEST_ID)).toBeInTheDocument()
  })

  it('should render the NotificationGroupCard component in it', () => {
    const { queryAllByTestId } = renderNotifications({})
    expect(queryAllByTestId(NOTIFICATION_CARD_TITLE_TEST_ID).length).toBeGreaterThan(0)
  })
})
