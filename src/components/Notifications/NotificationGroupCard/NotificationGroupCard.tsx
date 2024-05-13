import { useCallback, useEffect, useState } from 'react'
import { NotificationType } from '@dcl/schemas'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { objectToSnake, toCamel } from 'ts-case-convert'
import { Alert, Skeleton, Snackbar, Switch } from 'decentraland-ui2'
import NotificationIcon from '../../NotificationIcon'
import {
  AccordionDescriptionStyled,
  AccordionDetailsStyled,
  AccordionStyled,
  AccordionSummaryContainerStyled,
  AccordionSummaryStyled,
  AccordionTitleStyled,
  NotificationItemContainerStyled,
  NotificationItemTextIconContainerStyled,
  NotificationItemTextStyled
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
    disabled,
    subscriptionDetails,
    error,
    onChangeNotificationSetting,
    onClearChangeNotificationSettingError
  } = props

  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])

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
    setShowError(false)
    onClearChangeNotificationSettingError()
  }, [])

  return (
    <>
      <AccordionStyled defaultExpanded={defaultExpanded}>
        <AccordionSummaryStyled expandIcon={<ExpandMoreIcon />}>
          <AccordionSummaryContainerStyled>
            {isLoading ? (
              <Skeleton animation="wave" width={100} height={20} data-testid={NOTIFICATION_CARD_LOADING_TEST_ID} />
            ) : (
              <AccordionTitleStyled data-testid={NOTIFICATION_CARD_TITLE_TEST_ID}>
                {t(`settings.notifications.subscription_group_label_${subscriptionGroupKeys}`)}
              </AccordionTitleStyled>
            )}
            {isLoading ? (
              <Skeleton animation="wave" width={200} height={24} />
            ) : (
              <AccordionDescriptionStyled data-testid={NOTIFICATION_CARD_DESCRIPTION_TEST_ID}>
                {t(`settings.notifications.subscription_group_description_${subscriptionGroupKeys}`)}
              </AccordionDescriptionStyled>
            )}
          </AccordionSummaryContainerStyled>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
          {notificationTypesInGroup.map(type => (
            <NotificationItemContainerStyled key={type}>
              <NotificationItemTextIconContainerStyled>
                <NotificationIcon name={type} />
                <NotificationItemTextStyled>{t(`settings.notifications.types.${type}`)}</NotificationItemTextStyled>
              </NotificationItemTextIconContainerStyled>
              {!disabled && (
                <Switch
                  onChange={(_, checked) => handleOnChangeNotificationSetting(checked, type)}
                  checked={subscriptionDetails.messageType[toCamel(type)].email}
                  disabled={isSavingSubscription}
                />
              )}
            </NotificationItemContainerStyled>
          ))}
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Snackbar open={showError} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity="error" variant="filled">
          {t('settings.notifications.saving_settings_error')}
        </Alert>
      </Snackbar>
    </>
  )
}

export default NotificationGroupCard
