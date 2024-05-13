import { render } from '@testing-library/react'
import { SubscriptionGroupKeys } from '../../../modules/subscription/types'
import { subscriptionGroups } from '../../../modules/subscription/utils'
import NotificationGroupCard, {
  NOTIFICATION_CARD_DESCRIPTION_TEST_ID,
  NOTIFICATION_CARD_LOADING_TEST_ID,
  NOTIFICATION_CARD_SWITCH_TEST_ID,
  NOTIFICATION_CARD_TITLE_TEST_ID
} from './NotificationGroupCard'

const renderNotificationGroupCard = (props: any) => render(<NotificationGroupCard {...props} />)

const defaultProps = {
  isLoading: false,
  subscriptionGroupKeys: SubscriptionGroupKeys.DAO,
  notificationTypesInGroup: subscriptionGroups[SubscriptionGroupKeys.DAO]
}

describe('when the component is loading', () => {
  it('should render the component with the Skeleton component in it', () => {
    const { getByTestId } = renderNotificationGroupCard({ ...defaultProps, isLoading: true })
    expect(getByTestId(NOTIFICATION_CARD_LOADING_TEST_ID)).toBeInTheDocument()
  })
})

describe('when the component finish loading and is connected', () => {
  it('should render the component with the AccordingTitleStyled component in it', () => {
    const { getByTestId } = renderNotificationGroupCard(defaultProps)
    expect(getByTestId(NOTIFICATION_CARD_TITLE_TEST_ID)).toBeInTheDocument()
  })

  it('should render the component with the AccordingDescriptionStyled component in it', () => {
    const { getByTestId } = renderNotificationGroupCard(defaultProps)
    expect(getByTestId(NOTIFICATION_CARD_DESCRIPTION_TEST_ID)).toBeInTheDocument()
  })
})

describe('when the component is not loading', () => {
  it('should render the component with the AccordingTitle component in it', () => {
    const { getByTestId } = renderNotificationGroupCard({ ...defaultProps, disabled: true })
    expect(getByTestId(NOTIFICATION_CARD_SWITCH_TEST_ID)).not.toBeInTheDocument()
  })
})
