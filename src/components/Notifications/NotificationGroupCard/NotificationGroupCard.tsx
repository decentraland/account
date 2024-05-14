import { useCallback } from 'react'
import { NotificationType } from '@dcl/schemas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { objectToSnake, toCamel } from 'ts-case-convert'
import { Alert, Skeleton, Snackbar, Switch } from 'decentraland-ui2'
import NotificationIcon from '../../NotificationIcon'
import {
  Accordion,
  AccordionDescription,
  AccordionDetails,
  AccordionSummary,
  AccordionSummaryContainer,
  AccordionTitle,
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
    disabled,
    subscriptionDetails,
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
            {isLoading ? (
              <Skeleton animation="wave" width={100} height={20} data-testid={NOTIFICATION_CARD_LOADING_TEST_ID} />
            ) : (
              <AccordionTitle data-testid={NOTIFICATION_CARD_TITLE_TEST_ID}>
                {t(`settings.notifications.subscription_group_label_${subscriptionGroupKeys}`)}
              </AccordionTitle>
            )}
            {isLoading ? (
              <Skeleton animation="wave" width={200} height={24} />
            ) : (
              <AccordionDescription data-testid={NOTIFICATION_CARD_DESCRIPTION_TEST_ID}>
                {t(`settings.notifications.subscription_group_description_${subscriptionGroupKeys}`)}
              </AccordionDescription>
            )}
          </AccordionSummaryContainer>
        </AccordionSummary>
        <AccordionDetails>
          {notificationTypesInGroup.map(type => (
            <NotificationItemContainer key={type}>
              <NotificationItemTextIconContainer>
                <NotificationIcon name={type} />
                <NotificationItemText>{t(`settings.notifications.types.${type}`)}</NotificationItemText>
              </NotificationItemTextIconContainer>
              {!disabled && (
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
