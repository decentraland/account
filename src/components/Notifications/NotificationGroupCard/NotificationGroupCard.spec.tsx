import { NotificationType } from '@dcl/schemas'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { toCamel } from 'ts-case-convert'
import { buildInitialState } from '../../../modules/subscription/reducer'
import { SubscriptionGroupKeys } from '../../../modules/subscription/types'
import { subscriptionGroups } from '../../../modules/subscription/utils'
import { renderWithProviders } from '../../../specs/utils'
import NotificationGroupCard, {
  NOTIFICATION_CARD_DESCRIPTION_TEST_ID,
  NOTIFICATION_CARD_ERROR_TEST_ID,
  NOTIFICATION_CARD_LOADING_TEST_ID,
  NOTIFICATION_CARD_SWITCH_TEST_ID,
  NOTIFICATION_CARD_TITLE_TEST_ID
} from './NotificationGroupCard'
import { Props } from './NotificationGroupCard.types'

const renderNotificationGroupCard = (props: Partial<Props>) =>
  renderWithProviders(
    <NotificationGroupCard
      isLoading={false}
      subscriptionGroupKeys={SubscriptionGroupKeys.DAO}
      notificationTypesInGroup={subscriptionGroups[SubscriptionGroupKeys.DAO]}
      subscriptionDetails={buildInitialState().subscriptionDetails}
      onChangeNotificationSetting={() => undefined as any}
      onClearChangeNotificationSettingError={() => undefined as any}
      error={null}
      hasEmail={true}
      {...props}
    />
  )

describe('when the component is loading', () => {
  it('should not render the AccordionDetails component in it', () => {
    const { queryByTestId } = renderNotificationGroupCard({ isLoading: true })
    expect(queryByTestId(NOTIFICATION_CARD_LOADING_TEST_ID)).toBe(null)
  })
})

describe('when the component has finished loading and is connected', () => {
  it('should render the Title component in it', () => {
    const { getByTestId } = renderNotificationGroupCard({})
    expect(getByTestId(NOTIFICATION_CARD_TITLE_TEST_ID)).toBeInTheDocument()
  })

  it('should render the Description component in it', () => {
    const { getByTestId } = renderNotificationGroupCard({})
    expect(getByTestId(NOTIFICATION_CARD_DESCRIPTION_TEST_ID)).toBeInTheDocument()
  })

  it('should render the component with a Switch component for each notification type in it', () => {
    const { getAllByTestId } = renderNotificationGroupCard({})
    expect(getAllByTestId(NOTIFICATION_CARD_SWITCH_TEST_ID, {}).length).toBe(subscriptionGroups[SubscriptionGroupKeys.DAO].length)
  })

  it('should render the Switch component in it', () => {
    const { getByText } = renderNotificationGroupCard({})
    expect(getByText(t(`settings.notifications.types.${NotificationType.GOVERNANCE_ANNOUNCEMENT}`))).toBeInTheDocument()
  })

  describe('and one of the emails has been disabled', () => {
    it('should not render the component with the Switch component unchecked in it', () => {
      const subscriptionDetails = buildInitialState().subscriptionDetails
      subscriptionDetails.messageType
      const { queryByTestId } = renderNotificationGroupCard({
        subscriptionDetails: {
          ...subscriptionDetails,
          messageType: {
            ...subscriptionDetails.messageType,
            [toCamel(NotificationType.GOVERNANCE_ANNOUNCEMENT)]: {
              inApp: true,
              email: false
            }
          }
        },
        notificationTypesInGroup: [NotificationType.GOVERNANCE_ANNOUNCEMENT]
      })
      expect(queryByTestId(NOTIFICATION_CARD_SWITCH_TEST_ID)).not.toBeChecked()
    })
  })

  describe('and has no email', () => {
    it('should not render the Switch component in it', () => {
      const { queryByTestId } = renderNotificationGroupCard({ hasEmail: false })
      expect(queryByTestId(NOTIFICATION_CARD_SWITCH_TEST_ID)).toBeNull()
    })
  })
})

describe('when there is an error', () => {
  it('should render the Snackbar component in it', () => {
    const { getByTestId } = renderNotificationGroupCard({ error: 'some error' })
    expect(getByTestId(NOTIFICATION_CARD_ERROR_TEST_ID)).toBeInTheDocument()
  })
})
