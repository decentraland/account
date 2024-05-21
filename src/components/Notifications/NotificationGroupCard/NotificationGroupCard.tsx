import { useCallback } from 'react'
import { NotificationType } from '@dcl/schemas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { objectToSnake, toCamel } from 'ts-case-convert'
import { Switch } from 'decentraland-ui2'
import { Description, Title } from '../../Typography'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryContainer,
  NotificationItemContainer,
  NotificationItemText,
  NotificationItemTextIconContainer
} from './NotificationGroupCard.styled'
import { Props } from './NotificationGroupCard.types'

export const NOTIFICATION_CARD_LOADING_TEST_ID = 'notification-card-loading-test-id'
export const NOTIFICATION_CARD_TITLE_TEST_ID = 'notification-card-title-test-id'
export const NOTIFICATION_CARD_DESCRIPTION_TEST_ID = 'notification-card-description-test-id'
export const NOTIFICATION_CARD_SWITCH_TEST_ID = 'notification-card-switch-test-id'

function NotificationGroupCard(props: Props) {
  const {
    isLoading,
    isSavingSubscription,
    subscriptionGroupKeys,
    notificationTypesInGroup,
    defaultExpanded,
    subscriptionDetails,
    hasEmail,
    isIgnoringAllEmail,
    isExpanded,
    panelName,
    onChangeAccordion,
    onChangeNotificationSetting
  } = props

  const handleOnChangeNotificationSetting = useCallback(
    (checked: boolean, type: NotificationType) => {
      if (!isLoading) {
        const subscriptionDetailsChanged = {
          ...subscriptionDetails,
          messageType: { ...subscriptionDetails.messageType, [toCamel(type)]: { inApp: true, email: checked } }
        }
        onChangeNotificationSetting(objectToSnake(subscriptionDetailsChanged))
      }
    },
    [subscriptionDetails, onChangeNotificationSetting, isLoading]
  )

  return (
    <Accordion defaultExpanded={defaultExpanded} expanded={isExpanded} onChange={onChangeAccordion(panelName)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <AccordionSummaryContainer>
          <Title variant="h6" data-testid={NOTIFICATION_CARD_TITLE_TEST_ID}>
            {t(`settings.notifications.subscription_group_label_${subscriptionGroupKeys}`)}
          </Title>
          <Description data-testid={NOTIFICATION_CARD_DESCRIPTION_TEST_ID}>
            {t(`settings.notifications.subscription_group_description_${subscriptionGroupKeys}`)}
          </Description>
        </AccordionSummaryContainer>
      </AccordionSummary>
      {!isLoading && (
        <AccordionDetails data-testid={NOTIFICATION_CARD_LOADING_TEST_ID}>
          {notificationTypesInGroup.map(type => (
            <NotificationItemContainer key={type}>
              <NotificationItemTextIconContainer>
                <NotificationItemText>{t(`settings.notifications.types.${type}`)}</NotificationItemText>
              </NotificationItemTextIconContainer>
              {hasEmail && (
                <Switch
                  onChange={(_, checked) => handleOnChangeNotificationSetting(checked, type)}
                  checked={subscriptionDetails.messageType[toCamel(type)].email}
                  disabled={isSavingSubscription || isIgnoringAllEmail}
                  data-testid={NOTIFICATION_CARD_SWITCH_TEST_ID}
                />
              )}
            </NotificationItemContainer>
          ))}
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default NotificationGroupCard
