import { useCallback } from 'react'
import { NotificationType } from '@dcl/schemas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { objectToSnake, toCamel } from 'ts-case-convert'
import { Alert, Snackbar, Switch } from 'decentraland-ui2'
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
export const NOTIFICATION_CARD_ERROR_TEST_ID = 'notification-card-error-test-id'

function NotificationGroupCard(props: Props) {
  const {
    isLoading,
    isSavingSubscription,
    subscriptionGroupKeys,
    notificationTypesInGroup,
    defaultExpanded,
    subscriptionDetails,
    hasEmail,
    error,
    onChangeNotificationSetting,
    onClearChangeNotificationSettingError
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

  const handleClose = useCallback(() => {
    onClearChangeNotificationSettingError()
  }, [])

  return (
    <>
      <Accordion defaultExpanded={defaultExpanded}>
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
                    disabled={isSavingSubscription}
                    data-testid={NOTIFICATION_CARD_SWITCH_TEST_ID}
                  />
                )}
              </NotificationItemContainer>
            ))}
          </AccordionDetails>
        )}
      </Accordion>
      <Snackbar open={!!error} onClose={handleClose} autoHideDuration={5000} data-testid={NOTIFICATION_CARD_ERROR_TEST_ID}>
        <Alert severity="error" variant="filled">
          {t('settings.notifications.saving_settings_error')}
        </Alert>
      </Snackbar>
    </>
  )
}

export default NotificationGroupCard
