import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { useMediaQuery } from 'decentraland-ui2'
import { SubscriptionGroupKeys } from '../../modules/subscription/types'
import { subscriptionGroups } from '../../modules/subscription/utils'
import { Description, Title } from '../Typography'
import NotificationEmailCard from './NotificationEmailCard'
import NotificationGroupCard from './NotificationGroupCard'
import { Container, Header, Wrapper } from './Notifications.styled'
import { Props } from './Notifications.types'

export const NOTIFICATION_TITLE_TEST_ID = 'notification-title-test-id'
export const NOTIFICATION_DESCRIPTION_TEST_ID = 'notification-description-test-id'

export default function Notifications(props: Props) {
  const { onGetSubscription } = props
  const isTabletOrBelow = useMediaQuery('(max-width:991px)')
  const location = useLocation<{ hasConfirmEmail?: boolean }>()
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false)

  const handleChange = useCallback(
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedPanel(isExpanded ? panel : false)
    },
    []
  )

  useEffect(() => {
    onGetSubscription()
  }, [])

  return (
    <Container>
      {!isTabletOrBelow && (
        <Header>
          <Title variant="h3" data-testid={NOTIFICATION_TITLE_TEST_ID}>
            {t('settings.notifications.title')}
          </Title>
          <Description variant="subtitle1" data-testid={NOTIFICATION_DESCRIPTION_TEST_ID}>
            {t('settings.notifications.description')}
          </Description>
        </Header>
      )}

      <Wrapper>
        <NotificationEmailCard hasConfirmEmail={!!location.state?.hasConfirmEmail} />
        {Object.values(SubscriptionGroupKeys).map(key => (
          <NotificationGroupCard
            key={key}
            subscriptionGroupKeys={key}
            notificationTypesInGroup={subscriptionGroups[key]}
            onChangeAccordion={handleChange}
            isExpanded={expandedPanel === key.toString()}
            panelName={key.toString()}
          />
        ))}
      </Wrapper>
    </Container>
  )
}
