import { useCallback, useMemo } from 'react'
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

// Define linked notification pairs that should be managed together
const LINKED_NOTIFICATIONS: Record<string, NotificationType[]> = {
  [NotificationType.CREDITS_REMINDER_USAGE]: [NotificationType.CREDITS_REMINDER_USAGE_24_HOURS],
  [NotificationType.CREDITS_REMINDER_USAGE_24_HOURS]: [NotificationType.CREDITS_REMINDER_USAGE]
}

// Define notifications that should be hidden from the UI
const HIDDEN_NOTIFICATIONS = [NotificationType.CREDITS_REMINDER_USAGE_24_HOURS]

function NotificationGroupCard(props: Props) {
  const {
    isLoading,
    isSavingSubscription,
    subscriptionGroupKeys,
    notificationTypesInGroup,
    defaultExpanded,
    subscriptionDetails,
    hasEmail,
    isExpanded,
    panelName,
    onChangeAccordion,
    onChangeNotificationSetting
  } = props

  // Filter out hidden notifications from the displayed notification types
  const visibleNotificationTypes = useMemo(() => {
    return notificationTypesInGroup.filter(type => {
      // Otherwise, only hide notifications in the HIDDEN_NOTIFICATIONS list
      return !HIDDEN_NOTIFICATIONS.includes(type)
    })
  }, [notificationTypesInGroup])

  const handleOnChangeNotificationSetting = useCallback(
    (checked: boolean, type: NotificationType) => {
      if (!isLoading) {
        let ignoreAllEmail = false
        const messageType = { ...subscriptionDetails.messageType }

        // check if this notifications is linked to another notification which should be updated as well
        const linkedTypes = LINKED_NOTIFICATIONS[type] || []

        messageType[toCamel(type)] = { inApp: true, email: checked }
        linkedTypes.forEach((linkedType: NotificationType) => {
          messageType[toCamel(linkedType)] = { inApp: true, email: checked }
        })

        const allEmailsDisabled = Object.values(messageType).every(({ email }) => !email)

        if (allEmailsDisabled) {
          ignoreAllEmail = true
        }

        const subscriptionDetailsChanged = {
          ...subscriptionDetails,
          ignoreAllEmail,
          messageType
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
          {visibleNotificationTypes.map(type => (
            <NotificationItemContainer key={type}>
              <NotificationItemTextIconContainer>
                <NotificationItemText>{t(`settings.notifications.types.${type}`)}</NotificationItemText>
              </NotificationItemTextIconContainer>
              {hasEmail && (
                <Switch
                  onChange={(_, checked) => handleOnChangeNotificationSetting(checked, type)}
                  checked={subscriptionDetails.messageType[toCamel(type)].email}
                  disabled={isSavingSubscription}
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
