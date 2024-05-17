import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
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
  const { isLoading, onGetSubscription } = props

  const { hasConfirmEmail } = useParams<{ hasConfirmEmail?: string }>()

  useEffect(() => {
    onGetSubscription()
  }, [])

  return (
    <Container>
      <Header>
        <Title variant="h3" data-testid={NOTIFICATION_TITLE_TEST_ID}>
          {t('settings.notifications.title')}
        </Title>
        <Description variant="subtitle1" data-testid={NOTIFICATION_DESCRIPTION_TEST_ID}>
          {t('settings.notifications.description')}
        </Description>
      </Header>

      <Wrapper>
        <NotificationEmailCard hasConfirmEmail={!!hasConfirmEmail} isLoading={isLoading} />
        {Object.values(SubscriptionGroupKeys).map(key => (
          <NotificationGroupCard
            key={key}
            isLoading={isLoading}
            subscriptionGroupKeys={key}
            notificationTypesInGroup={subscriptionGroups[key]}
          />
        ))}
      </Wrapper>
    </Container>
  )
}
